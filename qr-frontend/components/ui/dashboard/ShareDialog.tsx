import React, { useRef } from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { X, Download, Copy, Check } from 'lucide-react';
import { Button } from '../Button';
import { QRCode } from '@/store/slices/qrcode.slice';

interface ShareDialogProps {
    isOpen: boolean;
    onClose: () => void;
    qr: QRCode | null;
}

const ShareDialog: React.FC<ShareDialogProps> = ({ isOpen, onClose, qr }) => {
    const [copied, setCopied] = React.useState(false);

    if (!isOpen || !qr) return null;

    // Determine the URL to share
    // Fallback to localhost if env not set, assume backend on port 5000
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace('/api', '') || 'http://localhost:5000';
    const shareUrl = qr.isDynamic && qr.shortCode
        ? `${baseUrl}/r/${qr.shortCode}`
        : qr.data;

    const downloadQR = () => {
        const canvas = document.getElementById('share-qr-canvas') as HTMLCanvasElement;
        if (canvas) {
            const pngUrl = canvas.toDataURL("image/png");
            const downloadLink = document.createElement("a");
            downloadLink.href = pngUrl;
            downloadLink.download = `${qr.name.replace(/\s+/g, '_')}_qr.png`;
            document.body.appendChild(downloadLink);
            downloadLink.click();
            document.body.removeChild(downloadLink);
        }
    };

    const copyToClipboard = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy!', err);
        }
    };

    const socialLinks = [
        {
            name: 'Facebook',
            url: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
            color: 'bg-blue-600 hover:bg-blue-700'
        },
        {
            name: 'Twitter',
            url: `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent('Check out this QR Code!')}`,
            color: 'bg-sky-500 hover:bg-sky-600'
        },
        {
            name: 'LinkedIn',
            url: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
            color: 'bg-blue-700 hover:bg-blue-800'
        },
        {
            name: 'WhatsApp',
            url: `https://api.whatsapp.com/send?text=${encodeURIComponent(`Check out this QR Code: ${shareUrl}`)}`,
            color: 'bg-green-500 hover:bg-green-600'
        }
    ];

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-xl shadow-xl max-w-md w-full overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b">
                    <h3 className="text-lg font-semibold text-gray-900">Share QR Code</h3>
                    <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* QR Preview & Download */}
                    <div className="flex flex-col items-center space-y-4">
                        <div className="p-4 bg-white border rounded-lg shadow-sm">
                            <QRCodeCanvas
                                id="share-qr-canvas"
                                value={shareUrl}
                                size={200}
                                level={"H"}
                                includeMargin={true}
                                fgColor={qr.design?.color || "#000000"}
                                bgColor={qr.design?.bgColor || "#ffffff"}
                            />
                        </div>
                        <Button onClick={downloadQR} className="flex items-center gap-2" variant="outline">
                            <Download className="w-4 h-4" />
                            Download PNG
                        </Button>
                    </div>

                    {/* Copy Link */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Share Link</label>
                        <div className="flex gap-2">
                            <input
                                type="text"
                                readOnly
                                value={shareUrl}
                                className="flex-1 px-3 py-2 text-sm border rounded-md bg-gray-50 text-gray-600 focus:outline-none"
                            />
                            <Button onClick={copyToClipboard} variant="ghost" size="sm">
                                {copied ? <Check className="w-4 h-4 text-green-500" /> : <Copy className="w-4 h-4" />}
                            </Button>
                        </div>
                    </div>

                    {/* Social Share */}
                    <div className="grid grid-cols-2 gap-3">
                        {socialLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`flex items-center justify-center px-4 py-2 text-sm font-medium text-white rounded-md transition-colors ${link.color}`}
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShareDialog;
