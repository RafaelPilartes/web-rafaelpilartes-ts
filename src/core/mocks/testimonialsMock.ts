import { TestimonialEntity } from '@/core/entities/content/TestimonialEntity'

export const mockTestimonials: TestimonialEntity[] = [
  new TestimonialEntity({
    id: 'test-1',
    photo: '/t-avt-1.png',
    name: 'Janeth Pilartes',
    occupation: 'Cliente',
    created_at: '2023-06-01',
    description:
      'Desenvolvimento de websites criarão uma presença online única e envolvente para o seu negócio'
  }),
  new TestimonialEntity({
    id: 'test-2',
    photo: '/t-avt-2.png',
    name: 'Rosaria Jamba',
    occupation: 'Cliente',
    created_at: '2023-06-01',
    description:
      'Criação de designs atraentes e criativos que ajudam a transmitir a mensagem da sua marca de forma única e memorável'
  }),
  new TestimonialEntity({
    id: 'test-3',
    photo: '/t-avt-3.png',
    name: 'Divack da Silva',
    occupation: 'Cliente',
    created_at: '2023-06-01',
    description:
      'Soluções abrangentes de marketing digital, desde estratégias de mídia social até campanhas de e-mail marketing'
  }),
  new TestimonialEntity({
    id: 'test-4',
    photo: '/t-avt-2.png',
    name: 'Elissandra Zoe',
    occupation: 'Cliente',
    created_at: '2023-06-01',
    description:
      'Através de uma abordagem estratégica, desenvolvemos uma identidade de marca coesa e autêntica'
  }),
  new TestimonialEntity({
    id: 'test-5',
    photo: '/t-avt-3.png',
    name: 'Eros Nataniel',
    occupation: 'Cliente',
    created_at: '2023-06-01',
    description:
      'Criam conteúdo persuasivo e envolvente que atrai, convence e transforma os visitantes em clientes'
  }),
  new TestimonialEntity({
    id: 'test-6',
    photo: '/t-avt-2.png',
    name: 'Carlos Mendes',
    occupation: 'Parceiro',
    created_at: '2023-07-15',
    description:
      'Aumente a visibilidade e a classificação do seu site nos mecanismos de busca com nosso serviço de SEO'
  })
]
