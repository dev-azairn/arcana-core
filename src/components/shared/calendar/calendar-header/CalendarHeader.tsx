import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "@ui/button";
import { cn } from "@/utils";

import type {
  CalendarHeaderProps,
  CalendarView,
} from "./CalendarHeader.types";

const viewLabels: Record<CalendarView, string> = {
  month: "Month",
  week: "Week",
  day: "Day",
};

const CalendarHeader = React.forwardRef<
  HTMLDivElement,
  CalendarHeaderProps
>(
  (
    {
      title,
      view = "month",
      availableViews = ["month", "week", "day"],
      onPrevious,
      onNext,
      onToday,
      onViewChange,
      actions,
      className,
      ...props
    },
    ref,
  ) => (
    <div
      ref={ref}
      className={cn(
        "flex flex-col gap-4",
        "rounded-xl border border-border bg-card p-4",
        "text-card-foreground",
        "sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
      {...props}
    >
      <div className="flex min-w-0 items-center gap-3">
        <div className="flex shrink-0 items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Previous calendar period"
            onClick={onPrevious}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Next calendar period"
            onClick={onNext}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <h2 className="truncate text-xl font-semibold">
          {title}
        </h2>

        {onToday && (
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onToday}
          >
            Today
          </Button>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {onViewChange && availableViews.length > 0 && (
          <div
            role="group"
            aria-label="Calendar view"
            className="flex rounded-lg border border-border bg-background p-1"
          >
            {availableViews.map((item) => {
              const active = view === item;

              return (
                <button
                  key={item}
                  type="button"
                  aria-pressed={active}
                  onClick={() => onViewChange(item)}
                  className={cn(
                    "rounded-md px-3 py-1.5 text-sm font-medium",
                    "transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2",
                    "focus-visible:ring-primary",
                    active
                      ? "bg-primary text-primary-foreground"
                      : [
                          "text-muted-foreground",
                          "hover:bg-muted hover:text-foreground",
                        ],
                  )}
                >
                  {viewLabels[item]}
                </button>
              );
            })}
          </div>
        )}

        {actions}
      </div>
    </div>
  ),
);

CalendarHeader.displayName = "CalendarHeader";

export { CalendarHeader };