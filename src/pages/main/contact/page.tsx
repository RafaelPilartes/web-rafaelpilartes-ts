import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ButtonBase } from '../../../components/main/ButtonBase'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { fadeUpAnimation } from '../../../lib/animations'
import Circles from '../../../components/main/Circles'
import {
  TbBrandGithub,
  TbBrandLinkedin,
  TbBrandInstagram,
  TbBrandWhatsapp
} from 'react-icons/tb'
import { BiPhoneCall } from 'react-icons/bi'
import { MdOutlineMailOutline } from 'react-icons/md'

const contactFormSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email(),
  message: z.string().min(1).max(500)
})

type ContactFormData = z.infer<typeof contactFormSchema>

const socials = [
  {
    url: 'https://web.whatsapp.com/send?phone=270673235056',
    iconSvg: <TbBrandWhatsapp />
  },
  {
    url: 'https://github.com/RafaelPilartes',
    iconSvg: <TbBrandGithub />
  },
  {
    url: 'https://www.instagram.com/rafaelpilartes/',
    iconSvg: <TbBrandInstagram />
  },
  {
    url: 'https://www.linkedin.com/in/rafael-pilartes-6b9141235/',
    iconSvg: <TbBrandLinkedin />
  }
]

const Contact = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema)
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      await axios.post('/api/contact', data)
      toast.success('Mensagem enviada com sucesso!')
      reset()
    } catch (error) {
      toast.error('Ocorreu um erro ao enviar a mensagem. Tente novamente.')
    }
  }

  return (
    <section
      className="py-24 px-6 md:py-32 flex items-center justify-center"
      id="contact"
    >
      <div className="container flex flex-col items-center justify-center lg:flex-row ">
        {/* <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-4 py-5">
          <motion.div
            {...animPropsLeft}
            transition={{ duration: 0.5 }}
            className="flex flex-row items-center justify-center flex-1
          bg-[#f2f7fb] gap-4 text-gray-900 p-3 rounded-md "
          >
            <img
              src="/icons/mobile.png"
              width={40}
              height={40}
              alt="Rafael email"
            />
            <a href="tel:270673235056" className="p-text">
              +244 923 414 621
            </a>
          </motion.div>
          <motion.div
            {...animPropsRight}
            transition={{ duration: 0.5 }}
            className="flex flex-row items-center justify-center flex-1
          bg-[#f2f7fb] gap-4 text-gray-900 p-3 rounded-md "
          >
            <img
              src="/icons/email.png"
              width={40}
              height={40}
              alt="Rafael phone"
            />
            <a href="mailto:contact@rafaelpilartes.com" className="p-text">
              contact@rafaelpilartes.com
            </a>
          </motion.div>
        </div> */}

        {/* Text */}
        <div className="flex-1 relative mb-2 lg:mb-0 ">
          <div className="flex flex-col gap-3 mb-4">
            <h2 className="h2 ">
              Entre em <span className="text-accent">contato</span>{' '}
            </h2>
            <h3 className=" text-zinc-50">
              Se você tem algum projeto em mente, podemos desenvolve-lo juntos{' '}
            </h3>
            <p className="max-w-[505px] text-sm text-gray-300">
              Descubra como posso ajudar você a alcançar seus objetivos. Meus
              serviços são cuidadosamente projetados para atender suas
              necessidades, proporcionando soluções eficientes e resultados
              excepcionais. Deixe-me ser parte do seu sucesso.
            </p>
          </div>

          <div className="flex flex-row items-center justify-start flex-1 gap-4 text-sm text-gray-300 p-3 rounded-md hover:text-accent transition-all duration-300 group">
            <BiPhoneCall size={20} />
            <a href="tel:270673235056" className="p-text">
              +27 067 323 5056
            </a>
          </div>
          <div className="flex flex-row items-center justify-start flex-1 gap-4 text-sm text-gray-300 p-3 rounded-md hover:text-accent transition-all duration-300 group">
            <MdOutlineMailOutline size={20} />

            <a href="mailto:contact@rafaelpilartes.com" className="p-text">
              contact@rafaelpilartes.com
            </a>
          </div>

          <div className="text-2xl text-gray-600 flex items-center h-20 gap-3">
            {socials.map((contact, i) => (
              <a
                href={contact.url}
                key={`contact-${i}`}
                target="_blank"
                className="p-3 rounded-lg text-2xl bg-accent text-white hover:bg-white hover:text-accent transition-colors duration-300"
                rel="noreferrer"
              >
                {contact.iconSvg}
                {/* <CMSIcon icon={contact.iconSvg} /> */}
              </a>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 w-full px-2">
          <motion.form
            className="mt-12 w-full flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
            {...fadeUpAnimation}
          >
            <input
              placeholder="Nome"
              className="flex-1 h-14 bg-transparent rounded-lg placeholder:text-white text-white border-[1px] border-solid border-white/75 p-4 focus:outline-none focus:ring-2 ring-red-600"
              {...register('name')}
            />
            <input
              placeholder="E-mail"
              type="email"
              className="flex-1 h-14 bg-transparent rounded-lg placeholder:text-white text-white border-[1px] border-solid border-white/75 p-4 focus:outline-none focus:ring-2 ring-red-600"
              {...register('email')}
            />
            <textarea
              placeholder="Mensagem"
              className="resize-none flex-1 h-[138px] bg-transparent rounded-lg placeholder:text-white text-white border-[1px] border-solid border-white/75 p-4 focus:outline-none focus:ring-2 ring-red-600"
              {...register('message')}
              maxLength={500}
            />

            <div className="relative w-max mx-auto mt-6">
              <ButtonBase className="z-[2] relative" disabled={isSubmitting}>
                Enviar mensagem
                <HiArrowNarrowRight size={18} />
              </ButtonBase>
              <div className="absolute inset-0 bg-red-600 blur-2xl opacity-20" />
            </div>
          </motion.form>
        </div>
      </div>
      <Circles />
    </section>
  )
}

export default Contact
