import {
    Controller,
    type ControllerProps,
    type FieldPath,
    type FieldValues,
} from "react-hook-form";

import { FormFieldContext } from "./Form.types";

export default function FormField<
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>,
>({
    name,
    ...props
}: ControllerProps<TFieldValues, TName>) {
    return (
        <FormFieldContext.Provider
            value={{ name }}
        >
            <Controller
                name={name}
                {...props}
            />
        </FormFieldContext.Provider>
    );
}