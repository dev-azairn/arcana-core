import type { ReactNode } from "react";

export type DrawerSide =
    | "left"
    | "right"
    | "top"
    | "bottom";

export interface DrawerProps {
    open?: boolean;
    defaultOpen?: boolean;
    onOpenChange?: (open: boolean) => void;

    trigger?: ReactNode;

    title?: ReactNode;
    description?: ReactNode;

    children: ReactNode;

    footer?: ReactNode;

    side?: DrawerSide;

    showCloseButton?: boolean;

    closeOnOverlayClick?: boolean;

    contentClassName?: string;
}