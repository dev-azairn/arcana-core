import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
  MoreHorizontal,
} from "lucide-react";

import { cn } from "@/utils";
import { Button } from "@/components/ui/button";

const Pagination = ({
  className,
  ...props
}: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="Pagination"
    className={cn(
      "mx-auto flex w-full justify-center",
      className,
    )}
    {...props}
  />
);

Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentPropsWithoutRef<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn(
      "flex flex-row items-center gap-1",
      className,
    )}
    {...props}
  />
));

PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentPropsWithoutRef<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn(className)} {...props} />
));

PaginationItem.displayName = "PaginationItem";

export type PaginationButtonProps =
  React.ComponentPropsWithoutRef<typeof Button> & {
    isActive?: boolean;
  };

const PaginationButton = React.forwardRef<
  React.ElementRef<typeof Button>,
  PaginationButtonProps
>(({ className, isActive, size = "icon", ...props }, ref) => (
  <Button
    ref={ref}
    type="button"
    size={size}
    variant={isActive ? "primary" : "outline"}
    aria-current={isActive ? "page" : undefined}
    className={cn("h-9 min-w-9", className)}
    {...props}
  />
));

PaginationButton.displayName = "PaginationButton";

const PaginationPrevious = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, children, ...props }, ref) => (
  <Button
    ref={ref}
    type="button"
    variant="outline"
    size="sm"
    aria-label="Go to previous page"
    className={cn("gap-1 pl-2.5", className)}
    {...props}
  >
    <ChevronLeft className="h-4 w-4" />
    {children ?? <span>Previous</span>}
  </Button>
));

PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = React.forwardRef<
  React.ElementRef<typeof Button>,
  React.ComponentPropsWithoutRef<typeof Button>
>(({ className, children, ...props }, ref) => (
  <Button
    ref={ref}
    type="button"
    variant="outline"
    size="sm"
    aria-label="Go to next page"
    className={cn("gap-1 pr-2.5", className)}
    {...props}
  >
    {children ?? <span>Next</span>}
    <ChevronRight className="h-4 w-4" />
  </Button>
));

PaginationNext.displayName = "PaginationNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentPropsWithoutRef<"span">) => (
  <span
    aria-hidden="true"
    className={cn(
      "flex h-9 w-9 items-center justify-center",
      className,
    )}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4 text-slate-400" />
    <span className="sr-only">More pages</span>
  </span>
);

PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationButton,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
};