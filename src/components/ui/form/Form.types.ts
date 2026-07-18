import {
    createContext,
    useContext,
} from "react";
import type { FieldPath, FieldValues } from "react-hook-form";

interface FormFieldContextValue {
    name: FieldPath<FieldValues>;
}

export const FormFieldContext =
    createContext<FormFieldContextValue | null>(null);

export function useFormField() {
    const context = useContext(FormFieldContext);

    if (!context) {
        throw new Error(
            "useFormField must be used inside FormField."
        );
    }

    return context;
}