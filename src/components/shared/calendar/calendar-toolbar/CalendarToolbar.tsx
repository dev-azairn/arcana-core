import * as React from "react";
import {
  Filter,
  Plus,
  RefreshCw,
  Search,
  X,
} from "lucide-react";

import { cn } from "@/utils";
import { Button } from "@ui/button";
import { Input } from "@ui/input";

import type { CalendarToolbarProps } from "./CalendarToolbar.types";

const CalendarToolbar = React.forwardRef<
  HTMLDivElement,
  CalendarToolbarProps
>(
  (
    {
      searchValue,
      searchPlaceholder = "Search calendar events...",
      filterActive = false,
      loading = false,
      onSearchChange,
      onSearch,
      onFilterClick,
      onRefresh,
      onCreateEvent,
      actions,
      className,
      ...props
    },
    ref,
  ) => {
    const [internalSearchValue, setInternalSearchValue] =
      React.useState("");

    const isControlled = searchValue !== undefined;

    const currentSearchValue = isControlled
      ? searchValue
      : internalSearchValue;

    function updateSearchValue(value: string) {
      if (!isControlled) {
        setInternalSearchValue(value);
      }

      onSearchChange?.(value);
    }

    function handleSubmit(
      event: React.FormEvent<HTMLFormElement>,
    ) {
      event.preventDefault();
      onSearch?.(currentSearchValue);
    }

    function handleClear() {
      updateSearchValue("");
      onSearch?.("");
    }

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-col gap-3",
          "rounded-xl border border-border bg-card p-3",
          "sm:flex-row sm:items-center sm:justify-between",
          className,
        )}
        {...props}
      >
        <form
          role="search"
          onSubmit={handleSubmit}
          className="flex min-w-0 flex-1 items-center gap-2"
        >
          <div className="relative w-full max-w-md">
            <Search
              aria-hidden="true"
              className={cn(
                "pointer-events-none absolute left-3 top-1/2",
                "h-4 w-4 -translate-y-1/2",
                "text-muted-foreground",
              )}
            />

            <Input
              type="search"
              value={currentSearchValue}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              onChange={(event) =>
                updateSearchValue(event.target.value)
              }
              className="pl-9 pr-9"
            />

            {currentSearchValue && (
              <button
                type="button"
                aria-label="Clear calendar search"
                onClick={handleClear}
                className={cn(
                  "absolute right-2 top-1/2",
                  "flex h-7 w-7 -translate-y-1/2",
                  "items-center justify-center rounded-md",
                  "text-muted-foreground transition-colors",
                  "hover:bg-muted hover:text-foreground",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2 focus-visible:ring-primary",
                )}
              >
                <X
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              </button>
            )}
          </div>

          <Button
            type="submit"
            variant="outline"
            className="shrink-0"
          >
            Search
          </Button>
        </form>

        <div className="flex flex-wrap items-center gap-2">
          {onFilterClick && (
            <Button
              type="button"
              variant={filterActive ? "primary" : "outline"}
              aria-pressed={filterActive}
              onClick={onFilterClick}
            >
              <Filter
                aria-hidden="true"
                className="h-4 w-4"
              />

              Filter

              {filterActive && (
                <span
                  aria-hidden="true"
                  className="h-1.5 w-1.5 rounded-full bg-current"
                />
              )}
            </Button>
          )}

          {onRefresh && (
            <Button
              type="button"
              variant="outline"
              size="icon"
              aria-label="Refresh calendar"
              disabled={loading}
              onClick={onRefresh}
            >
              <RefreshCw
                aria-hidden="true"
                className={cn(
                  "h-4 w-4",
                  loading && "animate-spin",
                )}
              />
            </Button>
          )}

          {actions}

          {onCreateEvent && (
            <Button
              type="button"
              variant="primary"
              onClick={onCreateEvent}
            >
              <Plus
                aria-hidden="true"
                className="h-4 w-4"
              />
              New Event
            </Button>
          )}
        </div>
      </div>
    );
  },
);

CalendarToolbar.displayName = "CalendarToolbar";

export { CalendarToolbar };