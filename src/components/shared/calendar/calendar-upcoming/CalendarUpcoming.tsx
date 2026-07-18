import * as React from "react";
import {
  CalendarDays,
  Clock3,
} from "lucide-react";

import { cn } from "@/utils";

import type {
  CalendarUpcomingProps,
} from "./CalendarUpcoming.types";

function formatEventDate(date: Date): string {
  const today = new Date();
  const tomorrow = new Date();

  today.setHours(0, 0, 0, 0);

  tomorrow.setDate(today.getDate() + 1);
  tomorrow.setHours(0, 0, 0, 0);

  const eventDate = new Date(date);
  eventDate.setHours(0, 0, 0, 0);

  if (eventDate.getTime() === today.getTime()) {
    return "Today";
  }

  if (eventDate.getTime() === tomorrow.getTime()) {
    return "Tomorrow";
  }

  return date.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
  });
}

function formatEventTime(
  startTime?: string,
  endTime?: string,
): string | undefined {
  if (!startTime && !endTime) {
    return undefined;
  }

  if (startTime && endTime) {
    return `${startTime} – ${endTime}`;
  }

  return startTime ?? endTime;
}

const CalendarUpcoming = React.forwardRef<
  HTMLDivElement,
  CalendarUpcomingProps
>(
  (
    {
      title = "Upcoming",
      events = [],
      maxItems = 5,
      emptyMessage = "No upcoming events",
      onEventSelect,
      action,
      className,
      ...props
    },
    ref,
  ) => {
    const visibleEvents = React.useMemo(
      () =>
        [...events]
          .sort(
            (left, right) =>
              left.date.getTime() -
              right.date.getTime(),
          )
          .slice(0, maxItems),
      [events, maxItems],
    );

    return (
      <section
        ref={ref}
        className={cn(
          "rounded-xl border border-border",
          "bg-card text-card-foreground",
          className,
        )}
        {...props}
      >
        <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <CalendarDays
              aria-hidden="true"
              className="h-4 w-4 shrink-0 text-primary"
            />

            <h2 className="truncate text-sm font-semibold">
              {title}
            </h2>
          </div>

          {action}
        </header>

        {visibleEvents.length === 0 ? (
          <div className="px-4 py-8 text-center">
            <CalendarDays
              aria-hidden="true"
              className="mx-auto h-8 w-8 text-muted-foreground/50"
            />

            <p className="mt-2 text-sm text-muted-foreground">
              {emptyMessage}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {visibleEvents.map((event) => {
              const time = formatEventTime(
                event.startTime,
                event.endTime,
              );

              return (
                <button
                  key={event.id}
                  type="button"
                  disabled={event.disabled}
                  onClick={() =>
                    onEventSelect?.(event)
                  }
                  className={cn(
                    "flex w-full items-start gap-3 px-4 py-3",
                    "text-left transition-colors",
                    "hover:bg-muted/40",
                    "focus-visible:outline-none",
                    "focus-visible:ring-2",
                    "focus-visible:ring-inset",
                    "focus-visible:ring-primary",
                    "disabled:pointer-events-none",
                    "disabled:opacity-50",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                      "bg-primary",
                      event.indicatorClassName,
                    )}
                  />

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">
                      {event.title}
                    </span>

                    <span className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
                      <span>
                        {formatEventDate(event.date)}
                      </span>

                      {time && (
                        <span className="flex items-center gap-1">
                          <Clock3
                            aria-hidden="true"
                            className="h-3 w-3"
                          />

                          {time}
                        </span>
                      )}
                    </span>

                    {event.description && (
                      <span className="mt-1 block line-clamp-2 text-xs text-muted-foreground">
                        {event.description}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </section>
    );
  },
);

CalendarUpcoming.displayName =
  "CalendarUpcoming";

export { CalendarUpcoming };
