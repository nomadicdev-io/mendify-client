import Lottie from "lottie-react";
import loaderAnimation from '@animations/loader-anim.json'
import { motion, AnimatePresence } from "motion/react";

export default function PageLoader() {
  
  return (
    <AnimatePresence mode={'sync'}>
      <motion.div 
        key={'page-loader'}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3, type: 'tween' }}
        className="fixed top-0 left-0 w-full h-full overflow-hidden flex items-center justify-center z-999 bg-slate-50">
          <div className="flex flex-col gap-6">
            <Lottie animationData={loaderAnimation} className='w-auto h-[10rem]' loop={true}/>
            <p className="text-2xl text-text/75 animate-pulse duration-500">Please wait, Preparing Dashboard</p>
          </div>
      </motion.div>
    </AnimatePresence>
  )
}
