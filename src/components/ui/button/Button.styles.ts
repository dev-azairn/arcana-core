import { cva } from "class-variance-authority";

export const buttonVariants = cva(
    [
        "inline-flex",
        "items-center",
        "justify-center",
        "gap-2",
        "rounded-2xl",
        "font-medium",
        "transition-all",
        "duration-200",
        "select-none",
        "disabled:pointer-events-none",
        "disabled:opacity-50",
        "focus-visible:outline-none",
        "focus-visible:ring-2",
        "focus-visible:ring-violet-500",
    ],
    {
        variants: {
            variant: {
                primary:
                    "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:brightness-110",

                secondary:
                    "bg-slate-800 text-white hover:bg-slate-700",

                outline:
                    "border border-violet-700 bg-transparent hover:bg-violet-950",

                ghost:
                    "bg-transparent hover:bg-violet-900/40",

                danger:
                    "bg-red-600 text-white hover:bg-red-700",

                success:
                    "bg-emerald-600 text-white hover:bg-emerald-700",

                warning:
                    "bg-amber-500 text-black hover:bg-amber-400",
            },

            size: {
                sm: "h-9 px-3 text-sm",

                md: "h-11 px-5",

                lg: "h-12 px-7 text-lg",

                xl: "h-14 px-9 text-xl",

                icon: "h-11 w-11 p-0",
            },

            fullWidth: {
                true: "w-full",
                false: "",
            },
        },

        defaultVariants: {
            variant: "primary",
            size: "md",
            fullWidth: false,
        },
    }
);