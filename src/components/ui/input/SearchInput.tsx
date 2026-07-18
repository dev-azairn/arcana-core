import * as React from "react";
import {
  LoaderCircle,
  Search,
  X,
} from "lucide-react";

import Input from "./Input";
import type { SearchInputProps } from "./SearchInput.types";
import { cn } from "@/utils";

const SearchInput = React.forwardRef<
  HTMLInputElement,
  SearchInputProps
>(
  (
    {
      value,
      defaultValue = "",
      onValueChange,
      onSearch,
      onClear,
      onChange,
      onKeyDown,
      clearable = true,
      showSearchButton = true,
      loading = false,
      disabled = false,
      placeholder = "Search...",
      searchLabel = "Submit search",
      clearLabel = "Clear search",
      className,
      ...props
    },
    ref,
  ) => {
    const isControlled = value !== undefined;

    const [internalValue, setInternalValue] =
      React.useState(defaultValue);

    const currentValue = isControlled
      ? value
      : internalValue;

    const updateValue = (
      nextValue: string,
      event?: React.ChangeEvent<HTMLInputElement>,
    ) => {
      if (!isControlled) {
        setInternalValue(nextValue);
      }

      onValueChange?.(nextValue);

      if (event) {
        onChange?.(event);
      }
    };

    const handleChange = (
      event: React.ChangeEvent<HTMLInputElement>,
    ) => {
      updateValue(event.target.value, event);
    };

    const handleSearch = () => {
      if (disabled || loading) {
        return;
      }

      onSearch?.(currentValue.trim());
    };

    const handleClear = () => {
      if (disabled || loading) {
        return;
      }

      if (!isControlled) {
        setInternalValue("");
      }

      onValueChange?.("");
      onClear?.();

      requestAnimationFrame(() => {
        if (
          ref &&
          typeof ref !== "function" &&
          ref.current
        ) {
          ref.current.focus();
        }
      });
    };

    const handleKeyDown = (
      event: React.KeyboardEvent<HTMLInputElement>,
    ) => {
      onKeyDown?.(event);

      if (event.defaultPrevented) {
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        handleSearch();
      }

      if (
        event.key === "Escape" &&
        clearable &&
        currentValue
      ) {
        event.preventDefault();
        handleClear();
      }
    };

    const hasValue = currentValue.length > 0;

    return (
      <Input
        ref={ref}
        type="search"
        value={currentValue}
        disabled={disabled}
        placeholder={placeholder}
        leftIcon={
          <Search
            aria-hidden="true"
            className="h-[18px] w-[18px]"
          />
        }
        rightIcon={
          <span className="flex items-center gap-1">
            {loading && (
              <LoaderCircle
                aria-hidden="true"
                className="h-4 w-4 animate-spin"
              />
            )}

            {!loading && clearable && hasValue && (
              <button
                type="button"
                onClick={handleClear}
                disabled={disabled}
                aria-label={clearLabel}
                className={cn(
                  "inline-flex h-7 w-7 items-center justify-center",
                  "rounded-md text-muted transition-colors",
                  "hover:bg-muted/15 hover:text-foreground",
                  "focus-visible:outline-none focus-visible:ring-2",
                  "focus-visible:ring-primary",
                  "disabled:pointer-events-none disabled:opacity-50",
                )}
              >
                <X
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              </button>
            )}

            {showSearchButton && (
              <button
                type="button"
                onClick={handleSearch}
                disabled={disabled || loading}
                aria-label={searchLabel}
                className={cn(
                  "inline-flex h-7 w-7 items-center justify-center",
                  "rounded-md text-muted transition-colors",
                  "hover:bg-primary/10 hover:text-primary",
                  "focus-visible:outline-none focus-visible:ring-2",
                  "focus-visible:ring-primary",
                  "disabled:pointer-events-none disabled:opacity-50",
                )}
              >
                <Search
                  aria-hidden="true"
                  className="h-4 w-4"
                />
              </button>
            )}
          </span>
        }
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        className={className}
        {...props}
      />
    );
  },
);

SearchInput.displayName = "SearchInput";

export default SearchInput;