import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCallback, useEffect, useId, useRef, useState } from "react"
import Dropzone from 'react-dropzone'
import { ImageUp } from "lucide-react"
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
  import countries from '@/store/country.json'

export const InputField = ({label, name, type, placeholder, value, onChange, errorMessage, isError, isLoading, isSuccess, readOnly = false, onBlur, validators, disabled = false, autoFocus = 'off'}) => {
    
    const id = useId()
    
    return (
        <div className="grid w-full items-center relative">
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
                disabled={disabled}
                autoFocus={autoFocus}
            />
            {isError ? <p className="text-[0.65rem] text-red-500 px-2 mt-1 absolute bottom-0 left-0 translate-y-full">{errorMessage}</p> : null}
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

export const InputSelect = ({label, placeholder, value, onChange, errorMessage, isError, disabled = false, options}) => {
    
    const id = useId()
    
    return (
        <div className="grid w-full items-center relative">
            <Label htmlFor={id} className="mb-2">{label}</Label>
            <Select value={value} onValueChange={onChange} disabled={disabled}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.iso} value={option.iso}>{option.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {isError ? <p className="text-[0.65rem] text-red-500 px-2 mt-1 absolute bottom-0 left-0 translate-y-full">{errorMessage}</p> : null}
     </div>
    )
}

export const InputCountry = ({label, placeholder, value, onChange, errorMessage, isError, disabled = false, options}) => {
    
    const id = useId()
    
    return (
        <div className="grid w-full items-center relative">
            <Label htmlFor={id} className="mb-2">{label}</Label>
            <Select value={value} onValueChange={onChange} disabled={disabled}>
                <SelectTrigger className="w-full">
                    <SelectValue placeholder={placeholder} />
                </SelectTrigger>
                <SelectContent>
                    {options.map((option) => (
                        <SelectItem key={option.iso} value={option.iso}>{option.flag} {option.name}</SelectItem>
                    ))}
                </SelectContent>
            </Select>
            {isError ? <p className="text-[0.65rem] text-red-500 px-2 mt-1 absolute bottom-0 left-0 translate-y-full">{errorMessage}</p> : null}
     </div>
    )
}

export const InputPhone = ({label, value, onChange, errorMessage, isError, disabled = false}) => {
    
    const id = useId()
   
    const onCodeChange = (e) => {
        onChange({
            ...value,
            phoneCode: e,
        })
    }

    const onPhoneChange = (e) => {
        onChange({
            ...value,
            phone: e.target.value,
        })
    }
    
    return (
        <div className="grid w-full items-center relative">
            <Label htmlFor={id} className="mb-2">{label}</Label>
            <div className="flex flex-wrap items-center gap-2">
                <Select value={value.phoneCode} onValueChange={onCodeChange} disabled={disabled}>
                    <SelectTrigger className="min-w-[5rem] max-w-[5rem] px-2 gap-0" hideDropdownIcon={true}>
                        <SelectValue placeholder={'+000'} />
                    </SelectTrigger>
                    <SelectContent className="w-[5rem]">
                        {countries.map((option) => (
                            <SelectItem key={option.iso} value={option.iso}>{option.flag} {option.phoneCode}</SelectItem>
                        ))}
                    </SelectContent>
                </Select>
                <Input type="number" placeholder="000 0000000" value={value.phone} onChange={onPhoneChange} disabled={disabled} className="flex-1" />
            </div>
            {isError ? <p className="text-[0.65rem] text-red-500 px-2 mt-1 absolute bottom-0 left-0 translate-y-full">{errorMessage}</p> : null}
     </div>
    )
}