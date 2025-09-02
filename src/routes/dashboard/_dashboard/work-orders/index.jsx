import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_dashboard/work-orders/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/_dashboard/work-orders/"!</div>
}
