
import { ChevronLeft, LogOut } from "lucide-react"
import { Button } from "../ui/button"
import useSidebar from "@/hooks/useSidebar"
import { Link, usePathname, useRouter } from "@tanstack/react-router"
import { useMemo, useState } from "react"
import { toast } from "react-toastify"
import { HashLoader } from "react-spinners"
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
  } from "@/components/ui/tooltip"
import { sidebarNav } from "@/store/nav"
import { cn } from "@/lib/utils"
import { IoMdLogOut } from "react-icons/io"

export default function AdminSidebar() {

    const { isOpen } = useSidebar()

    if(isOpen) return <MegaSidebar />
    return <MiniSidebar />

}

function MegaSidebar(){

    const {toggle} = useSidebar(false)

    return (
        <div className="w-[15rem] h-screen bg-white border-e border-gray-200 relative flex flex-col">
            <SidebarLogo onToggleSidebar={toggle} />
            <SidebarNav />
            <SidebarSignOut />
            
        </div>
    )
}

function MiniSidebar(){
    return (
        <div className="w-15 h-screen bg-white border-e border-gray-300 relative flex flex-col">
            <div className="flex items-center justify-between w-full h-16 border-b border-gray-300 aspect-square relative p-2">
                <Link to="/admin" className="block w-full flex-1 h-full relative">
                    <img src="/logo-icon.svg" alt="Mendify" className="object-contain object-left w-auto h-full" />
                </Link>
            </div>

            <MiniSidebarNav />

            <MiniSidebarSignOut />
        </div>
    )
}

function SidebarLogo({ onToggleSidebar }){
    
    return (    
        <div className="flex items-center justify-between w-full h-16 relative px-4 border-b border-gray-300">
            <Link to="/admin" className="block w-full flex-1 h-[40%] relative">
                <img src="/logo.svg" alt="Mendify" className="object-contain object-left w-auto h-full" />
            </Link>

            <Button onClick={onToggleSidebar} size="icon" className="size-8" variant="shade">
            <ChevronLeft />
            </Button>
        </div>
    )
}

function SidebarNav(){

    return (
        <div className="relative flex-1 w-full h-full py-4 overflow-y-scroll scrollbar-hide">
            <nav className="relative flex flex-col">
                {
                    sidebarNav.map((item, index) => (
                        <div key={`sidebar-nav-${index}`} className="relative w-full h-auto border-b border-gray-200 mb-4 pb-4 px-4 [&:last-child]:border-b-0">
                            <h3 className="text-sm px-2 font-normal text-slate-500/75 mb-2">{item.label}</h3>
                            <div className="relative flex flex-col gap-2">
                                {
                                    item.items.map((item) => (
                                        <SidebarNavItem key={item.id} item={item} index={index} />
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </nav>
        </div>
    )
}

function SidebarNavItem({ item, index }){
    return (
        <Link activeOptions={{exact: index === 0 ? true : false}} to={item.href} className={cn(
            "relative w-full h-auto flex gap-2 items-center px-3 py-2 rounded-lg transition-all duration-200 [&_svg]:size-5",
            "hover:bg-primary/10 hover:text-text/90 text-text/90 [&_svg]:text-slate-500/75 hover:[&_svg]:text-primary [&.active]:bg-gradient-to-br from-primary to-primary/80 [&.active]:text-white [&.active]:[&_svg]:text-white [&.active]:opacity-100"
        )}>
            {item.icon}
            <span className="text-base font-medium">{item.label}</span>
        </Link>
    )
}

function MiniSidebarNav(){

    return (
        <div className="relative flex-1 w-full h-full py-3 overflow-y-scroll scrollbar-hide">
            <nav className="relative flex flex-col">
                {
                    sidebarNav.map((item, index) => (
                        <div key={`sidebar-nav-${index}`} className="relative w-full h-auto border-b border-gray-300 mb-3 pb-3 px-3 [&:last-child]:border-b-0">
                            <div className="relative flex flex-col gap-2">
                                {
                                    item.items.map((item) => (
                                        <MiniSidebarNavItem key={item.id} item={item} index={index} />
                                    ))
                                }
                            </div>
                        </div>
                    ))
                }
            </nav>
        </div>
    )
}

function MiniSidebarNavItem({ item, index }){

    return (
        <Tooltip variant="secondary">
            <TooltipTrigger>
                <Link activeOptions={{exact: index === 0 ? true : false}} to={item.href} className={cn(
                    "relative w-full h-auto aspect-square flex gap-2 items-center justify-center rounded-lg transition-all duration-200 [&_svg]:w-5 [&_svg]:h-5",
                    "hover:bg-primary/10 hover:text-text/90 text-text/70 [&_svg]:text-slate-600/85 hover:[&_svg]:text-primary [&.active]:bg-gradient-to-br from-primary to-primary/80 [&.active]:text-white [&.active]:[&_svg]:text-white [&.active]:opacity-100"
                )}>
                    {item.icon}
                </Link>
            </TooltipTrigger>
            <TooltipContent side="right">
                {item.label}
            </TooltipContent>
        </Tooltip>
       
    )
}

function SidebarSignOut(){

    const [isLoading, setIsLoading] = useState(false)

    const handleSignOut = async() => {
        setIsLoading(true)
        try{
            console.log('sign out')
        }catch(error){
            console.log(error)
            toast.error(error.message)
        }finally{
            setIsLoading(false)
        }
    }

    return (
        <div className="relative w-full h-12  border-t border-gray-300">
            <button onClick={handleSignOut} title="Sign Out" aria-label="Sign Out" className="flex items-center gap-3 w-full h-full cursor-pointer text-text/70 px-8 hover:bg-text transition-all [&_svg]:w-5 [&_svg]:h-5 duration-300 [&_svg]:text-slate-600/85 hover:!text-white hover:[&_svg]:text-white">
                <IoMdLogOut className="size-4" />
                <span className="text-sm font-medium">Sign Out</span>
                {
                    isLoading && <HashLoader size={20} color="#EF4852" />
                }
            </button>
        </div>
    )
}

function MiniSidebarSignOut(){

    const [isLoading, setIsLoading] = useState(false)

    const handleSignOut = async() => {
        setIsLoading(true)
        try{
            console.log('sign out')
        }catch(error){
            console.log(error)
            toast.error(error.message)
        }finally{
            setIsLoading(false)
        }
    }

    return (
        <Tooltip variant="secondary">
            <TooltipTrigger disabled={isLoading} onClick={handleSignOut}>
                <div className="relative w-full h-12  border-t border-gray-300">
                    <span  title="Sign Out" aria-label="Sign Out" className="flex items-center  gap-3 w-full h-full cursor-pointer px-5 hover:bg-text hover:text-white transition-all duration-300 text-slate-600/85">                
                        {
                            isLoading ? <HashLoader size={20} color="#EF4852" /> : <IoMdLogOut className="size-5 " />
                        }
                    </span>
                </div>
            </TooltipTrigger>
            <TooltipContent side="right">
                Sign Out
            </TooltipContent>
        </Tooltip>
        
    )
}