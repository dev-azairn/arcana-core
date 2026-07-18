import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import type { ReactNode } from "react";

interface DropdownLabelProps {
    children: ReactNode;
}

export default function DropdownLabel({
    children,
}: DropdownLabelProps) {
    return (
        <DropdownMenu.Label
            className="
                px-3
                py-2
                text-xs
                font-semibold
                uppercase
                tracking-wide
                text-slate-500
            "
        >
            {children}
        </DropdownMenu.Label>
    );
}