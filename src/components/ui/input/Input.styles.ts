import { cva } from "class-variance-authority";

export const inputVariants = cva(
    [
        "w-full",
        "rounded-2xl",
        "border",
        "bg-slate-900/70",
        "px-4",
        "text-slate-100",
        "placeholder:text-slate-500",
        "transition-all",
        "outline-none",
        "focus:ring-2",
        "disabled:opacity-50",
    ],
    {
        variants: {
            variant: {
                default:
                    "border-violet-500/20 focus:border-violet-500 focus:ring-violet-500/30",

                error:
                    "border-red-500 focus:border-red-500 focus:ring-red-500/30",

                success:
                    "border-emerald-500 focus:border-emerald-500 focus:ring-emerald-500/30",
            },

            size: {
                sm: "h-9 text-sm",

                md: "h-11",

                lg: "h-12 text-lg",
            },
        },

        defaultVariants: {
            variant: "default",

            size: "md",
        },
    }
);