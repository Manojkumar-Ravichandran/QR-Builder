import { QrCode, TrendingUp, Users } from 'lucide-react';
import StatCard from './StatCard';

interface Props {
  totalCodes: number;
  totalScans?: number;
  activeDevices?: number;
  loading?: boolean;
}

export default function StatsGrid({ totalCodes, totalScans = 0, activeDevices = 0, loading = false }: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <StatCard
        icon={QrCode}
        label="Total QR Codes"
        value={totalCodes}
        color="bg-blue-100 text-blue-600"
      />
      <StatCard
        icon={TrendingUp}
        label="Total Scans"
        value={loading ? '...' : totalScans.toLocaleString()}
        color="bg-green-100 text-green-600"
      />
      <StatCard
        icon={Users}
        label="Active Devices"
        value={loading ? '...' : activeDevices.toLocaleString()}
        color="bg-purple-100 text-purple-600"
      />
    </div>
  );
}
