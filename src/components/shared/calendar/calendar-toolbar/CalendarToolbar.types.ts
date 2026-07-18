import type * as React from "react";

export interface CalendarToolbarProps
  extends React.HTMLAttributes<HTMLDivElement> {
  searchValue?: string;
  searchPlaceholder?: string;

  filterActive?: boolean;
  loading?: boolean;

  onSearchChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onFilterClick?: () => void;
  onRefresh?: () => void;
  onCreateEvent?: () => void;

  actions?: React.ReactNode;
}