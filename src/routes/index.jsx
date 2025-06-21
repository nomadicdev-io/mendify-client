import { createFileRoute, redirect } from '@tanstack/react-router'
import LoginHeader from '@/components/layouts/LoginHeader'
import SignUpForm from '@/components/forms/SignUpForm'
import PoweredBy from '@/components/layouts/PoweredBy'
import { AnimatePresence } from 'motion/react'
import LoginForm from '../components/forms/LoginForm'
import ForgotPasswordForm from '../components/forms/ForgotPasswordForm'

export const Route = createFileRoute('/')({
  component: RouteComponent,
  beforeLoad: async ({context}) => {
    if(context.auth){
      throw redirect({to: '/dashboard', replace: true})
    }
  },
  head: ()=> ({
    meta: [
      {
        title: "Let's Start | Login to Mendify Admin"
      }
    ]
  })
})

function RouteComponent() {

  const search = Route.useSearch()

  return (
    <div className="relative flex flex-col items-center justify-center h-screen w-full overflow-hidden bg-slate-200/50">
      <div className="absolute bottom-0 right-0 w-[22.5%] h-auto aspect-[728/1028] pointer-events-none">
        <img src="/bg-shape.png" alt="Background shapw" className="w-full h-full object-contain" />
      </div>
      <div className="absolute top-0 left-0 w-[22.5%] h-auto aspect-[728/1028] pointer-events-none scale-x-[-1]">
        <img src="/bg-shape.png" alt="Background shapw" className="w-full h-full object-contain" />
      </div>
      <main className="relative flex-1 flex flex-col gap-10 items-center justify-center">
        <LoginHeader />
        <AnimatePresence mode={'wait'}>
          {
            search?.form === 'signup' ? 
            <SignUpForm key={'signup-form'}/>
            :
            search?.form === 'forgot-password' ?
            <ForgotPasswordForm key={'forgot-password-form'}/>
            :
            <LoginForm key={'login-form'}/>
          }
        </AnimatePresence>
        <PoweredBy />
      </main>
      
    </div>
  )
} 

