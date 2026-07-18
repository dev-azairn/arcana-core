import * as React from "react";
import { Tags } from "lucide-react";

import { cn } from "@/utils";

import type {
  CalendarLegendItem,
  CalendarLegendProps,
} from "./CalendarLegend.types";

const CalendarLegend = React.forwardRef<
  HTMLDivElement,
  CalendarLegendProps
>(
  (
    {
      items,
      title,
      emptyMessage = "No legend items available.",
      orientation = "horizontal",
      interactive = false,
      onItemSelect,
      className,
      ...props
    },
    ref,
  ) => {
    const canInteract =
      interactive || Boolean(onItemSelect);

    function handleItemSelect(
      item: CalendarLegendItem,
    ) {
      if (item.disabled) {
        return;
      }

      onItemSelect?.(item);
    }

    return (
      <div
        ref={ref}
        className={cn(
          "rounded-xl border border-border",
          "bg-card text-card-foreground",
          "p-4",
          className,
        )}
        {...props}
      >
        {title && (
          <header className="mb-3 flex items-center gap-2">
            <Tags
              aria-hidden="true"
              className="h-4 w-4 text-primary"
            />

            <h2 className="text-sm font-semibold">
              {title}
            </h2>
          </header>
        )}

        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            {emptyMessage}
          </p>
        ) : (
          <div
            role="list"
            className={cn(
              orientation === "horizontal"
                ? "flex flex-wrap items-center gap-x-4 gap-y-2"
                : "flex flex-col gap-2",
            )}
          >
            {items.map((item) => {
              const content = (
                <>
                  <span
                    aria-hidden="true"
                    className={cn(
                      "h-2.5 w-2.5 shrink-0 rounded-full",
                      "bg-primary",
                      item.indicatorClassName,
                    )}
                  />

                  <span className="min-w-0">
                    <span className="block text-sm font-medium">
                      {item.label}
                    </span>

                    {item.description && (
                      <span className="block text-xs text-muted-foreground">
                        {item.description}
                      </span>
                    )}
                  </span>
                </>
              );

              if (canInteract) {
                return (
                  <button
                    key={item.id}
                    type="button"
                    role="listitem"
                    disabled={item.disabled}
                    onClick={() =>
                      handleItemSelect(item)
                    }
                    className={cn(
                      "flex items-start gap-2 rounded-md",
                      "px-2 py-1.5 text-left",
                      "transition-colors",
                      "hover:bg-muted/50",
                      "focus-visible:outline-none",
                      "focus-visible:ring-2",
                      "focus-visible:ring-primary",
                      "disabled:pointer-events-none",
                      "disabled:opacity-50",
                    )}
                  >
                    {content}
                  </button>
                );
              }

              return (
                <div
                  key={item.id}
                  role="listitem"
                  className={cn(
                    "flex items-start gap-2",
                    item.disabled && "opacity-50",
                  )}
                >
                  {content}
                </div>
              );
            })}
          </div>
        )}
      </div>
    );
  },
);

CalendarLegend.displayName =
  "CalendarLegend";

export { CalendarLegend };