import { forwardRef } from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/utils";

import { inputVariants } from "./Input.styles";
import type { InputProps } from "./Input.types";

const Input = forwardRef<HTMLInputElement, InputProps>(
    (
        {
            label,
            labelIcon,
            helperText,
            error,
            leftIcon,
            rightIcon,
            loading,
            variant,
            size,
            className,
            ...props
        },
        ref
    ) => {
        return (
            <div className="w-full space-y-2">
            {label && (
                <label className="flex items-center gap-2 text-sm font-medium text-slate-200">
                    {labelIcon && (
                        <span className="text-violet-300">
                            {labelIcon}
                        </span>
                    )}

                    <span>{label}</span>
                </label>
            )}

                <div className="relative">
                    {leftIcon && (
                        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                            {leftIcon}
                        </div>
                    )}

                    <input
                        ref={ref}
                        className={cn(
                            inputVariants({
                                variant: error
                                    ? "error"
                                    : variant,

                                size,
                            }),

                            leftIcon && "pl-10",

                            rightIcon && "pr-10",

                            loading && "pr-10",

                            className
                        )}
                        {...props}
                    />

                    {loading && (
                        <Loader2
                            className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-slate-400"
                            size={18}
                        />
                    )}

                    {!loading &&
                        rightIcon && (
                            <div className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                                {rightIcon}
                            </div>
                        )}
                </div>

                {error ? (
                    <p className="text-sm text-red-400">
                        {error}
                    </p>
                ) : helperText ? (
                    <p className="text-sm text-slate-400">
                        {helperText}
                    </p>
                ) : null}
            </div>
        );
    }
);

Input.displayName = "Input";

export default Input;