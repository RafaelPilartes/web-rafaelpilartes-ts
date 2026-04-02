import { SectionTitle } from '../../../../components/main/SectionTitle'
import CustomersSlider from '../../CustomersSlider'

const customersData = {
  customers: [
    {
      photo: '/customers/Gusmapis.png',
      name: 'Divack da Silva',
      occupation: 'Cliente',
      createAt: '01 de Junho 2023',
      description:
        'Soluções abrangentes de marketing digital, desde estratégias de mídia social até campanhas de e-mail marketing'
    },
    {
      photo: '/customers/graceminds.png',
      name: 'Elissandra Zoe',
      occupation: 'Cliente',
      createAt: '01 de Junho 2023',
      description:
        'Através de uma abordagem estratégica, desenvolvemos uma identidade de marca coesa e autêntica'
    },
    {
      photo: '/customers/dunamis.png',
      name: 'Eros Nataniel',
      occupation: 'Cliente',
      createAt: '01 de Junho 2023',
      description:
        'Criam conteúdo persuasivo e envolvente que atrai, convence e transforma os visitantes em clientes'
    },
    {
      photo: '/customers/logo_Tchossy.png',
      name: 'Janeth Pilartes',
      occupation: 'Cliente',
      createAt: '01 de Junho 2023',
      description:
        'Aumente a visibilidade e a classificação do seu site nos mecanismos de busca com nosso serviço de SEO'
    }
  ]
}

export const HomeCustomers = () => {
  return (
    <section className="container py-16">
      <SectionTitle subtitle="clientes" title="Parceiros e clientes" />

      <div className="w-full gap-x-4 gap-y-6 mt-[60px] ">
        <div className="flex flex-col gap-x-8 ">
          {/* Slider */}
          <div className="w-full">
            <CustomersSlider customers={customersData.customers} />
          </div>
        </div>
      </div>
    </section>
  )
}
