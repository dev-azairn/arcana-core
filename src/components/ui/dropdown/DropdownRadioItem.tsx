import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

import { Circle } from "lucide-react";

interface DropdownRadioItemProps
    extends React.ComponentPropsWithoutRef<
        typeof DropdownMenu.RadioItem
    > {}

export default function DropdownRadioItem(
    props: DropdownRadioItemProps
) {
    return (
        <DropdownMenu.RadioItem
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
                <Circle size={10} fill="currentColor" />
            </DropdownMenu.ItemIndicator>

            {props.children}
        </DropdownMenu.RadioItem>
    );
}