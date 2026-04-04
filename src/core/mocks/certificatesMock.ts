import { CertificateEntity } from '@/core/entities/portfolio/CertificateEntity'

export const mockCertificates: CertificateEntity[] = [
  new CertificateEntity({
    id: 'cert-1',
    title: 'Advanced Certified Web Developer',
    issued_by: 'ABC University, LA, CA',
    issue_date: '2021-05-15',
    expiration_date: '2025-05-15',
    credential_id: 'ABC-2021-987654',
    credential_url: 'https://abc-university.example.com/verify/987654',
    image: { url: '/certificates/web-dev.png' },
    description: {
      raw: 'Specialized in modern stack web development, performance optimization and scalable architectures.'
    }
  }),
  new CertificateEntity({
    id: 'cert-2',
    title: 'Postgraduate Diploma in Cloud Computing',
    issued_by: 'AV Technical Institute',
    issue_date: '2019-11-01',
    credential_id: 'AV-CLOUD-32091',
    credential_url: 'https://av-institute.example.com/certs/32091',
    image: { url: '/certificates/cloud-diploma.png' },
    description: {
      raw: 'Deep dive into serverless ecosystems, Docker containers, and fully managed cloud infrastructure.'
    }
  }),
  new CertificateEntity({
    id: 'cert-3',
    title: 'Certified UI/UX Professional',
    issued_by: 'Design Institute, Los Angeles, CA',
    issue_date: '2018-08-20',
    expiration_date: '2030-08-20',
    credential_id: 'UX-PRO-5544',
    credential_url:
      'https://design-institute.example.com/verify?id=UX-PRO-5544',
    image: { url: '/certificates/ui-ux-pro.png' },
    description: {
      raw: 'Mastery in creating engaging user experiences and high-fidelity prototypes.'
    }
  })
]
