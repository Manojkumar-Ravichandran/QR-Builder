'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { getQRById, updateQR } from '@/store/slices/qrcode.slice';

import { InputField } from '@/components/ui/common/inputs/InputField';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { Globe, Type, Wifi, Save } from 'lucide-react';

export default function EditQRPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { selected: qr, loading } = useAppSelector((state) => state.qr);

  const [type, setType] = useState<'url' | 'text' | 'wifi'>('url');
  const [data, setData] = useState('');
  const [color, setColor] = useState('#000000');
  const [name, setName] = useState('');
  const [saving, setSaving] = useState(false);

  // ✅ Fetch QR by ID (IMPORTANT)
  useEffect(() => {
    if (id) {
      dispatch(getQRById(id as string));
    }
  }, [id, dispatch]);

  useEffect(() => {
    if (qr) {
      setName(qr.name);
      setType(qr.type);
      setData(qr.data);
      setColor(qr.design?.color || '#000000');
    }
  }, [qr]);

  if (loading) {
    return <div className="text-center py-10">Loading QR...</div>;
  }

  if (!qr) {
    return <div className="text-center py-10">QR not found</div>;
  }

  const handleUpdate = async () => {
    setSaving(true);

    try {
      await dispatch(
        updateQR({
          id: qr._id,
          data: {
            name,
            type,
            data,
            design: {
              color,
              bgColor: '#ffffff',
            },
          },
        })
      ).unwrap();

      router.push('/dashboard/codes');
    } catch (error) {
      // Error handled by global toast or slice
      console.error('Update failed', error);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Edit QR Code</h1>
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>

      <Card>
        {/* Type */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          {[
            { id: 'url', icon: Globe, label: 'Website' },
            { id: 'text', icon: Type, label: 'Text' },
            { id: 'wifi', icon: Wifi, label: 'Wi-Fi' },
          ].map((t) => (
            <button
              key={t.id}
              onClick={() => setType(t.id as any)}
              className={`p-4 border rounded-xl ${type === t.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200'
                }`}
            >
              <t.icon className="mx-auto mb-2" />
              {t.label}
            </button>
          ))}
        </div>

        <InputField
          label="QR Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <div className="mt-4">
          <InputField
            label="QR Data"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </div>

        <div className="mt-6 flex items-center gap-4">
          <input
            type="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
          />
          <span>{color}</span>
        </div>

        <div className="mt-8 flex justify-end">
          <Button icon={Save} isLoading={saving} onClick={handleUpdate}>
            Update QR
          </Button>
        </div>
      </Card>
    </div>
  );
}
