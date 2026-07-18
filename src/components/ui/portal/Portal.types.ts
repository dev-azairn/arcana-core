import type { ReactNode } from "react";

export interface PortalProps {
    children: ReactNode;

    /**
     * Optional portal target.
     * Defaults to document.body.
     */
    container?: HTMLElement | null;

    /**
     * Prevents rendering the portal.
     */
    disabled?: boolean;
}