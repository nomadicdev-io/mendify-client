import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_dashboard/clients/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/dashboard/_dashboard/clients/"!</div>
}
