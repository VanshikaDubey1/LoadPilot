"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import * as Icons from "lucide-react"
import { cn } from "@/lib/utils"
import type { TimeSeriesData } from "@/lib/types"
import { Bar, BarChart, CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { ChartTooltipContent } from "@/components/ui/chart"

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
    const ChartComponent = chartType === 'line' ? LineChart : BarChart;
    const pathColor = color || 'var(--color-primary)';

    return (
        <Card>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                    <ChartComponent data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border))" />
                        <XAxis dataKey="time" tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickLine={false} axisLine={false} />
                        <YAxis tick={{ fill: 'hsl(var(--muted-foreground))', fontSize: 12 }} tickLine={false} axisLine={false} />
                        <Tooltip cursor={{fill: 'hsl(var(--accent) / 0.1)'}} content={<ChartTooltipContent />} />
                        {chartType === 'line' ? (
                            <Line type="monotone" dataKey={dataKey} stroke={pathColor} strokeWidth={2} dot={false} />
                        ) : (
                            <Bar dataKey={dataKey} fill={pathColor} radius={[4, 4, 0, 0]} />
                        )}
                    </ChartComponent>
                </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    )
}
