import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_dashboard/payments/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/_dashboard/payments/"!</div>
}
