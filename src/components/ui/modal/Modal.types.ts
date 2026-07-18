import type { ReactNode } from "react";

export type ModalSize =
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "full";

export interface ModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;

    title?: ReactNode;
    description?: ReactNode;
    children: ReactNode;
    footer?: ReactNode;

    size?: ModalSize;
    showCloseButton?: boolean;
    closeOnOverlayClick?: boolean;

    contentClassName?: string;
}