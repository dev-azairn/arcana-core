import * as React from "react";
import {
  CalendarDays,
  Clock3,
} from "lucide-react";

import { cn } from "@/utils";

import type {
  CalendarDayViewEvent,
  CalendarDayViewProps,
} from "./CalendarDayView.types";

import {
  createDateAtMinutes,
  formatEventTime,
  formatHour,
  getMinutesFromStartOfDay,
  isSameDay,
} from "./CalendarDayView.utils";

const CalendarDayView = React.forwardRef<
  HTMLDivElement,
  CalendarDayViewProps
>(
  (
    {
      date,
      events = [],
      startHour = 0,
      endHour = 24,
      hourHeight = 72,
      showCurrentTime = true,
      emptyMessage = "No events scheduled for this day.",
      onEventSelect,
      onTimeSelect,
      className,
      ...props
    },
    ref,
  ) => {
    const now = new Date();

    const visibleEvents = React.useMemo(
      () =>
        events
          .filter((event) => isSameDay(event.start, date))
          .sort(
            (left, right) =>
              left.start.getTime() -
              right.start.getTime(),
          ),
      [date, events],
    );

    const hours = React.useMemo(
      () =>
        Array.from(
          {
            length: Math.max(
              endHour - startHour,
              0,
            ),
          },
          (_, index) => startHour + index,
        ),
      [endHour, startHour],
    );

    const totalHeight =
      hours.length * hourHeight;

    const startMinutes = startHour * 60;
    const endMinutes = endHour * 60;

    const showNowLine =
      showCurrentTime &&
      isSameDay(now, date) &&
      getMinutesFromStartOfDay(now) >=
        startMinutes &&
      getMinutesFromStartOfDay(now) <=
        endMinutes;

    const currentTimeTop =
      ((getMinutesFromStartOfDay(now) -
        startMinutes) /
        60) *
      hourHeight;

    function getEventPosition(
      event: CalendarDayViewEvent,
    ) {
      const eventStart = Math.max(
        getMinutesFromStartOfDay(event.start),
        startMinutes,
      );

      const eventEnd = Math.min(
        getMinutesFromStartOfDay(event.end),
        endMinutes,
      );

      const top =
        ((eventStart - startMinutes) / 60) *
        hourHeight;

      const height = Math.max(
        ((eventEnd - eventStart) / 60) *
          hourHeight,
        28,
      );

      return {
        top,
        height,
      };
    }

    function handleTimeSelect(
      hour: number,
      event: React.MouseEvent<HTMLButtonElement>,
    ) {
      if (!onTimeSelect) {
        return;
      }

      const bounds =
        event.currentTarget.getBoundingClientRect();

      const offsetY =
        event.clientY - bounds.top;

      const minuteOffset = Math.round(
        (offsetY / hourHeight) * 60,
      );

      const selectedMinutes =
        hour * 60 + minuteOffset;

      onTimeSelect(
        createDateAtMinutes(
          date,
          selectedMinutes,
        ),
      );
    }

    return (
      <section
        ref={ref}
        className={cn(
          "overflow-hidden rounded-xl",
          "border border-border bg-card",
          "text-card-foreground",
          className,
        )}
        {...props}
      >
        <header className="flex items-center gap-3 border-b border-border px-4 py-3">
          <CalendarDays
            aria-hidden="true"
            className="h-5 w-5 text-primary"
          />

          <div>
            <h2 className="text-sm font-semibold">
              {date.toLocaleDateString(
                undefined,
                {
                  weekday: "long",
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                },
              )}
            </h2>

            <p className="text-xs text-muted-foreground">
              {visibleEvents.length}{" "}
              {visibleEvents.length === 1
                ? "event"
                : "events"}
            </p>
          </div>
        </header>

        {hours.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">
            {emptyMessage}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <div className="flex min-w-[640px]">
              <div
                className="w-20 shrink-0 border-r border-border"
                aria-hidden="true"
              >
                {hours.map((hour) => (
                  <div
                    key={hour}
                    style={{ height: hourHeight }}
                    className="relative border-b border-border"
                  >
                    <span className="absolute right-3 top-0 -translate-y-1/2 text-xs text-muted-foreground">
                      {formatHour(hour)}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="relative min-w-0 flex-1"
                style={{ height: totalHeight }}
              >
                {hours.map((hour) => (
                  <button
                    key={hour}
                    type="button"
                    aria-label={`Select ${formatHour(hour)}`}
                    onClick={(event) =>
                      handleTimeSelect(hour, event)
                    }
                    style={{ height: hourHeight }}
                    className={cn(
                      "block w-full border-b border-border",
                      "text-left transition-colors",
                      onTimeSelect &&
                        "hover:bg-muted/30",
                      "focus-visible:outline-none",
                      "focus-visible:ring-2",
                      "focus-visible:ring-inset",
                      "focus-visible:ring-primary",
                    )}
                  />
                ))}

                {visibleEvents.map((event) => {
                  const { top, height } =
                    getEventPosition(event);

                  const interactive =
                    Boolean(onEventSelect) &&
                    !event.disabled;

                  return (
                    <button
                      key={event.id}
                      type="button"
                      disabled={
                        event.disabled ||
                        !onEventSelect
                      }
                      onClick={() =>
                        onEventSelect?.(event)
                      }
                      style={{
                        top,
                        height,
                      }}
                      className={cn(
                        "absolute left-2 right-2",
                        "z-10 overflow-hidden rounded-lg",
                        "border border-primary/30",
                        "bg-primary/10 px-3 py-2",
                        "text-left text-foreground",
                        "transition-colors",
                        interactive &&
                          "hover:bg-primary/15",
                        "focus-visible:outline-none",
                        "focus-visible:ring-2",
                        "focus-visible:ring-primary",
                        "disabled:cursor-default",
                        event.className,
                      )}
                    >
                      <span className="flex h-full gap-2">
                        <span
                          aria-hidden="true"
                          className={cn(
                            "h-full w-1 shrink-0 rounded-full",
                            "bg-primary",
                            event.indicatorClassName,
                          )}
                        />

                        <span className="min-w-0">
                          <span className="block truncate text-sm font-medium">
                            {event.title}
                          </span>

                          <span className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                            <Clock3
                              aria-hidden="true"
                              className="h-3 w-3"
                            />

                            {formatEventTime(
                              event.start,
                              event.end,
                            )}
                          </span>

                          {event.description &&
                            height >= 70 && (
                              <span className="mt-1 block line-clamp-2 text-xs text-muted-foreground">
                                {event.description}
                              </span>
                            )}
                        </span>
                      </span>
                    </button>
                  );
                })}

                {showNowLine && (
                  <div
                    aria-label="Current time"
                    style={{
                      top: currentTimeTop,
                    }}
                    className={cn(
                      "pointer-events-none absolute",
                      "left-0 right-0 z-20",
                      "border-t border-destructive",
                    )}
                  >
                    <span className="absolute -left-1.5 -top-1.5 h-3 w-3 rounded-full bg-destructive" />
                  </div>
                )}

                {visibleEvents.length === 0 && (
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <p className="rounded-lg bg-background/80 px-4 py-2 text-sm text-muted-foreground backdrop-blur-sm">
                      {emptyMessage}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </section>
    );
  },
);

CalendarDayView.displayName =
  "CalendarDayView";

export { CalendarDayView };