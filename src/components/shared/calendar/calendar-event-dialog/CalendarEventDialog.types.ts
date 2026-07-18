import type * as React from "react";

import type {
  CalendarEventFormValues,
} from "../calendar-event-form";

export interface CalendarEventDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;

  mode?: "create" | "edit";

  initialValues?: Partial<CalendarEventFormValues>;

  title?: React.ReactNode;
  description?: React.ReactNode;

  loading?: boolean;

  onSubmit: (
    values: CalendarEventFormValues,
  ) => void | Promise<void>;

  onDelete?: () => void | Promise<void>;
}