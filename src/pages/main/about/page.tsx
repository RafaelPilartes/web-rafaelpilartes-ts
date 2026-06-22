import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FaReact, FaWordpress, FaFigma } from 'react-icons/fa'
import {
  SiNextdotjs,
  SiAdobexd,
  SiAdobephotoshop,
  SiGithub,
  SiDiscord,
  SiKotlin,
  SiSwift,
  SiElectron,
  SiTailwindcss,
  SiTypescript,
  SiNodedotjs,
  SiPostgresql,
  SiMongodb,
  SiPython,
  SiPhp,
  SiDocker,
  SiInsomnia,
  SiTrello,
  SiVercel
} from 'react-icons/si'
import { BiLogoVisualStudio } from 'react-icons/bi'
import { HiAcademicCap, HiStar } from 'react-icons/hi2'
import { useTranslation } from 'react-i18next'

import Circles from '../../../components/main/Circles'
import { ExperienceItem } from '../../../components/main/page/AboutExperienceItem'
import { CertificateItem } from '../../../components/main/page/AboutCertificateItem'
import { PageIntroduction } from '../../../components/main/PageIntroduction'
import { useWorkExperienceViewModel } from '@/viewModels/work-experience.viewmodel'
import { useCertificateViewModel } from '@/viewModels/certificate.viewmodel'
import { Skeleton } from '../../../components/main/ui/Skeleton'

// -- Static icon lists (no text) --
const frontendItems = [
  { name: 'React', icon: <FaReact className="text-[#61DAFB]" /> },
  { name: 'Next.js', icon: <SiNextdotjs className="text-white" /> },
  { name: 'TypeScript', icon: <SiTypescript className="text-[#3178C6]" /> },
  { name: 'Tailwind CSS', icon: <SiTailwindcss className="text-[#06B6D4]" /> },
  { name: 'WordPress', icon: <FaWordpress className="text-[#21759B]" /> }
]
const backendItems = [
  { name: 'Node.js', icon: <SiNodedotjs className="text-[#339933]" /> },
  { name: 'PHP', icon: <SiPhp className="text-[#777BB4]" /> },
  { name: 'Python', icon: <SiPython className="text-[#3776AB]" /> },
  { name: 'PostgreSQL', icon: <SiPostgresql className="text-[#4169E1]" /> },
  { name: 'MongoDB', icon: <SiMongodb className="text-[#47A248]" /> }
]
const mobileItems = [
  { name: 'React Native', icon: <FaReact className="text-[#61DAFB]" /> },
  { name: 'Kotlin', icon: <SiKotlin className="text-[#7F52FF]" /> },
  { name: 'Swift', icon: <SiSwift className="text-[#F05138]" /> }
]
const desktopItems = [
  { name: 'Electron', icon: <SiElectron className="text-[#47848F]" /> }
]
const uiuxItems = [
  { name: 'Figma', icon: <FaFigma className="text-[#F24E1E]" /> },
  { name: 'Adobe XD', icon: <SiAdobexd className="text-[#FF61F6]" /> },
  { name: 'Photoshop', icon: <SiAdobephotoshop className="text-[#31A8FF]" /> }
]
const toolsItems = [
  { name: 'GitHub', icon: <SiGithub className="text-white" /> },
  { name: 'Discord', icon: <SiDiscord className="text-[#5865F2]" /> },
  { name: 'VS Code', icon: <BiLogoVisualStudio className="text-[#007ACC]" /> },
  { name: 'Docker', icon: <SiDocker className="text-[#2496ED]" /> },
  { name: 'Insomnia', icon: <SiInsomnia className="text-[#5849BE]" /> },
  { name: 'Trello', icon: <SiTrello className="text-[#0079BF]" /> },
  { name: 'Vercel', icon: <SiVercel className="text-white" /> }
]

const statsValues = ['5+', '18+', '24+']

const ExperienceTabWrapper = () => {
  const { t } = useTranslation('about')
  const { getAllExperiences } = useWorkExperienceViewModel()
  const { data: response, isLoading } = getAllExperiences()
  const experiences = response?.data || []

  return (
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
        <h3 className="text-2xl font-bold text-white">
          {t('experience.heading')}
        </h3>
      </div>

      {isLoading ? (
        <div className="flex flex-col gap-8 w-full mt-4">
          {Array.from({ length: 3 }).map((_, idx) => (
            <div key={idx} className="flex gap-4 w-full items-start">
              {/* Timeline Dot Skeleton */}
              <div className="flex flex-col items-center mt-2">
                <Skeleton className="w-4 h-4 rounded-full" />
                <Skeleton className="w-1 h-32 mt-2" />
              </div>

              {/* Card Skeleton */}
              <div className="flex-1 bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-3">
                <Skeleton className="w-24 h-5 rounded-md" /> {/* date */}
                <Skeleton className="w-48 h-6 rounded-md" /> {/* title */}
                <Skeleton className="w-32 h-4 rounded-md" /> {/* company */}
                <Skeleton className="w-full h-16 rounded-md mt-2" />{' '}
                {/* description */}
              </div>
            </div>
          ))}
        </div>
      ) : experiences.length > 0 ? (
        experiences.map((exp, index) => (
          <ExperienceItem key={exp.id ?? index} experience={exp} />
        ))
      ) : (
        <div className="text-center text-white/50 p-6 border border-white/10 rounded-2xl bg-white/5 w-full">
          {t('experience.empty')}
        </div>
      )}
    </motion.div>
  )
}

