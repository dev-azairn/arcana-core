import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils";

const alertVariants = cva(
  [
    "relative w-full rounded-lg border p-4",
    "[&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4",
    "[&>svg]:h-4 [&>svg]:w-4",
    "[&>svg+div]:translate-y-[-2px]",
    "[&>svg~*]:pl-7",
  ],
  {
    variants: {
      variant: {
        default: [
          "border-slate-800 bg-slate-900",
          "text-slate-200 [&>svg]:text-slate-400",
        ],
        info: [
          "border-blue-900/70 bg-blue-950/40",
          "text-blue-100 [&>svg]:text-blue-400",
        ],
        success: [
          "border-emerald-900/70 bg-emerald-950/40",
          "text-emerald-100 [&>svg]:text-emerald-400",
        ],
        warning: [
          "border-amber-900/70 bg-amber-950/40",
          "text-amber-100 [&>svg]:text-amber-400",
        ],
        destructive: [
          "border-red-900/70 bg-red-950/40",
          "text-red-100 [&>svg]:text-red-400",
        ],
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export type AlertProps = React.HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof alertVariants>;

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    />
  ),
);

Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn(
      "mb-1 font-medium leading-none tracking-tight",
      className,
    )}
    {...props}
  />
));

AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "text-sm leading-relaxed opacity-90",
      "[&_p]:leading-relaxed",
      className,
    )}
    {...props}
  />
));

AlertDescription.displayName = "AlertDescription";

export {
  Alert,
  AlertTitle,
  AlertDescription,
  alertVariants,
};