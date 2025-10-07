"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import * as Icons from "lucide-react"
import { cn } from "@/lib/utils"
import type { TimeSeriesData } from "@/lib/types"
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { ChartConfig } from "@/components/ui/chart"

type MetricCardProps = {
  title: string
  value: string
  description: string
  icon: keyof typeof Icons
  variant?: "default" | "destructive"
}

export function MetricCard({ title, value, description, icon, variant = "default" }: MetricCardProps) {
  const IconComponent = Icons[icon] as React.ElementType

  return (
    <Card className={cn(variant === 'destructive' && 'bg-destructive/10 border-destructive/50')}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {IconComponent && <IconComponent className={cn("h-4 w-4 text-muted-foreground", variant === 'destructive' && 'text-destructive')} />}
      </CardHeader>
      <CardContent>
        <div className={cn("text-2xl font-bold", variant === 'destructive' && 'text-destructive')}>{value}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}

type ChartCardProps = {
    title: string;
    description: string;
    chartData: TimeSeriesData[];
    dataKey: keyof TimeSeriesData;
    chartType: 'line' | 'bar';
    color?: string;
}

export function ChartCard({ title, description, chartData, dataKey, chartType, color }: ChartCardProps) {
    const Chart = chartType === 'line' ? LineChart : BarChart;
    const pathColor = color || 'hsl(var(--primary))';
    const chartConfig = {
      [dataKey]: {
        label: title,
        color: pathColor,
      },
    } satisfies ChartConfig

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={chartConfig} className="h-[200px] w-full">
                    <ResponsiveContainer>
                        <Chart accessibilityLayer data={chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="time"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent />}
                            />
                            {chartType === 'line' ? (
                                <Line dataKey={dataKey} type="natural" stroke={`var(--color-${dataKey as string})`} strokeWidth={2} dot={false} />
                            ) : (
                                <Bar dataKey={dataKey} fill={`var(--color-${dataKey as string})`} radius={4} />
                            )}
                        </Chart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}
