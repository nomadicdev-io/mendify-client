import { motion } from 'motion/react'
import Lottie from "lottie-react";
import loaderAnimation from '@animations/loader-anim.json'

export default function FormLoader() {
  return (
    <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, type: 'tween' }}
        className='absolute inset-0 z-9999 flex items-center justify-center bg-white/75 backdrop-blur-sm'
    >
            <Lottie animationData={loaderAnimation} className='w-auto h-[5rem]' loop={true}/>

        
    </motion.div>
  )
}
