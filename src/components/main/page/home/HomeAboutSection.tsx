import { motion } from 'framer-motion'
import { HiCodeBracket, HiCommandLine, HiArrowDownTray } from 'react-icons/hi2'

const highlights = [
  {
    icon: <HiCodeBracket size={24} />,
    title: 'Expertise',
    description:
      'Especializado em construir aplicações web escaláveis com tecnologias modernas e melhores práticas.'
  },
  {
    icon: <HiCommandLine size={24} />,
    title: 'Clean Code',
    description: 'Escrevendo código mantível e bem-documentado que escala.'
  },
  {
    icon: <HiArrowDownTray size={24} />,
    title: 'Performance',
    description: 'Optimizando velocidade e eficiência em cada projeto.'
  }
]

const stats = [
  { value: '45+', label: 'Happy Clients' },
  { value: '2.5K+', label: 'Code Commits' },
  { value: '500+', label: 'GitHub Stars' }
]

const rightStats = [
  { value: '100%', label: 'Client Satisfaction' },
  { value: '24/7', label: 'Support Available' },
  { value: 'Fast', label: 'Delivery Time' }
]

export const HomeAboutSection = () => {
  return (
    <section className="container relative py-20">
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
              Full-Stack Developer
            </span>
            <HiCommandLine className="text-accent" size={16} />
          </div>

          {/* Heading */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            Crafting Digital
            <br />
            Experiences That <span className="text-accent">Matter</span>
          </h2>

          {/* Description */}
          <div className="flex flex-col gap-4 text-gray-400 text-sm leading-relaxed max-w-lg">
            <p>
              Sou um desenvolvedor React apaixonado com mais de 3 anos de
              experiência na construção de aplicações web escaláveis e
              performáticas. Especializo-me em criar interfaces intuitivas que
              combinam design bonito com funcionalidade excepcional.
            </p>
            <p>
              Quando não estou a programar, encontras-me a contribuir para
              projectos open-source, a escrever artigos técnicos ou a explorar
              novas tendências de design.
            </p>
          </div>

          {/* Stats Row */}
          <div className="flex items-center gap-0 mt-4">
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col gap-1 pr-8 ${i !== 0 ? 'pl-8 border-l border-gray-700' : ''}`}
              >
                <span className="text-2xl md:text-3xl font-bold text-white">
                  {stat.value}
                </span>
                <span className="text-xs text-gray-500">{stat.label}</span>
              </motion.div>
            ))}
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

          {/* Bottom Stats Row */}
          <div className="grid grid-cols-3 gap-4">
            {rightStats.map(stat => (
              <div
                key={stat.label}
                className="p-4 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] text-center"
              >
                <span className="text-lg font-bold text-accent">
                  {stat.value}
                </span>
                <p className="text-[11px] text-gray-500 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
