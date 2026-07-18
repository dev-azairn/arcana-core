import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import { cn } from "@/utils";

import {
    breadcrumbItemVariants,
    breadcrumbVariants,
} from "./Breadcrumb.styles";
import type { BreadcrumbProps } from "./Breadcrumb.types";

export default function Breadcrumb({
    items,
    separator,
    className,
}: BreadcrumbProps) {
    return (
        <nav
            aria-label="Breadcrumb"
            className={cn(
                breadcrumbVariants(),
                className
            )}
        >
            {items.map((item, index) => {
                const active =
                    index === items.length - 1;

                return (
                    <div
                        key={index}
                        className="flex items-center gap-2"
                    >
                        {item.href && !active ? (
                            <Link
                                to={item.href}
                                className={breadcrumbItemVariants({
                                    active: false,
                                })}
                            >
                                {item.icon}

                                <span>{item.label}</span>
                            </Link>
                        ) : (
                            <span
                                className={breadcrumbItemVariants({
                                    active: true,
                                })}
                            >
                                {item.icon}

                                <span>{item.label}</span>
                            </span>
                        )}

                        {!active &&
                            (separator ?? (
                                <ChevronRight
                                    size={16}
                                    className="text-slate-600"
                                />
                            ))}
                    </div>
                );
            })}
        </nav>
    );
}