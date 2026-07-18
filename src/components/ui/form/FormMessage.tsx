import {
    useFormContext,
} from "react-hook-form";

import {
    useFormField,
} from "./Form.types";

export default function FormMessage() {
    const { name } =
        useFormField();

    const {
        formState: { errors },
    } = useFormContext();

    const error =
        errors[name];

    if (!error) return null;

    return (
        <p className="text-sm text-red-400">
            {String(error.message)}
        </p>
    );
}