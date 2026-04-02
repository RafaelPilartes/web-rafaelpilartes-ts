import TopLeftImg from '../components/main/TopLeftImg'
import { Header } from '../components/main/Header'
import { BackToTop } from '../components/main/BackToTop'
import Nav from '../components/main/Nav'
import { Footer } from '../components/main/Footer'
import { motion } from 'framer-motion'
import Transition from '../components/main/Transition'
import { Outlet, useLocation } from 'react-router-dom'

function RootLayout() {
  const { key } = useLocation()
  const pathNameKey = key

  return (
    <main className="text-white bg-cover bg-no-repeat font-poppins ">
      {/* <Toaster /> */}

      <TopLeftImg />
      <Header />
      <motion.div key={pathNameKey} className="h-full">
        <Transition />
        <Outlet />
      </motion.div>
      <BackToTop />
      <Nav />
      {/* <ContactForm /> */}
      <Footer />
    </main>
  )
}

export default RootLayout
