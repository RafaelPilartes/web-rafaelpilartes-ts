import { useEffect, useRef } from 'react'
import * as THREE from 'three'

const vertexShader = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`

const fragmentShader = `
  uniform float iTime;
  uniform vec2 iResolution;

  #define NUM_OCTAVES 3
  #define ITER 24.0

  // tanh is not available in GLSL ES 1.00, so define our own.
  vec4 tanhApprox(vec4 x) {
    vec4 e2 = exp(2.0 * x);
    return (e2 - 1.0) / (e2 + 1.0);
  }

  float rand(vec2 n) {
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);
    float res = mix(
      mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
      mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x), u.y);
    return res * res;
  }

  float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.3;
    vec2 shift = vec2(100);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < NUM_OCTAVES; ++i) {
      v += a * noise(x);
      x = rot * x * 2.0 + shift;
      a *= 0.4;
    }
    return v;
  }

  void main() {
    vec2 shake = vec2(sin(iTime * 1.2) * 0.005, cos(iTime * 2.1) * 0.005);
    vec2 p = ((gl_FragCoord.xy + shake * iResolution.xy) - iResolution.xy * 0.5) / iResolution.y * mat2(6.0, -4.0, 4.0, 6.0);
    vec2 v;
    vec4 o = vec4(0.0);

    float f = 2.0 + fbm(p + vec2(iTime * 5.0, 0.0)) * 0.5;

    for (float i = 0.0; i < ITER; i++) {
      v = p + cos(i * i + (iTime + p.x * 0.08) * 0.025 + i * vec2(13.0, 11.0)) * 3.5 + vec2(sin(iTime * 3.0 + i) * 0.003, cos(iTime * 3.5 - i) * 0.003);
      float tailNoise = fbm(v + vec2(iTime * 0.5, i)) * 0.3 * (1.0 - (i / ITER));
      vec4 auroraColors = vec4(
        0.7 + 0.3 * sin(i * 0.3 + iTime * 0.4),
        0.18 + 0.22 * cos(i * 0.3 + iTime * 0.5),
        0.10 + 0.10 * sin(i * 0.4 + iTime * 0.3),
        1.0
      );
      vec4 currentContribution = auroraColors * exp(sin(i * i + iTime * 0.8)) / length(max(v, vec2(v.x * f * 0.015, v.y * 1.5)));
      float thinnessFactor = smoothstep(0.0, 1.0, i / ITER) * 0.6;
      o += currentContribution * (1.0 + tailNoise * 0.8) * thinnessFactor;
    }

    o = tanhApprox(pow(o / 100.0, vec4(1.6)));
    gl_FragColor = o * 1.5;
  }
`

// Internal render resolution (the aurora is soft, so a low buffer is invisible).
const RES_SCALE = 0.6
const FRAME_MS = 1000 / 30 // throttle to ~30fps

export default function AnimatedShaderBackground({
  className
}: {
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const scene = new THREE.Scene()
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1)
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true })
    renderer.setPixelRatio(1)

    const buffer = () => ({
      w: Math.max(1, Math.round(container.clientWidth * RES_SCALE)),
      h: Math.max(1, Math.round(container.clientHeight * RES_SCALE))
    })
    let b = buffer()
    renderer.setSize(b.w, b.h, false) // keep CSS size, shrink draw buffer

    const el = renderer.domElement
    el.style.width = '100%'
    el.style.height = '100%'
    el.style.display = 'block'
    container.appendChild(el)

    const material = new THREE.ShaderMaterial({
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new THREE.Vector2(b.w, b.h) }
      },
      vertexShader,
      fragmentShader
    })
    const geometry = new THREE.PlaneGeometry(2, 2)
    const mesh = new THREE.Mesh(geometry, material)
    scene.add(mesh)

    let frameId = 0
    let last = performance.now()
    const animate = () => {
      frameId = requestAnimationFrame(animate)
      const now = performance.now()
      const dt = now - last
      if (dt < FRAME_MS) return
      last = now
      material.uniforms.iTime.value += dt * 0.001
      renderer.render(scene, camera)
    }

    animate()

    // Pause the loop while the section is off-screen.
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !frameId) {
          last = performance.now()
          animate()
        } else if (!entry.isIntersecting && frameId) {
          cancelAnimationFrame(frameId)
          frameId = 0
        }
      },
      { threshold: 0 }
    )
    io.observe(container)

    const ro = new ResizeObserver(() => {
      b = buffer()
      renderer.setSize(b.w, b.h, false)
      material.uniforms.iResolution.value.set(b.w, b.h)
    })
    ro.observe(container)

    return () => {
      if (frameId) cancelAnimationFrame(frameId)
      io.disconnect()
      ro.disconnect()
      if (el.parentNode === container) container.removeChild(el)
      geometry.dispose()
      material.dispose()
      renderer.dispose()
    }
  }, [])

  return <div ref={containerRef} className={className} />
}
