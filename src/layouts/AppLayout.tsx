import {
  History,
  LayoutDashboard,
  ListTodo,
  LogOut,
  Timer,
  User,
} from "lucide-react";
import {
  NavLink,
  Outlet,
  useNavigate,
} from "react-router-dom";

import { useAuth } from "@/contexts/AuthContext";

interface NavigationItem {
  label: string;
  path: string;
  icon: typeof LayoutDashboard;
}

const navigationItems: NavigationItem[] = [
  {
    label: "Dashboard",
    path: "/app/dashboard",
    icon: LayoutDashboard,
  },
  {
    label: "Tasks",
    path: "/app/tasks",
    icon: ListTodo,
  },
  {
    label: "Pomodoro",
    path: "/app/pomodoro",
    icon: Timer,
  },
  {
    label: "History",
    path: "/app/history",
    icon: History,
  },
  {
    label: "Profile",
    path: "/app/profile",
    icon: User,
  },
];

export default function AppLayout() {
  const navigate = useNavigate();

  const {
    user,
    logout,
  } = useAuth();

  async function handleLogout() {
    try {
      await logout();

      navigate("/login", {
        replace: true,
      });
    } catch (error) {
      console.error("Logout failed:", error);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          <div>
            <p className="font-bold text-primary">
              Arcana Core
            </p>

            <p className="text-xs text-muted-foreground">
              Quest management prototype
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium">
                {user?.username ??
                  user?.email ??
                  "Adventurer"}
              </p>

              <p className="text-xs text-muted-foreground">
                Level {user?.level ?? 1}
              </p>
            </div>

            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex h-9 items-center gap-2 rounded-md border border-border px-3 text-sm font-medium transition-colors hover:bg-muted"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="flex">
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-60 shrink-0 border-r border-border p-4 md:block">
          <nav className="space-y-1">
            {navigationItems.map((item) => {
              const Icon = item.icon;

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    [
                      "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground",
                    ].join(" ")
                  }
                >
                  <Icon className="h-4 w-4" />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </aside>

        <main className="min-w-0 flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 z-40 flex border-t border-border bg-background md:hidden">
        {navigationItems.slice(0, 4).map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                [
                  "flex flex-1 flex-col items-center gap-1 px-2 py-2 text-xs",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground",
                ].join(" ")
              }
            >
              <Icon className="h-5 w-5" />
              {item.label}
            </NavLink>
          );
        })}
      </nav>
    </div>
  );
}