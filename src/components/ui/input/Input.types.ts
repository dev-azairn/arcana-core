import type { InputHTMLAttributes, ReactNode } from "react";
import type { VariantProps } from "class-variance-authority";
import { inputVariants } from "./Input.styles";

export interface InputProps
    extends Omit<
        InputHTMLAttributes<HTMLInputElement>,
        "size"
    >,
        VariantProps<typeof inputVariants> {
    label?: string;

    labelIcon?: ReactNode;

    helperText?: string;

    error?: string;

    leftIcon?: ReactNode;

    rightIcon?: ReactNode;

    loading?: boolean;
}