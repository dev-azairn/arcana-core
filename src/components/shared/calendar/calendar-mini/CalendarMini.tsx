import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { cn } from "@/utils";
import { Button } from "@ui/button";

import type { CalendarMiniProps } from "./CalendarMini.types";
import {
  addMonths,
  getMiniCalendarDates,
  isSameDay,
} from "./CalendarMini.utils";

const SUNDAY_WEEKDAYS = [
  "Su",
  "Mo",
  "Tu",
  "We",
  "Th",
  "Fr",
  "Sa",
];

const MONDAY_WEEKDAYS = [
  "Mo",
  "Tu",
  "We",
  "Th",
  "Fr",
  "Sa",
  "Su",
];

const CalendarMini = React.forwardRef<
  HTMLDivElement,
  CalendarMiniProps
>(
  (
    {
      month,
      selectedDate,
      weekStartsOn = 1,
      onMonthChange,
      onDateSelect,
      className,
      ...props
    },
    ref,
  ) => {
    const today = React.useMemo(
      () => new Date(),
      [],
    );

    const dates = React.useMemo(
      () =>
        getMiniCalendarDates(
          month,
          weekStartsOn,
        ),
      [month, weekStartsOn],
    );

    const weekdayLabels =
      weekStartsOn === 0
        ? SUNDAY_WEEKDAYS
        : MONDAY_WEEKDAYS;

    const monthLabel = month.toLocaleDateString(
      undefined,
      {
        month: "long",
        year: "numeric",
      },
    );

    return (
      <div
        ref={ref}
        className={cn(
          "w-full rounded-xl border border-border",
          "bg-card p-4 text-card-foreground",
          className,
        )}
        {...props}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold">
            {monthLabel}
          </h3>

          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Previous month"
              onClick={() =>
                onMonthChange?.(
                  addMonths(month, -1),
                )
              }
            >
              <ChevronLeft
                aria-hidden="true"
                className="h-4 w-4"
              />
            </Button>

            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Next month"
              onClick={() =>
                onMonthChange?.(
                  addMonths(month, 1),
                )
              }
            >
              <ChevronRight
                aria-hidden="true"
                className="h-4 w-4"
              />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-1">
          {weekdayLabels.map((weekday) => (
            <span
              key={weekday}
              className={cn(
                "flex h-8 items-center justify-center",
                "text-xs font-medium",
                "text-muted-foreground",
              )}
            >
              {weekday}
            </span>
          ))}

          {dates.map((date) => {
            const outsideMonth =
              date.getMonth() !== month.getMonth();

            const selected = selectedDate
              ? isSameDay(date, selectedDate)
              : false;

            const isToday = isSameDay(date, today);

            return (
              <button
                key={date.toISOString()}
                type="button"
                aria-label={date.toLocaleDateString(
                  undefined,
                  {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  },
                )}
                aria-pressed={selected}
                onClick={() => onDateSelect?.(date)}
                className={cn(
                  "flex h-8 w-8 items-center justify-center",
                  "rounded-md text-xs transition-colors",
                  "hover:bg-muted",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-primary",
                  outsideMonth &&
                    "text-muted-foreground/50",
                  isToday &&
                    !selected &&
                    "bg-primary/10 font-semibold text-primary",
                  selected &&
                    "bg-primary font-semibold text-primary-foreground",
                )}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>
    );
  },
);

CalendarMini.displayName = "CalendarMini";

export { CalendarMini };