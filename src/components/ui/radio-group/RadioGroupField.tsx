import * as React from "react";

import { cn } from "@/utils";
import { RadioGroup, RadioGroupItem } from "./RadioGroup";

export interface RadioOption {
  label: React.ReactNode;
  value: string;
  description?: React.ReactNode;
}

export interface RadioGroupFieldProps
  extends React.ComponentPropsWithoutRef<typeof RadioGroup> {
  label?: React.ReactNode;
  options: RadioOption[];
}

export function RadioGroupField({
  label,
  options,
  className,
  ...props
}: RadioGroupFieldProps) {
  return (
    <div className="space-y-3">
      {label && (
        <div className="text-sm font-medium text-slate-100">
          {label}
        </div>
      )}

      <RadioGroup
        className={cn("gap-3", className)}
        {...props}
      >
        {options.map((option) => {
          const id = React.useId();

          return (
            <label
              key={option.value}
              htmlFor={id}
              className="flex cursor-pointer items-start gap-3 rounded-md border border-slate-800 p-3 transition hover:border-slate-700"
            >
              <RadioGroupItem
                id={id}
                value={option.value}
              />

              <div>
                <div className="text-sm font-medium text-slate-100">
                  {option.label}
                </div>

                {option.description && (
                  <p className="mt-1 text-sm text-slate-400">
                    {option.description}
                  </p>
                )}
              </div>
            </label>
          );
        })}
      </RadioGroup>
    </div>
  );
}