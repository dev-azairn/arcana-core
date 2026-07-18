import * as React from "react";
import * as DropdownMenuPrimitive from "@radix-ui/react-dropdown-menu";

import { cn } from "@/utils";

export type DropdownTriggerProps =
  React.ComponentPropsWithoutRef<
    typeof DropdownMenuPrimitive.Trigger
  >;

const DropdownTrigger = React.forwardRef<
  React.ElementRef<typeof DropdownMenuPrimitive.Trigger>,
  DropdownTriggerProps
>(({ className, ...props }, ref) => (
  <DropdownMenuPrimitive.Trigger
    ref={ref}
    className={cn(
      "focus-visible:outline-none focus-visible:ring-2",
      "focus-visible:ring-primary focus-visible:ring-offset-2",
      "focus-visible:ring-offset-background",
      "disabled:pointer-events-none disabled:opacity-50",
      className,
    )}
    {...props}
  />
));

DropdownTrigger.displayName =
  DropdownMenuPrimitive.Trigger.displayName;

export { DropdownTrigger };