import * as React from "react";
import { Sparkles } from "lucide-react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/utils";

const appLogoVariants = cva(
  "flex items-center text-foreground",
  {
    variants: {
      size: {
        sm: "gap-2",
        md: "gap-3",
        lg: "gap-4",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export interface AppLogoProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof appLogoVariants> {
  showText?: boolean;
}

const AppLogo = React.forwardRef<
  HTMLDivElement,
  AppLogoProps
>(
  (
    {
      size,
      showText = true,
      className,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        appLogoVariants({ size }),
        className,
      )}
      {...props}
    >
      <div
        className={cn(
          "flex shrink-0 items-center justify-center",
          "rounded-xl bg-primary text-primary-foreground",
          size === "sm" && "h-9 w-9",
          size === "md" && "h-10 w-10",
          size === "lg" && "h-12 w-12",
        )}
      >
        <Sparkles
          className={cn(
            size === "sm" && "h-4 w-4",
            size === "md" && "h-5 w-5",
            size === "lg" && "h-6 w-6",
          )}
        />
      </div>

      {showText && (
        <div className="min-w-0">
          <span
            className={cn(
              "logo-font block truncate font-bold tracking-wide",
              size === "sm" && "text-base",
              size === "md" && "text-lg",
              size === "lg" && "text-xl",
            )}
          >
            Arcana Core
          </span>

          {size !== "sm" && (
            <span className="block truncate text-xs text-muted">
              Adventurer System
            </span>
          )}
        </div>
      )}
    </div>
  ),
);

AppLogo.displayName = "AppLogo";

export { AppLogo, appLogoVariants };