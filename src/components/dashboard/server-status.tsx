"use client"

import type { Server } from "@/lib/types";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Cpu, MemoryStick, Server as ServerIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const statusConfig = {
    online: { label: 'Online', className: 'bg-green-500' },
    degraded: { label: 'Degraded', className: 'bg-yellow-500' },
    offline: { label: 'Offline', className: 'bg-red-500' },
};

export function ServerStatus({ servers }: { servers: Server[] }) {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Server Status</CardTitle>
                <CardDescription>Live status of all provisioned server instances.</CardDescription>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Status</TableHead>
                            <TableHead>Server Name</TableHead>
                            <TableHead>Region</TableHead>
                            <TableHead>IP Address</TableHead>
                            <TableHead className="w-[150px]">CPU Load</TableHead>
                            <TableHead className="w-[150px]">Memory</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {servers.map((server) => {
                            const config = statusConfig[server.status];
                            return (
                                <TableRow key={server.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <span className={cn("h-2.5 w-2.5 rounded-full", config.className)} />
                                            <span className="font-medium">{config.label}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <ServerIcon className="h-4 w-4 text-muted-foreground" />
                                            <span>{server.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline">{server.region}</Badge>
                                    </TableCell>
                                    <TableCell>{server.ip}</TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <Cpu className="h-4 w-4 text-muted-foreground" />
                                            <Progress value={server.cpuUsage} className="h-2" />
                                            <span className="w-8 text-right text-sm">{server.cpuUsage}%</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex items-center gap-2">
                                            <MemoryStick className="h-4 w-4 text-muted-foreground" />
                                            <Progress value={server.memoryUsage} className="h-2" />
                                            <span className="w-8 text-right text-sm">{server.memoryUsage}%</span>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
