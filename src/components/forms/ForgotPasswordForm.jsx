import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from 'react-toastify';
import validator from 'validator';
import { InputField } from "../ui/FormComponent";
import { Link, useRouter } from "@tanstack/react-router";
import { signIn } from "../../auth";
import { motion } from "motion/react";
import { ChevronLeft } from "lucide-react";

export default function ForgotPasswordForm() {
  
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()

    const form = useForm({
        defaultValues: {
          email: "",
          password: "",
        },
        onSubmit: async ({value}) => {
          setIsLoading(true)
          try{
            const login = await signIn.email(
              {
                email: value.email,
              },
              {
                onSuccess: (data) => {
                  console.log(data)
                },
                onError: (error) => {
                  console.log(error)
                }
              }
            )
            console.log(login)
            if(login.error) throw login.error
            form.reset()
            return login
          }catch(error){
            console.log(error)
            toast.error(error.message)
          }finally{
            setIsLoading(false)
          }
        }
      })

    return (
      <motion.form
      initial={{ opacity: 0, x: '50%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '-50%' }}
      transition={{ duration: 0.3, type: 'tween' }}
        onSubmit={(e)=> {
          e.preventDefault()
          e.stopPropagation()
          form.handleSubmit()
        }}
        className="flex flex-col gap-5 w-[22.5rem] bg-white p-5 rounded-2xl shadow-2xl shadow-gray-300">
          <div className="flex flex-col gap-1 mb-3">
            <h2 className="text-2xl font-bold">Forgot Password?</h2>
            <p className="text-sm text-gray-500">Enter your email to reset your password</p>
          </div>

          <form.Field 
            name="email"
            validators={{
              onChange: ({ value }) => !validator.isEmail(value) ? 'Invalid email address' : value.length < 3 ? 'Email must be at least 3 characters' : value.length > 255 ? 'Email must be less than 255 characters' : undefined,
            }}
            children={(field) => (
              <InputField 
                label="Email"
                name="email"
                type="email"
                placeholder="Enter your email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                errorMessage={field.state.meta.errors.join(', ')}
                isError={field.state.meta.errors.length > 0}
              />
            )}
          />
  

          <div className="flex items-center justify-between w-full relative">
            <p className="text-sm text-gray-600 font-medium text-center"> <Link to={'/'} title={'Login'} className="hover:text-primary text-text font-semibold flex items-center gap-1 justify-center"><ChevronLeft size={18} /> Back to Login</Link></p>
          <Button isLoading={isLoading} type="submit"  variant="dark">Reset Password</Button> 

          </div>

          <hr className="w-full border-gray-200" />


          <div className="block w-full relative">
          <p className="text-xs text-gray-500 font-medium text-center">Mendify by <Link to={'https://caterpros.ae'} title={'Caterpros UAE'} target="_blank" referrerPolicy="no-referrer" className="hover:text-primary">Caterpros UAE</Link> &copy; {new Date().getFullYear()}</p>
          </div>
      </motion.form>

    )
}