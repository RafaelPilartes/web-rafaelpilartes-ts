import { motion } from 'framer-motion'
import { fadeUpAnimation } from '../../../lib/animations'
import { CertificateEntity } from '@/core/entities/portfolio/CertificateEntity'
import { HiOutlineExternalLink } from 'react-icons/hi'

type CertificateItemProps = {
  certificate: CertificateEntity
}

export const CertificateItem = ({ certificate }: CertificateItemProps) => {
  const { title, issued_by, issue_date, expiration_date, credential_url } =
    certificate

  const formatter = new Intl.DateTimeFormat('pt-PT', {
    month: 'short',
    year: 'numeric'
  })

  const formattedIssueDate = formatter.format(issue_date).replace(' de ', '/')
  const formattedExpDate = expiration_date
    ? formatter.format(expiration_date).replace(' de ', '/')
    : ''

  return (
    <motion.div
      className="p-5 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-accent/20 hover:bg-white/[0.05] transition-all group relative overflow-hidden"
      {...fadeUpAnimation}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-bl-full -z-10 group-hover:scale-150 transition-transform duration-500" />

      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-3">
        <h4 className="text-lg font-bold text-white group-hover:text-accent transition-colors">
          {title}
        </h4>
        <span className="text-xs font-medium text-accent bg-accent/10 px-3 py-1 rounded-full whitespace-nowrap">
          {formattedIssueDate} {formattedExpDate ? `- ${formattedExpDate}` : ''}
        </span>
      </div>

      <p className="text-sm text-gray-400 mb-4">{issued_by}</p>

      {credential_url && (
        <a
          href={credential_url}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-1.5 text-xs font-medium text-gray-400 hover:text-white transition-colors"
        >
          <HiOutlineExternalLink size={14} />
          <span>Ver Credencial</span>
        </a>
      )}
    </motion.div>
  )
}
