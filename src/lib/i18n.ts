import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

import ptCommon from '../locales/pt/common.json'
import ptNav from '../locales/pt/nav.json'
import ptHome from '../locales/pt/home.json'
import ptAbout from '../locales/pt/about.json'
import ptServices from '../locales/pt/services.json'
import ptWork from '../locales/pt/work.json'
import ptBlog from '../locales/pt/blog.json'
import ptContact from '../locales/pt/contact.json'
import ptFooter from '../locales/pt/footer.json'

import enCommon from '../locales/en/common.json'
import enNav from '../locales/en/nav.json'
import enHome from '../locales/en/home.json'
import enAbout from '../locales/en/about.json'
import enServices from '../locales/en/services.json'
import enWork from '../locales/en/work.json'
import enBlog from '../locales/en/blog.json'
import enContact from '../locales/en/contact.json'
import enFooter from '../locales/en/footer.json'

export const NAMESPACES = [
  'common',
  'nav',
  'home',
  'about',
  'services',
  'work',
  'blog',
  'contact',
  'footer'
] as const

const resources = {
  pt: {
    common: ptCommon,
    nav: ptNav,
    home: ptHome,
    about: ptAbout,
    services: ptServices,
    work: ptWork,
    blog: ptBlog,
    contact: ptContact,
    footer: ptFooter
  },
  en: {
    common: enCommon,
    nav: enNav,
    home: enHome,
    about: enAbout,
    services: enServices,
    work: enWork,
    blog: enBlog,
    contact: enContact,
    footer: enFooter
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'pt',
    supportedLngs: ['pt', 'en'],
    ns: NAMESPACES as unknown as string[],
    defaultNS: 'common',
    detection: {
      order: ['localStorage', 'navigator'],
      caches: ['localStorage'],
      lookupLocalStorage: 'i18nextLng'
    },
    interpolation: { escapeValue: false }
  })

export default i18n
