import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { dropdownContentVariants } from "./Dropdown.styles";

import { cn } from "@/utils";

import type { ComponentPropsWithoutRef } from "react";

interface DropdownContentProps
    extends ComponentPropsWithoutRef<
        typeof DropdownMenu.Content
    > {}

export default function DropdownContent({
    className,
    sideOffset = 8,
    ...props
}: DropdownContentProps) {
    return (
        <DropdownMenu.Portal>
            <DropdownMenu.Content
                sideOffset={sideOffset}
                className={cn(
                    dropdownContentVariants(),
                    className
                )}
                {...props}
            />
        </DropdownMenu.Portal>
    );
}