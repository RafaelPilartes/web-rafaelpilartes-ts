import { motion } from 'framer-motion'
import { RxPencil2, RxDesktop, RxArrowTopRight } from 'react-icons/rx'
import { ButtonBase } from '../../../../components/main/ButtonBase'

const servicesData = [
  {
    name: 'Desenvolvimento de website',
    description:
      'Desenvolvimento de websites criarão uma presença online única e envolvente para o seu negócio.',
    link: '/#',
    icon: <RxDesktop />
  },
  {
    name: 'Design gráfico',
    description:
      'Criação de designs atraentes e criativos que ajudam a transmitir a mensagem da sua marca de forma única e memorável.',
    link: '/#',
    icon: <RxPencil2 />
  },
  {
    name: 'Marketing Digital',
    description:
      'Soluções abrangentes de marketing digital, desde estratégias de mídia social até campanhas de e-mail marketing.',
    link: '/#',
    icon: <RxArrowTopRight />
  }
]

export const HomeServices = () => {
  return (
    <section className="container relative py-16">
      <div className="mx-auto ">
        <div className="flex flex-col lg:flex-row">
          {/* Text */}
          <div className="flex-1 relative mb-12 lg:mb-0 ">
            <div className="flex flex-col gap-2 mb-6">
              <h2 className="h2 text-accent ">O que eu faço?</h2>
              <p className="text-white">Veja alguns do meus serviços</p>
            </div>
            <h3 className="max-w-[455px] mb-16">
              Descubra como posso ajudar você a alcançar seus objetivos. Meus
              serviços são cuidadosamente projetados para atender suas
              necessidades, proporcionando soluções eficientes e resultados
              excepcionais. Deixe-me ser parte do seu sucesso.
            </h3>
            <ButtonBase>Ver todos os serviços</ButtonBase>

            {/* <div className="w-full h-full max-w-[407px] max-h-[388px] absolute -bottom-32 lg:bottom-0 lg:right-[8%] ">
              <div className="h-full hidden xl:flex xl:max-w-none">
                <Image
                  src={'/rafaelPilartesCyber.png'}
                  width={340}
                  height={340}
                  alt="Rafael Pilartes"
                  className="w-full h-full object-cover translate-z-0 mix-blend-lighten"
                />
              </div>
            </div> */}
          </div>

          {/* Service */}
          <div className="flex-1 ">
            {/* Service List */}
            <div>
              {servicesData.map((item, index) => {
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.15, delay: index * 0.1 }}
                    className="flex border-b border-white/20 h-[146px] mb-[38px] hover:text-accent transition-all duration-300 "
                  >
                    <div className="max-w-[476px] translate-x-4 hover:-translate-x-0 transition-all duration-300">
                      <h4 className="text-[20px] tracking-wider font-poppins font-semibold mb-6 ">
                        {item.name}
                      </h4>
                      <p className="leading-tight ">{item.description}</p>
                    </div>
                    <div className="flex flex-col flex-1 items-end translate-x-4 hover:-translate-x-0 transition-all duration-300">
                      <div className=" w-9 h-9 mb-[42px] text-3xl flex justify-center items-center">
                        {item.icon}
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
