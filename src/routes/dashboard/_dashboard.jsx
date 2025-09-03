import { createFileRoute, Navigate, Outlet } from '@tanstack/react-router'
import AdminSidebar from '@/components/layouts/AdminSidebar'
import AdminHeader from '@/components/layouts/AdminHeader'
import Footer from '@/components/layouts/Footer'
import { PB } from '@/App'
import { useQuery } from '@tanstack/react-query'
import { toast } from 'react-toastify'
import { Router } from 'lucide-react'

export const Route = createFileRoute('/dashboard/_dashboard')({
  component: DashboardLayout,
})

function DashboardLayout() {

  const { isValid } = PB.authStore
  const context = Route.useRouteContext()

  const userQuery = useQuery({
    queryKey: ['user'],
    enabled: isValid === true,
    staleTime: 1000 * 60 * 5,
    initialData: PB.authStore.record,
    queryFn: async () => {
      try{
        const response = await PB.collection('admin').getOne(PB.authStore.record.id)
        return response
      }catch(error){
       toast.error(error.response.message || error.message || 'Something went wrong')
      }
    }
  })

  if(!isValid) {
    return <Navigate to="/" replace={true} />
  }

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
