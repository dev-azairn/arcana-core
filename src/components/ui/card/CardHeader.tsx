import type { HTMLAttributes } from "react";

import { cn } from "@/utils";

export default function CardHeader({
    className,
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "mb-5 flex items-center justify-between border-b border-violet-500/10 pb-3",
                className
            )}
            {...props}
        />
    );
}