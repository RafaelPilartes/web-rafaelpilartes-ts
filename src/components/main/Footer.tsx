import { IoMdHeart } from 'react-icons/io'
import { HorizontalDivider } from './HorizontalDivider'
import {
  TbBrandGithub,
  TbBrandLinkedin,
  TbBrandInstagram,
  TbBrandWhatsapp
} from 'react-icons/tb'
import { useTranslation } from 'react-i18next'

const socials = [
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
    url: 'https://web.whatsapp.com/send?phone=270673235056',
    iconSvg: <TbBrandWhatsapp />
  }
]

export const Footer = () => {
  const { t } = useTranslation('footer')

  return (
    <footer className="container w-full py-5 max-xl:mb-20 flex flex-col items-center justify-center">
      <HorizontalDivider className="h-[1px] bg-gradient-to-r to-primary/10 via-white/50 from-primary/10" />

      <div className="w-full flex flex-row max-sm:flex-col items-center justify-between gap-5">
        <span className="flex items-center gap-1.5 text-xs sm:text-sm font-mono text-gray-400">
          {t('copyright')}
        </span>

        <div className="text-2xl text-gray-600 flex items-center gap-3">
          {socials.map((contact, i) => (
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

        <span className="flex items-center gap-1.5 text-xs sm:text-sm font-mono text-gray-400">
          {t('madeWith')}
          <IoMdHeart size={13} className="text-red-500" />
          {t('by')}
          <strong className="font-medium">Rafael Pilartes</strong>
        </span>
      </div>
    </footer>
  )
}
