import { cn } from "@/utils";

import type { CheckboxGroupProps } from "./Checkbox.types";

export default function CheckboxGroup({
    children,
    label,
    description,
    error,
    className,
    orientation = "vertical",
}: CheckboxGroupProps) {
    return (
        <fieldset className="w-full">
            {label && (
                <legend className="text-sm font-semibold text-slate-200">
                    {label}
                </legend>
            )}

            {description && (
                <p className="mt-1 text-sm text-slate-400">
                    {description}
                </p>
            )}

            <div
                className={cn(
                    "mt-3",
                    orientation === "horizontal"
                        ? "flex flex-wrap items-start gap-5"
                        : "space-y-3",
                    className
                )}
            >
                {children}
            </div>

            {error && (
                <p className="mt-2 text-sm text-red-400">
                    {error}
                </p>
            )}
        </fieldset>
    );
}