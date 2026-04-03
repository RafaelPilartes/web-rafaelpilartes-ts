import { HomeHeroContainer } from '../../components/main/page/home/HomeHeroContainer'
import { HomeAboutSection } from '../../components/main/page/home/HomeAboutSection'
import { HomeKnownTechs } from '../../components/main/page/home/HomeKnownTechs'
import { HomeProjects } from '../../components/main/page/home/HomeProjects'
import { HomeServices } from '../../components/main/page/home/HomeServices'
import { HomeQuality } from '../../components/main/page/home/HomeQuality'
import { HomeCustomers } from '../../components/main/page/home/HomeCustomers'
import { HomeTestimonials } from '../../components/main/page/home/HomeTestimonials'
import { mockTechnologies } from '@/core/mocks/technologiesMock'

export default function Home() {
  return (
    <main className="relative pb-12">
      <HomeHeroContainer />
      <HomeAboutSection />
      <HomeQuality />
      <HomeKnownTechs techs={mockTechnologies} />

      <HomeServices />
      <HomeProjects />

      <HomeCustomers />
      <HomeTestimonials />
    </main>
  )
}
