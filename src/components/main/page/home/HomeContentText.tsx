import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

import { HiArrowNarrowRight } from 'react-icons/hi'
import { FaDownload } from 'react-icons/fa'
import {
  TbBrandGithub,
  TbBrandLinkedin,
  TbBrandInstagram,
  TbBrandWhatsapp,
  TbCode,
  TbMapPin
} from 'react-icons/tb'
import { TypeAnimation } from 'react-type-animation'
import { ButtonBase } from '../../ButtonBase'

const socials = [
  {
    url: 'https://github.com/RafaelPilartes',
    label: 'GitHub',
    icon: <TbBrandGithub />
  },
  {
    url: 'https://www.linkedin.com/in/rafael-pilartes-6b9141235/',
    label: 'LinkedIn',
    icon: <TbBrandLinkedin />
  },
  {
    url: 'https://www.instagram.com/rafaelpilartes/',
    label: 'Instagram',
    icon: <TbBrandInstagram />
  },
  {
    url: 'https://web.whatsapp.com/send?phone=27673235056',
    label: 'WhatsApp',
    icon: <TbBrandWhatsapp />
  }
]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true }
}

export default function HomeContentText() {
  const { t, i18n } = useTranslation('home')
  const rotating = t('hero.rotating', { returnObjects: true }) as string[]

  const handleContact = () => {
    window.location.href = 'https://wa.me/27673235056'
  }

  const handleDownloadCV = () => {
    const link = document.createElement('a')
    link.href = 'docs/CV-One-Rafael_Pilartes-Software-Developer.pdf'
    link.download = 'CV-One-Rafael_Pilartes-Software-Developer.pdf'
    link.click()
  }

  return (
    <div className="flex flex-col gap-6 text-center xl:text-left">
      {/* JSX-style eyebrow */}
      <motion.p
        {...fadeUp}
        transition={{ duration: 0.4 }}
        className="font-mono text-sm !leading-normal text-white/70"
      >
        <span className="text-white/40">{'<'}</span>
        <span className="text-accent">Developer</span>{' '}
        <span className="text-[#79c0ff]">stack</span>
        <span className="text-white/40">=</span>
        <span className="text-[#7ee787]">"full-stack"</span>{' '}
        <span className="text-[#79c0ff]">available</span>
        <span className="text-white/40">{' />'}</span>
      </motion.p>

      {/* Title */}
      <motion.h1
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.05 }}
        className="text-3xl font-semibold leading-[1.15] sm:text-4xl md:text-5xl"
      >
        {t('hero.titleLine1')}
        <br />
        {t('hero.titleLine2')}{' '}
        <span className="text-accent">
          <TypeAnimation
            key={i18n.language}
            sequence={rotating.flatMap(w => [w, 1000])}
            repeat={Infinity}
            wrapper="span"
          />
        </span>
      </motion.h1>

      {/* Tagline (two paragraphs) */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="mx-auto flex max-w-lg flex-col gap-3 text-base text-white/60 xl:mx-0"
      >
        <p className="!leading-relaxed">{t('hero.tagline')}</p>
        <p className="!leading-relaxed">{t('hero.tagline2')}</p>
      </motion.div>

      {/* Pills */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="flex flex-wrap justify-center gap-3 xl:justify-start"
      >
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 font-mono text-sm text-white/70">
          <TbCode className="text-accent" />
          {t('hero.role')}
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 font-mono text-sm text-white/70">
          <TbMapPin className="text-accent" />
          Cape Town
        </span>
        <span className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-1.5 font-mono text-sm text-white/70">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#27c93f] opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[#27c93f]" />
          </span>
          {t('hero.status')}
        </span>
      </motion.div>

      {/* Actions */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mt-2 flex flex-col items-center gap-5 sm:flex-row xl:justify-start"
      >
        <ButtonBase className="w-max shadow-button" onClick={handleContact}>
          {t('hero.contactCta')}
          <HiArrowNarrowRight size={18} />
        </ButtonBase>

        <button
          onClick={handleDownloadCV}
          className="group flex w-max items-center gap-2 font-mono text-sm text-white/60 transition-colors duration-200 hover:text-accent"
        >
          <FaDownload size={13} />
          {t('hero.downloadCv')}
        </button>
      </motion.div>

      {/* Socials */}
      <motion.div
        {...fadeUp}
        transition={{ duration: 0.5, delay: 0.25 }}
        className="mt-2 flex items-center justify-center gap-5 text-xl text-white/40 xl:justify-start"
      >
        {socials.map(social => (
          <a
            href={social.url}
            key={social.label}
            target="_blank"
            rel="noreferrer"
            aria-label={social.label}
            className="transition-colors duration-200 hover:text-accent"
          >
            {social.icon}
          </a>
        ))}
      </motion.div>
    </div>
  )
}
