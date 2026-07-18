import type { HTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import type { cardVariants } from "./Card.styles";

export interface CardProps
    extends HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof cardVariants> {}