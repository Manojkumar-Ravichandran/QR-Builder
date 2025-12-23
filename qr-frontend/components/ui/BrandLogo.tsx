import { QrCode } from 'lucide-react';
import clsx from 'clsx';

interface BrandLogoProps {
  title?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
  className?: string;
}

export default function BrandLogo({
  title = 'QR Master',
  size = 'md',
  showText = true,
  className,
}: BrandLogoProps) {
  const sizeMap = {
    sm: 'w-7 h-7 text-sm',
    md: 'w-8 h-8 text-base',
    lg: 'w-10 h-10 text-lg',
  };

  return (
    <div className={clsx('flex items-center gap-3', className)}>
      <div
        className={clsx(
          'bg-blue-600 rounded-lg flex items-center justify-center text-white',
          sizeMap[size]
        )}
      >
        <QrCode className="w-5 h-5" />
      </div>

      {showText && (
        <span className="font-bold tracking-tight">
          {title}
        </span>
      )}
    </div>
  );
}
