import type * as React from "react";

export type CalendarView = "month" | "week" | "day";

export interface CalendarHeaderProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;

  view?: CalendarView;
  availableViews?: CalendarView[];

  onPrevious?: () => void;
  onNext?: () => void;
  onToday?: () => void;
  onViewChange?: (view: CalendarView) => void;

  actions?: React.ReactNode;
}