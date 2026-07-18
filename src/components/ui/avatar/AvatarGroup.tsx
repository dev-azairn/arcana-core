import type { ReactNode } from "react";

import { cn } from "@/utils";

interface AvatarGroupProps {
    children: ReactNode;

    className?: string;
}

export default function AvatarGroup({
    children,
    className,
}: AvatarGroupProps) {
    return (
        <div
            className={cn(
                "flex -space-x-3",
                className
            )}
        >
            {children}
        </div>
    );
}