import { useForm } from "@tanstack/react-form";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from 'react-toastify';
import { Link } from "@tanstack/react-router";
import validator from 'validator';
import { InputField } from "../ui/FormComponent";
import { signUp } from "../../auth";
import { motion } from "motion/react";
import { EmailVerification } from "./LoginForm";

export default function SignUpForm() {
  
    const [isLoading, setIsLoading] = useState(false)
    const [isVerify, setIsVerify] = useState(false)

    const form = useForm({
        defaultValues: {
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
        },
        onSubmit: async ({value}) => {
          setIsLoading(true)
          try{
            const create = await signUp.email(
              {
                email: value.email,
                password: value.password,
                name: value.name,
                image: "",
              },
              {
                onSuccess: (data) => {
                  setIsVerify(true)
                  console.log('success', data)
                },
                onError: (error) => {
                  console.log('error', error)
                },
                onRequest: (data) => {
                  console.log('request', data)
                },
                onResponse: (response) => {
                  console.log('response', response)
                }
              }
            );
            return create
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
          <div className="flex flex-col gap-1">
            <h2 className="text-2xl font-bold">Create Admin</h2>
            <p className="text-sm text-gray-500">Create an account to get started</p>
          </div>

         <form.Field 
            name="name"
            validators={{
              onChange: ({ value }) => value.length < 3 ? 'Name must be at least 3 characters' : value.length > 255 ? 'Name must be less than 255 characters' : undefined,
            }}
            children={(field) => (
              <InputField 
                label="Full Name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                errorMessage={field.state.meta.errors.join(', ')}
                isError={field.state.meta.errors.length > 0}
              />
              
            )}
          />
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
              onChange: ({ value }) => 
                value.length < 8 ? 'Password must be at least 8 characters' : 
                value.length > 32 ? 'Password must be less than 32 characters' : 
                !/[^a-zA-Z0-9]/.test(value) ? 'Password must contain at least one special character' : 
                !/[A-Z]/.test(value) ? 'Password must contain at least one uppercase letter' :
                !/[a-z]/.test(value) ? 'Password must contain at least one lowercase letter' :
                !/[0-9]/.test(value) ? 'Password must contain at least one number' :
                undefined,
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
           <form.Field 
            name="confirmPassword"
            validators={{
              onChange: ({value})=> value !== form.state.values.password ? 'Passwords do not match' : undefined
            }}
            children={(field) => (
              <InputField 
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                placeholder="Confirm your password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                errorMessage={field.state.meta.errors.join(', ')}
                isError={field.state.meta.errors.length > 0}
              />
            )}
          />
          <Button isLoading={isLoading} type="submit" className="w-full" variant="dark">Sign Up</Button> 


          <div className="block w-full relative">
            <p className="text-sm text-gray-600 font-medium text-center">Already have an account? <Link to={'/'} title={'Login'} className="hover:text-primary text-text font-semibold !underline">Login Now</Link></p>
          </div>

          <hr className="w-full border-gray-200" />

          <div className="block w-full relative">
          <p className="text-xs text-gray-500 font-medium text-center">Mendify by <Link to={'https://caterpros.ae'} title={'Caterpros UAE'} target="_blank" referrerPolicy="no-referrer" className="hover:text-primary">Caterpros UAE</Link> &copy; {new Date().getFullYear()}</p>
          </div>
      </motion.form>

    )
}