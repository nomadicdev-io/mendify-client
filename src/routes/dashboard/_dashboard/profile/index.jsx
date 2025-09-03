import { createFileRoute, useRouter } from '@tanstack/react-router'
import DashboardBanner from '../../../../components/layouts/DashboardBanner'
import { PB } from '../../../../App'
import { Frown, ImageUp, Lock, PencilIcon, SquarePen, Key } from 'lucide-react'
import { useState } from 'react'
import { toast } from 'sonner'
import { GridLoader } from 'react-spinners'
import { useQueryClient } from '@tanstack/react-query'
import { Button } from '../../../../components/ui/button'
import { atom, useAtomValue, useSetAtom } from 'jotai'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { InputField } from '../../../../components/ui/FormComponent'
import { useForm } from '@tanstack/react-form'
import validator from 'validator'
import userActivityLog from '../../../../lib/userActivityLog'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

const editProfileAtom = atom(false)
const changePasswordAtom = atom(false)
const deleteAccountAtom = atom(false)

export const Route = createFileRoute('/dashboard/_dashboard/profile/')({
  component: RouteComponent,
})

function RouteComponent() {


  const breadcrumb = [
    {
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      label: 'Profile',
      href: '/dashboard/profile',
    },
  ]

  const queryClient = useQueryClient()
  const data = queryClient.getQueryData(['user'])
  const setEditProfile = useSetAtom(editProfileAtom)
  const setChangePassword = useSetAtom(changePasswordAtom)
  const setDeleteAccount = useSetAtom(deleteAccountAtom)

  const [loading, setLoading] = useState(false)

  const handleImageChange = async (e) => {
    setLoading(true)
    try{
      const file = e.target.files[0]
      if(!file) return

      const size = file.size / 1024 / 1024
      if(size > 2) return toast.error('Image size must be less than 2MB')

      const formData = new FormData()
      formData.append('avatar', file)

      const response = await PB.collection('admin').update(data.id, formData)
      console.log(response)
      await queryClient.refetchQueries( ['user'] )
      toast.success('Image updated successfully')
    }catch(error){
      console.log(error)
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  }

  if(data) return (
    <>
    <div className="relative flex-1 flex flex-col w-full h-full">

      <DashboardBanner title="My Profile" breadcrumb={breadcrumb} />

   
        <div className="relative w-full h-full p-6 grid grid-cols-[0.2fr_1fr] gap-8">

        <div className="relative w-full h-full  flex flex-col gap-4">
          
          <div className="w-full flex items-center justify-center p-4 bg-slate-50 rounded-2xl relative border border-slate-200">
            <div className="w-full h-auto aspect-square relative rounded-xl overflow-hidden border border-slate-200 group">
              {
                data.avatar?.length ?
                <img src={`${import.meta.env.VITE_PB_URL}/api/files/${data.collectionId}/${data.id}/${data.avatar}`} alt="Profile" className="w-full h-full object-cover" />
                :
                <h2 className="font-semibold uppercase bg-slate-100 text-[5rem] text-slate-500 flex items-center justify-center w-full h-full" >{data.name.split('').slice(0, 2).join('')}</h2>
              }

              <div className="absolute inset-0 bg-white/80 flex items-center justify-center cursor-pointer group-hover:opacity-100 opacity-0 transition-all duration-300">
                <ImageUp size={80} className="text-primary/90"/>
              </div>

              <input type="file" className="absolute inset-0 opacity-0 z-10 cursor-pointer" onChange={handleImageChange} accept="image/*" />
              
            </div>

            {loading && (
              <div className="absolute inset-0 bg-white/90 flex items-center justify-center z-20">
                <GridLoader size={18} color="#242424" />
              </div>
            )}
          </div>

          <div className="w-full flex flex-col relative border border-gray-200 rounded-2xl">
            <div className="relative w-full border-b border-gray-200 px-4 py-3">
              <p className="text-xs font-medium text-gray-500">Name</p>
              <p className="text-sm font-semibold">{data.name}</p>
            </div>
            <div className="relative w-full border-b border-gray-200 px-4 py-3">
              <p className="text-xs font-medium text-gray-500">Email</p>
              <p className="text-sm font-semibold">{data.email}</p>
            </div>
            <div className="relative w-full px-4 py-3">
              <p className="text-xs font-medium text-gray-500">Role</p>
              <p className="text-sm font-semibold capitalize">{data.role}</p>
            </div>
          </div>

          <div className="w-full flex flex-col gap-2">
          <Button type="button" className="w-full" variant="dark" onClick={() => setEditProfile(true)}>Edit Profile</Button> 
          <Button type="button" className="w-full" variant="border" onClick={() => setChangePassword(true)}>Change Password</Button> 
          <Button type="button" className="w-full" variant="dangerOutline" onClick={() => setDeleteAccount(true)}>Delete Account</Button> 
          </div>


        </div>

        <ActivityLogs data={data} />

      </div>

     
   
    

    </div>
     <EditProfile data={data} />
     <ChangePassword data={data} />
     <DeleteAccount data={data} />
     </>
  )
}


function EditProfile({data}) {

  const isVisible = useAtomValue(editProfileAtom)
  const setEditProfile = useSetAtom(editProfileAtom)
  const [loading, setLoading] = useState(false)
  const queryClient = useQueryClient()

  const form = useForm({
    defaultValues: {
      name: data.name,
      email: data.email,
    },
    onSubmit: async ({value}) => {
      setLoading(true)
      try{
        await PB.collection('admin').update(data.id, value)
        await queryClient.refetchQueries(['user'])
        toast.success('Profile updated successfully')
        setEditProfile(false)
      }catch(error){
        console.log(error)
        toast.error(error.message)
      }finally{
        setLoading(false)
      }
    }
  })

  return (
    <Dialog  open={isVisible} onOpenChange={setEditProfile}>
      <DialogContent className="bg-white border border-gray-200 p-0 gap-0">
        <DialogHeader className="border-b border-gray-200 p-5">
          <DialogTitle className="flex items-center gap-2"> <SquarePen className="w-4 h-4 text-primary" /> Edit Profile</DialogTitle>
          <DialogDescription className="text-gray-500">
            Edit your profile information.
          </DialogDescription>

    
        </DialogHeader>

        <form 
          onSubmit={(e)=> {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className="grid grid-cols-2 gap-4 p-5">
            <form.Field
              name="name"
              validators={{
                onSubmit: ({ value }) => value.length < 3 ? 'Name must be at least 3 characters' : value.length > 255 ? 'Name must be less than 255 characters' : undefined,
              }}
              children={(field) => (
                <InputField
                  label="Name"
                  name="name"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            />
            <form.Field
              name="email"
              validators={{
                onSubmit: ({ value }) => !validator.isEmail(value) ? 'Invalid email address' : value.length < 3 ? 'Email must be at least 3 characters' : value.length > 255 ? 'Email must be less than 255 characters' : undefined,
              }}
              children={(field) => (
                <InputField
                  label="Email"
                  name="email"
                  disabled
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                />
              )}
            />
            <div className="col-span-2 flex items-center justify-start gap-2 mt-2">
              <Button type="button" variant="border" onClick={() => setEditProfile(false)}>Cancel</Button>
              <Button isLoading={loading} type="submit" variant="dark">Save</Button>
            </div>
          </form>
      </DialogContent>
    </Dialog>
  )
}

function ChangePassword({data}) { 

  const isVisible = useAtomValue(changePasswordAtom)
  const setChangePassword = useSetAtom(changePasswordAtom)
  const [loading, setLoading] = useState(false)

  const form = useForm({
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
    onSubmit: async ({value}) => {
      setLoading(true)
      try{
        console.log(value)
        await PB.collection('admin').update(data.id, value)
        toast.success('Password changed successfully')
        setChangePassword(false)
      }catch(error){
        console.log(error)
        toast.error(error.message)
      }finally{
        setLoading(false)
      }
    }
  })

  return (
    <Dialog open={isVisible} onOpenChange={setChangePassword}>
      <DialogContent className="bg-white border border-gray-200 p-0 gap-0">
        <DialogHeader className="border-b border-gray-200 p-5">
          <DialogTitle className="flex items-center justify-start gap-2"><Lock className="w-4 h-4 text-primary" /> Change Password</DialogTitle>
          <DialogDescription>
            Change your password.
          </DialogDescription>
        </DialogHeader>
        <form 
          onSubmit={(e)=> {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className="grid grid-cols-2 gap-4 p-5">

          <form.Field
            name="password"
            validators={{
              onSubmit: ({ value }) => value.length < 3 ? 'Password must be at least 3 characters' : value.length > 255 ? 'Password must be less than 255 characters' : undefined,
            }}
            children={(field) => (
              <InputField
                label="New Password"
                name="password"
                type="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                errorMessage={field.state.meta.errors.join(', ')}
                isError={field.state.meta.errors.length > 0}
              />
            )}
          />
            
          <form.Field
            name="confirmPassword"
            validators={{
              onChange: ({ value }) => value !== form.state.values.password ? 'Passwords do not match' : undefined,
            }}
            children={(field) => (
              <InputField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                errorMessage={field.state.meta.errors.join(', ')}
                isError={field.state.meta.errors.length > 0}
              />
            )}
          />

<div className="flex items-center justify-start gap-2 p-5">
          <Button variant="border" onClick={() => setChangePassword(false)}>Cancel</Button>
          <Button variant="dark" isLoading={loading} type="submit">Change Password</Button>
        </div>

            </form>
        
      </DialogContent>
    </Dialog>
  )
}

function DeleteAccount({data}) {

  const isVisible = useAtomValue(deleteAccountAtom)
  const setDeleteAccount = useSetAtom(deleteAccountAtom)
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const {record} = PB.authStore
  
  const onDelete = async () => {
    try{
      setLoading(true)
      await PB.collection('admin').delete(record.id)
      userActivityLog('Delete Account', data.id)
      toast.success('Account deleted successfully')
      setDeleteAccount(false)
      router.navigate({to: '/', replace: true})
    }catch(error){
      console.log(error)
      toast.error(error.message)
    }finally{
      setLoading(false)
    }
  }

  return (
    <Dialog open={isVisible} onOpenChange={setDeleteAccount}>
      <DialogContent className="bg-white border border-gray-200 p-0 gap-0">
        <DialogHeader className="text-center p-5 border-b border-gray-200">
          <DialogTitle className="flex items-center justify-start gap-2"><Frown className="w-4 h-4 text-danger" /> Are you sure you want to delete your account?</DialogTitle>
          <DialogDescription>This action cannot be undone.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-start gap-2 p-5">
          <Button variant="border" onClick={() => setDeleteAccount(false)}>Cancel</Button>
          <Button variant="danger" onClick={onDelete} isLoading={loading}>Delete</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function ActivityLogs({data}) {
  return (
    <div className="relative w-full h-full">
      <h2 className="text-xl font-semibold">Activity Logs</h2>

      <div className="relative w-full h-full mt-5">
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Invoice</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Method</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell className="font-medium">INV001</TableCell>
              <TableCell>Paid</TableCell>
              <TableCell>Credit Card</TableCell>
              <TableCell className="text-right">$250.00</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  )
}