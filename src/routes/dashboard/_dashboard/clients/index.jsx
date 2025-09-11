import { createFileRoute } from '@tanstack/react-router'
import DashboardBanner from '../../../../components/layouts/DashboardBanner'

export const Route = createFileRoute('/dashboard/_dashboard/clients/')({
  component: RouteComponent,
})

function RouteComponent() {

  const breadcrumb = [
    {
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      label: 'Clients',
      href: '/dashboard/clients',
    },
  ]

  return (
    <div className="relative flex-1 flex flex-col w-full h-full">

      <DashboardBanner title="Manage Clients" breadcrumb={breadcrumb} />

    </div>
  )
}
