import type { ReactNode } from "react";

interface DropdownShortcutProps {
    children: ReactNode;
}

export default function DropdownShortcut({
    children,
}: DropdownShortcutProps) {
    return (
        <span className="ml-auto text-xs text-slate-500">
            {children}
        </span>
    );
}