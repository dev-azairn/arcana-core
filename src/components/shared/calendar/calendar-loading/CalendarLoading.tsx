import * as React from "react";

import { cn } from "@/utils";

import { Skeleton } from "@ui/loading";

import type {
  CalendarLoadingProps,
} from "./CalendarLoading.types";

function MonthLoading({
  rows,
  columns,
}: {
  rows: number;
  columns: number;
}) {
  return (
    <div className="overflow-hidden">
      <div
        className="grid border-b border-border"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
      >
        {Array.from(
          { length: columns },
          (_, index) => (
            <div
              key={index}
              className="border-r border-border p-3 last:border-r-0"
            >
              <Skeleton className="mx-auto h-3 w-12" />
            </div>
          ),
        )}
      </div>

      <div
        className="grid"
        style={{
          gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
        }}
      >
        {Array.from(
          {
            length: rows * columns,
          },
          (_, index) => (
            <div
              key={index}
              className={cn(
                "min-h-28 border-b border-r",
                "border-border p-2",
                (index + 1) % columns === 0 &&
                  "border-r-0",
              )}
            >
              <Skeleton className="ml-auto h-5 w-5 rounded-full" />

              <div className="mt-4 space-y-2">
                <Skeleton className="h-5 w-full rounded-md" />
                <Skeleton className="h-5 w-4/5 rounded-md" />
              </div>
            </div>
          ),
        )}
      </div>
    </div>
  );
}

function AgendaLoading({
  rows,
}: {
  rows: number;
}) {
  return (
    <div className="divide-y divide-border">
      {Array.from(
        { length: rows },
        (_, index) => (
          <div
            key={index}
            className="flex items-start gap-3 px-4 py-4"
          >
            <Skeleton className="mt-1 h-2.5 w-2.5 shrink-0 rounded-full" />

            <Skeleton className="h-4 w-20 shrink-0" />

            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-4 w-2/5" />
              <Skeleton className="h-3 w-3/5" />
            </div>
          </div>
        ),
      )}
    </div>
  );
}

function DayLoading({
  rows,
}: {
  rows: number;
}) {
  return (
    <div className="flex min-w-[560px]">
      <div className="w-20 shrink-0 border-r border-border">
        {Array.from(
          { length: rows },
          (_, index) => (
            <div
              key={index}
              className="h-16 border-b border-border p-2"
            >
              <Skeleton className="ml-auto h-3 w-10" />
            </div>
          ),
        )}
      </div>

      <div className="min-w-0 flex-1">
        {Array.from(
          { length: rows },
          (_, index) => (
            <div
              key={index}
              className="relative h-16 border-b border-border"
            >
              {index === 1 && (
                <Skeleton className="absolute inset-x-3 top-2 h-12 rounded-lg" />
              )}

              {index === 4 && (
                <Skeleton className="absolute inset-x-3 top-2 h-20 rounded-lg" />
              )}
            </div>
          ),
        )}
      </div>
    </div>
  );
}

const CalendarLoading = React.forwardRef<
  HTMLDivElement,
  CalendarLoadingProps
>(
  (
    {
      variant = "month",
      title = "Loading calendar",
      showHeader = true,
      rows,
      columns = 7,
      className,
      ...props
    },
    ref,
  ) => {
    const resolvedRows =
      rows ??
      (variant === "month"
        ? 5
        : variant === "agenda"
          ? 5
          : 10);

    return (
      <div
        ref={ref}
        role="status"
        aria-live="polite"
        aria-busy="true"
        className={cn(
          "overflow-hidden rounded-xl",
          "border border-border",
          "bg-card text-card-foreground",
          className,
        )}
        {...props}
      >
        {showHeader && (
          <header className="flex items-center justify-between border-b border-border px-4 py-3">
            <div className="space-y-2">
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-3 w-24" />
            </div>

            <div className="flex gap-2">
              <Skeleton className="h-9 w-9 rounded-md" />
              <Skeleton className="h-9 w-9 rounded-md" />
            </div>
          </header>
        )}

        {variant === "month" && (
          <MonthLoading
            rows={resolvedRows}
            columns={columns}
          />
        )}

        {variant === "agenda" && (
          <AgendaLoading rows={resolvedRows} />
        )}

        {variant === "day" && (
          <div className="overflow-x-auto">
            <DayLoading rows={resolvedRows} />
          </div>
        )}

        <span className="sr-only">{title}</span>
      </div>
    );
  },
);

CalendarLoading.displayName =
  "CalendarLoading";

export { CalendarLoading };