import { LoaderCircle } from "lucide-react";

import { cn } from "@/utils";

import {
    loadingVariants,
    spinnerVariants,
} from "./Loading.styles";

import type { LoadingProps } from "./Loading.types";

export default function Loading({
    text = "Loading...",
    icon: Icon = LoaderCircle,
    fullscreen,
    overlay,
    size,
    className,
}: LoadingProps) {
    return (
        <div
            className={cn(
                loadingVariants({
                    fullscreen,
                    overlay,
                    size,
                }),
                className
            )}
        >
            <Icon
                className={spinnerVariants({
                    size,
                })}
            />

            {text && (
                <p className="text-sm text-slate-300">
                    {text}
                </p>
            )}
        </div>
    );
}