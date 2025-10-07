

"use client";

import { useInterval } from "@/hooks/use-interval";
import type { Server, Alert } from "@/lib/types";
import { useEffect, useState } from "react";
import { ChartCard, MetricCard } from "./metric-card";
import { ServerStatus } from "./server-status";
import { AlertList } from "./alert-list";
import { HealthCheckCard } from "./health-check-card";
import { Skeleton } from "@/components/ui/skeleton";
import { ExternalHealthCheckCard } from "./external-health-check-card";

const initialServers: Server[] = [
  { id: 'srv-1', name: 'web-1-us-east', ip: '192.168.1.10', region: 'us-east-1', status: 'online', cpuUsage: 34, memoryUsage: 58 },
  { id: 'srv-2', name: 'web-2-us-east', ip: '192.168.1.11', region: 'us-east-1', status: 'online', cpuUsage: 45, memoryUsage: 62 },
  { id: 'srv-3', name: 'web-1-eu-west', ip: '192.168.2.20', region: 'eu-west-1', status: 'degraded', cpuUsage: 88, memoryUsage: 75 },
  { id: 'srv-4', name: 'api-1-us-west', ip: '192.168.3.30', region: 'us-west-2', status: 'online', cpuUsage: 21, memoryUsage: 45 },
  { id: 'srv-5', name: 'api-2-us-west', ip: '192.168.3.31', region: 'us-west-2', status: 'offline', cpuUsage: 0, memoryUsage: 0 },
];

const initialAlerts: Alert[] = [
    { id: 'alert-1', severity: 'critical', message: 'High latency detected on api-1-us-west (2500ms)', timestamp: new Date(Date.now() - 5 * 60000).toISOString() },
    { id: 'alert-2', severity: 'warning', message: 'CPU usage > 85% on web-1-eu-west', timestamp: new Date(Date.now() - 15 * 60000).toISOString() },
    { id: 'alert-3', severity: 'info', message: 'New server instance `web-3-us-east` provisioning.', timestamp: new Date(Date.now() - 30 * 60000).toISOString() },
];


export default function DashboardPage() {
  const [isMounted, setIsMounted] = useState(false);
  const [requestRate, setRequestRate] = useState<{ time: string; value: number }[]>([]);
  const [errorRate, setErrorRate] = useState<{ time: string; value: number }[]>([]);
  const [latency, setLatency] = useState(0);
  const [servers, setServers] = useState<Server[]>(initialServers);

  useEffect(() => {
    setIsMounted(true);
    const initialRequestData = Array.from({ length: 20 }, (_, i) => ({
        time: `${i}`,
        value: Math.floor(Math.random() * (1200 - 800 + 1) + 800),
      }));
      const initialErrorData = Array.from({ length: 20 }, (_, i) => ({
        time: `${i}`,
        value: Math.random() * 2,
      }));
    setRequestRate(initialRequestData);
    setErrorRate(initialErrorData);
    setLatency(Math.floor(Math.random() * (250 - 50 + 1) + 50));
  }, []);

  useInterval(() => {
    if (!isMounted) return;
    setRequestRate((prev) => [...prev.slice(1), { time: `${parseInt(prev[prev.length - 1]?.time ?? '0') + 1}`, value: Math.floor(Math.random() * (1200 - 800 + 1) + 800) }]);
    setErrorRate((prev) => [...prev.slice(1), { time: `${parseInt(prev[prev.length - 1]?.time ?? '0') + 1}`, value: Math.random() * 2 }]);
    setLatency(Math.floor(Math.random() * (250 - 50 + 1) + 50));
    setServers(prev => prev.map(s => s.status === 'offline' ? s : ({...s, cpuUsage: Math.min(99, s.cpuUsage + Math.floor(Math.random() * 5) - 2), memoryUsage: Math.min(99, s.memoryUsage + Math.floor(Math.random() * 4) - 2) })));
  }, 2000);

  const currentRequestRate = requestRate[requestRate.length - 1]?.value ?? 0;
  const currentErrorRate = errorRate[errorRate.length - 1]?.value ?? 0;
  
  if (!isMounted) {
    return (
        <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
            <div className="xl:col-span-3 grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
               <Skeleton className="h-[126px]" />
               <Skeleton className="h-[126px]" />
               <Skeleton className="h-[126px]" />
               <Skeleton className="h-[126px]" />
            </div>
            <div className="xl:col-span-3 grid gap-4 md:gap-8 grid-cols-1 lg:grid-cols-2">
                <Skeleton className="h-[314px]" />
                <Skeleton className="h-[314px]" />
            </div>
            <div className="xl:col-span-3">
                <Skeleton className="h-[354px]" />
            </div>
             <div className="xl:col-span-3">
                <Skeleton className="h-[270px]" />
            </div>
        </div>
    )
  }

  return (
    <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <div className="xl:col-span-3 grid gap-4 md:gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard title="Request Rate" value={`${currentRequestRate.toFixed(0)} rpm`} description="Total requests per minute" icon="BarChartHorizontal" />
            <MetricCard title="Error Rate" value={`${currentErrorRate.toFixed(2)} %`} description="Percentage of failed requests" icon="AlertOctagon" variant={currentErrorRate > 1 ? 'destructive' : 'default'}/>
            <MetricCard title="Avg. Latency" value={`${latency} ms`} description="Average request response time" icon="Clock" variant={latency > 200 ? 'destructive' : 'default'}/>
            <HealthCheckCard />
        </div>
        
        <div className="xl:col-span-3 grid gap-4 md:gap-8 grid-cols-1 lg:grid-cols-2">
            <ChartCard title="Request Rate" description="Live requests per minute over the last minute." chartData={requestRate} dataKey="value" chartType="line" />
            <ChartCard title="Error Rate (%)" description="Live error rate over the last minute." chartData={errorRate} dataKey="value" chartType="bar" color="var(--color-destructive)" />
        </div>
        
        <div className="lg:col-span-2 xl:col-span-3">
            <ExternalHealthCheckCard />
        </div>

        <div className="xl:col-span-3">
            <ServerStatus servers={servers} />
        </div>

        <div className="xl:col-span-3">
            <AlertList alerts={initialAlerts} />
        </div>
    </div>
  )
}
