import type { HTMLAttributes } from "react";

import { cn } from "@/utils";

export interface SkeletonProps
    extends HTMLAttributes<HTMLDivElement> {
    rounded?: "none" | "sm" | "md" | "lg" | "full";
}

const roundedClasses = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    full: "rounded-full",
};

export default function Skeleton({
    rounded = "md",
    className,
    ...props
}: SkeletonProps) {
    return (
        <div
            aria-hidden="true"
            className={cn(
                "animate-pulse bg-slate-700/70",
                roundedClasses[rounded],
                className
            )}
            {...props}
        />
    );
}