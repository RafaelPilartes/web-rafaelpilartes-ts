import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { routsNameMain } from '../data/routsName'
import RootLayout from '../Layout/RootLayout'
import FourOhFour from '../pages/404'
import Loading from '../pages/loading'
import Home from '../pages/main/home'
import About from '../pages/main/about/page'
import Services from '../pages/main/services/page'
import Projects from '../pages/main/work/page'
import ProjectDetails from '../pages/main/work/details/page'
import Testimonials from '../pages/main/testimonials/page'
import Contact from '../pages/main/contact/page'

// const Home = React.lazy(() => import('../pages/main/home'))

// type Props = {
//   children: JSX.Element
// }

// function PrivateLogin({ children }: Props) {
//   const user = null

//   if (user != null) {
//     return <Navigate to={'/'} />
//   }

//   return children
// }

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          {/* Home */}
          <Route
            index
            element={
              <React.Suspense fallback={<Loading />}>
                <Home />
              </React.Suspense>
            }
          />
          {/* About */}
          <Route
            path={routsNameMain.about}
            element={
              <React.Suspense fallback={<Loading />}>
                <About />
              </React.Suspense>
            }
          />
          {/* Services */}
          <Route
            path={routsNameMain.services}
            element={
              <React.Suspense fallback={<Loading />}>
                <Services />
              </React.Suspense>
            }
          />
          {/* Work */}
          <Route
            path={routsNameMain.works}
            element={
              <React.Suspense fallback={<Loading />}>
                <Projects />
              </React.Suspense>
            }
          />
          {/* Work details */}
          <Route
            path={routsNameMain.works_details}
            element={
              <React.Suspense fallback={<Loading />}>
                <ProjectDetails />
              </React.Suspense>
            }
          />
          {/* Testimonials */}
          <Route
            path={routsNameMain.testimonials}
            element={
              <React.Suspense fallback={<Loading />}>
                <Testimonials />
              </React.Suspense>
            }
          />
          {/* Contacts */}
          <Route
            path={routsNameMain.contacts}
            element={
              <React.Suspense fallback={<Loading />}>
                <Contact />
              </React.Suspense>
            }
          />

          <Route
            path="*"
            element={
              <React.Suspense fallback={<Loading />}>
                <FourOhFour />
              </React.Suspense>
            }
          />
        </Route>

        {/* Login */}
        {/* <Route
          path={routsNameMain.login}
          element={
            <React.Suspense fallback={<Loading />}>
              <PrivateLogin>
                <Login />
              </PrivateLogin>
            </React.Suspense>
          }
        /> */}
      </Routes>
    </BrowserRouter>
  )
}
