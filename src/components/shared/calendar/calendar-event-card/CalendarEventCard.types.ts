import type * as React from "react";

export type CalendarEventVariant =
  | "default"
  | "task"
  | "pomodoro"
  | "deadline"
  | "completed";

export interface CalendarEventCardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;

  startTime?: string;
  endTime?: string;

  variant?: CalendarEventVariant;
  compact?: boolean;
  active?: boolean;

  icon?: React.ReactNode;
  trailing?: React.ReactNode;

  onSelect?: () => void;
}