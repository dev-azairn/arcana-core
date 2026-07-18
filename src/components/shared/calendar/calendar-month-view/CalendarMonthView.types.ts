import type * as React from "react";

import type { CalendarDayEvent } from "../calendar-day-cell";

export interface CalendarMonthEvent extends CalendarDayEvent {
  date: Date;
}

export interface CalendarMonthViewProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "onSelect"> {
  month: Date;

  events?: CalendarMonthEvent[];
  selectedDate?: Date;

  weekStartsOn?: 0 | 1;
  maxVisibleEvents?: number;

  onDateSelect?: (date: Date) => void;
}