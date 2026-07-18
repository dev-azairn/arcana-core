import type { HTMLAttributes } from "react";

import { cn } from "@/utils";

export interface ProgressProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    value?: number;
    max?: number;
    label?: string;
    showValue?: boolean;
    size?: "sm" | "md" | "lg";
    variant?:
        | "primary"
        | "success"
        | "warning"
        | "danger";
}

const sizeClasses = {
    sm: "h-1.5",
    md: "h-2.5",
    lg: "h-4",
};

const variantClasses = {
    primary:
        "bg-gradient-to-r from-indigo-500 to-purple-500",
    success:
        "bg-gradient-to-r from-emerald-500 to-green-500",
    warning:
        "bg-gradient-to-r from-amber-500 to-orange-500",
    danger:
        "bg-gradient-to-r from-red-500 to-rose-500",
};

function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

export default function Progress({
    value = 0,
    max = 100,
    label,
    showValue = false,
    size = "md",
    variant = "primary",
    className,
    ...props
}: ProgressProps) {
    const safeMax = max > 0 ? max : 100;
    const safeValue = clamp(value, 0, safeMax);
    const percentage = (safeValue / safeMax) * 100;

    return (
        <div
            className={cn("w-full space-y-2", className)}
            {...props}
        >
            {(label || showValue) && (
                <div className="flex items-center justify-between gap-4">
                    {label && (
                        <span className="text-sm font-medium text-slate-200">
                            {label}
                        </span>
                    )}

                    {showValue && (
                        <span className="ml-auto text-sm text-slate-400">
                            {Math.round(percentage)}%
                        </span>
                    )}
                </div>
            )}

            <div
                role="progressbar"
                aria-label={label ?? "Progress"}
                aria-valuemin={0}
                aria-valuemax={safeMax}
                aria-valuenow={safeValue}
                className={cn(
                    "w-full overflow-hidden rounded-full bg-slate-800",
                    sizeClasses[size]
                )}
            >
                <div
                    className={cn(
                        "h-full rounded-full transition-[width] duration-300 ease-out",
                        variantClasses[variant]
                    )}
                    style={{ width: `${percentage}%` }}
                />
            </div>
        </div>
    );
}