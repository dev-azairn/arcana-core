import { cva } from "class-variance-authority";

export const checkboxVariants = cva(
    [
        "peer",
        "appearance-none",
        "shrink-0",
        "rounded-md",
        "border",
        "bg-slate-900/70",
        "transition-all",
        "outline-none",
        "cursor-pointer",

        "checked:border-violet-500",
        "checked:bg-violet-600",

        "focus-visible:ring-2",
        "focus-visible:ring-violet-500/40",
        "focus-visible:ring-offset-2",
        "focus-visible:ring-offset-slate-950",

        "disabled:cursor-not-allowed",
        "disabled:opacity-50",
    ],
    {
        variants: {
            variant: {
                default:
                    "border-slate-600 hover:border-violet-400",

                error:
                    "border-red-500 hover:border-red-400 focus-visible:ring-red-500/40",

                success:
                    "border-emerald-500 checked:border-emerald-500 checked:bg-emerald-600 focus-visible:ring-emerald-500/40",
            },

            size: {
                sm: "h-4 w-4",

                md: "h-5 w-5",

                lg: "h-6 w-6",
            },
        },

        defaultVariants: {
            variant: "default",

            size: "md",
        },
    }
);