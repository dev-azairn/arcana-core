import type * as React from "react";

export interface CalendarWeekRowDay {
  id: string;
  date: Date;

  label?: React.ReactNode;
  sublabel?: React.ReactNode;

  eventCount?: number;
  indicatorClassName?: string;

  selected?: boolean;
  today?: boolean;
  outsideRange?: boolean;
  disabled?: boolean;

  className?: string;
}

export interface CalendarWeekRowProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onSelect"
  > {
  days: CalendarWeekRowDay[];

  selectedDate?: Date;
  showWeekday?: boolean;
  showEventCount?: boolean;

  onDaySelect?: (
    day: CalendarWeekRowDay,
  ) => void;
}