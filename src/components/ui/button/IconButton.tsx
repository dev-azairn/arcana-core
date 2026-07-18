import { forwardRef } from "react";

import Button from "./Button";
import type { ButtonProps } from "./Button.types";

const IconButton = forwardRef<
    HTMLButtonElement,
    ButtonProps
>((props, ref) => {
    return (
        <Button
            ref={ref}
            size="icon"
            {...props}
        />
    );
});

IconButton.displayName = "IconButton";

export default IconButton;