'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/hooks';

import { Globe, Type, Wifi, Download, Save } from 'lucide-react';
import { InputField } from '@/components/ui/common/inputs/InputField';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { createQR } from '@/store/slices/qrcode.slice';

const Create = () => {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);

    const [type, setType] = useState<'url' | 'text' | 'wifi'>('url');
    const [data, setData] = useState('https://example.com');
    const [color, setColor] = useState('#000000');
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(false);

    // 🔒 Optional auth guard
    if (!user) {
        router.push('/login');
        return null;
    }

    // QR Preview URL
    const getPreviewUrl = () => {
        const encodedData = encodeURIComponent(data);
        const size = '300x300';
        const colorClean = color.replace('#', '');
        return `https://api.qrserver.com/v1/create-qr-code/?size=${size}&data=${encodedData}&color=${colorClean}`;
    };

    const handleSave = async () => {
        setLoading(true);

        const newQR = {
            id: `qr_${Date.now()}`,
            name: name || 'Untitled QR',
            type,
            data,
            isDynamic: true,
            status: 'active' as const,
            scans: 0,
            createdAt: new Date().toISOString(),
            design: { color, bgColor: '#ffffff' },
        };

        dispatch(createQR(newQR));

        setTimeout(() => {
            setLoading(false);
            router.push('/dashboard/codes');
        }, 800);
    };

    return (
        <div className="max-w-6xl mx-auto h-[calc(100vh-100px)]">
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold text-slate-900">Create New QR Code</h1>
                <Button variant="outline" size="sm" onClick={() => router.back()}>
                    Cancel
                </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 h-full">
                {/* Left Column */}
                <div className="lg:col-span-7 space-y-6">
                    <Card className="h-full flex flex-col">
                        {/* Type Selection */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                1. Select Type
                            </label>
                            <div className="grid grid-cols-3 gap-4">
                                {[
                                    { id: 'url', icon: Globe, label: 'Website' },
                                    { id: 'text', icon: Type, label: 'Plain Text' },
                                    { id: 'wifi', icon: Wifi, label: 'Wi-Fi' },
                                ].map((t) => (
                                    <button
                                        key={t.id}
                                        onClick={() => setType(t.id as any)}
                                        className={`flex flex-col items-center justify-center p-4 border rounded-xl transition-all ${type === t.id
                                                ? 'border-blue-500 bg-blue-50 text-blue-700 ring-1 ring-blue-500'
                                                : 'border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                                            }`}
                                    >
                                        <t.icon className="w-6 h-6 mb-2" />
                                        <span className="text-sm font-medium">{t.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="mb-6 flex-1">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                2. Enter Content
                            </label>

                            <div className="space-y-4">
                                <InputField
                                    label="QR Name"
                                    placeholder="e.g. Marketing Campaign"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />

                                {type === 'url' && (
                                    <InputField
                                        label="Website URL"
                                        value={data}
                                        onChange={(e) => setData(e.target.value)}
                                    />
                                )}

                                {type === 'text' && (
                                    <textarea
                                        className="w-full px-3 py-2 border rounded-lg h-32"
                                        value={data}
                                        onChange={(e) => setData(e.target.value)}
                                    />
                                )}

                                {type === 'wifi' && (
                                    <InputField
                                        label="Wi-Fi SSID"
                                        placeholder="Network name"
                                        onChange={(e) =>
                                            setData(`WIFI:S:${e.target.value};T:WPA;P:password;;`)
                                        }
                                    />
                                )}
                            </div>
                        </div>

                        {/* Customization */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                3. Customization
                            </label>

                            <div className="flex items-center gap-4">
                                <input
                                    type="color"
                                    value={color}
                                    onChange={(e) => setColor(e.target.value)}
                                    className="h-10 w-10 rounded cursor-pointer"
                                />
                                <span className="text-sm text-slate-600">{color}</span>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="mt-auto border-t pt-6 flex justify-end">
                            <Button icon={Save} isLoading={loading} onClick={handleSave}>
                                Create QR Code
                            </Button>
                        </div>
                    </Card>
                </div>

                {/* Preview */}
                <div className="lg:col-span-5">
                    <div className="sticky top-6">
                        <Card className="flex flex-col items-center p-8 bg-slate-50 text-center">
                            <h3 className="text-lg font-semibold mb-2">Live Preview</h3>
                            <p className="text-sm text-slate-500 mb-6">
                                Scan with your phone
                            </p>

                            <div className="bg-white p-4 rounded-xl border mb-6">
                                <img
                                    src={getPreviewUrl()}
                                    alt="QR Preview"
                                    className="w-48 h-48"
                                />
                            </div>

                            <Button variant="secondary" icon={Download} className="w-full">
                                Download PNG
                            </Button>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Create;
