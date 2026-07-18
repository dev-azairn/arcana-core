import type * as React from "react";

export interface CalendarUpcomingEvent {
  id: string;
  title: React.ReactNode;

  date: Date;
  startTime?: string;
  endTime?: string;

  description?: React.ReactNode;
  indicatorClassName?: string;
  disabled?: boolean;
}

export interface CalendarUpcomingProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "title"
  > {
  title?: React.ReactNode;
  events?: CalendarUpcomingEvent[];

  maxItems?: number;
  emptyMessage?: React.ReactNode;

  onEventSelect?: (
    event: CalendarUpcomingEvent,
  ) => void;

  action?: React.ReactNode;
}