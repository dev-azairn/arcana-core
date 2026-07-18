import type {
    ComponentPropsWithoutRef,
    ComponentRef,
} from "react";

import * as PopoverPrimitive from "@radix-ui/react-popover";

export type PopoverContentSide =
    | "top"
    | "right"
    | "bottom"
    | "left";

export type PopoverContentAlign =
    | "start"
    | "center"
    | "end";

export type PopoverContentProps =
    ComponentPropsWithoutRef<
        typeof PopoverPrimitive.Content
    > & {
        side?: PopoverContentSide;
        align?: PopoverContentAlign;
        sideOffset?: number;
        portal?: boolean;
    };

export type PopoverContentElement =
    ComponentRef<typeof PopoverPrimitive.Content>;