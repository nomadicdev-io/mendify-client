import { routeTree } from './routeTree.gen'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import PageNotFound from '@components/layouts/PageNotFound'
import PageLoader from './components/loaders/PageLoader'
import PocketBase from 'pocketbase';
import { Toaster } from "@/components/ui/sonner"
// PocketBase
export const PB = new PocketBase(import.meta.env.VITE_PB_URL);

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
