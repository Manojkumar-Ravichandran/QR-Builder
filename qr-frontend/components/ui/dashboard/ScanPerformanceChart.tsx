'use client';

import { Card } from '@/components/ui/Card';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const data = [
  { name: 'Mon', scans: 400 },
  { name: 'Tue', scans: 300 },
  { name: 'Wed', scans: 600 },
  { name: 'Thu', scans: 800 },
  { name: 'Fri', scans: 500 },
  { name: 'Sat', scans: 900 },
  { name: 'Sun', scans: 700 },
];

export default function ScanPerformanceChart() {
  return (
    <Card title="Scan Performance">
      <div className="h-80 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#2563EB" stopOpacity={0.1} />
                <stop offset="95%" stopColor="#2563EB" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" axisLine={false} tickLine={false} />
            <YAxis axisLine={false} tickLine={false} />
            <Tooltip />

            <Area
              type="monotone"
              dataKey="scans"
              stroke="#2563EB"
              strokeWidth={3}
              fill="url(#colorScans)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}
