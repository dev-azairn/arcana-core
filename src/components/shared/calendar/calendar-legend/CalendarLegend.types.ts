import type * as React from "react";

export interface CalendarLegendItem {
  id: string;
  label: React.ReactNode;

  indicatorClassName?: string;
  description?: React.ReactNode;
  disabled?: boolean;
}

export interface CalendarLegendProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "title"
  > {
  items: CalendarLegendItem[];

  title?: React.ReactNode;
  emptyMessage?: React.ReactNode;

  orientation?: "horizontal" | "vertical";
  interactive?: boolean;

  onItemSelect?: (
    item: CalendarLegendItem,
  ) => void;
}