import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_dashboard')({
  component: DashboardLayout,
  beforeLoad: ({context}) => {
    console.log(context)
    if(!context.auth){
      throw redirect({to: '/', replace: true})
    }
  },
  head: ()=> ({
    meta: [
      {
        title: 'Dashboard | Mendify Admin',
      }
    ]
  }),
})

function DashboardLayout() {
  return (
    <div>
       <Outlet />
    </div>
  )
}
