"use client"

import { AlertCircle, CircleAlert, CircleCheck, FileText, Info } from "lucide-react"
import { useTheme } from "next-themes"
import { Toaster as Sonner, ToasterProps } from "sonner"

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme()

  return (
    <Sonner
      theme={theme as ToasterProps["theme"]}
      toastOptions={{
        classNames: {
          toast: "!gap-3 !rounded-xl",
        }
      }}
      className="toaster group"
      position="top-center"
      style={
        {
          "--normal-bg": "var(--color-bg)",
          "--normal-text": "var(--popover-foreground)",
          "--normal-border": "var(--border)",
        } as React.CSSProperties
      }
      icons={{
        success: <CircleCheck className="text-success mr-3" />,
        error: <CircleAlert className="text-danger mr-3" />,
        info: <Info className="text-secondary mr-3" />,
        warning: <AlertCircle className="text-warning mr-3" />,
        default: <FileText className="text-primary mr-3" />,
      }}
      {...props}
    />
  )
}

export { Toaster }
