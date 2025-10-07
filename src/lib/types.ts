export type Server = {
  id: string;
  name: string;
  ip: string;
  region: string;
  status: 'online' | 'offline' | 'degraded';
  cpuUsage: number;
  memoryUsage: number;
};

export type Alert = {
  id: string;
  severity: 'critical' | 'warning' | 'info';
  message: string;
  timestamp: string;
};

export type TimeSeriesData = {
  time: string;
  value: number;
};
