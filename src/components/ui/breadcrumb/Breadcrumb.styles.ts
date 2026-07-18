import { cva } from "class-variance-authority";

export const breadcrumbVariants = cva([
    "flex",
    "items-center",
    "gap-2",
    "text-sm",
    "text-slate-400",
]);

export const breadcrumbItemVariants = cva(
    [
        "flex",
        "items-center",
        "gap-1.5",
        "transition-colors",
    ],
    {
        variants: {
            active: {
                true: "font-semibold text-white",
                false: "hover:text-violet-300",
            },
        },
        defaultVariants: {
            active: false,
        },
    }
);