import type * as React from "react";

export interface CalendarEventFormValues {
  title: string;
  description: string;
  start: string;
  end: string;
  allDay: boolean;
}

export interface CalendarEventFormProps
  extends Omit<
    React.FormHTMLAttributes<HTMLFormElement>,
    "onSubmit"
  > {
  initialValues?: Partial<CalendarEventFormValues>;

  mode?: "create" | "edit";
  loading?: boolean;

  submitLabel?: React.ReactNode;
  cancelLabel?: React.ReactNode;
  deleteLabel?: React.ReactNode;

  showActions?: boolean;

  onSubmit: (
    values: CalendarEventFormValues,
  ) => void | Promise<void>;

  onCancel?: () => void;
  onDelete?: () => void | Promise<void>;
}