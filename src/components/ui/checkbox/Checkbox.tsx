import {
    forwardRef,
    useId,
} from "react";
import { Check } from "lucide-react";

import { cn } from "@/utils";

import { checkboxVariants } from "./Checkbox.styles";
import type { CheckboxProps } from "./Checkbox.types";

const checkIconSizes = {
    sm: 12,
    md: 14,
    lg: 18,
} as const;

const Checkbox = forwardRef<
    HTMLInputElement,
    CheckboxProps
>(
    (
        {
            id,
            label,
            description,
            error,
            variant,
            size = "md",
            disabled,
            className,
            containerClassName,
            labelClassName,
            ...props
        },
        ref
    ) => {
        const generatedId = useId();

        const checkboxId = id ?? generatedId;

        const resolvedVariant = error
            ? "error"
            : variant;

        const iconSize =
            checkIconSizes[size ?? "md"];

        return (
            <div
                className={cn(
                    "w-full",
                    containerClassName
                )}
            >
                <label
                    htmlFor={checkboxId}
                    className={cn(
                        "group flex items-start gap-3",
                        disabled
                            ? "cursor-not-allowed"
                            : "cursor-pointer",
                        labelClassName
                    )}
                >
                    <span className="relative mt-0.5 inline-flex shrink-0">
                        <input
                            ref={ref}
                            id={checkboxId}
                            type="checkbox"
                            disabled={disabled}
                            className={cn(
                                checkboxVariants({
                                    variant:
                                        resolvedVariant,
                                    size,
                                }),
                                className
                            )}
                            aria-invalid={
                                error ? true : undefined
                            }
                            aria-describedby={
                                error
                                    ? `${checkboxId}-error`
                                    : description
                                      ? `${checkboxId}-description`
                                      : undefined
                            }
                            {...props}
                        />

                        <Check
                            size={iconSize}
                            strokeWidth={3}
                            aria-hidden="true"
                            className="
                                pointer-events-none
                                absolute
                                left-1/2
                                top-1/2
                                -translate-x-1/2
                                -translate-y-1/2
                                scale-75
                                text-white
                                opacity-0
                                transition-all
                                peer-checked:scale-100
                                peer-checked:opacity-100
                            "
                        />
                    </span>

                    {(label || description) && (
                        <span className="flex min-w-0 flex-col gap-1">
                            {label && (
                                <span
                                    className={cn(
                                        "text-sm font-medium text-slate-200",
                                        disabled &&
                                            "opacity-50"
                                    )}
                                >
                                    {label}
                                </span>
                            )}

                            {description && (
                                <span
                                    id={`${checkboxId}-description`}
                                    className={cn(
                                        "text-sm text-slate-400",
                                        disabled &&
                                            "opacity-50"
                                    )}
                                >
                                    {description}
                                </span>
                            )}
                        </span>
                    )}
                </label>

                {error && (
                    <p
                        id={`${checkboxId}-error`}
                        className="mt-2 text-sm text-red-400"
                    >
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;