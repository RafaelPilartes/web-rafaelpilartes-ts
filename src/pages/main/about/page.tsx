import { useState } from 'react'

import {
  FaHtml5,
  FaCss3,
  FaJs,
  FaReact,
  FaWordpress,
  FaFigma
} from 'react-icons/fa'
import {
  SiNextdotjs,
  SiAdobexd,
  SiAdobephotoshop,
  SiGithub,
  SiDiscord
} from 'react-icons/si'
import { BiLogoVisualStudio } from 'react-icons/bi'

import Circles from '../../../components/main/Circles'
import { ExperienceItem } from '../../../components/main/page/AboutExperienceItem'
import { WorkExperience } from '../../../types/WorkExperience'

type aboutDataInfoType = {
  title: string
  stage?: string
  icons?: any[]
}
type aboutDataType = {
  title: string
  info: aboutDataInfoType[]
}
//  data
const aboutData: aboutDataType[] = [
  {
    title: 'Habilidades',
    info: [
      {
        title: 'Web Development',
        icons: [
          <FaHtml5 key={356} />,
          <FaCss3 key={547} />,
          <FaJs key={468} />,
          <FaReact key={473} />,
          <SiNextdotjs key={638} />,
          <FaWordpress key={165} />
        ]
      },
      {
        title: 'UI/UX Design',
        icons: [
          <FaFigma key={4637} />,
          <SiAdobexd key={9968} />,
          <SiAdobephotoshop key={3466} />
        ]
      },
      {
        title: 'Ferramentas',
        icons: [
          <SiGithub key={3456} />,
          <SiDiscord key={6833} />,
          <BiLogoVisualStudio key={5785} />
        ]
      }
    ]
  },
  {
    title: 'Experiência',
    info: [
      {
        title: 'UX/UI Designer - XYZ Company',
        stage: '2012 - 2023'
      },
      {
        title: 'Web Developer - ABC Agency',
        stage: '2010 - 2012'
      },
      {
        title: 'Intern - DEF Corporation',
        stage: '2008 - 2010'
      }
    ]
  },
  {
    title: 'Certificados',
    info: [
      {
        title: 'Web Development - ABC University, LA, CA',
        stage: '2011'
      },
      {
        title: 'Computer Science Diploma - AV Technical Institute',
        stage: '2009'
      },
      {
        title: 'Certified Graphic Designer - ABC Institute, Los Angeles, CA',
        stage: '2006'
      }
    ]
  }
]

const experiences: WorkExperience[] = [
  {
    companyLogo: {
      url: '/experience/toqueplay.png'
    },
    role: 'Toqueplay é uma plataforma de streaming e vendas de músicas que aproxima os fãs dos artistas através de experiências únicas e da mais alta qualidade do som.',
    companyName: 'TouePlay',
    companyUrl: 'https://toqueplay.com/',
    startDate: 'startDate',
    endDate: 'endDate',
    technologies: [
      {
        name: 'JavaScript'
      },
      {
        name: 'React Js'
      },
      {
        name: 'React Native'
      },
      {
        name: 'Firebase'
      }
    ],
    description: {
      raw: 'RichTextContent' as any
    }
  },
  {
    companyLogo: {
      url: '/experience/gusmapis.jpg'
    },
    role: 'A Gusmapis é uma das maiores organizações de construção do país e classificada entre as maiores empreiteiras. Aborde diferentes segmentos.',
    companyName: 'Gusmapis',
    companyUrl: 'https://gusmapis.com/',
    startDate: 'string',
    endDate: 'string',
    technologies: [
      {
        name: 'SAC4'
      },
      {
        name: 'Exel'
      },
      {
        name: 'Word'
      }
    ],
    description: {
      raw: 'RichTextContent' as any
    }
  },
  {
    companyLogo: {
      url: '/experience/graceminds.jpg'
    },
    role: 'Grace Minds a equipe de profissionais que entendem e guiá-lo com a consciência de vida rica e profunda durante todo o processo de orientação e cura.',
    companyName: 'Grace Minds',
    companyUrl: 'https://graceminds.com/',
    startDate: 'string',
    endDate: 'string',
    technologies: [
      {
        name: 'HTML'
      },
      {
        name: 'CSS'
      },
      {
        name: 'JavaScript'
      }
    ],
    description: {
      raw: 'RichTextContent' as any
    }
  }
]

