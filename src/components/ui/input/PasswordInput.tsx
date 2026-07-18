import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

import Input from "./Input";
import type { InputProps } from "./Input.types";

export default function PasswordInput(
    props: InputProps
) {
    const [show, setShow] = useState(false);

    return (
        <Input
            {...props}
            type={show ? "text" : "password"}
            rightIcon={
                <button
                    type="button"
                    onClick={() => setShow(!show)}
                    className="cursor-pointer"
                >
                    {show ? (
                        <EyeOff size={18} />
                    ) : (
                        <Eye size={18} />
                    )}
                </button>
            }
        />
    );
}