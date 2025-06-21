import { routeTree } from './routeTree.gen'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import PageNotFound from '@components/layouts/PageNotFound'
import ToastProvider from '@/components/ui/ToastProvider'
import PageLoader from './components/loaders/PageLoader'
import { useSession } from './auth'

// Router
const router = createRouter({
    routeTree,
    context: {
      auth: null
    },
    scrollRestoration: true,
    defaultNotFoundComponent: PageNotFound,
    defaultPendingComponent: PageLoader,
})


export default function App() {

    const {data: session} = useSession()

    return (
        <>
            <RouterProvider context={{auth: session}} router={router} key="app-router" />
            <ToastProvider />
        </>
    )
}
