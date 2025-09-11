import { HeadContent, Outlet, createRootRouteWithContext } from '@tanstack/react-router'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import PageNotFound from '@components/layouts/PageNotFound'
import RootLayout from '@components/layouts/RootLayout'
import { Toaster } from "@/components/ui/sonner"
import mendify from '@/api'
import { Provider } from 'jotai'
import { authStore } from '@/api'

const queryClient = new QueryClient()

export const Route = createRootRouteWithContext()({
  component: RootLayoutComponent,
  notFoundComponent: PageNotFound,
  beforeLoad: async ({context}) => {
    try{
      await mendify.initialize({
        onSuccess: (data) => {
          context.authStore = data;
        },
        onError: (error) => {
          console.log(error);
        }
      });
      return true;
    }catch(error){
      console.error(error);
      return null;
    }
  },
  
})

function RootLayoutComponent() {

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={authStore}>
      <HeadContent />
      <RootLayout>
        <Outlet />
        {
          import.meta.env.VITE_DEBUG === 'true' && (
            <>
              <TanStackRouterDevtools />
              <ReactQueryDevtools /> 
            </>
          )
        }
        <Toaster />
      </RootLayout>
      </Provider>
    </QueryClientProvider>
  )
}
