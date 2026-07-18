import {
  Bell,
  CheckCheck,
  Clock,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownTrigger,
} from "@/components/ui/dropdown";
import { cn } from "@/utils";

export interface Notification {
  id: string;
  title: string;
  description?: string;
  timestamp?: string;
  read?: boolean;
}

export interface NotificationMenuProps {
  notifications: Notification[];
  className?: string;
  emptyMessage?: string;
  onNotificationClick?: (notification: Notification) => void;
  onMarkAllAsRead?: () => void;
  onViewAll?: () => void;
}

function NotificationMenu({
  notifications,
  className,
  emptyMessage = "No notifications yet.",
  onNotificationClick,
  onMarkAllAsRead,
  onViewAll,
}: NotificationMenuProps) {
  const unreadCount = notifications.filter(
    (notification) => !notification.read,
  ).length;

  return (
    <Dropdown>
      <DropdownTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={cn("relative", className)}
          aria-label={
            unreadCount > 0
              ? `Open notifications, ${unreadCount} unread`
              : "Open notifications"
          }
        >
          <Bell className="h-5 w-5" />

          {unreadCount > 0 && (
            <span
              className={cn(
                "absolute -right-1 -top-1",
                "flex min-h-5 min-w-5 items-center justify-center",
                "rounded-full bg-primary px-1",
                "text-[10px] font-semibold text-primary-foreground",
              )}
            >
              {unreadCount > 99 ? "99+" : unreadCount}
            </span>
          )}
        </Button>
      </DropdownTrigger>

      <DropdownContent
        align="end"
        className="w-80 p-0"
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <div>
            <p className="font-medium text-foreground">
              Notifications
            </p>

            <p className="text-xs text-muted">
              {unreadCount > 0
                ? `${unreadCount} unread`
                : "You're all caught up"}
            </p>
          </div>

          {unreadCount > 0 && onMarkAllAsRead && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onMarkAllAsRead}
            >
              <CheckCheck className="mr-2 h-4 w-4" />
              Mark all read
            </Button>
          )}
        </div>

        <div className="max-h-96 overflow-y-auto">
          {notifications.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-10 text-center">
              <Bell className="mb-3 h-8 w-8 text-muted" />

              <p className="text-sm text-muted">
                {emptyMessage}
              </p>
            </div>
          ) : (
            notifications.map((notification) => (
              <DropdownItem
                key={notification.id}
                onSelect={() =>
                  onNotificationClick?.(notification)
                }
                className={cn(
                  "flex cursor-pointer items-start gap-3",
                  "rounded-none border-b border-border px-4 py-3",
                  "last:border-b-0",
                  !notification.read && "bg-primary/5",
                )}
              >
                <span
                  className={cn(
                    "mt-1 h-2 w-2 shrink-0 rounded-full",
                    notification.read
                      ? "bg-transparent"
                      : "bg-primary",
                  )}
                />

                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-medium text-foreground">
                    {notification.title}
                  </span>

                  {notification.description && (
                    <span className="mt-0.5 block text-xs text-muted">
                      {notification.description}
                    </span>
                  )}

                  {notification.timestamp && (
                    <span className="mt-2 flex items-center gap-1 text-xs text-muted">
                      <Clock className="h-3 w-3" />
                      {notification.timestamp}
                    </span>
                  )}
                </span>
              </DropdownItem>
            ))
          )}
        </div>

        {notifications.length > 0 && onViewAll && (
          <div className="border-t border-border p-2">
            <Button
              variant="ghost"
              size="sm"
              className="w-full"
              onClick={onViewAll}
            >
              View all notifications
            </Button>
          </div>
        )}
      </DropdownContent>
    </Dropdown>
  );
}

export { NotificationMenu };