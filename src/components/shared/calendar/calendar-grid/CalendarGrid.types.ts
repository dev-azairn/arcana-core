import type * as React from "react";

export interface CalendarGridProps
  extends React.HTMLAttributes<HTMLDivElement> {
  weekdayLabels?: string[];
  children: React.ReactNode;
}