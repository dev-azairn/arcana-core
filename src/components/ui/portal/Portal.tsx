import { createPortal } from "react-dom";

import type { PortalProps } from "./Portal.types";

export default function Portal({
    children,
    container,
    disabled = false,
}: PortalProps) {
    if (disabled || typeof document === "undefined") {
        return <>{children}</>;
    }

    return createPortal(
        children,
        container ?? document.body
    );
}