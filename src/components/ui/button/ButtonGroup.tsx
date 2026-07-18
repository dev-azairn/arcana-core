import type { ReactNode } from "react";

import { cn } from "@/utils";

interface ButtonGroupProps {
    children: ReactNode;
    className?: string;
}

export default function ButtonGroup({
    children,
    className,
}: ButtonGroupProps) {
    return (
        <div
            className={cn(
                "inline-flex items-center gap-2",
                className
            )}
        >
            {children}
        </div>
    );
}