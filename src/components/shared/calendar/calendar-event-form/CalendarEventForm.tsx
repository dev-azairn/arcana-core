import * as React from "react";
import { Trash2 } from "lucide-react";
import { useForm } from "react-hook-form";

import { cn } from "@/utils";

import { Button } from "@ui/button";
import { Input } from "@ui/input";
import { Textarea } from "@ui/textarea";

import type {
  CalendarEventFormProps,
  CalendarEventFormValues,
} from "./CalendarEventForm.types";

import {
  getCalendarEventFormValues,
  isCalendarEventRangeValid,
} from "./CalendarEventForm.utils";

const CalendarEventForm = React.forwardRef<
  HTMLFormElement,
  CalendarEventFormProps
>(
  (
    {
      initialValues,
      mode = "create",
      loading = false,
      submitLabel,
      cancelLabel = "Cancel",
      deleteLabel = "Delete",
      showActions = true,
      onSubmit,
      onCancel,
      onDelete,
      className,
      ...props
    },
    ref,
  ) => {
    const fieldId = React.useId();

    const {
      register,
      handleSubmit,
      reset,
      watch,
      setError,
      formState: {
        errors,
        isSubmitting,
      },
    } = useForm<CalendarEventFormValues>({
      defaultValues:
        getCalendarEventFormValues(initialValues),
    });

    const allDay = watch("allDay");
    const submitting = loading || isSubmitting;

    React.useEffect(() => {
      reset(
        getCalendarEventFormValues(initialValues),
      );
    }, [initialValues, reset]);

    async function handleFormSubmit(
      values: CalendarEventFormValues,
    ) {
      const rangeIsValid =
        isCalendarEventRangeValid(
          values.start,
          values.end,
          values.allDay,
        );

      if (!rangeIsValid) {
        setError("end", {
          type: "validate",
          message: values.allDay
            ? "End date cannot be before the start date."
            : "End date must be later than the start date.",
        });

        return;
      }

      await onSubmit(values);
    }

    const resolvedSubmitLabel =
      submitLabel ??
      (mode === "edit"
        ? "Save changes"
        : "Create event");

    return (
      <form
        ref={ref}
        onSubmit={handleSubmit(handleFormSubmit)}
        className={cn("space-y-5", className)}
        {...props}
      >
        <div className="space-y-1.5">
          <label
            htmlFor={`${fieldId}-title`}
            className="text-sm font-medium"
          >
            Title
          </label>

          <Input
            id={`${fieldId}-title`}
            placeholder="Event title"
            disabled={submitting}
            aria-invalid={
              errors.title ? true : undefined
            }
            aria-describedby={
              errors.title
                ? `${fieldId}-title-error`
                : undefined
            }
            {...register("title", {
              required: "Event title is required.",
              minLength: {
                value: 2,
                message:
                  "Title must contain at least 2 characters.",
              },
            })}
          />

          {errors.title && (
            <p
              id={`${fieldId}-title-error`}
              role="alert"
              className="text-xs text-destructive"
            >
              {errors.title.message}
            </p>
          )}
        </div>

        <div className="space-y-1.5">
          <label
            htmlFor={`${fieldId}-description`}
            className="text-sm font-medium"
          >
            Description
          </label>

          <Textarea
            id={`${fieldId}-description`}
            placeholder="Add an optional description"
            rows={4}
            disabled={submitting}
            {...register("description")}
          />
        </div>

        <label className="flex cursor-pointer items-center gap-2">
          <input
            type="checkbox"
            disabled={submitting}
            className={cn(
              "h-4 w-4 rounded border-border",
              "accent-primary",
              "disabled:cursor-not-allowed",
              "disabled:opacity-50",
            )}
            {...register("allDay")}
          />

          <span className="text-sm font-medium">
            All-day event
          </span>
        </label>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-1.5">
            <label
              htmlFor={`${fieldId}-start`}
              className="text-sm font-medium"
            >
              Start
            </label>

            <Input
              id={`${fieldId}-start`}
              type={
                allDay
                  ? "date"
                  : "datetime-local"
              }
              disabled={submitting}
              aria-invalid={
                errors.start ? true : undefined
              }
              aria-describedby={
                errors.start
                  ? `${fieldId}-start-error`
                  : undefined
              }
              {...register("start", {
                required: "Start date is required.",
              })}
            />

            {errors.start && (
              <p
                id={`${fieldId}-start-error`}
                role="alert"
                className="text-xs text-destructive"
              >
                {errors.start.message}
              </p>
            )}
          </div>

          <div className="space-y-1.5">
            <label
              htmlFor={`${fieldId}-end`}
              className="text-sm font-medium"
            >
              End
            </label>

            <Input
              id={`${fieldId}-end`}
              type={
                allDay
                  ? "date"
                  : "datetime-local"
              }
              disabled={submitting}
              aria-invalid={
                errors.end ? true : undefined
              }
              aria-describedby={
                errors.end
                  ? `${fieldId}-end-error`
                  : undefined
              }
              {...register("end", {
                required: "End date is required.",
              })}
            />

            {errors.end && (
              <p
                id={`${fieldId}-end-error`}
                role="alert"
                className="text-xs text-destructive"
              >
                {errors.end.message}
              </p>
            )}
          </div>
        </div>

        {showActions && (
          <footer
            className={cn(
              "flex flex-col-reverse gap-2",
              "border-t border-border pt-4",
              "sm:flex-row sm:items-center",
              "sm:justify-between",
            )}
          >
            <div>
              {mode === "edit" && onDelete && (
                <Button
                  type="button"
                  variant="danger"
                  disabled={submitting}
                  onClick={() => {
                    void onDelete();
                  }}
                >
                  <Trash2
                    aria-hidden="true"
                    className="h-4 w-4"
                  />

                  {deleteLabel}
                </Button>
              )}
            </div>

            <div className="flex justify-end gap-2">
              {onCancel && (
                <Button
                  type="button"
                  variant="outline"
                  disabled={submitting}
                  onClick={onCancel}
                >
                  {cancelLabel}
                </Button>
              )}

              <Button
                type="submit"
                disabled={submitting}
              >
                {submitting
                  ? "Saving..."
                  : resolvedSubmitLabel}
              </Button>
            </div>
          </footer>
        )}
      </form>
    );
  },
);

CalendarEventForm.displayName =
  "CalendarEventForm";

export { CalendarEventForm };