import * as React from "react";

import { cn } from "@/utils";

export type PageHeaderProps = Omit<
  React.HTMLAttributes<HTMLElement>,
  "title"
> & {
  title: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  actions?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
};

const PageHeader = React.forwardRef<
  HTMLElement,
  PageHeaderProps
>(
  (
    {
      className,
      title,
      description,
      icon,
      actions,
      breadcrumbs,
      ...props
    },
    ref,
  ) => (
    <header
      ref={ref}
      className={cn(
        "flex flex-col gap-6",
        className,
      )}
      {...props}
    >
      {breadcrumbs}

      <div className="flex items-start justify-between gap-6">
        <div className="flex min-w-0 items-start gap-4">
          {icon && (
            <div
              className={cn(
                "flex h-12 w-12 shrink-0 items-center justify-center",
                "rounded-xl border border-slate-800",
                "bg-slate-900 text-indigo-400",
              )}
            >
              {icon}
            </div>
          )}

          <div className="min-w-0">
            <h1
              className={cn(
                "truncate text-3xl font-bold tracking-wide",
              )}
            >
              {title}
            </h1>

            {description && (
              <p className="mt-1 text-sm text-slate-400">
                {description}
              </p>
            )}
          </div>
        </div>

        {actions && (
          <div className="flex shrink-0 items-center gap-2">
            {actions}
          </div>
        )}
      </div>
    </header>
  ),
);

PageHeader.displayName = "PageHeader";

export { PageHeader };