import * as React from "react";
import { CalendarDays, Clock3 } from "lucide-react";

import { cn } from "@/utils";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@ui/popover";

import type {
  CalendarMoreEventItem,
  CalendarMoreEventsProps,
} from "./CalendarMoreEvents.types";

const CalendarMoreEvents = React.forwardRef<
  HTMLButtonElement,
  CalendarMoreEventsProps
>(
  (
    {
      events,
      label,
      emptyMessage = "No additional events",
      onEventSelect,
      className,
      disabled,
      type = "button",
      ...props
    },
    ref,
  ) => {
    const [open, setOpen] = React.useState(false);

    const eventCount = events.length;
    const triggerLabel =
      label ?? `+${eventCount} more`;

    function handleEventSelect(
      event: CalendarMoreEventItem,
    ) {
      if (event.disabled) {
        return;
      }

      onEventSelect?.(event);
      setOpen(false);
    }

    return (
      <Popover
        open={open}
        onOpenChange={setOpen}
      >
        <PopoverTrigger asChild>
          <button
            ref={ref}
            type={type}
            disabled={disabled || eventCount === 0}
            aria-label={`Show ${eventCount} more calendar events`}
            className={cn(
              "inline-flex items-center rounded-md",
              "px-1.5 py-1 text-xs font-medium",
              "text-muted-foreground transition-colors",
              "hover:bg-muted hover:text-foreground",
              "focus-visible:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-primary",
              "disabled:pointer-events-none",
              "disabled:opacity-50",
              className,
            )}
            {...props}
          >
            {triggerLabel}
          </button>
        </PopoverTrigger>

        <PopoverContent
          align="start"
          sideOffset={6}
          className="w-72 p-0"
        >
          <div className="border-b border-border px-4 py-3">
            <div className="flex items-center gap-2">
              <CalendarDays
                aria-hidden="true"
                className="h-4 w-4 text-primary"
              />

              <h3 className="text-sm font-semibold">
                Additional events
              </h3>
            </div>

            <p className="mt-1 text-xs text-muted-foreground">
              {eventCount}{" "}
              {eventCount === 1 ? "event" : "events"}
            </p>
          </div>

          <div className="max-h-72 overflow-y-auto p-2">
            {eventCount === 0 ? (
              <p className="px-2 py-6 text-center text-sm text-muted-foreground">
                {emptyMessage}
              </p>
            ) : (
              <div className="space-y-1">
                {events.map((event) => (
                  <button
                    key={event.id}
                    type="button"
                    disabled={event.disabled}
                    onClick={() =>
                      handleEventSelect(event)
                    }
                    className={cn(
                      "flex w-full items-start gap-2",
                      "rounded-lg px-2 py-2 text-left",
                      "transition-colors",
                      "hover:bg-muted",
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
                        "mt-1.5 h-2 w-2 shrink-0",
                        "rounded-full bg-primary",
                        event.indicatorClassName,
                      )}
                    />

                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">
                        {event.title}
                      </span>

                      {event.time && (
                        <span className="mt-0.5 flex items-center gap-1 text-xs text-muted-foreground">
                          <Clock3
                            aria-hidden="true"
                            className="h-3 w-3"
                          />

                          {event.time}
                        </span>
                      )}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    );
  },
);

CalendarMoreEvents.displayName =
  "CalendarMoreEvents";

export { CalendarMoreEvents };