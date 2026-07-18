import type { HTMLAttributes } from "react";

export type ChartType = "line" | "area" | "bar";

export type ChartDataValue = string | number | null | undefined;

export type ChartDataItem = Record<string, ChartDataValue>;

export interface ChartSeries {
    /**
     * Property name inside each data object.
     *
     * Example: "xp"
     */
    dataKey: string;

    /**
     * Human-readable name shown in the tooltip and legend.
     */
    label?: string;

    /**
     * CSS-compatible color.
     *
     * Example: "#8b5cf6" or "var(--chart-primary)"
     */
    color?: string;

    /**
     * Applies only to line and area charts.
     */
    curve?: "linear" | "monotone" | "step" | "basis";

    /**
     * Applies only to bar charts.
     */
    stackId?: string;

    /**
     * Hides this series without removing its configuration.
     */
    hidden?: boolean;
}

export interface ChartProps
    extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
    data: ChartDataItem[];

    series: ChartSeries[];

    type?: ChartType;

    /**
     * Property displayed on the horizontal axis.
     *
     * Example: "day", "date", or "name"
     */
    xAxisKey: string;

    height?: number;

    showGrid?: boolean;

    showXAxis?: boolean;

    showYAxis?: boolean;

    showTooltip?: boolean;

    showLegend?: boolean;

    showDots?: boolean;

    animate?: boolean;

    loading?: boolean;

    emptyMessage?: string;

    valueFormatter?: (value: number | string) => string;

    labelFormatter?: (label: string) => string;
}