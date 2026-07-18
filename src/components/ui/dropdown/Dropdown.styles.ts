import { cva } from "class-variance-authority";

export const dropdownContentVariants = cva([
    "z-50",
    "min-w-52",
    "overflow-hidden",
    "rounded-xl",
    "border",
    "border-violet-500/20",
    "bg-slate-950",
    "p-1",
    "shadow-xl",
]);

export const dropdownItemVariants = cva([
    "flex",
    "cursor-pointer",
    "items-center",
    "gap-3",
    "rounded-lg",
    "px-3",
    "py-2",
    "text-sm",
    "text-slate-200",
    "outline-none",
    "transition-colors",
    "hover:bg-slate-800",
    "focus:bg-slate-800",
]);