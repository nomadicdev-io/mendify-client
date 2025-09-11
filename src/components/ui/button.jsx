import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"
import { HashLoader } from "react-spinners";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer font-semibold overflow-hidden",
  {
    variants: {
      variant: {
        default:
          "bg-primary hover:bg-primary/90 text-white",
        dark:
            "bg-text text-white hover:bg-text/90",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border bg-background hover:bg-accent hover:text-accent-foreground dark:bg-input/30 dark:border-input dark:hover:bg-input/50",
        secondary:
          "bg-secondary text-secondary-foreground  hover:bg-secondary/80",
        ghost:
          "hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50",
        link: "text-primary underline-offset-4 hover:underline",
        shade: "bg-white border border-gray-200 text-text/65 hover:bg-text/10 hover:text-text/75",
        primaryIcon: "bg-text/2 border border-gray-200 hover:bg-gray-100 hover:border-gray-200 text-secondary",
        success: "bg-success text-white hover:bg-success/90",
        border: "border border-black text-text hover:bg-slate-50 hover:border-slate-500 hover:text-text/75",
        danger: "bg-danger text-white hover:bg-danger/90",
        dangerOutline: "border border-danger text-danger hover:bg-danger hover:text-white",
      },
      size: {
        default: "h-10 px-3 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  isLoading = false,
  asChild = false,
  ...props
}) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      disabled={isLoading || props.disabled}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props} >
        {isLoading ? 
          <div className={
            cn("absolute inset-0 flex items-center justify-center bg-text z-10", isLoading && "bg-text"
            
          )}>
            <svg className="btn--loader animate-spin speed-1" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg"
              width="22" height="22">
              <path
                d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
                stroke="currentColor" strokeWidth="" strokeLinecap="round" strokeLinejoin="round"></path>
              <path
                d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
                stroke="currentColor" strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" className="text-bg">
              </path>
            </svg>
          </div>
          : null} 
        {props.children}
      </Comp>
  );
}

export { Button, buttonVariants }
