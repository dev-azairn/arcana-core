import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

import { cn } from "@/utils";

import { drawerVariants } from "./Drawer.styles";
import type { DrawerProps } from "./Drawer.types";

export default function Drawer({
    open,
    defaultOpen,
    onOpenChange,
    trigger,
    title,
    description,
    children,
    footer,
    side = "right",
    showCloseButton = true,
    closeOnOverlayClick = true,
    contentClassName,
}: DrawerProps) {
    return (
        <Dialog.Root
            open={open}
            defaultOpen={defaultOpen}
            onOpenChange={onOpenChange}
        >
            {trigger && (
                <Dialog.Trigger asChild>
                    {trigger}
                </Dialog.Trigger>
            )}

            <Dialog.Portal>
                <Dialog.Overlay
                    className="
                        fixed inset-0 z-40
                        bg-black/60 backdrop-blur-sm
                    "
                />

                <Dialog.Content
                    className={cn(
                        drawerVariants({ side }),
                        "flex flex-col",
                        contentClassName
                    )}
                    onPointerDownOutside={(event) => {
                        if (!closeOnOverlayClick) {
                            event.preventDefault();
                        }
                    }}
                >
                    {(title || description) && (
                        <header className="relative border-b border-slate-800 px-6 py-5">
                            {title && (
                                <Dialog.Title className="text-lg font-semibold">
                                    {title}
                                </Dialog.Title>
                            )}

                            {description && (
                                <Dialog.Description className="mt-1 text-sm text-slate-400">
                                    {description}
                                </Dialog.Description>
                            )}

                            {showCloseButton && (
                                <Dialog.Close
                                    className="
                                        absolute
                                        right-4
                                        top-4
                                        rounded-lg
                                        p-2
                                        text-slate-400
                                        hover:bg-slate-800
                                        hover:text-white
                                    "
                                >
                                    <X size={18} />
                                </Dialog.Close>
                            )}
                        </header>
                    )}

                    <div className="flex-1 overflow-y-auto px-6 py-5">
                        {children}
                    </div>

                    {footer && (
                        <footer className="border-t border-slate-800 px-6 py-4">
                            {footer}
                        </footer>
                    )}
                </Dialog.Content>
            </Dialog.Portal>
        </Dialog.Root>
    );
}