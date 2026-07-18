import { cva } from "class-variance-authority";

export const avatarVariants = cva(
    [
        "relative",
        "inline-flex",
        "items-center",
        "justify-center",
        "overflow-hidden",
        "rounded-full",
        "border-2",
        "border-violet-500/30",
        "bg-slate-800",
        "font-semibold",
        "text-white",
        "select-none",
    ],
    {
        variants: {
            size: {
                xs: "h-8 w-8 text-xs",

                sm: "h-10 w-10 text-sm",

                md: "h-12 w-12 text-base",

                lg: "h-16 w-16 text-lg",

                xl: "h-20 w-20 text-xl",

                "2xl": "h-28 w-28 text-3xl",
            },
        },

        defaultVariants: {
            size: "md",
        },
    }
);