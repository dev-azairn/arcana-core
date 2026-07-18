import { cva } from "class-variance-authority";

export const overlayVariants = cva(
    [
        "fixed",
        "inset-0",
        "z-40",
        "transition-all",
        "duration-200",

        "data-[state=open]:animate-in",
        "data-[state=closed]:animate-out",

        "data-[state=open]:fade-in-0",
        "data-[state=closed]:fade-out-0",
    ],
    {
        variants: {
            blur: {
                none: "",
                sm: "backdrop-blur-sm",
                md: "backdrop-blur-md",
                lg: "backdrop-blur-lg",
            },

            opacity: {
                light: "bg-black/40",
                default: "bg-black/60",
                heavy: "bg-black/80",
            },
        },

        defaultVariants: {
            blur: "sm",
            opacity: "default",
        },
    }
);