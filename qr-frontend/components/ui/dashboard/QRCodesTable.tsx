import { QRCode } from '@/store/slices/qrcode.slice';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { ArrowRight, Edit, Trash2 } from 'lucide-react';
import { Badge } from '../common/Badge';

interface QRCodesTableProps {
    list: QRCode[];
    loading?: boolean;
    onEdit?: (qr: QRCode) => void;
    onDelete?: (id: string) => void;
}

export default function QRCodesTable({ list, loading, onEdit, onDelete }: QRCodesTableProps) {
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <Card title="All QR Codes">
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
                        {list.map((qr) => (
                            <tr key={qr._id} className="border-b hover:bg-slate-50">
                                <td className="px-6 py-4 font-medium">{qr.name}</td>
                                <td className="px-6 py-4 capitalize">{qr.type}</td>
                                <td className="px-6 py-4">{qr.scans}</td>
                                <td className="px-6 py-4">
                                    <Badge variant={qr.status === 'active' ? 'success' : 'warning'}>
                                        {qr.status}
                                    </Badge>
                                </td>
                                <td className="px-6 py-4 text-right space-x-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        icon={Edit}
                                        onClick={() => onEdit?.(qr)}
                                    >
                                        Edit
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        icon={Trash2}
                                        className="text-red-500 hover:text-red-600"
                                        onClick={() => onDelete?.(qr._id)}
                                    >
                                        Delete
                                    </Button>
                                </td>
                            </tr>
                        ))}
                        {list.length === 0 && (
                            <tr>
                                <td colSpan={5} className="px-6 py-4 text-center text-gray-500">
                                    No QR codes found. Create one to get started!
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </Card>
    );
}
