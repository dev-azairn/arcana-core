import type { ReactNode } from "react";
import { Home } from "lucide-react";
import { matchPath, useLocation } from "react-router-dom";

import { routes } from "@/config/routes";
import Breadcrumb from "./Breadcrumb";

interface RouteBreadcrumbConfig {
    path: string;
    label: string | ((params: Record<string, string>) => string);
    icon?: ReactNode;
}

const breadcrumbRoutes: RouteBreadcrumbConfig[] = [
    {
        path: routes.dashboard,
        label: "Dashboard",
    },
    {
        path: routes.tasks,
        label: "Tasks",
    },
    {
        path: `${routes.tasks}/:taskId`,
        label: ({ taskId }) => `Task ${taskId}`,
    },
    {
        path: `${routes.tasks}/:taskId/edit`,
        label: "Edit",
    },
    {
        path: routes.pomodoro,
        label: "Pomodoro",
    },
    {
        path: routes.profile,
        label: "Profile",
    },
    {
        path: routes.history,
        label: "History",
    },
    {
        path: routes.settings,
        label: "Settings",
    },
];

interface AutoBreadcrumbProps {
    className?: string;
    showHome?: boolean;
    homeLabel?: string;
    homePath?: string;
    separator?: ReactNode;
}

function getPathSegments(pathname: string): string[] {
    const segments = pathname
        .split("/")
        .filter(Boolean);

    return segments.map(
        (_, index) => `/${segments.slice(0, index + 1).join("/")}`
    );
}

function findBreadcrumbConfig(path: string) {
    return breadcrumbRoutes.find((route) =>
        matchPath(
            {
                path: route.path,
                end: true,
            },
            path
        )
    );
}

export default function AutoBreadcrumb({
    className,
    showHome = true,
    homeLabel = "Home",
    homePath = routes.dashboard,
    separator,
}: AutoBreadcrumbProps) {
    const { pathname } = useLocation();

    const paths = getPathSegments(pathname);

    const items = paths.flatMap((path) => {
        const config = findBreadcrumbConfig(path);

        if (!config) {
            return [];
        }

        const match = matchPath(
            {
                path: config.path,
                end: true,
            },
            path
        );

        const params = Object.fromEntries(
            Object.entries(match?.params ?? {}).map(([key, value]) => [
                key,
                value ?? "",
            ])
        );

        const label =
            typeof config.label === "function"
                ? config.label(params)
                : config.label;

        return [
            {
                label,
                href: path,
                icon: config.icon,
            },
        ];
    });

    const normalizedItems = showHome
        ? [
              {
                  label: homeLabel,
                  href: homePath,
                  icon: <Home size={16} />,
              },
              ...items.filter((item) => item.href !== homePath),
          ]
        : items;

    if (normalizedItems.length <= 1) {
        return null;
    }

    return (
        <Breadcrumb
            items={normalizedItems}
            separator={separator}
            className={className}
        />
    );
}