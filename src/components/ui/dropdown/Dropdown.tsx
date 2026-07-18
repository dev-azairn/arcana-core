import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import type { ReactNode } from "react";

interface DropdownProps {
    children: ReactNode;
}

export default function Dropdown({
    children,
}: DropdownProps) {
    return (
        <DropdownMenu.Root>
            {children}
        </DropdownMenu.Root>
    );
}