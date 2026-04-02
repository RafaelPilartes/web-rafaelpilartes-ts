import TestimonialsSlider from '../TestimonialsSlider'

const testimonialsData = {
  testimonial: [
    {
      photo: '/t-avt-1.png',
      name: 'Janeth Pilartes',
      occupation: 'Cliente',
      createAt: '01 de Junho 2023',
      description:
        'Desenvolvimento de websites criarão uma presença online única e envolvente para o seu negócio'
    },
    {
      photo: '/t-avt-2.png',
      name: 'Rosaria Jamba',
      occupation: 'Cliente',
      createAt: '01 de Junho 2023',
      description:
        'Criação de designs atraentes e criativos que ajudam a transmitir a mensagem da sua marca de forma única e memorável'
    },
    {
      photo: '/t-avt-3.png',
      name: 'Divack da Silva',
      occupation: 'Cliente',
      createAt: '01 de Junho 2023',
      description:
        'Soluções abrangentes de marketing digital, desde estratégias de mídia social até campanhas de e-mail marketing'
    },
    {
      photo: '/t-avt-2.png',
      name: 'Elissandra Zoe',
      occupation: 'Cliente',
      createAt: '01 de Junho 2023',
      description:
        'Através de uma abordagem estratégica, desenvolvemos uma identidade de marca coesa e autêntica'
    },
    {
      photo: '/t-avt-3.png',
      name: 'Eros Nataniel',
      occupation: 'Cliente',
      createAt: '01 de Junho 2023',
      description:
        'Criam conteúdo persuasivo e envolvente que atrai, convence e transforma os visitantes em clientes'
    },
    {
      photo: '/t-avt-2.png',
      name: 'Janeth Pilartes',
      occupation: 'Cliente',
      createAt: '01 de Junho 2023',
      description:
        'Aumente a visibilidade e a classificação do seu site nos mecanismos de busca com nosso serviço de SEO'
    }
  ]
}

export const TestimonialsSection = () => {
  return (
    <div className="w-full gap-x-4 gap-y-6 mt-[60px] ">
      <div className="flex flex-col gap-x-8 ">
        {/* Slider */}
        <div className="w-full">
          <TestimonialsSlider testimonials={testimonialsData.testimonial} />
        </div>
      </div>
    </div>
  )
}
