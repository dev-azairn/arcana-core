import type { ReactNode, TextareaHTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import { textareaVariants } from "./Textarea.styles";

export interface TextareaProps
    extends TextareaHTMLAttributes<HTMLTextAreaElement>,
        VariantProps<typeof textareaVariants> {
    label?: string;

    labelIcon?: ReactNode;

    helperText?: string;

    error?: string;

    loading?: boolean;

    resize?: boolean;
}