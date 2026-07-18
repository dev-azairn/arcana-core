import * as React from "react";

import { cn } from "@/utils";

import type { CalendarGridProps } from "./CalendarGrid.types";

const DEFAULT_WEEKDAYS = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

const CalendarGrid = React.forwardRef<
  HTMLDivElement,
  CalendarGridProps
>(
  (
    {
      weekdayLabels = DEFAULT_WEEKDAYS,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-border bg-card",
          className,
        )}
        {...props}
      >
        <div className="grid grid-cols-7 border-b border-border">
          {weekdayLabels.map((day) => (
            <div
              key={day}
              className={cn(
                "flex h-12 items-center justify-center",
                "border-r border-border last:border-r-0",
                "text-sm font-semibold text-muted-foreground",
              )}
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {children}
        </div>
      </div>
    );
  },
);

CalendarGrid.displayName = "CalendarGrid";

export { CalendarGrid };