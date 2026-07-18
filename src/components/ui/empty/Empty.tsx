import { Inbox } from "lucide-react";

import { cn } from "@/utils";

import type { EmptyProps } from "./Empty.types";

export default function Empty({
    icon,
    title,
    description,
    action,
    className,
}: EmptyProps) {
    return (
        <div
            className={cn(
                "flex flex-col items-center justify-center rounded-2xl border border-dashed border-slate-700 bg-slate-900/30 px-8 py-12 text-center",
                className
            )}
        >
            <div className="mb-5 rounded-full bg-violet-500/10 p-4 text-violet-400">
                {icon ?? <Inbox size={36} />}
            </div>

            <h3 className="text-lg font-semibold text-white">
                {title}
            </h3>

            {description && (
                <p className="mt-2 max-w-md text-sm text-slate-400">
                    {description}
                </p>
            )}

            {action && (
                <div className="mt-6">
                    {action}
                </div>
            )}
        </div>
    );
}