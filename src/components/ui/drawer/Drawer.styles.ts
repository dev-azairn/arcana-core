import { cva } from "class-variance-authority";

export const drawerVariants = cva(
    [
        "fixed",
        "z-50",
        "bg-slate-950",
        "border",
        "border-violet-500/20",
        "shadow-2xl",
        "text-slate-100",
        "outline-none",
    ],
    {
        variants: {
            side: {
                right:
                    "right-0 top-0 h-full w-full max-w-md border-l",

                left:
                    "left-0 top-0 h-full w-full max-w-md border-r",

                top:
                    "top-0 left-0 w-full max-h-[70vh] border-b",

                bottom:
                    "bottom-0 left-0 w-full max-h-[70vh] rounded-t-2xl border-t",
            },
        },

        defaultVariants: {
            side: "right",
        },
    }
);