import type { ReactNode } from "react";

export type DialogSize = "sm" | "md" | "lg" | "xl" | "full";

export interface DialogProps {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;

    trigger?: ReactNode;
    title?: ReactNode;
    description?: ReactNode;
    children: ReactNode;
    footer?: ReactNode;

    size?: DialogSize;
    closeOnOverlayClick?: boolean;
    showCloseButton?: boolean;

    contentClassName?: string;
}