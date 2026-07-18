import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import type { ReactNode } from "react";

import { cn } from "@/utils";

import { dropdownItemVariants } from "./Dropdown.styles";

interface DropdownItemProps
    extends Omit<
        React.ComponentPropsWithoutRef<
            typeof DropdownMenu.Item
        >,
        "children"
    > {
    children: ReactNode;

    icon?: ReactNode;

    danger?: boolean;
}

export default function DropdownItem({
    children,
    icon,
    danger,
    className,
    ...props
}: DropdownItemProps) {
    return (
        <DropdownMenu.Item
            className={cn(
                dropdownItemVariants(),
                danger &&
                    "text-red-400 focus:bg-red-500/10",
                className
            )}
            {...props}
        >
            {icon}

            {children}
        </DropdownMenu.Item>
    );
}