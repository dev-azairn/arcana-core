import type * as React from "react";

import type { InputProps } from "./Input.types";

export type SearchInputProps = Omit<
  InputProps,
  | "type"
  | "value"
  | "defaultValue"
  | "onChange"
  | "leftIcon"
  | "rightIcon"
> & {
  value?: string;
  defaultValue?: string;

  onValueChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onClear?: () => void;

  clearable?: boolean;
  showSearchButton?: boolean;
  loading?: boolean;

  searchLabel?: string;
  clearLabel?: string;

  onChange?: React.ChangeEventHandler<HTMLInputElement>;
};