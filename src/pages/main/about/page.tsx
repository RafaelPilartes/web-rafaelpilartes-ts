import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
import { HiAcademicCap, HiStar } from 'react-icons/hi2'

import Circles from '../../../components/main/Circles'
import { ExperienceItem } from '../../../components/main/page/AboutExperienceItem'
import { PageIntroduction } from '../../../components/main/PageIntroduction'
import { mockExperiences } from '@/core/mocks/experiencesMock'

// -- Data --
const skillsData = [
  {
    title: 'Web Development',
    items: [
      { name: 'HTML5', icon: <FaHtml5 className="text-[#E34F26]" /> },
      { name: 'CSS3', icon: <FaCss3 className="text-[#1572B6]" /> },
      { name: 'JavaScript', icon: <FaJs className="text-[#F7DF1E]" /> },
      { name: 'React', icon: <FaReact className="text-[#61DAFB]" /> },
      { name: 'Next.js', icon: <SiNextdotjs className="text-white" /> },
      { name: 'WordPress', icon: <FaWordpress className="text-[#21759B]" /> }
    ]
  },
  {
    title: 'UI/UX Design',
    items: [
      { name: 'Figma', icon: <FaFigma className="text-[#F24E1E]" /> },
      { name: 'Adobe XD', icon: <SiAdobexd className="text-[#FF61F6]" /> },
      { name: 'Photoshop', icon: <SiAdobephotoshop className="text-[#31A8FF]" /> }
    ]
  },
  {
    title: 'Ferramentas',
    items: [
      { name: 'GitHub', icon: <SiGithub className="text-white" /> },
      { name: 'Discord', icon: <SiDiscord className="text-[#5865F2]" /> },
      { name: 'VS Code', icon: <BiLogoVisualStudio className="text-[#007ACC]" /> }
    ]
  }
]

const educationData = [
  {
    course: 'Web Development',
    institute: 'ABC University, LA, CA',
    year: '2011'
  },
  {
    course: 'Computer Science Diploma',
    institute: 'AV Technical Institute',
    year: '2009'
  },
  {
    course: 'Certified Graphic Designer',
    institute: 'ABC Institute, Los Angeles, CA',
    year: '2006'
  }
]

const stats = [
  { label: 'Anos de experiência', value: '3+' },
  { label: 'Clientes satisfeitos', value: '18+' },
  { label: 'Projectos entregues', value: '24+' }
]

const introductionData = {
  subtitle: 'sobre mim',
  title: 'Conheça a Minha História',
  description:
    'Sou um desenvolvedor apaixonado pela arte de transformar problemas complexos em soluções simples, acessíveis e elegantes através do código.'
}

const TABS = ['Experience', 'Skills', 'Certificates'] as const
type TabType = typeof TABS[number]

const About = () => {
  const [activeTab, setActiveTab] = useState<TabType>('Experience')

  useEffect(() => {
    const hash = window.location.hash.toLowerCase()
    if (hash === '#skills') setActiveTab('Skills')
    else if (hash === '#certificates') setActiveTab('Certificates')
    else if (hash === '#experience') setActiveTab('Experience')
  }, [])

  return (
    <main className="flex flex-col gap-6 items-center justify-center pb-20">
      <Circles />
      
      {/* Intro Header */}
      <PageIntroduction {...introductionData} />

      <div className="container mx-auto px-4 lg:px-8 mt-4">
        
        {/* Intro Text & Stats Grid */}
        <section className="flex flex-col lg:flex-row gap-12 lg:gap-20 mb-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 text-center lg:text-left"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              Transformando <span className="text-accent">ideias</span> em código para a realidade.
            </h2>
            <p className="text-gray-400 text-base leading-relaxed mb-8 max-w-2xl mx-auto lg:mx-0">
              Sou um programador movido por desafios e pela arte de criar. Com sólida experiência
              em diversas tecnologias front-end e mobile, estou sempre em busca da excelência
              técnica, de novas tendências no design de interfaces e das melhores práticas
              de desenvolvimento para criar soluções que tragam impacto directo ao usuário.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-3 gap-6 w-full lg:w-auto"
          >
            {stats.map((stat, i) => (
              <div
                key={i}
                className="flex flex-col items-center justify-center p-6 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] shadow-lg"
              >
                <div className="text-4xl lg:text-5xl font-extrabold text-accent mb-3">
                  {stat.value}
                </div>
                <div className="text-xs uppercase tracking-widest text-gray-400 text-center mx-auto max-w-[120px]">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </section>

        {/* Dynamic Tabs Section */}
        <section className="max-w-4xl mx-auto">
          {/* Tab Selection */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`relative px-6 py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300
                  ${
                    activeTab === tab
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06]'
                  }`}
              >
                {activeTab === tab && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 bg-accent rounded-full -z-10 shadow-lg shadow-accent/25"
                    transition={{ type: 'spring', duration: 0.6 }}
                  />
                )}
                {tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              
              {/* === TAB 1: Experiência === */}
              {activeTab === 'Experience' && (
                <motion.div
                  key="experience"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-2"
                >
                  <div className="hidden md:flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                      <HiStar size={20} />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Trajetória Profissional</h3>
                  </div>
                  
                  {mockExperiences.map((exp, index) => (
                    <ExperienceItem key={exp.id ?? index} experience={exp} />
                  ))}
                </motion.div>
              )}

              {/* === TAB 2: Habilidades === */}
              {activeTab === 'Skills' && (
                <motion.div
                  key="skills"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-6"
                >
                  {skillsData.map((category, index) => (
                    <div
                      key={index}
                      className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex flex-col gap-4"
                    >
                      <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                        {category.title}
                      </h4>
                      <div className="flex flex-wrap gap-3">
                        {category.items.map((item, i) => (
                          <div
                            key={i}
                            title={item.name}
                            className="flex items-center justify-center w-12 h-12 rounded-xl bg-black/40 border border-white/5 hover:border-accent/30 hover:bg-accent/10 hover:-translate-y-1 transition-all text-2xl"
                          >
                            {item.icon}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* === TAB 3: Certificados === */}
              {activeTab === 'Certificates' && (
                <motion.div
                  key="certificates"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                  className="flex flex-col gap-4"
                >
                  <div className="hidden md:flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent">
                      <HiAcademicCap size={22} />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Educação e Certificados</h3>
                  </div>

                  {educationData.map((edu, index) => (
                    <div
                      key={index}
                      className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-accent/20 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                        <h4 className="text-lg font-bold text-white">{edu.course}</h4>
                        <span className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full">
                          {edu.year}
                        </span>
                      </div>
                      <p className="text-sm text-gray-400">{edu.institute}</p>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </section>

      </div>
    </main>
  )
}

export default About
