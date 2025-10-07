"use client"

import { useEffect, useState } from "react";
import { MetricCard } from "./metric-card";

type HealthStatus = {
    status: 'ok' | 'error' | 'loading';
    timestamp?: string;
}

export function HealthCheckCard() {
    const [health, setHealth] = useState<HealthStatus>({ status: 'loading' });

    useEffect(() => {
        const fetchHealth = async () => {
            try {
                const response = await fetch('/api/health');
                if (!response.ok) throw new Error('Health check failed');
                const data = await response.json();
                setHealth({ status: data.status, timestamp: data.timestamp });
            } catch (error) {
                setHealth({ status: 'error' });
            }
        };

        fetchHealth();
        const interval = setInterval(fetchHealth, 30000); // Check every 30 seconds
        return () => clearInterval(interval);
    }, []);

    const getCardProps = () => {
        switch (health.status) {
            case 'ok':
                return {
                    title: "System Health",
                    value: "Operational",
                    description: "All systems are running smoothly.",
                    icon: "CircleCheck" as const,
                    variant: "default" as const
                };
            case 'error':
                return {
                    title: "System Health",
                    value: "System Outage",
                    description: "A component is not responding.",
                    icon: "XCircle" as const,
                    variant: "destructive" as const
                };
            default:
                return {
                    title: "System Health",
                    value: "Checking...",
                    description: "Pinging health check endpoint.",
                    icon: "Loader" as const,
                    variant: "default" as const
                };
        }
    };
    
    return <MetricCard {...getCardProps()} />;
}
