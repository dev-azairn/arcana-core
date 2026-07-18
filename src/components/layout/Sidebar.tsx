import * as React from "react";
import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { NavLink } from "react-router-dom";

import { Button } from "@ui/button";
import { AppLogo } from "@features/common/app-logo";
import { cn } from "@/utils";

import {
  accountNavigationItems,
  mainNavigationItems,
  type NavigationItem,
} from "@/config/navigation";

export interface SidebarProps
  extends React.HTMLAttributes<HTMLElement> {
  collapsed?: boolean;
  onCollapsedChange?: (collapsed: boolean) => void;
}

interface SidebarLinkProps {
  item: NavigationItem;
  collapsed: boolean;
}

function SidebarLink({
  item,
  collapsed,
}: SidebarLinkProps) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.href}
      end={item.end}
      title={collapsed ? item.label : undefined}
      className={({ isActive }) =>
        cn(
          "group flex h-10 w-full items-center rounded-lg",
          "text-sm font-medium transition-colors",
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-primary",
          collapsed
            ? "justify-center px-2"
            : "gap-3 px-3",
          isActive
            ? "bg-primary text-primary-foreground"
            : [
                "text-muted-foreground",
                "hover:bg-muted hover:text-foreground",
              ],
        )
      }
    >
      <Icon
        aria-hidden="true"
        className="h-5 w-5 shrink-0"
      />

      {!collapsed && (
        <span className="min-w-0 flex-1 truncate">
          {item.label}
        </span>
      )}
    </NavLink>
  );
}

const Sidebar = React.forwardRef<
  HTMLElement,
  SidebarProps
>(
  (
    {
      collapsed = false,
      onCollapsedChange,
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <aside
        ref={ref}
        className={cn(
          "sticky top-0 hidden h-screen shrink-0 flex-col",
          "border-r border-border bg-card text-card-foreground",
          "transition-[width] duration-200 lg:flex",
          collapsed ? "w-20" : "w-64",
          className,
        )}
        {...props}
      >
        <div
          className={cn(
            "flex h-16 shrink-0 items-center border-b border-border",
            collapsed
              ? "justify-center px-2"
              : "justify-between px-4",
          )}
        >
          <AppLogo
            size={collapsed ? "sm" : "md"}
            showText={!collapsed}
          />

          {!collapsed && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              aria-label="Collapse sidebar"
              onClick={() =>
                onCollapsedChange?.(true)
              }
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          )}
        </div>

        <nav
          aria-label="Main navigation"
          className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-3"
        >
          {mainNavigationItems.map((item) => (
            <SidebarLink
              key={item.href}
              item={item}
              collapsed={collapsed}
            />
          ))}
        </nav>

        <div className="border-t border-border p-3">
          <div className="space-y-1">
            {accountNavigationItems.map((item) => (
              <SidebarLink
                key={item.href}
                item={item}
                collapsed={collapsed}
              />
            ))}
          </div>

          {collapsed && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="mt-3 w-full"
              aria-label="Expand sidebar"
              onClick={() =>
                onCollapsedChange?.(false)
              }
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </div>
      </aside>
    );
  },
);

Sidebar.displayName = "Sidebar";

export default Sidebar;