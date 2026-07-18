import type { ReactNode } from "react";

export interface DropdownItem {
    label: ReactNode;

    icon?: ReactNode;

    onClick?: () => void;

    disabled?: boolean;

    danger?: boolean;
}

export interface DropdownProps {
    trigger: ReactNode;

    items: DropdownItem[];

    align?: "start" | "center" | "end";

    side?: "top" | "right" | "bottom" | "left";
}