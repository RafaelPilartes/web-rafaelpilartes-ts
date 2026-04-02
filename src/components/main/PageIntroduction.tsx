import { LinkSimple } from '../../components/main/Link'
import { SectionTitle } from '../../components/main/SectionTitle'
import { HiArrowNarrowLeft } from 'react-icons/hi'
import { motion } from 'framer-motion'

type PageIntroductionProps = {
  subtitle: string
  title: string
  description: string
}
export const PageIntroduction = ({
  subtitle,
  title,
  description
}: PageIntroductionProps) => {
  return (
    <section className="relative overflow-hidden w-full py-28 md:py-36 flex flex-col items-center justify-center px-2">
      <SectionTitle
        subtitle={subtitle}
        title={title}
        className="text-center items-center [&>h3]:text-4xl"
      />
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        transition={{ duration: 0.6 }}
      >
        <p className="text-gray-400 text-center max-w-[640px] my-6 text-sm sm:text-base">
          {description}
        </p>
        <LinkSimple
          to="/"
          className="hover:text-accent transition-all duration-300"
        >
          <HiArrowNarrowLeft size={20} />
          Voltar para Home
        </LinkSimple>
      </motion.div>

      {/* Shadow */}
      <div className="w-full h-full bg-primary/[0.9] absolute right-0 bottom-0 pointer-events-none z-[-1]"></div>

      {/* Image */}
      <div
        className="w-full h-full absolute blur-[2px] pointer-events-none inset-0 z-[-2]"
        style={{
          background: `url('https://blog.shift4shop.com/hubfs/Custom%20web%20design%20for%20your%20business.jpg') no-repeat center/cover`
        }}
      ></div>
    </section>
  )
}
