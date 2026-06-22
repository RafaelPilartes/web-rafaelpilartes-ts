import HomeContentText from './HomeContentText'
import HomeCodeWindow from './HomeCodeWindow'
import ParticlesContainer from '../../ParticlesContainer'

export const HomeHeroContainer = () => {
  return (
    <section
      id="home"
      className="relative flex min-h-screen w-full items-center overflow-hidden"
    >
      {/* Dotted grid */}
      <div className="hero-grid pointer-events-none absolute inset-0 opacity-50" />

      {/* Accent glow */}
      <div className="pointer-events-none absolute -right-20 top-1/4 h-[500px] w-[500px] rounded-full bg-accent/20 blur-[150px]" />

      {/* Particles */}
      <ParticlesContainer />

      {/* Avatar fallback for small screens (right column hidden) */}
      <img
        src="/rafaelPilarte.png"
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 -bottom-24 z-0 h-[560px] w-auto -translate-x-1/2 select-none object-contain opacity-35 mix-blend-luminosity [mask-image:linear-gradient(to_bottom,black,transparent)] sm:h-[720px] md:h-[860px] lg:hidden"
      />

      <div className="container relative z-10 mx-auto grid grid-cols-1 items-center gap-14 py-28 lg:grid-cols-2">
        {/* Text */}
        <HomeContentText />

        {/* Code window + dimmed avatar */}
        <div className="pointer-events-none relative hidden justify-center lg:flex">
          <img
            src="/rafaelPilarte.png"
            alt=""
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-60 right-0 h-[820px] w-auto select-none object-contain opacity-70 mix-blend-luminosity [mask-image:linear-gradient(to_bottom,black,transparent)]"
          />
          <HomeCodeWindow />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 lg:flex">
        <span className="font-mono text-[10px] tracking-[0.3em] text-white/40">
          SCROLL
        </span>
        <span className="h-10 w-px bg-gradient-to-b from-accent to-transparent" />
      </div>
    </section>
  )
}
