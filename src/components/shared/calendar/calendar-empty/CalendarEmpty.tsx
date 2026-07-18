import * as React from "react";
import { CalendarDays } from "lucide-react";

import { cn } from "@/utils";

import type { CalendarEmptyProps } from "./CalendarEmpty.types";

const CalendarEmpty = React.forwardRef<
  HTMLDivElement,
  CalendarEmptyProps
>(
  (
    {
      title = "No calendar events",
      description = "There are no events to display for this period.",
      icon,
      action,
      compact = false,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        role="status"
        className={cn(
          "flex w-full flex-col items-center justify-center text-center",
          "rounded-xl border border-dashed border-border",
          "bg-card text-card-foreground",
          compact ? "min-h-40 p-5" : "min-h-72 p-8",
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            "flex items-center justify-center rounded-full",
            "bg-muted text-muted-foreground",
            compact ? "h-10 w-10" : "h-12 w-12",
          )}
        >
          {icon ?? (
            <CalendarDays
              aria-hidden="true"
              className={cn(
                compact ? "h-5 w-5" : "h-6 w-6",
              )}
            />
          )}
        </div>

        <h3
          className={cn(
            "font-semibold",
            compact ? "mt-3 text-sm" : "mt-4 text-base",
          )}
        >
          {title}
        </h3>

        {description && (
          <p
            className={cn(
              "max-w-sm text-muted-foreground",
              compact
                ? "mt-1 text-xs"
                : "mt-2 text-sm",
            )}
          >
            {description}
          </p>
        )}

        {action && (
          <div className={compact ? "mt-3" : "mt-5"}>
            {action}
          </div>
        )}
      </div>
    );
  },
);

CalendarEmpty.displayName = "CalendarEmpty";

export { CalendarEmpty };