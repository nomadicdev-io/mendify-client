import { routeTree } from './routeTree.gen'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import PageNotFound from '@components/layouts/PageNotFound'
import PageLoader from './components/loaders/PageLoader'
import { Toaster } from "@/components/ui/sonner"

// Router
const router = createRouter({
    routeTree,
    context: {
        authStore: null
    },
    scrollRestoration: true,
    defaultNotFoundComponent: PageNotFound,
    defaultPendingComponent: PageLoader,
})

export default function App() {
    return (
        <>
            <RouterProvider router={router} key="app-router" />
            <Toaster />
        </>
    )
}
