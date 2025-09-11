import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import AdminSidebar from '@/components/layouts/AdminSidebar'
import AdminHeader from '@/components/layouts/AdminHeader'
import Footer from '@/components/layouts/Footer'

export const Route = createFileRoute('/dashboard/_dashboard')({
  component: DashboardLayout,
  beforeLoad: async ({context}) => {
    if(!context?.authStore?.isAuthenticated){
      return redirect({to: '/', replace: true})
    }
  }
})

function DashboardLayout() {

  return (
    <div className="relative flex w-full h-screen overflow-hidden">
        <AdminSidebar />
        <div className="flex-1 flex flex-col">
          <AdminHeader />
          <main className="flex-1 flex flex-col w-full h-full overflow-y-scroll scrollbar-hide relative">
            <Outlet />
          </main>
          <Footer />
        </div>
    </div>
  )
}
