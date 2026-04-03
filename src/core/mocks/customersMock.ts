import { CustomerEntity } from '@/core/entities/content/CustomerEntity'

export const mockCustomers: CustomerEntity[] = [
  new CustomerEntity({
    id: 'cust-1',
    photo: '/customers/Gusmapis.png',
    name: 'Gusmapis',
    occupation: 'Cliente',
    description:
      'Soluções abrangentes de marketing digital, desde estratégias de mídia social até campanhas de e-mail marketing'
  }),
  new CustomerEntity({
    id: 'cust-2',
    photo: '/customers/graceminds.png',
    name: 'Grace Minds',
    occupation: 'Cliente',
    description:
      'Através de uma abordagem estratégica, desenvolvemos uma identidade de marca coesa e autêntica'
  }),
  new CustomerEntity({
    id: 'cust-3',
    photo: '/customers/dunamis.png',
    name: 'Dunamis',
    occupation: 'Cliente',
    description:
      'Criam conteúdo persuasivo e envolvente que atrai, convence e transforma os visitantes em clientes'
  }),
  new CustomerEntity({
    id: 'cust-4',
    photo: '/customers/logo_Tchossy.png',
    name: 'Tchossy',
    occupation: 'Cliente',
    description:
      'Aumente a visibilidade e a classificação do seu site nos mecanismos de busca com nosso serviço de SEO'
  })
]
