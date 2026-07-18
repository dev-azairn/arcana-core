import type * as React from "react";

export interface CalendarFilterOption {
  value: string;
  label: React.ReactNode;

  description?: React.ReactNode;
  indicatorClassName?: string;
  disabled?: boolean;
}

export interface CalendarFilterProps
  extends Omit<
    React.HTMLAttributes<HTMLDivElement>,
    "onChange" | "title"
  > {
  options: CalendarFilterOption[];
  value?: string[];

  title?: React.ReactNode;
  emptyMessage?: React.ReactNode;

  showSelectAll?: boolean;
  selectAllLabel?: React.ReactNode;
  clearLabel?: React.ReactNode;

  onValueChange?: (value: string[]) => void;
}