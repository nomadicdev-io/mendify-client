import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from 'react-toastify';
import validator from 'validator';
import { InputField } from "../ui/FormComponent";
import { Link, useRouter } from "@tanstack/react-router";
import { signIn } from "../../auth";
import { motion } from "motion/react";

export function EmailVerification() {
  return (
    <motion.form
      initial={{ opacity: 0, x: '50%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '-50%' }}
      transition={{ duration: 0.3, type: 'tween' }}
      className="flex flex-col gap-5 w-[22.5rem] bg-white p-5 rounded-2xl shadow-2xl shadow-gray-300"
    >


<div className="flex flex-col gap-2">
        <img src="/verify-email.png" alt="Email Verification" className="w-full h-auto aspect-[16/7] object-contain my-8" />
      </div>

<div className="flex flex-col items-center justify-center gap-1 mb-3  text-center">
            <h2 className="text-3xl mb-3 font-semibold">Almost there! <br /> <span className="text-primary">Verify</span> Your Email</h2>
            <p className="text-base text-gray-500">We've sent a verification code to your email. Please check your inbox.</p>
          </div>


    </motion.form>
  )
}

export default function LoginForm() {
  
    const [isLoading, setIsLoading] = useState(false)
    const router = useRouter()
    const [isVerify, setIsVerify] = useState(false)

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
                password: value.password,
              },
              {
                onSuccess: (data) => {
                  router.navigate({
                    to: '/dashboard',
                    replace: true,
                  })
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

    if(isVerify) return <EmailVerification />

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
            <h2 className="text-2xl font-bold">Welcome Back!</h2>
            <p className="text-sm text-gray-500">Login to your account</p>
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
          <form.Field 
            name="password"
            validators={{
              onChange: ({ value }) => !value ? 'Password is required' : value.length < 3 ? 'Password must be at least 3 characters' : value.length > 255 ? 'Password must be less than 255 characters' :  undefined,
            }}
            children={(field) => (
              <InputField 
                label="Password"
                name="password"
                type="password"
                placeholder="Enter your password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                errorMessage={field.state.meta.errors.join(', ')}
                isError={field.state.meta.errors.length > 0}
              />
            )}
          />
  
          <Button isLoading={isLoading} type="submit" className="w-full" variant="dark">Sign In to Mendify</Button> 

          <div className="block w-full relative">
            <p className="text-sm text-gray-600 font-medium text-center">Forgot Password? <Link to={'/?form=forgot-password'} title={'Forgot Password'} className="hover:text-primary text-text font-semibold !underline">Click here</Link></p>
          </div>

          <hr className="w-full border-gray-200" />

          <div className="w-full relative flex flex-col">
            <p className="text-sm mb-2 text-gray-500 font-medium text-center">Don't have an account?</p>
            <Button isLoading={isLoading} type="button" className="w-full" variant="outline" onClick={() => router.navigate({to: '/?form=signup'})}>Create an Account</Button> 

          </div>

          <hr className="w-full border-gray-200" />


          <div className="block w-full relative">
          <p className="text-xs text-gray-500 font-medium text-center">Mendify by <Link to={'https://caterpros.ae'} title={'Caterpros UAE'} target="_blank" referrerPolicy="no-referrer" className="hover:text-primary">Caterpros UAE</Link> &copy; {new Date().getFullYear()}</p>
          </div>
      </motion.form>

    )
}

function VerifyEmail() {
  const sendVerificationEmail = async () => {
    const send = await authClient.sendVerificationEmail({
      email: 'alanthegamer@gmail.com',
      callbackURL: 'http://localhost:5173/email-verified',
    })
    console.log(send)
  }

  return (
    <div>
      <Button variant="dark" onClick={sendVerificationEmail}>Verify Email</Button>
    </div>
  )
}