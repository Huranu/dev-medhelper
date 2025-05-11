import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        " self-center items-center justify-center place-self-center pl-27",
        className
      )}
      {...props}
    />
  )
}

export { Input }
