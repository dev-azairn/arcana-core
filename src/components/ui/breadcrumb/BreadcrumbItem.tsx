import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
}

export default function BreadcrumbItem({
    children,
}: Props) {
    return (
        <div className="flex items-center gap-2">
            {children}
        </div>
    );
}