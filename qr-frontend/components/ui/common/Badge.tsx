import clsx from 'clsx';
import React from 'react';

export type BadgeVariant =
  | 'success'
  | 'warning'
  | 'danger'
  | 'neutral'
  | 'info';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const VARIANT_STYLES: Record<BadgeVariant, string> = {
  success: 'bg-green-100 text-green-700',
  warning: 'bg-yellow-100 text-yellow-800',
  danger: 'bg-red-100 text-red-700',
  neutral: 'bg-slate-100 text-slate-700',
  info: 'bg-blue-100 text-blue-700',
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  className,
}) => {
  return (
    <span
      className={clsx(
        'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
        VARIANT_STYLES[variant],
        className
      )}
    >
      {children}
    </span>
  );
};
