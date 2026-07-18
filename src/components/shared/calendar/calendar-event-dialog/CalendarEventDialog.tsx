import { CalendarDays } from "lucide-react";

import { Dialog } from "@ui/dialog";

import { CalendarEventForm } from "../calendar-event-form";

import type {
  CalendarEventDialogProps,
} from "./CalendarEventDialog.types";

const CalendarEventDialog = ({
  open,
  onOpenChange,
  mode = "create",
  initialValues,
  title,
  description,
  loading = false,
  onSubmit,
  onDelete,
}: CalendarEventDialogProps) => {
  const dialogTitle =
    title ??
    (mode === "edit"
      ? "Edit event"
      : "Create event");

  const dialogDescription =
    description ??
    (mode === "edit"
      ? "Update the event information."
      : "Add a new event to your calendar.");

  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <div className="space-y-5">
        <header className="flex items-start gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <CalendarDays
              aria-hidden="true"
              className="h-5 w-5"
            />
          </span>

          <div className="min-w-0">
            <h2 className="text-lg font-semibold">
              {dialogTitle}
            </h2>

            {dialogDescription && (
              <p className="mt-1 text-sm text-muted-foreground">
                {dialogDescription}
              </p>
            )}
          </div>
        </header>

        <CalendarEventForm
          mode={mode}
          loading={loading}
          initialValues={initialValues}
          onSubmit={onSubmit}
          onDelete={onDelete}
          onCancel={() => onOpenChange(false)}
        />
      </div>
    </Dialog>
  );
};

CalendarEventDialog.displayName =
  "CalendarEventDialog";

export { CalendarEventDialog };