const About = () => {
  const [itemIndex, setItemIndex] = useState<number>(0)

  return (
    <main className="h-full py-36 text-center xl:text-left ">
      <Circles />

      {/* Avatar image */}
      {/* <motion.div
        variants={fadeIn('left', 0.2)}
        initial="hidden"
        animate="show"
        exit="hidden"
        className="hidden xl:flex fixed bottom-0 -right-[370px]"
      >
        <Avatar photoImage={myPhoto} />
      </motion.div> */}

      <div className="container mx-auto h-full flex flex-col justify-center items-start xl:flex-row gap-x-6 gap-8 ">
        {/* Text */}
        <div className="flex-1 flex flex-col justify-center">
          <h2 className="h2">
            {' '}
            Transformando <span className="text-accent"> ideias </span> em
            código para.{' '}
          </h2>
          <p className="max-w-[500px] mx-auto xl:mx-0 mb6 xl:mb-12 px-2 xl:px-0 ">
            Sou um programador apaixonado por desafios e pela arte de
            transformar linhas de código em soluções funcionais. Com experiência
            em diversas linguagens e tecnologias, estou sempre em busca de novos
            conhecimentos para entregar resultados eficientes e impactantes.{' '}
          </p>

          {/* Counters */}
          <div className="hidden md:flex md:max-w-xl xl:max-w-none mx-auto xl:mx-0">
            <div className="flex flex-1 xl:gap-x-6">
              {/* Experience */}
              <div className="relative flex-1 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0 ">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  3 {/* <CountUp start={5} end={3} duration={5} />+ */}
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px] ">
                  Anos de experiência
                </div>
              </div>

              {/* Clients */}
              <div className="relative flex-1 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0 ">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  18 {/* <CountUp start={5} end={18} duration={5} />+ */}
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px] ">
                  Clientes satisfeitos
                </div>
              </div>

              {/* Projects */}
              <div className="relative flex-1 after:w-[1px] after:h-full after:bg-white/10 after:absolute after:top-0 after:right-0 ">
                <div className="text-2xl xl:text-4xl font-extrabold text-accent mb-2">
                  24 {/* <CountUp start={5} end={24} duration={5} />+ */}
                </div>
                <div className="text-xs uppercase tracking-[1px] leading-[1.4] max-w-[100px] ">
                  Projetos
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col items-center w-full xl:max-w-[48%] ">
          <div className="flex gap-x-4 xl:gap-x-8 mx-auto xl:mx-0 mb-4 ">
            {aboutData.map((item, index) => {
              return (
                <button
                  key={index}
                  className={`${
                    itemIndex === index &&
                    'text-accent after:w-[100%] after:bg-accent after:transition-all duration-300 '
                  } cursor-pointer capitalize xl:text-lg relative after:w-8 after:h-[2px] after:bg-white after:absolute after:-bottom-1 after:left-0 `}
                  onClick={() => setItemIndex(index)}
                >
                  {item.title}
                </button>
              )
            })}
          </div>

          <div className="flex flex-col gap-4 py-4">
            {itemIndex === 0 &&
              aboutData[itemIndex].info.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex-1 flex flex-col md:flex-row max-w-max gap-x-2 items-center text-white/60 "
                  >
                    {/* Title */}
                    <div className="font-light mb-2 md:mb-0">{item.title}</div>
                    <div className="hidden md:flex">-</div>
                    <div> {item.stage} </div>
                    <div className="flex gap-x-4">
                      {/* Icons */}
                      {item.icons?.map((icon, index) => {
                        return (
                          <div className="text-2xl " key={index}>
                            {' '}
                            {icon}{' '}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}

            {itemIndex === 1 && (
              <div className="flex flex-col gap-4">
                {experiences?.map(experience => (
                  <ExperienceItem
                    key={experience.companyName}
                    experience={experience}
                  />
                ))}
              </div>
            )}
            {itemIndex === 2 &&
              aboutData[itemIndex].info.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="flex-1 flex flex-col md:flex-row max-w-max gap-x-2 items-center text-white/60 "
                  >
                    {/* Title */}
                    <div className="font-light mb-2 md:mb-0">{item.title}</div>
                    <div className="hidden md:flex">-</div>
                    <div> {item.stage} </div>
                    <div className="flex gap-x-4">
                      {/* Icons */}
                      {item.icons?.map((icon, index) => {
                        return (
                          <div className="text-2xl " key={index}>
                            {' '}
                            {icon}{' '}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
          </div>
        </div>
      </div>
    </main>
  )
}

export default About
