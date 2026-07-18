import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { Check } from "lucide-react";

interface DropdownCheckboxItemProps
    extends React.ComponentPropsWithoutRef<
        typeof DropdownMenu.CheckboxItem
    > {}

export default function DropdownCheckboxItem(
    props: DropdownCheckboxItemProps
) {
    return (
        <DropdownMenu.CheckboxItem
            className="
                relative
                flex
                cursor-pointer
                items-center
                rounded-lg
                py-2
                pl-8
                pr-3
                text-sm
                outline-none
                hover:bg-slate-800
            "
            {...props}
        >
            <DropdownMenu.ItemIndicator className="absolute left-2">
                <Check size={16} />
            </DropdownMenu.ItemIndicator>

            {props.children}
        </DropdownMenu.CheckboxItem>
    );
}