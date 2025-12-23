import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { ArrowUpRight } from 'lucide-react';

interface Props {
  name?: string;
}

export default function DashboardHeader({ name }: Props) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Welcome back, {name} 👋
        </h1>
        <p className="text-slate-500 mt-1">
          Here's what's happening with your QR campaigns today.
        </p>
      </div>

      <Link href="/dashboard/create">
        <Button icon={ArrowUpRight}>Create New QR</Button>
      </Link>
    </div>
  );
}
