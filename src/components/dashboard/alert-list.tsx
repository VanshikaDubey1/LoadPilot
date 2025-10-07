"use client"

import type { Alert } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { AlertTriangle, Info, CircleCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { formatDistanceToNow } from 'date-fns';

const severityConfig = {
    critical: { icon: AlertTriangle, className: 'text-destructive' },
    warning: { icon: AlertTriangle, className: 'text-yellow-500' },
    info: { icon: Info, className: 'text-blue-500' },
};

export function AlertList({ alerts }: { alerts: Alert[] }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Recent Alerts</CardTitle>
                <CardDescription>Important notifications about your system's health.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableBody>
                        {alerts.length > 0 ? alerts.map((alert) => {
                            const config = severityConfig[alert.severity] || severityConfig.info;
                            const Icon = config.icon;
                            return (
                                <TableRow key={alert.id}>
                                    <TableCell className="w-10">
                                        <Icon className={cn("h-5 w-5", config.className)} />
                                    </TableCell>
                                    <TableCell>
                                        <div className="font-medium">{alert.message}</div>
                                    </TableCell>
                                    <TableCell className="text-right text-muted-foreground">
                                        {formatDistanceToNow(new Date(alert.timestamp), { addSuffix: true })}
                                    </TableCell>
                                </TableRow>
                            )
                        }) : (
                            <TableRow>
                                <TableCell colSpan={3} className="h-24 text-center">
                                    <div className="flex items-center justify-center gap-2 text-muted-foreground">
                                        <CircleCheck className="h-5 w-5"/>
                                        <p>No alerts. Everything is running smoothly.</p>
                                    </div>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
