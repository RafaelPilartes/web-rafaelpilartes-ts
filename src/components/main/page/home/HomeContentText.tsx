import { motion } from 'framer-motion'

import { HiArrowNarrowRight } from 'react-icons/hi'
import { FaDownload } from 'react-icons/fa'
import {
  TbBrandGithub,
  TbBrandLinkedin,
  TbBrandInstagram,
  TbBrandWhatsapp
} from 'react-icons/tb'
import { TypeAnimation } from 'react-type-animation'
import { techBadgeAnimation } from '../../../../lib/animations'
import { ButtonBase } from '../../ButtonBase'
import { TechBadge } from '../../TechBadge'

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
      name: 'MongoDb'
    },
    {
      name: 'MySql'
    },
    {
      name: 'React Query'
    }
  ],
  // socials: [
  //   {
  //     url: '/',
  //     iconSvg: '<i class="fa fa-heart" style="color: red;"></i>'
  //   }
  // ]
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
  ]
}

export default function HomeContentText() {
  const handleContact = () => {
    window.location.href = 'https://wa.me/244923414621'
  }

  const handleDownloadCV = () => {
    // Tenta fazer o download direto do ficheiro PDF a partir da pasta public
    const link = document.createElement('a')
    link.href = 'docs/CV-One-Rafael_Pilartes-Software-Developer.pdf'
    link.download = 'CV-One-Rafael_Pilartes-Software-Developer.pdf'
    link.click()
  }
  return (
    <div className="w-full h-full bg-gradient-to-r from-primary/10 via-black/30">
      <div className="text-center flex flex-col justify-center gap-10 xl:pt-40 xl:text-left h-full container mx-auto ">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="text-xl sm:h1"
        >
          Soluções para fazer
          <br />
          crescer{' '}
          <span className="text-accent">
            {/* realidade  */}
            <TypeAnimation
              sequence={[
                'seu Negocio!',
                1000,
                'sua Startup',
                1000,
                'sua Imagem',
                1000
              ]}
              repeat={Infinity}
              wrapper="span"
            />
          </span>
        </motion.h1>
        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="max-w-sm xl:max-w-xl xl:mx-0 mx-auto xl:max-0"
        >
          Acredito no poder das ideias e na capacidade da tecnologia de
          torná-las realidade. Com habilidade e criatividade, desenvolvo
          soluções digitais sob medida, alinhadas às necessidades e objetivos de
          cada clientes.
        </motion.p>

        {/* Btn */}
        <div className="flex flex-wrap gap-x-2 gap-y-3 lg:max-w-[340px]">
          {homeInfo.technologies.map((tech, i) => (
            <TechBadge
              name={tech.name}
              key={tech.name}
              {...techBadgeAnimation}
              transition={{ duration: 0.2, delay: i * 0.1 }}
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.5 }}
          className="flex sm:items-center sm:gap-5 flex-col sm:flex-row"
        >
          <ButtonBase className="w-max shadow-button" onClick={handleContact}>
            Entre em contato
            <HiArrowNarrowRight size={18} />
          </ButtonBase>

          <ButtonBase
            className="w-max border border-accent/50 bg-black/40 text-accent hover:bg-accent/10 hover:border-accent hover:text-white transition-all duration-300"
            onClick={handleDownloadCV}
          >
            Baixar Currículo
            <FaDownload size={14} className="ml-2" />
          </ButtonBase>

          <div className="text-2xl text-gray-600 flex items-center h-20 gap-3 ml-2">
            {homeInfo.socials.map((contact, i) => (
              <a
                href={contact.url}
                key={`contact-${i}`}
                target="_blank"
                className="hover:text-accent transition-colors"
                rel="noreferrer"
              >
                {contact.iconSvg}
                {/* <CMSIcon icon={contact.iconSvg} /> */}
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}
