import * as React from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  type SelectProps,
  SelectTrigger,
  SelectValue,
} from "./Select";

export interface SelectOption {
  label: string;
  value: string;
}

export type SelectFieldProps = SelectProps & {
  label: React.ReactNode;
  placeholder?: string;
  description?: React.ReactNode;
  options: SelectOption[];
};

export function SelectField({
  label,
  placeholder,
  description,
  options,
  ...props
}: SelectFieldProps) {
  const id = React.useId();

  return (
    <div className="space-y-2">
      <label
        htmlFor={id}
        className="text-sm font-medium text-slate-100"
      >
        {label}
      </label>

      <Select {...props}>
        <SelectTrigger id={id}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>

        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {description && (
        <p className="text-sm text-slate-400">
          {description}
        </p>
      )}
    </div>
  );
}