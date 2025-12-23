import { Card } from '@/components/ui/Card';
import { LucideIcon } from 'lucide-react';

interface Props {
  icon: LucideIcon;
  label: string;
  value: number | string;
  color: string;
}

export default function StatCard({
  icon: Icon,
  label,
  value,
  color,
}: Props) {
  return (
    <Card className="flex items-center p-6">
      <div className={`p-3 rounded-lg mr-4 ${color}`}>
        <Icon className="w-6 h-6" />
      </div>

      <div>
        <p className="text-sm font-medium text-slate-500">{label}</p>
        <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
      </div>
    </Card>
  );
}
