import { AnimatePresence, motion } from "motion/react";
import loaderAnimation from '@animations/loader-anim.json'
import Lottie from "lottie-react";

export default function RefetchLoader({isRefetching}) {
  return (
   <AnimatePresence>
    {
        isRefetching &&
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{ duration: 0.6, type: 'spring' }}
            style={{ position: 'fixed', bottom: 0, right: 0, zIndex: 99, margin: 20, marginBottom: '3rem' }}
        >
            <div className="w-15 h-15 bg-white/50 backdrop-blur-sm rounded-lg border border-white/20 flex items-center justify-center">
            <Lottie animationData={loaderAnimation} className='w-auto h-[3rem]' loop={true}/>
            </div>
        </motion.div>
    }
   </AnimatePresence>
  )
}
