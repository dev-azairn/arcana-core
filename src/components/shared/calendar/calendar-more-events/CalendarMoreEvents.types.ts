import type * as React from "react";

export interface CalendarMoreEventItem {
  id: string;
  title: React.ReactNode;
  time?: string;
  indicatorClassName?: string;
  disabled?: boolean;
}

export interface CalendarMoreEventsProps
  extends Omit<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    "children"
  > {
  events: CalendarMoreEventItem[];

  label?: string;
  emptyMessage?: string;

  onEventSelect?: (
    event: CalendarMoreEventItem,
  ) => void;
}