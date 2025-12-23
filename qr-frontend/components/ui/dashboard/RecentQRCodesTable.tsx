import { QRCode } from '@/store/slices/qrcode.slice';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowRight } from 'lucide-react';
import { Badge } from '../common/Badge';

export default function RecentQRCodesTable({ list }: { list: QRCode[] }) {
  return (
    <Card title="Recent QR Codes">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead className="text-xs uppercase bg-slate-50">
            <tr>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Type</th>
              <th className="px-6 py-3">Scans</th>
              <th className="px-6 py-3">Status</th>
              <th className="px-6 py-3 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {list.slice(0, 5).map((qr) => (
              <tr key={qr._id} className="border-b hover:bg-slate-50">
                <td className="px-6 py-4 font-medium">{qr.name}</td>
                <td className="px-6 py-4 capitalize">{qr.type}</td>
                <td className="px-6 py-4">{qr.scans}</td>
                <td className="px-6 py-4">
                  <Badge variant={qr.status === 'active' ? 'success' : 'warning'}>
                    {qr.status}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <Button variant="ghost" size="sm" icon={ArrowRight}>
                    Details
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
