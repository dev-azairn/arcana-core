import type * as React from "react";

export type CalendarLoadingVariant =
  | "month"
  | "agenda"
  | "day";

export interface CalendarLoadingProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "title"
  > {
  variant?: CalendarLoadingVariant;

  title?: React.ReactNode;
  showHeader?: boolean;

  rows?: number;
  columns?: number;
}