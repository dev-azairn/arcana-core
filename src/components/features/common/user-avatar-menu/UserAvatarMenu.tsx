import {
  LogOut,
  Settings,
  User,
} from "lucide-react";

import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/components/ui/dropdown";
import { cn } from "@/utils";

export interface UserAvatarMenuProps {
  name: string;
  email?: string;
  avatarUrl?: string;
  className?: string;

  onProfileClick?: () => void;
  onSettingsClick?: () => void;
  onLogoutClick?: () => void;
}

function getInitials(name: string): string {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

function UserAvatarMenu({
  name,
  email,
  avatarUrl,
  className,
  onProfileClick,
  onSettingsClick,
  onLogoutClick,
}: UserAvatarMenuProps) {
  const initials = getInitials(name);

  return (
    <Dropdown>
      <DropdownTrigger
        aria-label={`Open ${name}'s account menu`}
        className={cn(
          "flex items-center gap-3 rounded-lg p-1.5",
          "transition-colors hover:bg-muted/50",
          "focus-visible:outline-none focus-visible:ring-2",
          "focus-visible:ring-primary focus-visible:ring-offset-2",
          "focus-visible:ring-offset-background",
          className,
        )}
      >
        <span
          className={cn(
            "flex h-9 w-9 shrink-0 items-center justify-center",
            "overflow-hidden rounded-full border border-border",
            "bg-primary text-sm font-semibold text-primary-foreground",
          )}
        >
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt={`${name}'s avatar`}
              className="h-full w-full object-cover"
            />
          ) : (
            initials || <User className="h-4 w-4" />
          )}
        </span>

        <span className="hidden min-w-0 text-left sm:block">
          <span className="block max-w-40 truncate text-sm font-medium text-foreground">
            {name}
          </span>

          {email && (
            <span className="block max-w-40 truncate text-xs text-muted">
              {email}
            </span>
          )}
        </span>
      </DropdownTrigger>

      <DropdownContent align="end" className="w-56">
        <div className="border-b border-border px-3 py-2">
          <p className="truncate text-sm font-medium text-foreground">
            {name}
          </p>

          {email && (
            <p className="truncate text-xs text-muted">
              {email}
            </p>
          )}
        </div>

        <div className="p-1">
          <DropdownItem onClick={onProfileClick}>
            <User className="mr-2 h-4 w-4" />
            Profile
          </DropdownItem>

          <DropdownItem onClick={onSettingsClick}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </DropdownItem>
        </div>

        <div className="border-t border-border p-1">
          <DropdownItem
            onClick={onLogoutClick}
            className="text-destructive focus:text-destructive"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </DropdownItem>
        </div>
      </DropdownContent>
    </Dropdown>
  );
}

export { UserAvatarMenu };