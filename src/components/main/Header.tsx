import { Link } from 'react-router-dom'

export const Header = () => {
  return (
    <header className="absolute top-0 z-10 h-24 w-full flex items-center justify-center">
      <div className="container flex items-center justify-between">
        <Link to="/">
          <img
            width={204}
            height={177}
            src="/images/Rafael_white.svg"
            alt="Rafael Pilartes Dev"
          />
        </Link>

        <nav className="flex items-center gap-4 sm:gap-10">
          {/* {NAV_ITEMS.map(item => (
            <NavItem {...item} key={item.label} />
          ))} */}
        </nav>
      </div>
    </header>
  )
}
