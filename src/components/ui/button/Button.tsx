import {
    forwardRef,
} from "react";

import { Loader2 } from "lucide-react";

import { cn } from "@/utils";

import { buttonVariants } from "./Button.styles";
import type { ButtonProps } from "./Button.types";

const Button = forwardRef<
    HTMLButtonElement,
    ButtonProps
>(
    (
        {
            className,
            variant,
            size,
            fullWidth,
            loading,
            children,
            disabled,
            ...props
        },
        ref
    ) => {
        return (
            <button
                ref={ref}
                disabled={disabled || loading}
                className={cn(
                    buttonVariants({
                        variant,
                        size,
                        fullWidth,
                    }),
                    className
                )}
                {...props}
            >
                {loading && (
                    <Loader2
                        size={18}
                        className="animate-spin"
                    />
                )}

                {children}
            </button>
        );
    }
);

Button.displayName = "Button";

export default Button;