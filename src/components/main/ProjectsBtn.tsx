import { HiArrowRight } from 'react-icons/hi2'
import { Link } from 'react-router-dom'

const ProjectsBtn = () => {
  return (
    <div className="mx-auto xl:mx-0">
      <Link
        to={'work'}
        className="relative w-[185] h-[185] flex justify-center items-center bg-circles bg-cover bg-no-repeat group"
      >
        <img
          src={'/rounded-text.png'}
          width={141}
          height={148}
          alt="Rafael Pilartes"
          className="animate-spin-slow w-full h-full max-w-[141] max-h-[141]  "
        />
        <HiArrowRight className="absolute text-4xl group-hover:translate-x-2 transition-all duration-300  " />
      </Link>
    </div>
  )
}

export default ProjectsBtn