const CertificatesTabWrapper = () => {
  const { t } = useTranslation('about')
  const { getAllCertificates } = useCertificateViewModel()
  const { data: response, isLoading } = getAllCertificates()
  const certificates = response?.data || []

  return (
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
        <h3 className="text-2xl font-bold text-white">
          {t('certificates.heading')}
        </h3>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="flex gap-4 w-full items-center p-4 rounded-xl bg-white/5 border border-white/10"
            >
              <Skeleton className="w-16 h-16 rounded-lg flex-shrink-0" />
              <div className="flex flex-col gap-2 w-full">
                <Skeleton className="w-3/4 h-5 rounded-md" />
                <Skeleton className="w-1/2 h-4 rounded-md" />
              </div>
            </div>
          ))}
        </div>
      ) : certificates.length > 0 ? (
        certificates.map(cert => (
          <CertificateItem key={cert.id} certificate={cert} />
        ))
      ) : (
        <div className="text-center text-white/50 p-6 border border-white/10 rounded-2xl bg-white/5 w-full">
          {t('certificates.empty')}
        </div>
      )}
    </motion.div>
  )
}

const About = () => {
  const { t } = useTranslation('about')
  const [activeTab, setActiveTab] = useState<string>('Experience')

  useEffect(() => {
    const hash = window.location.hash.toLowerCase()
    if (hash === '#skills') setActiveTab('Skills')
    else if (hash === '#certificates') setActiveTab('Certificates')
    else if (hash === '#experience') setActiveTab('Experience')
  }, [])

  const skillsData = [
    {
      title: t('skills.frontend.title'),
      description: t('skills.frontend.description'),
      items: frontendItems
    },
    {
      title: t('skills.backend.title'),
      description: t('skills.backend.description'),
      items: backendItems
    },
    {
      title: t('skills.mobile.title'),
      description: t('skills.mobile.description'),
      items: mobileItems
    },
    {
      title: t('skills.desktop.title'),
      description: t('skills.desktop.description'),
      items: desktopItems
    },
    {
      title: t('skills.uiux.title'),
      description: t('skills.uiux.description'),
      items: uiuxItems
    },
    {
      title: t('skills.tools.title'),
      description: t('skills.tools.description'),
      items: toolsItems
    }
  ]

  const stats = [
    { label: t('stats.years'), value: statsValues[0] },
    { label: t('stats.clients'), value: statsValues[1] },
    { label: t('stats.projects'), value: statsValues[2] }
  ]

  const TABS = [
    { key: 'Experience', label: t('tabs.experience') },
    { key: 'Skills', label: t('tabs.skills') },
    { key: 'Certificates', label: t('tabs.certificates') }
  ]

  const introductionData = {
    subtitle: t('subtitle'),
    title: t('title'),
    description: t('description'),
    backLabel: t('back')
  }

  return (
    <main className="flex flex-col gap-6 items-center justify-center pb-20">
      <Circles />

      {/* Intro Header */}
      <PageIntroduction {...introductionData} />

      <div className="container mx-auto px-4 lg:px-8 mt-4">
        {/* Intro Text & Stats Grid */}
        <section className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-16 py-16 items-center">
          {/* Portrait */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="relative mx-auto w-full max-w-xs shrink-0 sm:max-w-sm lg:mx-0"
          >
            <div className="pointer-events-none absolute -inset-6 rounded-full bg-accent/20 blur-[90px]" />
            <img
              src="/avatar/Spotlight_Beam_Photography.png"
              alt="Rafael Pilartes"
              loading="lazy"
              className="relative w-full rounded-2xl border border-white/10 object-cover shadow-2xl shadow-black/50"
            />
          </motion.div>

          {/* Text + stats */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="flex-1 text-center lg:text-left"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
              {t('hero.heading_1')}{' '}
              <span className="text-accent">{t('hero.heading_accent')}</span>{' '}
              {t('hero.heading_2')}
            </h2>

            <div className="mx-auto mb-8 flex max-w-2xl flex-col gap-4 text-base leading-relaxed text-gray-400 lg:mx-0">
              <p>{t('hero.body')}</p>
              <p>{t('hero.body2')}</p>
            </div>

            <div className="mx-auto grid max-w-md grid-cols-3 gap-4 lg:mx-0">
              {stats.map((stat, i) => (
                <div
                  key={i}
                  className="flex flex-col items-center gap-1 rounded-2xl border border-white/[0.06] bg-white/[0.03] p-4 lg:items-start"
                >
                  <span className="text-2xl font-extrabold text-accent md:text-3xl">
                    {stat.value}
                  </span>
                  <span className="text-[11px] uppercase tracking-widest text-gray-400">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Dynamic Tabs Section */}
        <section className="max-w-4xl mx-auto">
          {/* Tab Selection */}
          <div className="flex flex-wrap items-center justify-center gap-4 mb-10">
            {TABS.map(tab => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`relative px-6 py-3 rounded-full text-sm sm:text-base font-medium transition-all duration-300
                  ${
                    activeTab === tab.key
                      ? 'text-white'
                      : 'text-gray-400 hover:text-white bg-white/[0.03] border border-white/[0.06] hover:bg-white/[0.06]'
                  }`}
              >
                {activeTab === tab.key && (
                  <motion.div
                    layoutId="active-tab"
                    className="absolute inset-0 bg-accent rounded-full -z-10 shadow-lg shadow-accent/25"
                    transition={{ type: 'spring', duration: 0.6 }}
                  />
                )}
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="min-h-[400px]">
            <AnimatePresence mode="wait">
              {/* === TAB 1: Experiência === */}
              {activeTab === 'Experience' && <ExperienceTabWrapper />}

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
                      <div className="flex flex-col gap-1">
                        <h4 className="text-sm font-semibold text-gray-300 uppercase tracking-wider">
                          {category.title}
                        </h4>
                        <p className="text-xs text-gray-400">
                          {category.description}
                        </p>
                      </div>
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
              {activeTab === 'Certificates' && <CertificatesTabWrapper />}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </main>
  )
}

export default About
