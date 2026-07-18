import { cva } from "class-variance-authority";

export const loadingVariants = cva(
    "flex flex-col items-center justify-center gap-3",
    {
        variants: {
            size: {
                sm: "",
                md: "",
                lg: "",
            },
            fullscreen: {
                true: "fixed inset-0 z-50",
                false: "",
            },
            overlay: {
                true: "bg-black/50 backdrop-blur-sm",
                false: "",
            },
        },
        defaultVariants: {
            size: "md",
            fullscreen: false,
            overlay: false,
        },
    }
);

export const spinnerVariants = cva(
    "animate-spin rounded-full border-current border-t-transparent",
    {
        variants: {
            size: {
                sm: "h-4 w-4 border-2",
                md: "h-8 w-8 border-[3px]",
                lg: "h-12 w-12 border-4",
            },
        },
        defaultVariants: {
            size: "md",
        },
    }
);