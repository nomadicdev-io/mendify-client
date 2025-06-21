import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_dashboard/')({
  component: Dashboard,
  loader: ()=> {
    setTimeout(() => {
      return {
        message: 'Hello'
      }
    }, 10000)
  }
})

function Dashboard() {
  return (
    <div>
        <h1>Dashboard</h1>
    </div>
  )
}
