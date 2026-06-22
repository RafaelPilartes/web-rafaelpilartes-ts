import { useEffect } from 'react'
import { HomeHeroContainer } from '../../components/main/page/home/HomeHeroContainer'
import { HomeAboutSection } from '../../components/main/page/home/HomeAboutSection'
import { HomeKnownTechs } from '../../components/main/page/home/HomeKnownTechs'
import { HomeProjects } from '../../components/main/page/home/HomeProjects'
import { HomeServices } from '../../components/main/page/home/HomeServices'
import { HomeProcess } from '../../components/main/page/home/HomeProcess'
import { HomeQuality } from '../../components/main/page/home/HomeQuality'
import { HomeCustomers } from '../../components/main/page/home/HomeCustomers'
import { HomeTestimonials } from '../../components/main/page/home/HomeTestimonials'
import { HomeRadar } from '../../components/main/page/home/HomeRadar'
export default function Home() {
  useEffect(() => {
    const hash = window.location.hash
    if (!hash) return

    // Small delay to ensure all sections are mounted before scrolling
    const timer = setTimeout(() => {
      const el = document.querySelector(hash)
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [])

  return (
    <main className="relative">
      <HomeHeroContainer />
      <HomeAboutSection />
      <HomeQuality />
      <HomeKnownTechs />

      <HomeServices />
      <HomeProcess />
      <HomeProjects />
      {/* <HomeComparison /> */}

      <HomeCustomers />
      <HomeTestimonials />

      <HomeRadar />
    </main>
  )
}
