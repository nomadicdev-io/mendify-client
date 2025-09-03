import { routeTree } from './routeTree.gen'
import { createRouter, RouterProvider } from '@tanstack/react-router'
import PageNotFound from '@components/layouts/PageNotFound'
import ToastProvider from '@/components/ui/ToastProvider'
import PageLoader from './components/loaders/PageLoader'
import axios from 'axios'
import PocketBase from 'pocketbase';

axios.defaults.baseURL = import.meta.env.VITE_API_URL

// PocketBase
export const PB = new PocketBase(import.meta.env.VITE_PB_URL);

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
    return (
        <>
            <RouterProvider router={router} key="app-router" />
            <ToastProvider />
        </>
    )
}
