import { createFileRoute, redirect, Outlet } from '@tanstack/react-router'

export const Route = createFileRoute('/_auth')({
  component: RouteComponent,
  beforeLoad: async ({context}) => {
    if(context?.authStore?.isAuthenticated){
      return redirect({to: '/dashboard', replace: true})
    }
  }
})

function RouteComponent() {
  return <Outlet />
}
