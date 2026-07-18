import * as React from "react";

import { cn } from "@/utils";

import type {
  CalendarWeekRowDay,
  CalendarWeekRowProps,
} from "./CalendarWeekRow.types";

import {
  formatAccessibleDate,
  formatDayNumber,
  formatWeekday,
  isSameCalendarDate,
} from "./CalendarWeekRow.utils";

const CalendarWeekRow = React.forwardRef<
  HTMLDivElement,
  CalendarWeekRowProps
>(
  (
    {
      days,
      selectedDate,
      showWeekday = true,
      showEventCount = true,
      onDaySelect,
      className,
      ...props
    },
    ref,
  ) => {
    function handleDaySelect(
      day: CalendarWeekRowDay,
    ) {
      if (day.disabled) {
        return;
      }

      onDaySelect?.(day);
    }

    return (
      <div
        ref={ref}
        role="group"
        aria-label="Calendar week"
        className={cn(
          "grid grid-cols-7 overflow-hidden",
          "rounded-xl border border-border",
          "bg-card text-card-foreground",
          className,
        )}
        {...props}
      >
        {days.map((day) => {
          const selected =
            day.selected ||
            Boolean(
              selectedDate &&
                isSameCalendarDate(
                  day.date,
                  selectedDate,
                ),
            );

          const interactive = Boolean(onDaySelect);

          return (
            <button
              key={day.id}
              type="button"
              disabled={
                day.disabled || !interactive
              }
              aria-label={formatAccessibleDate(
                day.date,
              )}
              aria-pressed={
                interactive ? selected : undefined
              }
              onClick={() => handleDaySelect(day)}
              className={cn(
                "relative flex min-w-0 flex-col",
                "items-center justify-center",
                "border-r border-border",
                "px-1 py-3 text-center",
                "last:border-r-0",
                "transition-colors",
                interactive &&
                  "hover:bg-muted/50",
                selected && "bg-primary/10",
                day.outsideRange &&
                  "text-muted-foreground/50",
                "focus-visible:z-10",
                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-inset",
                "focus-visible:ring-primary",
                "disabled:cursor-default",
                day.disabled && "opacity-50",
                day.className,
              )}
            >
              {showWeekday && (
                <span
                  className={cn(
                    "truncate text-[11px]",
                    "font-medium uppercase",
                    "tracking-wide",
                    day.today
                      ? "text-primary"
                      : "text-muted-foreground",
                  )}
                >
                  {day.label ??
                    formatWeekday(day.date)}
                </span>
              )}

              <span
                className={cn(
                  "mt-1 flex h-8 w-8 items-center",
                  "justify-center rounded-full",
                  "text-sm font-semibold",
                  selected &&
                    "bg-primary text-primary-foreground",
                  day.today &&
                    !selected &&
                    "border border-primary text-primary",
                )}
              >
                {formatDayNumber(day.date)}
              </span>

              {day.sublabel && (
                <span className="mt-1 max-w-full truncate text-[10px] text-muted-foreground">
                  {day.sublabel}
                </span>
              )}

              {showEventCount &&
                Boolean(day.eventCount) && (
                  <span className="mt-1 flex items-center gap-1">
                    <span
                      aria-hidden="true"
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        "bg-primary",
                        day.indicatorClassName,
                      )}
                    />

                    <span className="text-[10px] text-muted-foreground">
                      {day.eventCount}
                    </span>
                  </span>
                )}
            </button>
          );
        })}
      </div>
    );
  },
);

CalendarWeekRow.displayName =
  "CalendarWeekRow";

export { CalendarWeekRow };