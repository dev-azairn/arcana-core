import * as React from "react";
import { PanelLeft } from "lucide-react";

import { cn } from "@/utils";

import type {
  CalendarSidebarProps,
} from "./CalendarSidebar.types";

const CalendarSidebar = React.forwardRef<
  HTMLElement,
  CalendarSidebarProps
>(
  (
    {
      title,
      headerAction,
      sections = [],
      children,
      footer,
      collapsed = false,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <aside
        ref={ref}
        aria-label={
          typeof title === "string"
            ? title
            : "Calendar sidebar"
        }
        className={cn(
          "flex h-full shrink-0 flex-col",
          "border-r border-border",
          "bg-card text-card-foreground",
          "transition-[width] duration-200",
          collapsed ? "w-16" : "w-72",
          className,
        )}
        {...props}
      >
        {(title || headerAction) && (
          <header
            className={cn(
              "flex min-h-14 items-center",
              "border-b border-border",
              collapsed
                ? "justify-center px-2"
                : "justify-between gap-3 px-4",
            )}
          >
            {collapsed ? (
              <PanelLeft
                aria-hidden="true"
                className="h-5 w-5 text-muted-foreground"
              />
            ) : (
              <>
                {title && (
                  <div className="flex min-w-0 items-center gap-2">
                    <PanelLeft
                      aria-hidden="true"
                      className="h-4 w-4 shrink-0 text-primary"
                    />

                    <h2 className="truncate text-sm font-semibold">
                      {title}
                    </h2>
                  </div>
                )}

                {headerAction}
              </>
            )}
          </header>
        )}

        <div
          className={cn(
            "min-h-0 flex-1 overflow-y-auto",
            collapsed ? "p-2" : "p-4",
          )}
        >
          {collapsed ? (
            <div className="flex flex-col items-center gap-2">
              {sections.map((section) => (
                <div
                  key={section.id}
                  className={cn(
                    "flex w-full justify-center",
                    section.className,
                  )}
                >
                  {section.content}
                </div>
              ))}

              {children}
            </div>
          ) : (
            <div className="space-y-4">
              {sections.map((section) => (
                <section
                  key={section.id}
                  className={section.className}
                >
                  {section.content}
                </section>
              ))}

              {children}
            </div>
          )}
        </div>

        {footer && (
          <footer
            className={cn(
              "border-t border-border",
              collapsed ? "p-2" : "p-4",
            )}
          >
            {footer}
          </footer>
        )}
      </aside>
    );
  },
);

CalendarSidebar.displayName =
  "CalendarSidebar";

export { CalendarSidebar };