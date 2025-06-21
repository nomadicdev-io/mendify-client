import { useTheme } from "next-themes"
import { ToastContainer, Slide } from "react-toastify"

export default function ToastProvider() {

    const {resolvedTheme} = useTheme()
    
    return (
        <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={true}
            newestOnTop
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={true}
            theme={resolvedTheme}
            transition={Slide}
        />
    )
}
