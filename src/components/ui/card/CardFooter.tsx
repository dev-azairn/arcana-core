import type { HTMLAttributes } from "react";

import { cn } from "@/utils";

export default function CardFooter({
    className,
    ...props
}: HTMLAttributes<HTMLDivElement>) {
    return (
        <div
            className={cn(
                "mt-6 flex justify-end gap-3 border-t border-violet-500/10 pt-4",
                className
            )}
            {...props}
        />
    );
}