import type { LucideIcon } from "lucide-react";

export interface LoadingProps {
    text?: string;
    icon?: LucideIcon;
    fullscreen?: boolean;
    overlay?: boolean;
    size?: "sm" | "md" | "lg";
    className?: string;
}