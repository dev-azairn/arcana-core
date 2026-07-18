import {
    useContext,
} from "react";

import { FormItemContext } from "./FormItem";

export default function FormLabel({
    children,
}: React.PropsWithChildren) {
    const id =
        useContext(FormItemContext);

    return (
        <label
            htmlFor={id}
            className="text-sm font-medium text-slate-200"
        >
            {children}
        </label>
    );
}