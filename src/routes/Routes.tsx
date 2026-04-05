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
import Blog from '../pages/main/blog/page'
import BlogDetails from '../pages/main/blog/details/page'
import Contact from '../pages/main/contact/page'

// Admin
import { AdminAuthGuard } from '@/components/admin/ui/AdminAuthGuard'
import { DashboardLayout } from '@/components/admin/layout/DashboardLayout'

const AdminLoginPage = React.lazy(() => import('@/pages/admin/login'))
const AdminDashboardPage = React.lazy(() => import('@/pages/admin/dashboard'))
const BlogPostsPage = React.lazy(() => import('@/pages/admin/blog/index'))
const BlogPostFormPage = React.lazy(() => import('@/pages/admin/blog/form'))
const BlogCategoriesPage = React.lazy(
  () => import('@/pages/admin/blog/categories')
)
const AdminProjectsPage = React.lazy(
  () => import('@/pages/admin/portfolio/projects')
)
const TechnologiesPage = React.lazy(
  () => import('@/pages/admin/portfolio/technologies')
)
const CertificatesPage = React.lazy(
  () => import('@/pages/admin/portfolio/certificates')
)
const ExperiencesPage = React.lazy(
  () => import('@/pages/admin/portfolio/experiences')
)
const AdminServicesPage = React.lazy(
  () => import('@/pages/admin/content/services')
)
const TestimonialsPage = React.lazy(
  () => import('@/pages/admin/content/testimonials')
)
const CustomersPage = React.lazy(
  () => import('@/pages/admin/content/customers')
)
const QualitiesPage = React.lazy(
  () => import('@/pages/admin/content/qualities')
)
const AdminsPage = React.lazy(() => import('@/pages/admin/admins/index'))
const SettingsPage = React.lazy(() => import('@/pages/admin/settings'))

function AdminLoading() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <div
        className="w-8 h-8 border-2 border-t-transparent rounded-full animate-spin"
        style={{ borderColor: '#F13024', borderTopColor: 'transparent' }}
      />
    </div>
  )
}

export function Router() {
  return (
    <BrowserRouter>
      <Routes>
        {/* =================== PUBLIC SITE =================== */}
        <Route path="/" element={<RootLayout />}>
          <Route
            index
            element={
              <React.Suspense fallback={<Loading />}>
                <Home />
              </React.Suspense>
            }
          />
          <Route
            path={routsNameMain.about}
            element={
              <React.Suspense fallback={<Loading />}>
                <About />
              </React.Suspense>
            }
          />
          <Route
            path={routsNameMain.services}
            element={
              <React.Suspense fallback={<Loading />}>
                <Services />
              </React.Suspense>
            }
          />
          <Route
            path={routsNameMain.works}
            element={
              <React.Suspense fallback={<Loading />}>
                <Projects />
              </React.Suspense>
            }
          />
          <Route
            path={routsNameMain.works_details}
            element={
              <React.Suspense fallback={<Loading />}>
                <ProjectDetails />
              </React.Suspense>
            }
          />
          <Route
            path={routsNameMain.blog}
            element={
              <React.Suspense fallback={<Loading />}>
                <Blog />
              </React.Suspense>
            }
          />
          <Route
            path={routsNameMain.blog_details}
            element={
              <React.Suspense fallback={<Loading />}>
                <BlogDetails />
              </React.Suspense>
            }
          />
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

        {/* =================== ADMIN =================== */}

        {/* Login (outside guard) */}
        <Route
          path="/admin/login"
          element={
            <React.Suspense fallback={<AdminLoading />}>
              <AdminLoginPage />
            </React.Suspense>
          }
        />

        {/* Protected dashboard */}
        <Route
          path="/admin"
          element={
            <AdminAuthGuard>
              <DashboardLayout />
            </AdminAuthGuard>
          }
        >
          {/* Dashboard Home */}
          <Route
            index
            element={
              <React.Suspense fallback={<AdminLoading />}>
                <AdminDashboardPage />
              </React.Suspense>
            }
          />

          {/* Blog */}
          <Route
            path="blog"
            element={
              <React.Suspense fallback={<AdminLoading />}>
                <BlogPostsPage />
              </React.Suspense>
            }
          />
          <Route
            path="blog/new"
            element={
              <React.Suspense fallback={<AdminLoading />}>
                <BlogPostFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="blog/:id/edit"
            element={
              <React.Suspense fallback={<AdminLoading />}>
                <BlogPostFormPage />
              </React.Suspense>
            }
          />
          <Route
            path="categories"
            element={
              <React.Suspense fallback={<AdminLoading />}>
                <BlogCategoriesPage />
              </React.Suspense>
            }
          />

          {/* Portfolio */}
          <Route
            path="projects"
            element={
              <React.Suspense fallback={<AdminLoading />}>
                <AdminProjectsPage />
              </React.Suspense>
            }
          />
          <Route
            path="technologies"
            element={
              <React.Suspense fallback={<AdminLoading />}>
                <TechnologiesPage />
              </React.Suspense>
            }
          />
          <Route
            path="certificates"
            element={
              <React.Suspense fallback={<AdminLoading />}>
                <CertificatesPage />
              </React.Suspense>
            }
          />
          <Route
            path="experiences"
            element={
              <React.Suspense fallback={<AdminLoading />}>
                <ExperiencesPage />
              </React.Suspense>
            }
          />

          {/* Content */}
          <Route
            path="services"
            element={
              <React.Suspense fallback={<AdminLoading />}>
                <AdminServicesPage />
              </React.Suspense>
            }
          />
          <Route
            path="testimonials"
            element={
              <React.Suspense fallback={<AdminLoading />}>
                <TestimonialsPage />
              </React.Suspense>
            }
          />
          <Route
            path="customers"
            element={
              <React.Suspense fallback={<AdminLoading />}>
                <CustomersPage />
              </React.Suspense>
            }
          />
          <Route
            path="qualities"
            element={
              <React.Suspense fallback={<AdminLoading />}>
                <QualitiesPage />
              </React.Suspense>
            }
          />

          {/* System */}
          <Route
            path="admins"
            element={
              <React.Suspense fallback={<AdminLoading />}>
                <AdminsPage />
              </React.Suspense>
            }
          />
          <Route
            path="settings"
            element={
              <React.Suspense fallback={<AdminLoading />}>
                <SettingsPage />
              </React.Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
