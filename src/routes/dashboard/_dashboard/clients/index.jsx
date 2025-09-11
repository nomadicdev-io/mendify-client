import { createFileRoute } from '@tanstack/react-router'
import DashboardBanner from '../../../../components/layouts/DashboardBanner'
import { Button } from '../../../../components/ui/button'
import { ArrowRightToLine, CopyPlus, ImageUp } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useCallback, useRef, useState } from 'react'
import { useForm } from '@tanstack/react-form'
import { InputCountry, InputField, InputPhone } from '../../../../components/ui/FormComponent'
import validator from 'validator'
import { imageFormats } from '../../../../store/imageFormats'
import { toast } from 'sonner'
import mendify from '../../../../api'
import { AnimatePresence } from 'motion/react'
import FormLoader from '../../../../components/loaders/FormLoader'
import ImageComponent from '../../../../components/ui/ImageComponent'
import countries from '../../../../store/country.json'
import { useQuery } from '@tanstack/react-query'
import RefetchLoader from '../../../../components/ui/RefetchLoader'

export const Route = createFileRoute('/dashboard/_dashboard/clients/')({
  component: RouteComponent,
})

function RouteComponent() {

  const {page, limit} = Route.useSearch()

  const {data, isLoading, refetch, isRefetching} = useQuery({
    queryKey: ['clients', page, limit],
    enabled: true,
    queryFn: async () => {
      try {
        const response = await mendify.get({ url: '/client/list', params: {
          page: page || 1,
          limit: limit || 10,
        }}, {
          onSuccess: (data) => {
            console.log(data);
            return data.data;
          },
          onError: (error) => {
            console.log(error);
            return null;
          }
        });
        return response.data;
      } catch (error) {
        console.log(error);
        return null;
      }
    },
    staleTime: 60 * 1000, 
    refetchOnMount: true,
    refetchOnWindowFocus: true,
    refetchOnReconnect: true,
  })

  const breadcrumb = [
    {
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      label: 'Clients',
      href: '/dashboard/clients',
    },
  ]

  return (
    <div className="relative flex-1 flex flex-col w-full h-full">

      <DashboardBanner title="Manage Clients" breadcrumb={breadcrumb} >
        <CreateClient onClientCreate={refetch} />
      </DashboardBanner>

     
      <RefetchLoader isRefetching={isLoading || isRefetching} />
    </div>
  )
}

