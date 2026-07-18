import type * as React from "react";

export interface CalendarSidebarSection {
  id: string;
  content: React.ReactNode;
  className?: string;
}

export interface CalendarSidebarProps
  extends Omit<
    React.HTMLAttributes<HTMLElement>,
    "title"
  > {
  title?: React.ReactNode;
  headerAction?: React.ReactNode;

  sections?: CalendarSidebarSection[];
  children?: React.ReactNode;

  footer?: React.ReactNode;
  collapsed?: boolean;
}