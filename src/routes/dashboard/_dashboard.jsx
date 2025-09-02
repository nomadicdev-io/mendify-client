import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router'
import AdminSidebar from '@/components/layouts/AdminSidebar'
import AdminHeader from '@/components/layouts/AdminHeader'
import Footer from '@/components/layouts/Footer'
import { PB } from '@/App'

export const Route = createFileRoute('/dashboard/_dashboard')({
  component: DashboardLayout,
})

function DashboardLayout() {

  const { isValid } = PB.authStore

  if(!isValid) {
    return <Navigate to="/" replace={true} />
  }

  return (
    <div className="relative flex w-full h-screen overflow-hidden">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <AdminHeader />
          <main className="flex-1 flex flex-col items-center justify-center w-full h-full overflow-y-scroll scrollbar-hide relative">
            <Outlet />
          </main>
          <Footer />
        </div>
    </div>
  )
}
