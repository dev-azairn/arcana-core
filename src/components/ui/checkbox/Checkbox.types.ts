import type {
    InputHTMLAttributes,
    ReactNode,
} from "react";
import type { VariantProps } from "class-variance-authority";

import { checkboxVariants } from "./Checkbox.styles";

export interface CheckboxProps
    extends Omit<
            InputHTMLAttributes<HTMLInputElement>,
            "size" | "type"
        >,
        VariantProps<typeof checkboxVariants> {
    label?: ReactNode;

    description?: ReactNode;

    error?: string;

    containerClassName?: string;

    labelClassName?: string;
}

export interface CheckboxGroupProps {
    children: ReactNode;

    label?: ReactNode;

    description?: ReactNode;

    error?: string;

    className?: string;

    orientation?: "vertical" | "horizontal";
}