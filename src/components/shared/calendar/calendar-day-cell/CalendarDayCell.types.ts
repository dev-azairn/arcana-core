import type * as React from "react";

export interface CalendarDayEvent {
  id: string;
  title?: string;
  colorClassName?: string;
}

export interface CalendarDayCellProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "value"
  > {
  date: Date;
  events?: CalendarDayEvent[];

  selected?: boolean;
  today?: boolean;
  outsideMonth?: boolean;

  maxVisibleEvents?: number;
}