import * as React from "react";

import { cn } from "@/utils";

import type { CalendarDayCellProps } from "./CalendarDayCell.types";
import { CalendarMoreEvents } from "../calendar-more-events";

const CalendarDayCell = React.forwardRef<
  HTMLButtonElement,
  CalendarDayCellProps
>(
  (
    {
      date,
      events = [],
      selected = false,
      today = false,
      outsideMonth = false,
      maxVisibleEvents = 3,
      disabled,
      className,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const visibleEvents = events.slice(
      0,
      maxVisibleEvents,
    );

    const hiddenEvents = events.slice(
      maxVisibleEvents,
    );

    const moreEvents = hiddenEvents.map((event) => ({
      id: event.id,
      title: event.title ?? "Untitled event",
      indicatorClassName: event.colorClassName,
    }));


    const dateLabel = date.toLocaleDateString(
      undefined,
      {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      },
    );

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled}
        aria-label={dateLabel}
        aria-pressed={selected}
        className={cn(
          "group relative flex min-h-28 w-full flex-col",
          "rounded-lg border border-border p-2 text-left",
          "bg-card text-card-foreground",
          "transition-colors",
          "hover:border-primary/50 hover:bg-muted/30",
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-primary",
          "disabled:pointer-events-none disabled:opacity-50",

          outsideMonth &&
            "bg-muted/10 text-muted-foreground opacity-60",

          selected &&
            "border-primary bg-primary/5 ring-1 ring-primary",

          className,
        )}
        {...props}
      >
        <span className="flex items-center justify-between">
          <span
            className={cn(
              "flex h-7 min-w-7 items-center justify-center",
              "rounded-full px-1.5 text-sm font-medium",

              today &&
                !selected &&
                "bg-primary/10 text-primary",

              selected &&
                "bg-primary text-primary-foreground",
            )}
          >
            {date.getDate()}
          </span>

          {events.length > 0 && (
            <span className="text-xs text-muted-foreground">
              {events.length}
            </span>
          )}
        </span>

        <span className="mt-2 flex min-w-0 flex-1 flex-col gap-1">
          {visibleEvents.map((event) => (
            <span
              key={event.id}
              className={cn(
                "flex min-w-0 items-center gap-1.5",
                "rounded px-1.5 py-1",
                "bg-muted/40 text-xs",
              )}
            >
              <span
                aria-hidden="true"
                className={cn(
                  "h-1.5 w-1.5 shrink-0 rounded-full",
                  event.colorClassName ??
                    "bg-primary",
                )}
              />

              {event.title && (
                <span className="truncate">
                  {event.title}
                </span>
              )}
            </span>
          ))}

          {hiddenEvents.length > 0 && (
            <CalendarMoreEvents
              events={moreEvents}
            />
          )}
        </span>
      </button>
    );
  },
);

CalendarDayCell.displayName =
  "CalendarDayCell";

export { CalendarDayCell };