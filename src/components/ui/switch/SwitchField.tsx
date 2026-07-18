import * as React from "react";

import { cn } from "@/utils";
import { Switch, type SwitchProps } from "./Switch";

export type SwitchFieldProps = SwitchProps & {
  label: React.ReactNode;
  description?: React.ReactNode;
};

const SwitchField = React.forwardRef<
  React.ElementRef<typeof Switch>,
  SwitchFieldProps
>(
  (
    {
      id,
      label,
      description,
      className,
      disabled,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const switchId = id ?? generatedId;
    const descriptionId = description
      ? `${switchId}-description`
      : undefined;

    return (
      <div className={cn("flex items-start justify-between gap-4", className)}>
        <div className="space-y-1">
          <label
            htmlFor={switchId}
            className={cn(
              "cursor-pointer text-sm font-medium text-slate-100",
              disabled && "cursor-not-allowed opacity-50",
            )}
          >
            {label}
          </label>

          {description && (
            <p id={descriptionId} className="text-sm text-slate-400">
              {description}
            </p>
          )}
        </div>

        <Switch
          ref={ref}
          id={switchId}
          disabled={disabled}
          aria-describedby={descriptionId}
          {...props}
        />
      </div>
    );
  },
);

SwitchField.displayName = "SwitchField";

export { SwitchField };