import type { ReactNode } from "react";

export interface BreadcrumbItem {
    label: string;
    href?: string;
    icon?: ReactNode;
}

export interface BreadcrumbProps {
    items: BreadcrumbItem[];

    separator?: ReactNode;

    className?: string;
}