import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_dashboard')({
  component: DashboardLayout,
  beforeLoad: ({context}) => {
    if(!context.auth){
      throw redirect({to: '/', replace: true})
    }
  }
})

function DashboardLayout() {
  return (
    <div>
       <Outlet />
    </div>
  )
}
