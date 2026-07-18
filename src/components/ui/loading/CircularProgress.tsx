import type { HTMLAttributes } from "react";

import { cn } from "@/utils";

export interface CircularProgressProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    value?: number;
    max?: number;
    size?: "sm" | "md" | "lg" | number;
    strokeWidth?: number;
    showValue?: boolean;
    label?: string;
    variant?:
        | "primary"
        | "success"
        | "warning"
        | "danger";
}

const predefinedSizes = {
    sm: 48,
    md: 72,
    lg: 104,
};

const variantClasses = {
    primary: "stroke-indigo-500",
    success: "stroke-emerald-500",
    warning: "stroke-amber-500",
    danger: "stroke-red-500",
};

function clamp(value: number, min: number, max: number) {
    return Math.min(Math.max(value, min), max);
}

export default function CircularProgress({
    value = 0,
    max = 100,
    size = "md",
    strokeWidth = 8,
    showValue = true,
    label,
    variant = "primary",
    className,
    ...props
}: CircularProgressProps) {
    const resolvedSize =
        typeof size === "number"
            ? size
            : predefinedSizes[size];

    const safeMax = max > 0 ? max : 100;
    const safeValue = clamp(value, 0, safeMax);
    const percentage = (safeValue / safeMax) * 100;

    const center = resolvedSize / 2;
    const radius = Math.max(
        (resolvedSize - strokeWidth) / 2,
        0
    );
    const circumference = 2 * Math.PI * radius;
    const dashOffset =
        circumference -
        (percentage / 100) * circumference;

    return (
        <div
            className={cn(
                "inline-flex flex-col items-center gap-2",
                className
            )}
            {...props}
        >
            <div
                role="progressbar"
                aria-label={label ?? "Circular progress"}
                aria-valuemin={0}
                aria-valuemax={safeMax}
                aria-valuenow={safeValue}
                className="relative"
                style={{
                    width: resolvedSize,
                    height: resolvedSize,
                }}
            >
                <svg
                    width={resolvedSize}
                    height={resolvedSize}
                    viewBox={`0 0 ${resolvedSize} ${resolvedSize}`}
                    className="-rotate-90"
                    aria-hidden="true"
                >
                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        fill="none"
                        strokeWidth={strokeWidth}
                        className="stroke-slate-800"
                    />

                    <circle
                        cx={center}
                        cy={center}
                        r={radius}
                        fill="none"
                        strokeWidth={strokeWidth}
                        strokeLinecap="round"
                        strokeDasharray={circumference}
                        strokeDashoffset={dashOffset}
                        className={cn(
                            "transition-[stroke-dashoffset] duration-500 ease-out",
                            variantClasses[variant]
                        )}
                    />
                </svg>

                {showValue && (
                    <span className="absolute inset-0 flex items-center justify-center text-sm font-semibold text-slate-100">
                        {Math.round(percentage)}%
                    </span>
                )}
            </div>

            {label && (
                <span className="text-sm text-slate-400">
                    {label}
                </span>
            )}
        </div>
    );
}