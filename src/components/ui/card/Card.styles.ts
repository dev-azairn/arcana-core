import { cva } from "class-variance-authority";

export const cardVariants = cva(
    [
       "rounded-3xl",
        "border",
        "overflow-hidden",
        "transition-all",
        "duration-200",
        "text-white",
    ],
    {
        variants: {
            variant: {
                default:
                    "bg-slate-800 border border-violet-500/20 shadow-lg",

                glass:
                    "bg-slate-800/70 backdrop-blur-xl border border-violet-400/20",

                outline:
                    "bg-slate-900 border border-violet-500/30",

                elevated:
                    "bg-slate-800 shadow-2xl border border-violet-500/10",

                gradient:
                    "bg-gradient-to-br from-indigo-700 via-indigo-800 to-purple-800 border border-violet-400/30",
            },

            padding: {
                none: "",

                sm: "p-3",

                md: "p-5",

                lg: "p-6",

                xl: "p-8",
            },
        },

        defaultVariants: {
            variant: "default",
            padding: "md",
        },
    }
);