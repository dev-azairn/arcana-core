import type * as React from "react";

export interface CalendarAgendaEvent {
  id: string;
  title: React.ReactNode;
  date: Date;

  startTime?: string;
  endTime?: string;

  description?: React.ReactNode;
  indicatorClassName?: string;
  disabled?: boolean;
}

export interface CalendarAgendaGroup {
  id: string;
  label: React.ReactNode;
  events: CalendarAgendaEvent[];
}

export interface CalendarAgendaProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "title"
  > {
  title?: React.ReactNode;
  groups?: CalendarAgendaGroup[];
  emptyMessage?: React.ReactNode;

  onEventSelect?: (
    event: CalendarAgendaEvent,
  ) => void;

  action?: React.ReactNode;
}