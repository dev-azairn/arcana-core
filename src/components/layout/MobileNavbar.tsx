import * as React from "react";
import { LogOut, X } from "lucide-react";
import { NavLink } from "react-router-dom";

import { Button } from "@ui/button";
import { AppLogo } from "@features/common/app-logo";
import { cn } from "@/utils";

import {
  accountNavigationItems,
  mainNavigationItems,
  type NavigationItem,
} from "@/config/navigation";

export interface MobileNavbarProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLogout?: () => void;
}

interface MobileNavigationLinkProps {
  item: NavigationItem;
  onNavigate: () => void;
}

function MobileNavigationLink({
  item,
  onNavigate,
}: MobileNavigationLinkProps) {
  const Icon = item.icon;

  return (
    <NavLink
      to={item.href}
      end={item.end}
      onClick={onNavigate}
      className={({ isActive }) =>
        cn(
          "flex h-11 items-center gap-3 rounded-lg px-3",
          "text-sm font-medium transition-colors",
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

      <span>{item.label}</span>
    </NavLink>
  );
}

export default function MobileNavbar({
  open,
  onOpenChange,
  onLogout,
}: MobileNavbarProps) {
  React.useEffect(() => {
    if (!open) {
      return;
    }

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow =
        previousOverflow;
    };
  }, [open]);

  React.useEffect(() => {
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") {
        onOpenChange(false);
      }
    }

    if (open) {
      document.addEventListener(
        "keydown",
        handleEscape,
      );
    }

    return () => {
      document.removeEventListener(
        "keydown",
        handleEscape,
      );
    };
  }, [open, onOpenChange]);

  if (!open) {
    return null;
  }

  const close = () => onOpenChange(false);

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      <button
        type="button"
        aria-label="Close navigation"
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={close}
      />

      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={cn(
          "relative z-10 flex h-full w-[min(20rem,85vw)]",
          "flex-col border-r border-border",
          "bg-card text-card-foreground shadow-2xl",
        )}
      >
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <AppLogo size="md" />

          <Button
            type="button"
            variant="ghost"
            size="icon"
            aria-label="Close navigation"
            onClick={close}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav
          aria-label="Mobile navigation"
          className="flex min-h-0 flex-1 flex-col gap-1 overflow-y-auto p-3"
        >
          {mainNavigationItems.map((item) => (
            <MobileNavigationLink
              key={item.href}
              item={item}
              onNavigate={close}
            />
          ))}

          <div className="my-3 border-t border-border" />

          {accountNavigationItems.map((item) => (
            <MobileNavigationLink
              key={item.href}
              item={item}
              onNavigate={close}
            />
          ))}
        </nav>

        {onLogout && (
          <div className="border-t border-border p-3">
            <Button
              type="button"
              variant="ghost"
              className="w-full justify-start text-destructive hover:text-destructive"
              onClick={() => {
                close();
                onLogout();
              }}
            >
              <LogOut className="h-4 w-4" />
              Log out
            </Button>
          </div>
        )}
      </aside>
    </div>
  );
}