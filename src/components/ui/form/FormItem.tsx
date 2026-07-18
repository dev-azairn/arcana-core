import { createContext, useId } from "react";

export const FormItemContext =
    createContext("");

export default function FormItem({
    children,
}: React.PropsWithChildren) {
    const id = useId();

    return (
        <FormItemContext.Provider
            value={id}
        >
            <div className="space-y-2">
                {children}
            </div>
        </FormItemContext.Provider>
    );
}