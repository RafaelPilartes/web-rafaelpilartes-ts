import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ButtonBase } from '../../../components/main/ButtonBase'
import { HiArrowNarrowRight } from 'react-icons/hi'
import { motion } from 'framer-motion'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import Circles from '../../../components/main/Circles'
import {
  TbBrandGithub,
  TbBrandLinkedin,
  TbBrandInstagram,
  TbBrandWhatsapp
} from 'react-icons/tb'
import { BiPhoneCall } from 'react-icons/bi'
import { MdOutlineMailOutline, MdLocationOn } from 'react-icons/md'

const contactFormSchema = z.object({
  name: z.string().min(3).max(100),
  email: z.string().email(),
  message: z.string().min(1).max(500)
})

type ContactFormData = z.infer<typeof contactFormSchema>

const socials = [
  {
    url: 'https://web.whatsapp.com/send?phone=270673235056',
    iconSvg: <TbBrandWhatsapp />,
    label: 'WhatsApp'
  },
  {
    url: 'https://github.com/RafaelPilartes',
    iconSvg: <TbBrandGithub />,
    label: 'GitHub'
  },
  {
    url: 'https://www.instagram.com/rafaelpilartes/',
    iconSvg: <TbBrandInstagram />,
    label: 'Instagram'
  },
  {
    url: 'https://www.linkedin.com/in/rafael-pilartes-6b9141235/',
    iconSvg: <TbBrandLinkedin />,
    label: 'LinkedIn'
  }
]

const contactInfo = [
  {
    icon: <BiPhoneCall size={22} />,
    label: 'Telefone',
    value: '+27 067 323 5056',
    href: 'tel:270673235056'
  },
  {
    icon: <MdOutlineMailOutline size={22} />,
    label: 'E-mail',
    value: 'contact@rafaelpilartes.com',
    href: 'mailto:contact@rafaelpilartes.com'
  },
  {
    icon: <MdLocationOn size={22} />,
    label: 'Localização',
    value: 'Cape Town, South Africa',
    href: undefined
  }
]

const Contact = () => {
  const {
    handleSubmit,
    register,
    reset,
    formState: { isSubmitting, errors }
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema)
  })

  const onSubmit = async (data: ContactFormData) => {
    try {
      await axios.post('/api/contact', data)
      toast.success('Mensagem enviada com sucesso!')
      reset()
    } catch {
      toast.error('Ocorreu um erro ao enviar a mensagem. Tente novamente.')
    }
  }

  return (
    <section className="py-20 px-6" id="contact">
      <div className="container">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-accent text-sm font-medium tracking-widest uppercase">
            Contacto
          </span>
          <h2 className="text-4xl md:text-5xl font-bold text-white mt-3">
            Vamos trabalhar <span className="text-accent">juntos</span>
          </h2>
          <p className="max-w-[550px] mx-auto text-gray-400 mt-4">
            Se você tem algum projeto em mente, podemos desenvolvê-lo juntos.
            Entre em contacto e vamos transformar a sua ideia em realidade.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Left Column — Info Cards + Socials */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {/* Contact Info Cards */}
            <div className="flex flex-col gap-4">
              {contactInfo.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.2 + i * 0.1 }}
                  className="flex items-center gap-5 p-5 rounded-xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06] hover:border-accent/30 hover:bg-white/[0.06] transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center text-accent group-hover:bg-accent group-hover:text-white transition-all duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">
                      {item.label}
                    </p>
                    {item.href ? (
                      <a
                        href={item.href}
                        className="text-white hover:text-accent transition-colors text-sm"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <span className="text-white text-sm">{item.value}</span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-2">
              {socials.map((contact, i) => (
                <a
                  href={contact.url}
                  key={`contact-${i}`}
                  target="_blank"
                  title={contact.label}
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-xl bg-white/[0.05] backdrop-blur-sm border border-white/[0.08] text-gray-400
                             hover:bg-accent hover:text-white hover:border-accent hover:shadow-lg hover:shadow-accent/20 transition-all duration-300"
                  rel="noreferrer"
                >
                  {contact.iconSvg}
                </a>
              ))}
            </div>

            {/* Google Maps Embed */}
            <div className="rounded-xl overflow-hidden border border-white/[0.06] mt-2 h-[220px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d211064.81586872383!2d18.35!3d-33.9249!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1dcc500f8826eed7%3A0x687fe1fc2828aa87!2sCape%20Town%2C%20South%20Africa!5e0!3m2!1sen!2sza!4v1700000000000"
                width="100%"
                height="100%"
                style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localização - Cape Town, South Africa"
              />
            </div>
          </motion.div>

          {/* Right Column — Form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <form
              className="flex flex-col gap-5 p-8 rounded-2xl bg-white/[0.03] backdrop-blur-sm border border-white/[0.06]"
              onSubmit={handleSubmit(onSubmit)}
            >
              <h3 className="text-xl font-semibold text-white mb-2">
                Envie uma mensagem
              </h3>

              {/* Name */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-500 uppercase tracking-wider">
                  Nome
                </label>
                <input
                  placeholder="O seu nome"
                  className={`h-13 bg-white/[0.04] rounded-xl text-white placeholder:text-gray-600 border p-4 focus:outline-none focus:ring-2 ring-accent/50 transition-all
                    ${errors.name ? 'border-red-500/50' : 'border-white/[0.08]'}`}
                  {...register('name')}
                />
                {errors.name && (
                  <span className="text-red-400 text-xs">Mínimo 3 caracteres</span>
                )}
              </div>

              {/* Email */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-500 uppercase tracking-wider">
                  E-mail
                </label>
                <input
                  placeholder="seuemail@exemplo.com"
                  type="email"
                  className={`h-13 bg-white/[0.04] rounded-xl text-white placeholder:text-gray-600 border p-4 focus:outline-none focus:ring-2 ring-accent/50 transition-all
                    ${errors.email ? 'border-red-500/50' : 'border-white/[0.08]'}`}
                  {...register('email')}
                />
                {errors.email && (
                  <span className="text-red-400 text-xs">E-mail inválido</span>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-500 uppercase tracking-wider">
                  Mensagem
                </label>
                <textarea
                  placeholder="Conte-me sobre o seu projeto..."
                  className={`resize-none h-[160px] bg-white/[0.04] rounded-xl text-white placeholder:text-gray-600 border p-4 focus:outline-none focus:ring-2 ring-accent/50 transition-all
                    ${errors.message ? 'border-red-500/50' : 'border-white/[0.08]'}`}
                  {...register('message')}
                  maxLength={500}
                />
                {errors.message && (
                  <span className="text-red-400 text-xs">Campo obrigatório</span>
                )}
              </div>

              {/* Submit */}
              <div className="relative w-full mt-4">
                <ButtonBase
                  className="z-[2] relative w-full justify-center py-4"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar mensagem'}
                  <HiArrowNarrowRight size={18} />
                </ButtonBase>
                <div className="absolute inset-0 bg-red-600 blur-2xl opacity-10 rounded-xl" />
              </div>
            </form>
          </motion.div>
        </div>
      </div>
      <Circles />
    </section>
  )
}

export default Contact
