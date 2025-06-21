import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority";

import { cn } from "@/lib/utils"
import { HashLoader } from "react-spinners";

const buttonVariants = cva(
  "relative inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-5 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive cursor-pointer font-semibold",
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
        shade: "bg-white border border-gray-300 text-text/65 hover:bg-text/10 hover:text-text/75",
        primaryIcon: "bg-text/2 border border-gray-200 hover:bg-gray-100 hover:border-gray-200 text-secondary",
        success: "bg-success text-white hover:bg-success/90",
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
        {isLoading ? <HashLoader color={'#fff'} size={18} /> : null} {props.children}
      </Comp>
  );
}

export { Button, buttonVariants }
