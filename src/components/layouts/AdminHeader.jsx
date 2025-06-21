import useSidebar from "@/hooks/useSidebar"
import { Button } from "../ui/button"
import { AlignLeft, BellRing, CalendarDays, CreditCard, FileText, FolderKey, LogOut, MessagesSquare, Search, Settings, User2 } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react";
import { BarLoader } from "react-spinners";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { atom, useAtom, useSetAtom } from "jotai";
import { RxCaretSort } from "react-icons/rx";
import { Input } from "../ui/input";
import { RiChatSmileAiLine } from "react-icons/ri";
import { useRouter } from "@tanstack/react-router";
import { toast } from "react-toastify";

const notificationSheetAtom = atom(false)

export default function AdminHeader() {

  const { isOpen, toggle } = useSidebar()

  return (
    <>
    <header className="relative w-full h-16 bg-white border-b border-gray-300 ps-5">
      <div className="flex items-center justify-between w-full h-full">
        <div className="flex items-center gap-2">
          {
            !isOpen ? 
            <Button onClick={toggle} size="icon" className="size-9" variant="shade">
              <AlignLeft />
            </Button>
            :
            null
          }
          <HeaderSearch />
        </div>

        <div className="flex items-center gap-4 h-full">

          <div className="flex items-center gap-3">
            <HeaderSchedules />
            <HeaderSettings />
            <HeaderChat />
            <HeaderNotifications />
          </div>

          <HeaderUser />
        </div>
      </div>
    </header>
    <NotificationSheet />
    </>
  )
}

function HeaderChat(){

  const router = useRouter()

  return (
    <div className="flex items-center gap-2">
      <Button onClick={()=> router.navigate({to: '/admin/chats'})} size="icon" variant="primaryIcon" className="size-9 hover:!bg-primary/5 hover:!border-primary/10">
      <RiChatSmileAiLine className="text-danger" />
      </Button>
    </div>
  )
}

function HeaderNotifications(){

  const setNotificationSheet = useSetAtom(notificationSheetAtom)

  return (
    <div className="flex items-center gap-2">
      <Button onClick={()=> setNotificationSheet(true)} size="icon" variant="primaryIcon" className="size-9 hover:!bg-amber-600/5 hover:!border-amber-600/10">
      <BellRing className="text-sky-700/75" />

      <span className="absolute top-1 right-1 w-[10px] h-[10px] bg-primary rounded-full"></span>
      </Button>
    </div>
  )
}

function HeaderSettings(){

  const router = useRouter()

  return (
    <div className="flex items-center gap-2">
    <Button onClick={()=> router.navigate({to: '/admin/settings'})} size="icon" variant="primaryIcon" className="size-9 hover:!bg-blue-500/5 hover:!border-blue-500/10">
      <Settings className="text-blue-600/75" />
    </Button>
    </div>
  )
}

function HeaderSchedules(){

  const router = useRouter()

  return (
    <div className="flex items-center gap-2">
    <Button onClick={()=> router.navigate({to: '/admin/schedules'})} size="icon" variant="primaryIcon" className="size-9 hover:!bg-teal-500/5 hover:!border-teal-500/10">
      <CalendarDays className="text-teal-600/65" />
    </Button>
    </div>
  )
}

function HeaderUser(){

  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const setNotificationSheet = useSetAtom(notificationSheetAtom)

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
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div className="flex items-center gap-3 h-full w-55 border-s border-gray-300 px-3 cursor-pointer transition-all duration-300 hover:bg-primary/7 group">
          <Avatar>
            <AvatarImage src="/user-avatar.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <p className="text-sm font-semibold leading-4 max-w-[10rem] truncate">Alan Sha Salim</p>
            <p className="text-xs font-medium text-gray-500">Admin</p>
          </div>
          <RxCaretSort size={24} className="text-gray-700 ms-1 group-hover:text-primary"/>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-55" align="start">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem key="/admin/account" onSelect={()=> router.navigate({to: '/admin/account'})}>
            <User2 className="w-2 h-2" />
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem key="/admin/notifications" onSelect={()=> {
            setNotificationSheet(true)
          }}>
            <BellRing className="w-2 h-2" />
            Notifications
          </DropdownMenuItem>
          <DropdownMenuItem key="/admin/chats" onSelect={()=> router.navigate({to: '/admin/chats'})}>
            <MessagesSquare className="w-2 h-2" />
            Chats
          </DropdownMenuItem>
          <DropdownMenuItem key="/admin/settings" onSelect={()=> router.navigate({to: '/admin/settings'})}>
            <Settings className="w-2 h-2" />
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuLabel>Development</DropdownMenuLabel>
          <DropdownMenuItem key="/admin/api-keys" onSelect={()=> router.navigate({to: '/admin/api-keys'})}>
            <FolderKey className="w-2 h-2" />
            API Keys
          </DropdownMenuItem>
          <DropdownMenuItem key="/admin/docs" onSelect={()=> router.navigate({to: '/admin/docs'})}>
            <FileText className="w-2 h-2" />
            Docs
          </DropdownMenuItem>
          <DropdownMenuItem key="/admin/payment" onSelect={()=> router.navigate({to: '/admin/payment'})}>
            <CreditCard className="w-2 h-2" />
            Payment
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem key="logout" onSelect={handleSignOut}>
          {
            isLoading ? 
            <BarLoader height={3} width={'100%'} color="#EF4852" />
            :
            <>
             <LogOut className="w-2 h-2 !text-primary" />
             Sign Out
             </>
          }
         
          
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>

  )
}

function NotificationSheet(){

  const [open, setOpen] = useAtom(notificationSheetAtom)

  return (
    <Sheet open={open} onOpenChange={setOpen}>
    <SheetContent>
      <SheetHeader>
        <SheetTitle>Are you absolutely sure?</SheetTitle>
        <SheetDescription>
          This action cannot be undone. This will permanently delete your account
          and remove your data from our servers.
        </SheetDescription>
      </SheetHeader>
    </SheetContent>
  </Sheet>
  )
}

function HeaderSearch(){

  return (
    <form action="/admin/work-orders?23123" className="flex items-center gap-2 relative">
      <Input type="text" placeholder="Search work orders..." className="min-w-[17.5rem] h-9 bg-white border border-gray-300 pe-9"/>
      <div className="absolute right-0 top-0 h-full aspect-square flex items-center justify-center z-10">
        <Search size={20} className="text-text/30" />
      </div>
    </form>
  )
}