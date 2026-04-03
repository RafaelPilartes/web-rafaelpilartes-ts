import {
  HiHome,
  HiUser,
  HiRectangleGroup,
  HiViewColumns,
  HiDocumentText,
  HiEnvelope
} from 'react-icons/hi2'
import { Link, useLocation } from 'react-router-dom'
import { routsNameMain } from '../../data/routsName'

interface navDataInterface {
  name: string
  path: string
  icon: JSX.Element
}
//  Nav Data
const navData = [
  { name: 'Inicio', path: routsNameMain.home, icon: <HiHome /> },
  { name: 'Sobre', path: routsNameMain.about, icon: <HiUser /> },
  {
    name: 'Serviços',
    path: routsNameMain.services,
    icon: <HiRectangleGroup />
  },
  { name: 'Trabalhos', path: routsNameMain.works, icon: <HiViewColumns /> },
  {
    name: 'Blog',
    path: routsNameMain.blog,
    icon: <HiDocumentText />
  },
  {
    name: 'Contactos',
    path: routsNameMain.contacts,
    icon: <HiEnvelope />
  }
]

const Nav = () => {
  const { pathname } = useLocation()

  return (
    <nav className="flex flex-col items-center xl:justify-center gap-y-4 fixed h-max bottom-0 mt-auto xl:right-[2%] z-50 top-0 w-full xl:w-16 xl:max-w-md xl:h-screen">
      {/* Inner */}
      <div className="flex w-full xl:flex-col items-center justify-between xl:justify-center gap-y-10 px-4 md:px-40 xl:px-0 h-[70px] xl:h-max py-8 bg-white/10 backdrop-blur-sm text-3xl xl:text-xl xl:rounded-full ">
        {navData.map((link: navDataInterface, index: number) => {
          return (
            <Link
              className={`${
                link.path === pathname && 'text-accent'
              } relative flex items-center group hover:text-accent transition-all duration-300`}
              key={index}
              to={link.path}
            >
              {/* tooltip */}
              <div
                className="absolute pr-14 right-[-12px] opacity-0
              pointer-events-none transition-all duration-300 xl:group-hover:opacity-100 xl:group-hover:right-0"
              >
                <div className="bg-white relative flex text-primary items-center p-[6px] rounded-[3px]">
                  <div className="text-[12px] leading-none font-semibold capitalize">
                    {link.name}
                  </div>

                  {/* triangle */}
                  <div className="border-solid border-l-white border-l-8 border-y-transparent border-y-[6px] border-r-0 absolute -right-2"></div>
                </div>
              </div>
              {link.icon}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}

export default Nav
