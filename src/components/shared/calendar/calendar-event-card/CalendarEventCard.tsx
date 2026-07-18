import * as React from "react";
import {
  CalendarClock,
  CheckCircle2,
  CircleAlert,
  Clock3,
  ScrollText,
  Timer,
} from "lucide-react";

import { cn } from "@/utils";

import type {
  CalendarEventCardProps,
  CalendarEventVariant,
} from "./CalendarEventCard.types";

const variantStyles: Record<
  CalendarEventVariant,
  {
    container: string;
    icon: string;
    defaultIcon: React.ElementType;
  }
> = {
  default: {
    container: "border-border bg-card",
    icon: "bg-muted text-muted-foreground",
    defaultIcon: CalendarClock,
  },
  task: {
    container: "border-primary/30 bg-primary/5",
    icon: "bg-primary/10 text-primary",
    defaultIcon: ScrollText,
  },
  pomodoro: {
    container: "border-warning/30 bg-warning/5",
    icon: "bg-warning/10 text-warning",
    defaultIcon: Timer,
  },
  deadline: {
    container: "border-destructive/30 bg-destructive/5",
    icon: "bg-destructive/10 text-destructive",
    defaultIcon: CircleAlert,
  },
  completed: {
    container: "border-success/30 bg-success/5",
    icon: "bg-success/10 text-success",
    defaultIcon: CheckCircle2,
  },
};

const CalendarEventCard = React.forwardRef<
  HTMLDivElement,
  CalendarEventCardProps
>(
  (
    {
      title,
      description,
      startTime,
      endTime,
      variant = "default",
      compact = false,
      active = false,
      icon,
      trailing,
      onSelect,
      className,
      onClick,
      onKeyDown,
      ...props
    },
    ref,
  ) => {
    const config = variantStyles[variant];
    const DefaultIcon = config.defaultIcon;
    const interactive = Boolean(onSelect || onClick);

    function handleClick(
      event: React.MouseEvent<HTMLDivElement>,
    ) {
      onClick?.(event);

      if (!event.defaultPrevented) {
        onSelect?.();
      }
    }

    function handleKeyDown(
      event: React.KeyboardEvent<HTMLDivElement>,
    ) {
      onKeyDown?.(event);

      if (
        event.defaultPrevented ||
        !interactive
      ) {
        return;
      }

      if (
        event.key === "Enter" ||
        event.key === " "
      ) {
        event.preventDefault();
        onSelect?.();
      }
    }

    return (
      <div
        ref={ref}
        role={interactive ? "button" : undefined}
        tabIndex={interactive ? 0 : undefined}
        aria-pressed={
          interactive ? active : undefined
        }
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        className={cn(
          "flex w-full items-start border text-card-foreground",
          "transition-colors",
          compact
            ? "gap-2 rounded-md p-2"
            : "gap-3 rounded-xl p-4",
          config.container,
          interactive && [
            "cursor-pointer",
            "hover:border-primary/50",
            "focus-visible:outline-none",
            "focus-visible:ring-2",
            "focus-visible:ring-primary",
            "focus-visible:ring-offset-2",
            "focus-visible:ring-offset-background",
          ],
          active &&
            "border-primary ring-1 ring-primary",
          className,
        )}
        {...props}
      >
        <span
          className={cn(
            "flex shrink-0 items-center justify-center rounded-lg",
            compact ? "h-8 w-8" : "h-10 w-10",
            config.icon,
          )}
        >
          {icon ?? (
            <DefaultIcon
              aria-hidden="true"
              className={cn(
                compact ? "h-4 w-4" : "h-5 w-5",
              )}
            />
          )}
        </span>

        <span className="min-w-0 flex-1">
          <span
            className={cn(
              "block truncate font-medium",
              compact ? "text-sm" : "text-base",
            )}
          >
            {title}
          </span>

          {(startTime || endTime) && (
            <span className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
              <Clock3
                aria-hidden="true"
                className="h-3.5 w-3.5"
              />

              {startTime}

              {startTime && endTime && (
                <span aria-hidden="true">–</span>
              )}

              {endTime}
            </span>
          )}

          {description && !compact && (
            <span className="mt-2 block line-clamp-2 text-sm text-muted-foreground">
              {description}
            </span>
          )}
        </span>

        {trailing && (
          <span className="shrink-0">
            {trailing}
          </span>
        )}
      </div>
    );
  },
);

CalendarEventCard.displayName =
  "CalendarEventCard";

export { CalendarEventCard };