import * as React from "react";

import { cn } from "@/utils";

import {
  CalendarDayCell,
  type CalendarDayEvent,
} from "../calendar-day-cell";
import { CalendarGrid } from "../calendar-grid";

import type {
  CalendarMonthEvent,
  CalendarMonthViewProps,
} from "./CalendarMonthView.types";
import {
  getMonthGridDates,
  isSameDay,
} from "./CalendarMonthView.utils";

const SUNDAY_WEEKDAYS = [
  "Sun",
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
];

const MONDAY_WEEKDAYS = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

function getEventsForDate(
  date: Date,
  events: CalendarMonthEvent[],
): CalendarDayEvent[] {
  return events
    .filter((event) => isSameDay(event.date, date))
    .map(({ id, title: label, colorClassName }) => ({
      id,
      label,
      colorClassName,
    }));
}

const CalendarMonthView = React.forwardRef<
  HTMLDivElement,
  CalendarMonthViewProps
>(
  (
    {
      month,
      events = [],
      selectedDate,
      weekStartsOn = 1,
      maxVisibleEvents = 3,
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

    const gridDates = React.useMemo(
      () => getMonthGridDates(month, weekStartsOn),
      [month, weekStartsOn],
    );

    const weekdayLabels =
      weekStartsOn === 0
        ? SUNDAY_WEEKDAYS
        : MONDAY_WEEKDAYS;

    return (
      <div
        ref={ref}
        className={cn("min-w-0", className)}
        {...props}
      >
        <CalendarGrid weekdayLabels={weekdayLabels}>
          {gridDates.map((date) => {
            const dateEvents = getEventsForDate(
              date,
              events,
            );

            return (
              <CalendarDayCell
                key={date.toISOString()}
                date={date}
                events={dateEvents}
                today={isSameDay(date, today)}
                selected={
                  selectedDate
                    ? isSameDay(date, selectedDate)
                    : false
                }
                outsideMonth={
                  date.getMonth() !== month.getMonth()
                }
                maxVisibleEvents={maxVisibleEvents}
                onClick={() => onDateSelect?.(date)}
                className={cn(
                  "min-h-32 rounded-none border-0",
                  "border-b border-r border-border",
                  "[&:nth-child(7n)]:border-r-0",
                  "[&:nth-last-child(-n+7)]:border-b-0",
                )}
              />
            );
          })}
        </CalendarGrid>
      </div>
    );
  },
);

CalendarMonthView.displayName =
  "CalendarMonthView";

export { CalendarMonthView };
