import { cva } from "class-variance-authority";

export const dialogContentVariants = cva(
    [
        "fixed left-1/2 top-1/2 z-50",
        "-translate-x-1/2 -translate-y-1/2",
        "w-[calc(100%-2rem)]",
        "max-h-[calc(100vh-2rem)]",
        "overflow-y-auto",
        "rounded-2xl",
        "border border-violet-500/20",
        "bg-slate-950",
        "text-slate-100",
        "shadow-2xl shadow-black/50",
        "outline-none",
        "data-[state=open]:animate-in",
        "data-[state=closed]:animate-out",
        "data-[state=open]:fade-in-0",
        "data-[state=closed]:fade-out-0",
        "data-[state=open]:zoom-in-95",
        "data-[state=closed]:zoom-out-95",
    ],
    {
        variants: {
            size: {
                sm: "max-w-sm",
                md: "max-w-lg",
                lg: "max-w-2xl",
                xl: "max-w-4xl",
                full: "h-[calc(100vh-2rem)] max-w-[calc(100vw-2rem)]",
            },
        },
        defaultVariants: {
            size: "md",
        },
    }
);