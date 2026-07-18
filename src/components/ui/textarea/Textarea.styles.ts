import { cva } from "class-variance-authority";

export const textareaVariants = cva(
    [
        "w-full",
        "rounded-2xl",
        "border",
        "bg-slate-900/70",
        "px-4",
        "py-3",
        "text-slate-100",
        "placeholder:text-slate-500",
        "transition-all",
        "outline-none",
        "focus:ring-2",
        "disabled:opacity-50",
        "disabled:cursor-not-allowed",
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

            resize: {
                true: "resize-y",

                false: "resize-none",
            },
        },

        defaultVariants: {
            variant: "default",

            resize: false,
        },
    }
);