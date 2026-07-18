import * as React from "react";
import {
  CalendarDays,
  Clock3,
} from "lucide-react";

import { cn } from "@/utils";

import type {
  CalendarAgendaEvent,
  CalendarAgendaProps,
} from "./CalendayAgenda.types";

function formatTime(
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

const CalendarAgenda = React.forwardRef<
  HTMLDivElement,
  CalendarAgendaProps
>(
  (
    {
      title = "Agenda",
      groups = [],
      emptyMessage = "No events in this agenda",
      onEventSelect,
      action,
      className,
      ...props
    },
    ref,
  ) => {
    const hasEvents = groups.some(
      (group) => group.events.length > 0,
    );

    function handleEventSelect(
      event: CalendarAgendaEvent,
    ) {
      if (event.disabled) {
        return;
      }

      onEventSelect?.(event);
    }

    return (
      <section
        ref={ref}
        className={cn(
          "overflow-hidden rounded-xl border border-border",
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

        {!hasEvents ? (
          <div className="px-4 py-10 text-center">
            <CalendarDays
              aria-hidden="true"
              className="mx-auto h-9 w-9 text-muted-foreground/40"
            />

            <p className="mt-3 text-sm text-muted-foreground">
              {emptyMessage}
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border">
            {groups.map((group) => {
              if (group.events.length === 0) {
                return null;
              }

              return (
                <section
                  key={group.id}
                  aria-labelledby={`agenda-group-${group.id}`}
                  className="px-4 py-4"
                >
                  <h3
                    id={`agenda-group-${group.id}`}
                    className="mb-3 text-sm font-semibold"
                  >
                    {group.label}
                  </h3>

                  <div className="space-y-2">
                    {group.events.map((event) => {
                      const time = formatTime(
                        event.startTime,
                        event.endTime,
                      );

                      return (
                        <button
                          key={event.id}
                          type="button"
                          disabled={event.disabled}
                          onClick={() =>
                            handleEventSelect(event)
                          }
                          className={cn(
                            "flex w-full items-start gap-3",
                            "rounded-lg border border-transparent",
                            "px-3 py-3 text-left",
                            "transition-colors",
                            "hover:border-border hover:bg-muted/40",
                            "focus-visible:outline-none",
                            "focus-visible:ring-2",
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

                          <span className="w-24 shrink-0">
                            {time ? (
                              <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                                <Clock3
                                  aria-hidden="true"
                                  className="h-3.5 w-3.5"
                                />

                                {time}
                              </span>
                            ) : (
                              <span className="text-xs text-muted-foreground">
                                All day
                              </span>
                            )}
                          </span>

                          <span className="min-w-0 flex-1">
                            <span className="block truncate text-sm font-medium">
                              {event.title}
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
                </section>
              );
            })}
          </div>
        )}
      </section>
    );
  },
);

CalendarAgenda.displayName = "CalendarAgenda";

export { CalendarAgenda };