import { cva } from "class-variance-authority";

export const badgeVariants = cva(
    [
        "inline-flex",
        "items-center",
        "gap-1.5",
        "rounded-full",
        "font-medium",
        "transition-colors",
        "select-none",
        "whitespace-nowrap",
    ],
    {
        variants: {
            variant: {
                primary:
                    "bg-violet-600/20 text-violet-300 border border-violet-500/30",

                secondary:
                    "bg-slate-700/40 text-slate-300 border border-slate-600",

                success:
                    "bg-emerald-600/20 text-emerald-300 border border-emerald-500/30",

                danger:
                    "bg-red-600/20 text-red-300 border border-red-500/30",

                warning:
                    "bg-amber-500/20 text-amber-300 border border-amber-400/30",

                info:
                    "bg-sky-500/20 text-sky-300 border border-sky-400/30",

                outline:
                    "border border-violet-500/40 text-violet-300",

                gradient:
                    "bg-gradient-to-r from-indigo-600 to-purple-600 text-white",
            },

            size: {
                sm: "px-2 py-0.5 text-xs",

                md: "px-3 py-1 text-sm",

                lg: "px-4 py-1.5 text-base",
            },
        },

        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    }
);