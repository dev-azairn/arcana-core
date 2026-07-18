import { X } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { cn } from "@/utils";

import { dialogContentVariants } from "./Dialog.styles";
import type { DialogProps } from "./Dialog.types";

export default function Dialog({
    open,
    defaultOpen,
    onOpenChange,
    trigger,
    title,
    description,
    children,
    footer,
    size = "md",
    closeOnOverlayClick = true,
    showCloseButton = true,
    contentClassName,
}: DialogProps) {
    return (
        <DialogPrimitive.Root
            open={open}
            defaultOpen={defaultOpen}
            onOpenChange={onOpenChange}
        >
            {trigger && (
                <DialogPrimitive.Trigger asChild>
                    {trigger}
                </DialogPrimitive.Trigger>
            )}

            <DialogPrimitive.Portal>
                <DialogPrimitive.Overlay
                    className="
                        fixed inset-0 z-40
                        bg-black/70 backdrop-blur-sm
                        data-[state=open]:animate-in
                        data-[state=closed]:animate-out
                        data-[state=open]:fade-in-0
                        data-[state=closed]:fade-out-0
                    "
                />

                <DialogPrimitive.Content
                    className={cn(
                        dialogContentVariants({ size }),
                        contentClassName
                    )}
                    onPointerDownOutside={(event) => {
                        if (!closeOnOverlayClick) {
                            event.preventDefault();
                        }
                    }}
                >
                    {(title || description || showCloseButton) && (
                        <header className="border-b border-slate-800 px-6 py-5">
                            <div className="pr-10">
                                {title && (
                                    <DialogPrimitive.Title className="text-lg font-semibold text-white">
                                        {title}
                                    </DialogPrimitive.Title>
                                )}

                                {description && (
                                    <DialogPrimitive.Description className="mt-1 text-sm text-slate-400">
                                        {description}
                                    </DialogPrimitive.Description>
                                )}
                            </div>

                            {showCloseButton && (
                                <DialogPrimitive.Close
                                    className="
                                        absolute right-4 top-4
                                        inline-flex h-9 w-9
                                        items-center justify-center
                                        rounded-lg
                                        text-slate-400
                                        transition-colors
                                        hover:bg-slate-800
                                        hover:text-white
                                        focus-visible:outline-none
                                        focus-visible:ring-2
                                        focus-visible:ring-violet-500
                                    "
                                    aria-label="Close dialog"
                                >
                                    <X size={18} />
                                </DialogPrimitive.Close>
                            )}
                        </header>
                    )}

                    <div className="px-6 py-5">
                        {children}
                    </div>

                    {footer && (
                        <footer
                            className="
                                flex flex-wrap
                                items-center justify-end
                                gap-3
                                border-t border-slate-800
                                px-6 py-4
                            "
                        >
                            {footer}
                        </footer>
                    )}
                </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
        </DialogPrimitive.Root>
    );
}