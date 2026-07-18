import type { HTMLAttributes } from "react";

import { cn } from "@/utils";

export default function CardContent({
    className,
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "space-y-4",
                className
            )}
            {...props}
        />
    );
}