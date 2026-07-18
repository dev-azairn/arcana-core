import { forwardRef } from "react";

import { cn } from "@/utils";

import { badgeVariants } from "./Badge.styles";
import type { BadgeProps } from "./Badge.types";

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(
    (
        {
            className,
            variant,
            size,
            leftIcon,
            rightIcon,
            children,
            ...props
        },
        ref
    ) => {
        return (
            <span
                ref={ref}
                className={cn(
                    badgeVariants({
                        variant,
                        size,
                    }),
                    className
                )}
                {...props}
            >
                {leftIcon}

                {children}

                {rightIcon}
            </span>
        );
    }
);

Badge.displayName = "Badge";

export default Badge;