import type * as React from "react";

export interface CalendarEmptyProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "title"
  > {
  title?: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  action?: React.ReactNode;
  compact?: boolean;
}