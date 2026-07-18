import type * as React from "react";

export interface CalendarMiniProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onChange"
  > {
  month: Date;
  selectedDate?: Date;

  weekStartsOn?: 0 | 1;

  onMonthChange?: (month: Date) => void;
  onDateSelect?: (date: Date) => void;
}