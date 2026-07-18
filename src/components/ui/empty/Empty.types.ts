import type { ReactNode } from "react";

export interface EmptyProps {
    icon?: ReactNode;

    title: ReactNode;

    description?: ReactNode;

    action?: ReactNode;

    className?: string;
}