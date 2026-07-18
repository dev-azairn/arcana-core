import type * as React from "react";

export interface CalendarDayViewEvent {
  id: string;
  title: React.ReactNode;

  start: Date;
  end: Date;

  description?: React.ReactNode;
  indicatorClassName?: string;
  className?: string;
  disabled?: boolean;
}

export interface CalendarDayViewProps
  extends React.HTMLAttributes<HTMLDivElement> {
  date: Date;
  events?: CalendarDayViewEvent[];

  startHour?: number;
  endHour?: number;
  hourHeight?: number;

  showCurrentTime?: boolean;
  emptyMessage?: React.ReactNode;

  onEventSelect?: (
    event: CalendarDayViewEvent,
  ) => void;

  onTimeSelect?: (date: Date) => void;
}