function CreateClient({onClientCreate}) {

  const [isVisible, setIsVisible] = useState(false)
  const fileInputRef = useRef(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isImageLoading, setIsImageLoading] = useState(false)

  const handleOpen = useCallback(() => {
    setIsVisible(!isVisible)
  }, [isVisible])

  const handleImageChange = useCallback(() => {
    fileInputRef?.current?.click()
  }, [])

  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      phone: {
        phoneCode: 'AE',
        phone: '',
      },
      avatar: '',
      country: 'AE',
      website: '',
    },
    onSubmit: async ({value}) => {
      setIsLoading(true)
      try{
        await mendify.post({url: '/client/create', data: {
          ...value,
          phone: value.phone.phone,
          phoneCode: value.phone.phoneCode,
        }}, {
          onSuccess: () => {
            form.reset()
            toast.success('Client created successfully')
            onClientCreate()
            setIsVisible(false)
          },
          onError: (error) => {
            console.log(error)
            toast.error(error.message)
          }
        })
      }catch(error){
        console.log(error)
        toast.error(error.message)
      }finally{
        setIsLoading(false)
      }
    }
  })

  const handleFileChange = useCallback(async (e) => {
    setIsImageLoading(true)
    try{
      const file = e.target.files[0]
      if(!file) return
  
      if(!imageFormats.includes(file.type)) return toast.error('Invalid image format')
  
      const size = file.size / 1024 / 1024
      if(size > 2) return toast.error('Image size must be less than 2MB')
  
      const formData = new FormData()
      formData.append('file', file)
  
      await mendify.upload.single({data: formData}, {
        onSuccess: async (data) => {
          console.log(data)
          form.setFieldValue('avatar', data.data.key)
        },
        onError: (error) => {
          console.log(error)
        },
      })

      

    }catch(error){
      console.log(error)
    }finally{
      setIsImageLoading(false)
    }
}, [form])


  return (
    <>
    <Button variant="dark" onClick={handleOpen}>
      <span>Add Client</span>
      <CopyPlus />
    </Button>

    <Dialog  open={isVisible} onOpenChange={setIsVisible}>
      <DialogContent onOpenAutoFocus={(e) => e.preventDefault()} className="bg-white border border-gray-200 p-0 gap-0 w-[22.5rem] max-w-[22.5rem]" showCloseButton={false}>
        <DialogHeader className="border-b border-gray-200 p-5 flex flex-row items-center justify-between">
          <div className="flex-1 relative flex flex-col gap-1">
            <DialogTitle className="flex gap-2 text-2xl font-bold text-secondary">New Client</DialogTitle>
            <DialogDescription className="text-gray-500 text-sm">
              Add a new client to your system.
            </DialogDescription>
          </div>
          
          <form.Field
            name="avatar"
            children={(field) => (
                <div onClick={handleImageChange} className="w-16 h-16 relative rounded-lg bg-slate-100 border border-dashed border-slate-300 flex items-center justify-center cursor-pointer group overflow-hidden">

                  {
                    field.state.value ?
                    <ImageComponent src={import.meta.env.VITE_PUBLIC_S3_URL + field.state.value} alt="Client Logo" className="w-full h-full object-cover" />
                    :
                    <>
                    <ImageUp size={32} className="text-slate-400 transition-all duration-300 group-hover:text-slate-700 group-hover:scale-110" />
                   
                    </>
                  }
                 <input ref={fileInputRef} onChange={handleFileChange} type="file" visibility="hidden" accept="image/*" className="hidden" />

                <AnimatePresence>
                  {isImageLoading && (
                    <FormLoader size="sm" />
                  )}
                  </AnimatePresence>
              </div>
            )}
          />
          
        </DialogHeader>
        <form 
          onSubmit={(e)=> {
            e.preventDefault()
            e.stopPropagation()
            form.handleSubmit()
          }}
          className="relative flex flex-col gap-5 p-5">

            <form.Field
              name="name"
              validators={{
                onSubmit: ({ value }) => value.length < 3 ? 'Name must be at least 3 characters' : value.length > 255 ? 'Name must be less than 255 characters' : undefined,
              }}
              children={(field) => (
                <InputField
                  label="Client Name"
                  name="name"
                  placeholder={'Enter client name'}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  errorMessage={field.state.meta.errors.join(', ')}
                  isError={field.state.meta.errors.length > 0}
                  autoFocus={false}
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
                  type="email"
                  placeholder="example@example.com"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  errorMessage={field.state.meta.errors.join(', ')}
                  isError={field.state.meta.errors.length > 0}
                  autoFocus={false}
                />
              )}
            />
            <form.Field 
              name="country"
              validators={{
                onSubmit: ({ value }) => !value ? 'Please select a country' : undefined,
              }}
              children={(field) => (
                <InputCountry
                  label="Country"
                  name="country"
                  options={countries}
                  placeholder="Select a country"
                  value={field.state.value}
                  onChange={field.handleChange}
                  errorMessage={field.state.meta.errors.join(', ')}
                  isError={field.state.meta.errors.length > 0}
                />
              )}
            />
            <form.Field 
              name="phone"
              validators={{
                onSubmit: ({ value }) => !validator.isMobilePhone(value.phone) ? 'Invalid phone number' : value.phone.length < 3 ? 'Phone number must be at least 3 characters' : value.phone.length > 255 ? 'Phone number must be less than 255 characters' : undefined,
              }}
              children={(field) => (
                <InputPhone
                  label="Phone"
                  name="phone"
                  value={field.state.value}
                  onChange={field.handleChange}
                  errorMessage={field.state.meta.errors.join(', ')}
                  isError={field.state.meta.errors.length > 0}
                />
              )}
            />
             <form.Field 
              name="website"
              validators={{
                onSubmit: ({ value }) => !validator.isURL(value) ? 'Invalid website URL' : value.length < 3 ? 'Website URL must be at least 3 characters' : value.length > 255 ? 'Website URL must be less than 255 characters' : undefined,
              }}
              children={(field) => (
                <InputField 
                  label="Website"
                  name="website"
                  type="text"
                  placeholder="www.example.com"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value.toLowerCase())}
                  errorMessage={field.state.meta.errors.join(', ')}
                  isError={field.state.meta.errors.length > 0}
                  autoFocus={false}
                />
              )}
            />
            <div className="col-span-2 flex items-center justify-start gap-2 mt-5">
              <Button type="button" variant="shade" onClick={handleOpen}><span>Cancel</span></Button>
              <Button isLoading={isLoading} type="submit" variant="dark"><span>Create</span>
              <ArrowRightToLine />
              </Button>
            </div>
          </form>
      </DialogContent>
    </Dialog>
    </>
  )
}

