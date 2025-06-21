import { createFileRoute, useRouter } from '@tanstack/react-router'
import PoweredBy from '@/components/layouts/PoweredBy'
import LoginHeader from '@/components/layouts/LoginHeader'
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';


export const Route = createFileRoute('/email-verified')({
  component: RouteComponent,
})

function RouteComponent() {

    const router = useRouter()

  return   (
    <div className="relative flex flex-col items-center justify-center h-screen w-full overflow-hidden bg-slate-200/50">
        <div className="absolute bottom-0 right-0 w-[22.5%] h-auto aspect-[728/1028] pointer-events-none">
            <img src="/bg-shape.png" alt="Background shapw" className="w-full h-full object-contain" />
        </div>
        <div className="absolute top-0 left-0 w-[22.5%] h-auto aspect-[728/1028] pointer-events-none scale-x-[-1]">
            <img src="/bg-shape.png" alt="Background shapw" className="w-full h-full object-contain" />
        </div>
        <main className="relative flex-1 flex flex-col gap-10 items-center justify-center">
            <LoginHeader />
            <div
                initial={{ opacity: 0, x: '50%' }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: '-50%' }}
                transition={{ duration: 0.3, type: 'tween' }}
                className="flex flex-col gap-5 w-[22.5rem] bg-white p-5 rounded-2xl shadow-2xl shadow-gray-300"
                >


            <div className="flex flex-col gap-2">
                    <img src="/verified-email.png" alt="Email Verification" className="w-full h-auto aspect-[16/7] object-contain my-8" />
                </div>

            <div className="flex flex-col items-center justify-center gap-1 mb-3  text-center">
                        <h2 className="text-2xl mb-3"><span className="text-success">Verified</span>, You'r email has been verified</h2>
                        <p className="text-base text-gray-500">You can now login to your account</p>
                        
                        <div className="w-full mt-5">
                        <Button className="w-full" variant="dark" onClick={() => router.navigate({to: '/', replace: true})}>Login Now <ArrowRight /></Button>
                        </div>
                    </div>


                </div>
            <PoweredBy />
        </main>
        
    </div>

  )
  
}
