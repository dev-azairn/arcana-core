import {
    cloneElement,
    isValidElement,
    useContext,
    type ReactElement,
    type ReactNode,
} from "react";

import { FormItemContext } from "./FormItem";

interface FormControlChildProps {
    id?: string;
    "aria-describedby"?: string;
    "aria-invalid"?: boolean;
}

interface FormControlProps {
    children: ReactNode;
}

export default function FormControl({
    children,
}: FormControlProps) {
    const id = useContext(FormItemContext);

    if (!isValidElement(children)) {
        return null;
    }

    const child =
        children as ReactElement<FormControlChildProps>;

    return cloneElement(child, {
        id,
    });
}