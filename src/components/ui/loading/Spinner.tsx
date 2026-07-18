import * as React from "react";
import { LoaderCircle } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils";

const spinnerVariants = cva("animate-spin text-indigo-500", {
  variants: {
    size: {
      sm: "h-4 w-4",
      md: "h-6 w-6",
      lg: "h-8 w-8",
      xl: "h-12 w-12",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type SpinnerProps = React.ComponentPropsWithoutRef<
  typeof LoaderCircle
> &
  VariantProps<typeof spinnerVariants> & {
    label?: string;
  };

const Spinner = React.forwardRef<SVGSVGElement, SpinnerProps>(
  (
    {
      className,
      size,
      label = "Loading",
      "aria-label": ariaLabel,
      ...props
    },
    ref,
  ) => (
    <LoaderCircle
      ref={ref}
      role="status"
      aria-label={ariaLabel ?? label}
      className={cn(spinnerVariants({ size }), className)}
      {...props}
    />
  ),
);

Spinner.displayName = "Spinner";

export { Spinner, spinnerVariants };