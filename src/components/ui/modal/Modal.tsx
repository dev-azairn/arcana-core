import * as DialogPrimitive from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/utils";
import { Overlay } from "@/components/ui/overlay";
import { Portal } from "@/components/ui/portal";

import type {
    ModalProps,
    ModalSize,
} from "./Modal.types";

const sizeClasses: Record<ModalSize, string> = {
    sm: "max-w-sm",
    md: "max-w-lg",
    lg: "max-w-2xl",
    xl: "max-w-4xl",
    full: "max-w-[calc(100vw-2rem)]",
};

export default function Modal({
    open,
    onOpenChange,
    title,
    description,
    children,
    footer,
    size = "md",
    showCloseButton = true,
    closeOnOverlayClick = true,
    contentClassName,
}: ModalProps) {
    return (
        <DialogPrimitive.Root
            open={open}
            onOpenChange={onOpenChange}
        >
            <Portal>
                <Overlay />

                <DialogPrimitive.Content
                    onPointerDownOutside={(event) => {
                        if (!closeOnOverlayClick) {
                            event.preventDefault();
                        }
                    }}
                    className={cn(
                        "fixed left-1/2 top-1/2 z-50",
                        "w-[calc(100%-2rem)] -translate-x-1/2 -translate-y-1/2",
                        "overflow-hidden rounded-2xl border border-slate-700/70",
                        "bg-slate-950 text-slate-100 shadow-2xl",
                        "focus:outline-none",
                        sizeClasses[size],
                        contentClassName
                    )}
                >
                    {(title ||
                        description ||
                        showCloseButton) && (
                        <header className="relative border-b border-slate-800 px-6 py-5">
                            {title && (
                                <DialogPrimitive.Title className="pr-10 text-lg font-semibold">
                                    {title}
                                </DialogPrimitive.Title>
                            )}

                            {description && (
                                <DialogPrimitive.Description className="mt-1 pr-10 text-sm text-slate-400">
                                    {description}
                                </DialogPrimitive.Description>
                            )}

                            {showCloseButton && (
                                <DialogPrimitive.Close
                                    aria-label="Close modal"
                                    className={cn(
                                        "absolute right-4 top-4",
                                        "rounded-lg p-2 text-slate-400",
                                        "transition-colors hover:bg-slate-800 hover:text-white",
                                        "focus-visible:outline-none focus-visible:ring-2",
                                        "focus-visible:ring-indigo-500"
                                    )}
                                >
                                    <X className="h-4 w-4" />
                                </DialogPrimitive.Close>
                            )}
                        </header>
                    )}

                    <div className="max-h-[75vh] overflow-y-auto px-6 py-5">
                        {children}
                    </div>

                    {footer && (
                        <footer className="flex items-center justify-end gap-3 border-t border-slate-800 px-6 py-4">
                            {footer}
                        </footer>
                    )}
                </DialogPrimitive.Content>
            </Portal>
        </DialogPrimitive.Root>
    );
}