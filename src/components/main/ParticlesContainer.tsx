import { useCallback } from 'react'
import { Particles } from 'react-tsparticles'
import { loadFull } from 'tsparticles'

const ParticlesContainer = () => {
  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine)
  }, [])

  const particlesLoaded = useCallback(async () => {}, [])

  return (
    <>
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fullScreen: { enable: true },
          background: {
            color: {
              value: ''
            }
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: false,
                mode: 'push'
              },
              onHover: {
                enable: true,
                mode: 'repulse'
              },
              resize: true
            },
            modes: {
              push: {
                quantity: 90
              },
              repulse: {
                distance: 200,
                duration: 0.4
              }
            }
          },
          particles: {
            color: {
              value: '#e68e2e'
            },
            links: {
              color: '#f59e93',
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1.2
            },
            collisions: {
              enable: true
            },
            move: {
              direction: 'none',
              enable: true,
              outModes: {
                default: 'bounce'
              },
              random: true,
              speed: 1,
              straight: false
            },
            number: {
              density: {
                enable: true,
                area: 800
              },
              value: 60
            },
            opacity: {
              value: 0.5
            },
            shape: {
              type: 'circles',
              polygon: {
                sides: 50
              }
            },
            size: {
              value: { min: 1, max: 5 }
            }
          }
        }}
      />
    </>
  )
}

export default ParticlesContainer
