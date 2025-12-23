'use client';

import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getAllQRs, deleteQR } from '@/store/slices/qrcode.slice';
import QRCodesTable from '@/components/ui/dashboard/QRCodesTable';
import ShareDialog from '@/components/ui/dashboard/ShareDialog';
import { useRouter } from 'next/navigation';

const CodesPage = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { list, loading } = useAppSelector((state) => state.qr);

    const [shareQR, setShareQR] = React.useState<any>(null);
    const [isShareOpen, setIsShareOpen] = React.useState(false);

    useEffect(() => {
        dispatch(getAllQRs());
    }, [dispatch]);

    const handleEdit = (qr: any) => {
        router.push(`/dashboard/codes/${qr._id}/edit`);
    };

    const handleShare = (qr: any) => {
        setShareQR(qr);
        setIsShareOpen(true);
    };

    const handleDelete = async (id: string) => {
        if (confirm('Are you sure you want to delete this QR code?')) {
            await dispatch(deleteQR(id));
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-800">My QR Codes</h1>
            </div>
            <QRCodesTable
                list={list}
                loading={loading}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onShare={handleShare}
            />
            <ShareDialog
                isOpen={isShareOpen}
                onClose={() => setIsShareOpen(false)}
                qr={shareQR}
            />
        </div>
    );
};

export default CodesPage;