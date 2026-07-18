import type { HTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import { avatarVariants } from "./Avatar.styles";

export interface AvatarProps
    extends HTMLAttributes<HTMLDivElement>,
        VariantProps<typeof avatarVariants> {
    src?: string;

    alt?: string;

    name?: string;

    level?: number;

    online?: boolean;
}