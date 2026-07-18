import * as Dialog from "@radix-ui/react-dialog";

import { cn } from "@/utils";

import { overlayVariants } from "./Overlay.styles";
import type { OverlayProps } from "./Overlay.types";

export default function Overlay({
    blur,
    opacity,
    className,
    ...props
}: OverlayProps) {
    return (
        <Dialog.Overlay
            className={cn(
                overlayVariants({
                    blur,
                    opacity,
                }),
                className
            )}
            {...props}
        />
    );
}