import { motion } from 'framer-motion'
import { fadeIn } from '../../../../utils/variants'
import Avatar from '../../Avatar'

export default function HomeContentAvatar() {
  const myPhoto = '/rafaelPilarte.png'

  return (
    <motion.div
      variants={fadeIn('up', 0.3)}
      initial="hidden"
      animate="show"
      exit="hidden"
      transition={{ duration: 1, ease: 'easeInOut' }}
      className="w-full h-full max-w-[607px] max-h-[588px] absolute -bottom-32 lg:bottom-0 lg:right-[8%] "
    >
      <Avatar photoImage={myPhoto} />
    </motion.div>
  )
}
