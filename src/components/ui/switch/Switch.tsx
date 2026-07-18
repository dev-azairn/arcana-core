import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

import { cn } from "@/utils";

export type SwitchProps = React.ComponentPropsWithoutRef<
  typeof SwitchPrimitive.Root
>;

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitive.Root>,
  SwitchProps
>(({ className, disabled, ...props }, ref) => {
  return (
    <SwitchPrimitive.Root
      ref={ref}
      disabled={disabled}
      className={cn(
        "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center",
        "rounded-full border-2 border-transparent",
        "bg-slate-700 transition-colors duration-200",
        "data-[state=checked]:bg-indigo-600",
        "focus-visible:outline-none focus-visible:ring-2",
        "focus-visible:ring-indigo-500 focus-visible:ring-offset-2",
        "focus-visible:ring-offset-slate-950",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        className={cn(
          "pointer-events-none block h-5 w-5 rounded-full",
          "bg-white shadow-lg ring-0",
          "transition-transform duration-200",
          "data-[state=unchecked]:translate-x-0",
          "data-[state=checked]:translate-x-5",
        )}
      />
    </SwitchPrimitive.Root>
  );
});

Switch.displayName = SwitchPrimitive.Root.displayName;

export { Switch };