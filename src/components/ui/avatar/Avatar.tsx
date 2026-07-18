import { forwardRef } from "react";

import { cn } from "@/utils";

import { avatarVariants } from "./Avatar.styles";
import type { AvatarProps } from "./Avatar.types";

const Avatar = forwardRef<HTMLDivElement, AvatarProps>(
    (
        {
            className,
            size,
            src,
            alt,
            name,
            online,
            level,
            ...props
        },
        ref
    ) => {
        const initials =
            name
                ?.split(" ")
                .map((x) => x[0])
                .join("")
                .substring(0, 2)
                .toUpperCase() ?? "?";

        return (
            <div
                ref={ref}
                className={cn(
                    avatarVariants({
                        size,
                    }),
                    className
                )}
                {...props}
            >
                {src ? (
                    <img
                        src={src}
                        alt={alt}
                        className="h-full w-full object-cover"
                    />
                ) : (
                    initials
                )}

                {online !== undefined && (
                    <span
                        className={cn(
                            "absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-slate-900",
                            online
                                ? "bg-emerald-500"
                                : "bg-slate-500"
                        )}
                    />
                )}

                {level !== undefined && (
                    <span
                        className="
                            absolute
                            -bottom-1
                            left-1/2
                            -translate-x-1/2
                            rounded-full
                            bg-gradient-to-r
                            from-indigo-600
                            to-purple-600
                            px-2
                            py-0.5
                            text-[10px]
                            font-bold
                            text-white
                            shadow-lg
                        "
                    >
                        Lv.{level}
                    </span>
                )}
            </div>
        );
    }
);

Avatar.displayName = "Avatar";

export default Avatar;