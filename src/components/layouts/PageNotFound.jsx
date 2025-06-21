"use client"

import Lottie from "lottie-react";
import NotFoundAnimation from '@/assets/animations/not-found-animation.json';
import { motion } from 'motion/react';
import { Button } from "../ui/button";
import { ArrowLeft, LayoutDashboard } from "lucide-react";
import { useRouter } from "@tanstack/react-router";

const PageNotFound = () => {

    const router = useRouter();

  return (
    <div className='relative w-full min-h-dvh flex flex-col items-center justify-center overflow-hidden'>
        <div className="fixed top-0 left-0 w-full h-full z-0 pointer-events-none opacity-10">
        <img src='/bg-img-01.png' className="w-full h-full object-cover object-top" alt="About background image" />
        </div>

        <motion.div 
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.8, type: 'tween', ease: 'easeOut' }}
        viewport={{ once: true }}
        className='flex flex-col items-center justify-center p-6'>
            <Lottie animationData={NotFoundAnimation} className='w-auto lg:h-[22.5rem] h-[15rem]' loop={true} />
            <h1 className='lg:text-4xl text-3xl font-bold text-center'><span className='text-primary'>Whoops!</span> We Can't Find That Page</h1>
            <p className='text-center text-base lg:text-xl lg:max-w-[75%] leading-[1.5] opacity-75 mt-5'>It looks like the page you're looking for doesn't exist. Check the URL or go back to the homepage.</p>
            <div className='flex items-center justify-center gap-2 mt-8'>
                <Button onClick={() => router.history().back()} variant="default">
                    <ArrowLeft size={24} />
                    <span>Go Back</span>
                </Button>
                <Button onClick={() => router.navigate({to: '/admin'})} variant="dark">
                    <LayoutDashboard />
                    <span>Dashboard</span>
                </Button> 
            </div>
        </motion.div>
        </div>
  )
}

export default PageNotFound