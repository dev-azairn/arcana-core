import { useId } from "react";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

import { cn } from "@/utils";

import { chartTheme } from "./Chart.styles";
import type {
    ChartDataValue,
    ChartProps,
    ChartSeries,
} from "./Chart.types";

function getSeriesColor(
    series: ChartSeries,
    index: number
): string {
    return (
        series.color ??
        chartTheme.series[index % chartTheme.series.length]
    );
}

function formatDefaultValue(value: ChartDataValue): string {
    if (value === null || value === undefined) {
        return "—";
    }

    if (typeof value === "number") {
        return new Intl.NumberFormat().format(value);
    }

    return String(value);
}

export default function Chart({
    data,
    series,
    type = "line",
    xAxisKey,
    height = 320,
    showGrid = true,
    showXAxis = true,
    showYAxis = true,
    showTooltip = true,
    showLegend = false,
    showDots = false,
    animate = true,
    loading = false,
    emptyMessage = "No chart data available.",
    valueFormatter,
    labelFormatter,
    className,
    ...props
}: ChartProps) {
    const id = useId().replace(/:/g, "");

    const visibleSeries = series.filter(
        (item) => !item.hidden
    );

    const formatValue = (
        value: ChartDataValue
    ): string => {
        if (
            valueFormatter &&
            (typeof value === "number" ||
                typeof value === "string")
        ) {
            return valueFormatter(value);
        }

        return formatDefaultValue(value);
    };

    const commonChartContent = (
        <>
            {showGrid && (
                <CartesianGrid
                    stroke={chartTheme.grid}
                    strokeDasharray="4 4"
                    vertical={false}
                />
            )}

            {showXAxis && (
                <XAxis
                    dataKey={xAxisKey}
                    tickLine={false}
                    axisLine={false}
                    tick={{
                        fill: chartTheme.axis,
                        fontSize: 12,
                    }}
                    tickMargin={12}
                />
            )}

            {showYAxis && (
                <YAxis
                    tickLine={false}
                    axisLine={false}
                    tick={{
                        fill: chartTheme.axis,
                        fontSize: 12,
                    }}
                    tickMargin={12}
                    width={48}
                    tickFormatter={(value) =>
                        formatValue(value)
                    }
                />
            )}

            {showTooltip && (
                <Tooltip
                    cursor={{
                        stroke: "rgba(139, 92, 246, 0.3)",
                        strokeDasharray: "4 4",
                    }}
                    contentStyle={{
                        backgroundColor:
                            chartTheme.tooltipBackground,
                        border: `1px solid ${chartTheme.tooltipBorder}`,
                        borderRadius: "12px",
                        boxShadow:
                            "0 12px 32px rgba(0, 0, 0, 0.35)",
                        color: chartTheme.tooltipText,
                    }}
                    labelStyle={{
                        color: chartTheme.tooltipText,
                        fontWeight: 600,
                        marginBottom: "6px",
                    }}
                    itemStyle={{
                        color: chartTheme.tooltipText,
                    }}
                    formatter={(value, name) => [
                        formatValue(
                            value as ChartDataValue
                        ),
                        String(name),
                    ]}
                    labelFormatter={(label) =>
                        labelFormatter
                            ? labelFormatter(String(label))
                            : String(label)
                    }
                />
            )}

            {showLegend && (
                <Legend
                    iconType="circle"
                    wrapperStyle={{
                        color: chartTheme.axis,
                        fontSize: "13px",
                        paddingTop: "16px",
                    }}
                />
            )}
        </>
    );

    const renderLineChart = () => (
        <LineChart
            data={data}
            margin={{
                top: 8,
                right: 12,
                bottom: 8,
                left: 0,
            }}
        >
            {commonChartContent}

            {visibleSeries.map((item, index) => {
                const color = getSeriesColor(
                    item,
                    index
                );

                return (
                    <Line
                        key={item.dataKey}
                        type={item.curve ?? "monotone"}
                        dataKey={item.dataKey}
                        name={item.label ?? item.dataKey}
                        stroke={color}
                        strokeWidth={3}
                        dot={
                            showDots
                                ? {
                                      r: 4,
                                      fill: color,
                                      strokeWidth: 0,
                                  }
                                : false
                        }
                        activeDot={{
                            r: 6,
                            fill: color,
                            stroke: "#0f172a",
                            strokeWidth: 3,
                        }}
                        isAnimationActive={animate}
                    />
                );
            })}
        </LineChart>
    );

    const renderAreaChart = () => (
        <AreaChart
            data={data}
            margin={{
                top: 8,
                right: 12,
                bottom: 8,
                left: 0,
            }}
        >
            <defs>
                {visibleSeries.map((item, index) => {
                    const color = getSeriesColor(
                        item,
                        index
                    );

                    return (
                        <linearGradient
                            key={item.dataKey}
                            id={`${id}-${item.dataKey}`}
                            x1="0"
                            y1="0"
                            x2="0"
                            y2="1"
                        >
                            <stop
                                offset="5%"
                                stopColor={color}
                                stopOpacity={0.4}
                            />

                            <stop
                                offset="95%"
                                stopColor={color}
                                stopOpacity={0}
                            />
                        </linearGradient>
                    );
                })}
            </defs>

            {commonChartContent}

            {visibleSeries.map((item, index) => {
                const color = getSeriesColor(
                    item,
                    index
                );

                return (
                    <Area
                        key={item.dataKey}
                        type={item.curve ?? "monotone"}
                        dataKey={item.dataKey}
                        name={item.label ?? item.dataKey}
                        stroke={color}
                        strokeWidth={3}
                        fill={`url(#${id}-${item.dataKey})`}
                        isAnimationActive={animate}
                    />
                );
            })}
        </AreaChart>
    );

    const renderBarChart = () => (
        <BarChart
            data={data}
            margin={{
                top: 8,
                right: 12,
                bottom: 8,
                left: 0,
            }}
        >
            {commonChartContent}

            {visibleSeries.map((item, index) => {
                const color = getSeriesColor(
                    item,
                    index
                );

                return (
                    <Bar
                        key={item.dataKey}
                        dataKey={item.dataKey}
                        name={item.label ?? item.dataKey}
                        fill={color}
                        radius={[6, 6, 0, 0]}
                        stackId={item.stackId}
                        isAnimationActive={animate}
                    />
                );
            })}
        </BarChart>
    );

    const renderChart = () => {
        switch (type) {
            case "area":
                return renderAreaChart();

            case "bar":
                return renderBarChart();

            case "line":
            default:
                return renderLineChart();
        }
    };

    return (
        <div
            className={cn(
                "relative w-full text-slate-100",
                className
            )}
            style={{ height }}
            {...props}
        >
            {loading ? (
                <ChartSkeleton />
            ) : data.length === 0 ||
              visibleSeries.length === 0 ? (
                <ChartEmptyState
                    message={emptyMessage}
                />
            ) : (
                <ResponsiveContainer
                    width="100%"
                    height="100%"
                >
                    {renderChart()}
                </ResponsiveContainer>
            )}
        </div>
    );
}

function ChartSkeleton() {
    return (
        <div
            className="
                flex
                h-full
                w-full
                animate-pulse
                items-end
                gap-3
                rounded-2xl
                border
                border-slate-800
                bg-slate-900/40
                p-6
            "
            role="status"
            aria-label="Loading chart"
        >
            {[35, 60, 45, 80, 55, 70, 48].map(
                (height, index) => (
                    <div
                        key={index}
                        className="
                            flex-1
                            rounded-t-lg
                            bg-slate-700/60
                        "
                        style={{
                            height: `${height}%`,
                        }}
                    />
                )
            )}
        </div>
    );
}

interface ChartEmptyStateProps {
    message: string;
}

function ChartEmptyState({
    message,
}: ChartEmptyStateProps) {
    return (
        <div
            className="
                flex
                h-full
                w-full
                items-center
                justify-center
                rounded-2xl
                border
                border-dashed
                border-slate-700
                bg-slate-900/30
                px-6
                text-center
                text-sm
                text-slate-400
            "
        >
            {message}
        </div>
    );
}