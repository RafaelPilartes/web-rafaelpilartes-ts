import HomeContentText from './HomeContentText'
import HomeContentAvatar from './HomeContentAvatar'
import ParticlesContainer from '../../ParticlesContainer'

export const HomeHeroContainer = () => {
  return (
    <section id="home" className="relative w-full h-screen flex flex-row object-cover max-h-[100%] ">
      {/* Text */}
      <HomeContentText />

      {/* Image */}
      <div className="w-[1200px] h-full absolute right-0 bottom-0 pointer-events-none">
        {/* Bg Image */}
        <div className="bg-none xl:bg-explosion xl:bg-cover xl:bg-right xl:bg-no-repeat w-full h-full absolute mix-blend-color-dodge translate-z-0"></div>

        {/* Particles */}
        <ParticlesContainer />

        {/* Avatar image */}
        <HomeContentAvatar />
      </div>
    </section>
  )
}
