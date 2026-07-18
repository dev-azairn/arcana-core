import {
  BarChart3,
  CalendarDays,
  History,
  LayoutDashboard,
  ScrollText,
  Settings,
  Timer,
  Trophy,
  User,
  type LucideIcon,
} from "lucide-react";

export interface NavigationItem {
  label: string;
  href: string;
  icon: LucideIcon;
  end?: boolean;
}

export const mainNavigationItems: NavigationItem[] = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    end: true,
  },
  {
    label: "Quest Board",
    href: "/tasks",
    icon: ScrollText,
  },
  {
    label: "Calendar",
    href: "/calendar",
    icon: CalendarDays,
  },
  {
    label: "Pomodoro",
    href: "/pomodoro",
    icon: Timer,
  },
  {
    label: "Achievements",
    href: "/achievements",
    icon: Trophy,
  },
  {
    label: "Statistics",
    href: "/statistics",
    icon: BarChart3,
  },
  {
    label: "History",
    href: "/history",
    icon: History,
  },
];

export const accountNavigationItems: NavigationItem[] = [
  {
    label: "Profile",
    href: "/profile",
    icon: User,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];