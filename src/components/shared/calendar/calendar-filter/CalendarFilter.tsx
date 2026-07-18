import * as React from "react";
import { Check, Filter } from "lucide-react";

import { cn } from "@/utils";

import type {
  CalendarFilterOption,
  CalendarFilterProps,
} from "./CalendarFilter.types";

const CalendarFilter = React.forwardRef<
  HTMLDivElement,
  CalendarFilterProps
>(
  (
    {
      options,
      value,
      title = "Calendars",
      emptyMessage = "No calendar filters available.",
      showSelectAll = true,
      selectAllLabel = "Select all",
      clearLabel = "Clear",
      onValueChange,
      className,
      ...props
    },
    ref,
  ) => {
    const [internalValue, setInternalValue] =
      React.useState<string[]>(value ?? []);

    const controlled = value !== undefined;
    const selectedValues = controlled
      ? value
      : internalValue;

    React.useEffect(() => {
      if (controlled) {
        return;
      }

      setInternalValue((current) =>
        current.filter((selectedValue) =>
          options.some(
            (option) =>
              option.value === selectedValue,
          ),
        ),
      );
    }, [controlled, options]);

    const enabledOptions = options.filter(
      (option) => !option.disabled,
    );

    const allSelected =
      enabledOptions.length > 0 &&
      enabledOptions.every((option) =>
        selectedValues.includes(option.value),
      );

    function updateValue(nextValue: string[]) {
      if (!controlled) {
        setInternalValue(nextValue);
      }

      onValueChange?.(nextValue);
    }

    function handleOptionToggle(
      option: CalendarFilterOption,
    ) {
      if (option.disabled) {
        return;
      }

      const selected = selectedValues.includes(
        option.value,
      );

      const nextValue = selected
        ? selectedValues.filter(
            (item) => item !== option.value,
          )
        : [...selectedValues, option.value];

      updateValue(nextValue);
    }

    function handleSelectAll() {
      if (allSelected) {
        updateValue([]);
        return;
      }

      updateValue(
        enabledOptions.map(
          (option) => option.value,
        ),
      );
    }

    return (
      <div
        ref={ref}
        className={cn(
          "overflow-hidden rounded-xl border border-border",
          "bg-card text-card-foreground",
          className,
        )}
        {...props}
      >
        <header className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
          <div className="flex min-w-0 items-center gap-2">
            <Filter
              aria-hidden="true"
              className="h-4 w-4 shrink-0 text-primary"
            />

            <h2 className="truncate text-sm font-semibold">
              {title}
            </h2>
          </div>

          {showSelectAll &&
            enabledOptions.length > 0 && (
              <button
                type="button"
                onClick={handleSelectAll}
                className={cn(
                  "text-xs font-medium text-primary",
                  "transition-colors hover:text-primary/80",
                  "focus-visible:outline-none",
                  "focus-visible:ring-2",
                  "focus-visible:ring-primary",
                  "focus-visible:ring-offset-2",
                )}
              >
                {allSelected
                  ? clearLabel
                  : selectAllLabel}
              </button>
            )}
        </header>

        {options.length === 0 ? (
          <p className="px-4 py-8 text-center text-sm text-muted-foreground">
            {emptyMessage}
          </p>
        ) : (
          <div
            role="group"
            aria-label={
              typeof title === "string"
                ? title
                : "Calendar filters"
            }
            className="p-2"
          >
            {options.map((option) => {
              const selected =
                selectedValues.includes(
                  option.value,
                );

              return (
                <button
                  key={option.value}
                  type="button"
                  role="checkbox"
                  aria-checked={selected}
                  disabled={option.disabled}
                  onClick={() =>
                    handleOptionToggle(option)
                  }
                  className={cn(
                    "flex w-full items-start gap-3 rounded-lg",
                    "px-3 py-2.5 text-left",
                    "transition-colors",
                    "hover:bg-muted/50",
                    "focus-visible:outline-none",
                    "focus-visible:ring-2",
                    "focus-visible:ring-primary",
                    "disabled:pointer-events-none",
                    "disabled:opacity-50",
                  )}
                >
                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-0.5 flex h-4 w-4 shrink-0",
                      "items-center justify-center rounded",
                      "border border-input",
                      selected &&
                        "border-primary bg-primary text-primary-foreground",
                    )}
                  >
                    {selected && (
                      <Check className="h-3 w-3" />
                    )}
                  </span>

                  <span
                    aria-hidden="true"
                    className={cn(
                      "mt-1 h-2.5 w-2.5 shrink-0 rounded-full",
                      "bg-primary",
                      option.indicatorClassName,
                    )}
                  />

                  <span className="min-w-0 flex-1">
                    <span className="block truncate text-sm font-medium">
                      {option.label}
                    </span>

                    {option.description && (
                      <span className="mt-0.5 block text-xs text-muted-foreground">
                        {option.description}
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  },
);

CalendarFilter.displayName = "CalendarFilter";

export { CalendarFilter };