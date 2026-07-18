import type { ComponentPropsWithoutRef } from "react";
import type { VariantProps } from "class-variance-authority";

import  { overlayVariants } from "./Overlay.styles";

export interface OverlayProps
    extends ComponentPropsWithoutRef<"div">,
        VariantProps<typeof overlayVariants> {}