import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'
import { HiCodeBracket, HiCommandLine, HiArrowDownTray } from 'react-icons/hi2'

export const HomeAboutSection = () => {
  const { t } = useTranslation('home')

  const highlights = [
    {
      icon: <HiCodeBracket size={24} />,
      title: t('about.highlights.expertiseTitle'),
      description: t('about.highlights.expertiseDesc')
    },
    {
      icon: <HiCommandLine size={24} />,
      title: t('about.highlights.cleanCodeTitle'),
      description: t('about.highlights.cleanCodeDesc')
    },
    {
      icon: <HiArrowDownTray size={24} />,
      title: t('about.highlights.performanceTitle'),
      description: t('about.highlights.performanceDesc')
    }
  ]

  return (
    <section id="about" className="container relative py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
        {/* Left side */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6"
        >
          {/* Badge */}
          <div className="flex items-center gap-2 w-max px-4 py-2 rounded-full border border-accent/30 bg-accent/5">
            <span className="text-accent text-sm">{'</>'}</span>
            <span className="text-sm text-white font-medium">
              {t('about.badge')}
            </span>
            <HiCommandLine className="text-accent" size={16} />
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            {t('about.headingLine1')}
            <br />
            {t('about.headingLine2')} <span className="text-accent">{t('about.headingAccent')}</span>
          </h2>

          {/* Description */}
          <div className="flex flex-col gap-4 text-gray-400 text-sm leading-relaxed max-w-lg">
            <p>
              {t('about.paragraph1')}
            </p>
            <p>
              {t('about.paragraph2')}
            </p>
          </div>

        </motion.div>

        {/* Right side — Highlight Cards */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-col gap-4"
        >
          {/* Top Card — Expertise (full width) */}
          <div className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] hover:border-accent/20 transition-all duration-300 group">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4 group-hover:bg-accent group-hover:text-white transition-all duration-300">
              {highlights[0].icon}
            </div>
            <h3 className="text-lg font-semibold text-white mb-2">
              {highlights[0].title}
            </h3>
            <p className="text-sm text-gray-400 leading-relaxed">
              {highlights[0].description}
            </p>
          </div>

          {/* Two Cards Row */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.slice(1).map(item => (
              <div
                key={item.title}
                className="p-6 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] hover:border-accent/20 transition-all duration-300 group"
              >
                <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center text-accent mb-4 group-hover:bg-accent group-hover:text-white transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-base font-semibold text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>

        </motion.div>
      </div>
    </section>
  )
}
