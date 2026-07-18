import { forwardRef } from "react";
import { Loader2 } from "lucide-react";

import { cn } from "@/utils";

import { textareaVariants } from "./Textarea.styles";
import type { TextareaProps } from "./Textarea.types";

const Textarea = forwardRef<
    HTMLTextAreaElement,
    TextareaProps
>(
    (
        {
            label,
            labelIcon,
            helperText,
            error,
            loading,

            resize,

            variant,

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
                    <textarea
                        ref={ref}
                        className={cn(
                            textareaVariants({
                                variant: error
                                    ? "error"
                                    : variant,

                                resize,
                            }),

                            loading && "pr-10",

                            className
                        )}
                        {...props}
                    />

                    {loading && (
                        <Loader2
                            size={18}
                            className="absolute right-3 top-3 animate-spin text-slate-400"
                        />
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

Textarea.displayName = "Textarea";

export default Textarea;