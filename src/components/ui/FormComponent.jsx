import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useId, useRef } from "react"
import Dropzone from 'react-dropzone'

import formStyles from './form.module.scss'
import { ImageUp } from "lucide-react"

export const InputField = ({label, name, type, placeholder, value, onChange, errorMessage, isError, isLoading, isSuccess, readOnly = false, onBlur, validators}) => {
    
    const id = useId()
    
    return (
        <div className="grid w-full max-w-sm items-center">
            <Label htmlFor={id} className="mb-2">{label}</Label>
            <Input 
                type={type} 
                id={id} 
                placeholder={placeholder} 
                onChange={onChange} 
                value={value} 
                errorMessage={errorMessage} 
                isError={isError}
                readOnly={readOnly}
                onBlur={onBlur}
                isLoading={isLoading}
                isSuccess={isSuccess}
            />
            {isError ? <p className="text-[0.7rem] text-red-500 px-2 mt-1">{errorMessage}</p> : null}
        </div>
    )
}

export const DropUploader = () => {

    const dropzoneRef = useRef()

    return (
        <div className={'relative w-full min-h-[6rem] rounded-lg border border-dashed border-border bg-slate-50 p-5 flex items-center justify-center text-center group cursor-pointer transition-all duration-300 hover:border-primary/50 hover:bg-primary/2'}>
            <Dropzone ref={dropzoneRef}>
                {({getRootProps, getInputProps}) => (
                    <div {...getRootProps()} className="flex flex-col items-center justify-center gap-4">
                    <input {...getInputProps()} />
                    <ImageUp strokeWidth={1.5} className="w-12 h-12 opacity-20 group-hover:opacity-100 group-hover:text-primary transition-all duration-300" />
                    <p className="text-xs opacity-50 max-w-[80%]">Drag 'n' drop image here, or click to select files</p>
                    </div>
                )}
            </Dropzone>
        </div>
    )
}