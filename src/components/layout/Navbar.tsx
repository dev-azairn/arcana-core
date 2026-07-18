import * as React from "react";
import { Menu } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { Button } from "@ui/button";
import { SearchInput } from "@ui/input";

import {
  NotificationMenu,
  type Notification,
} from "@features/common/notification-menu";
import { ThemeToggle } from "@features/common/theme-toggle";
import { UserAvatarMenu } from "@features/common/user-avatar-menu";
import { cn } from "@/utils";

export interface NavbarUser {
  name: string;
  email?: string;
  avatarUrl?: string;
}

export interface NavbarProps
  extends React.HTMLAttributes<HTMLElement> {
  user: NavbarUser;
  notifications?: Notification[];
  searchValue?: string;

  onSearchValueChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  onMenuClick?: () => void;
  onNotificationClick?: (
    notification: Notification,
  ) => void;
  onMarkAllNotificationsAsRead?: () => void;
  onViewAllNotifications?: () => void;
  onLogout?: () => void;
}

const Navbar = React.forwardRef<
  HTMLElement,
  NavbarProps
>(
  (
    {
      user,
      notifications = [],
      searchValue,
      onSearchValueChange,
      onSearch,
      onMenuClick,
      onNotificationClick,
      onMarkAllNotificationsAsRead,
      onViewAllNotifications,
      onLogout,
      className,
      ...props
    },
    ref,
  ) => {
    const navigate = useNavigate();

    return (
      <header
        ref={ref}
        className={cn(
          "sticky top-0 z-40 h-16",
          "border-b border-border",
          "bg-background/90 backdrop-blur",
          className,
        )}
        {...props}
      >
        <div className="flex h-full items-center gap-3 px-4 lg:px-6">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-label="Open navigation"
            onClick={onMenuClick}
          >
            <Menu className="h-5 w-5" />
          </Button>

          <SearchInput
            value={searchValue}
            onValueChange={onSearchValueChange}
            onSearch={onSearch}
            placeholder="Search quests..."
            className="hidden w-full max-w-md sm:block"
          />

          <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
            <NotificationMenu
              notifications={notifications}
              onNotificationClick={
                onNotificationClick
              }
              onMarkAllAsRead={
                onMarkAllNotificationsAsRead
              }
              onViewAll={
                onViewAllNotifications
              }
            />

            <ThemeToggle />

            <UserAvatarMenu
              name={user.name}
              email={user.email}
              avatarUrl={user.avatarUrl}
              onProfileClick={() =>
                navigate("/profile")
              }
              onSettingsClick={() =>
                navigate("/settings")
              }
              onLogoutClick={onLogout}
            />
          </div>
        </div>
      </header>
    );
  },
);

Navbar.displayName = "Navbar";

export default Navbar;