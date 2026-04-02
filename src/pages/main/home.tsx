import { HomeHeroContainer } from '../../components/main/page/home/HomeHeroContainer'
import { HomeKnownTechs } from '../../components/main/page/home/HomeKnownTechs'
import {
  TbBrandGithub,
  TbBrandLinkedin,
  TbBrandInstagram,
  TbSql,
  TbBrandWhatsapp
} from 'react-icons/tb'
import {
  BiLogoHtml5,
  BiLogoCss3,
  BiLogoTypescript,
  BiLogoPhp,
  BiLogoReact,
  BiLogoNodejs,
  BiLogoJavascript,
  BiLogoTailwindCss,
  BiLogoFigma,
  BiLogoGithub
} from 'react-icons/bi'
import { HomeProjects } from '../../components/main/page/home/HomeProjects'
import { HomeServices } from '../../components/main/page/home/HomeServices'
import { HomeQuality } from '../../components/main/page/home/HomeQuality'
import { HomeCustomers } from '../../components/main/page/home/HomeCustomers'

const homeInfo = {
  technologies: [
    {
      name: 'React Js'
    },
    {
      name: 'Next Js'
    },
    {
      name: 'NodeJs'
    },
    {
      name: 'Prisma'
    },
    {
      name: 'MOngoDb'
    },
    {
      name: 'MySql'
    },
    {
      name: 'React Query'
    }
  ],
  socials: [
    {
      url: 'https://github.com/RafaelPilartes',
      iconSvg: <TbBrandGithub />
    },
    {
      url: 'https://www.linkedin.com/in/rafael-pilartes-6b9141235/',
      iconSvg: <TbBrandLinkedin />
    },
    {
      url: 'https://www.instagram.com/rafaelpilartes/',
      iconSvg: <TbBrandInstagram />
    },
    {
      url: 'https://web.whatsapp.com/send?phone=244923414621',
      iconSvg: <TbBrandWhatsapp />
    }
  ],
  techs: [
    {
      name: 'HTML',
      startDate: '3 anos',
      iconSvg: (<BiLogoHtml5 className="text-[1.4rem]" />) as any
    },
    {
      name: 'CSS',
      startDate: '3 anos',
      iconSvg: (<BiLogoCss3 className="text-[1.4rem]" />) as any
    },
    {
      name: 'JavaScript',
      startDate: '3 anos',
      iconSvg: (<BiLogoJavascript className="text-[1.4rem]" />) as any
    },
    {
      name: 'PHP',
      startDate: '2 anos',
      iconSvg: (<BiLogoPhp className="text-[1.4rem]" />) as any
    },
    {
      name: 'TypeScript',
      startDate: '2 anos',
      iconSvg: (<BiLogoTypescript className="text-[1.4rem]" />) as any
    },
    {
      name: 'React Js',
      startDate: '3 anos',
      iconSvg: (<BiLogoReact className="text-[1.4rem]" />) as any
    },
    {
      name: 'React Native',
      startDate: '2 anos',
      iconSvg: (<BiLogoReact className="text-[1.4rem]" />) as any
    },
    {
      name: 'Next Js',
      startDate: '1 anos',
      iconSvg: (<BiLogoReact className="text-[1.4rem]" />) as any
    },
    {
      name: 'Node.Js',
      startDate: '3 anos',
      iconSvg: (<BiLogoNodejs className="text-[1.4rem]" />) as any
    },
    {
      name: 'MySQL',
      startDate: '2 anos',
      iconSvg: (<TbSql className="text-[1.4rem]" />) as any
    },
    {
      name: 'Tailwind',
      startDate: '2 anos',
      iconSvg: (<BiLogoTailwindCss className="text-[1.4rem]" />) as any
    },
    {
      name: 'Figma',
      startDate: '4 anos',
      iconSvg: (<BiLogoFigma className="text-[1.4rem]" />) as any
    },
    {
      name: 'GitHub',
      startDate: '3 anos',
      iconSvg: (<BiLogoGithub className="text-[1.4rem]" />) as any
    }
  ]
}

export default function Home() {
  return (
    <main className="relative pb-12">
      <HomeHeroContainer />
      <HomeQuality />
      <HomeKnownTechs techs={homeInfo.techs} />

      <HomeServices />
      <HomeProjects />

      <HomeCustomers />
    </main>
  )
}
