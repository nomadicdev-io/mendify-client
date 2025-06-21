import { HeadContent, Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PageNotFound from '@components/layouts/PageNotFound'
import { isMobile } from 'react-device-detect';
import RootLayout from '@components/layouts/RootLayout'

const queryClient = new QueryClient()

export const Route = createRootRouteWithContext()({
  component: RootLayoutComponent,
  beforeLoad: async ({context}) => {
    const session = await getSession()
    console.log('Root', session)
    if(session.error){
      context.auth = null
      return false
    }
    context.auth = session.data
    return true
  },
  notFoundComponent: PageNotFound
})


function RootLayoutComponent() {

  return (
    <QueryClientProvider client={queryClient}>
      <HeadContent />
      <RootLayout>
        {
          isMobile ? <></> : <Outlet />
        }
        {
          import.meta.env.VITE_DEBUG === 'true' && (
            <>
              <TanStackRouterDevtools />
              <ReactQueryDevtools /> 
            </>
          )
        }
      </RootLayout>
    </QueryClientProvider>
  )
}
