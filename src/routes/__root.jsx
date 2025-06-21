import { HeadContent, Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PageNotFound from '@components/layouts/PageNotFound'
import { isMobile } from 'react-device-detect';
import RootLayout from '@components/layouts/RootLayout'
import { authClient } from '../auth'

const queryClient = new QueryClient()

export const Route = createRootRouteWithContext()({
  component: RootLayoutComponent,
  loader: async ({context}) => {
    try{
      const session = await authClient.getSession()
      console.log(session)
      if(session.error){
        context.auth = null
        return false
      }
      context.auth = session.data
      return true
    }catch(error){
      console.log(error)
    }
  },
  head: ()=> ({
    meta: [
      {
        title: 'Dashboard | Mendify Admin',
      }
    ]
  }),
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
