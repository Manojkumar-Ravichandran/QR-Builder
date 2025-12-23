import React from 'react';
import clsx from 'clsx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const InputField: React.FC<InputProps> = ({
  label,
  error,
  helperText,
  className,
  id,
  ...props
}) => {
  const inputId = id || props.name;

  return (
    <div className="w-full space-y-1">
      {label && (
        <label
          htmlFor={inputId}
          className="block text-sm font-medium text-slate-700"
        >
          {label}
        </label>
      )}

      <input
        id={inputId}
        className={clsx(
          'w-full px-3 py-2 bg-white border rounded-lg text-sm',
          'focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent',
          'transition-all disabled:bg-slate-100 disabled:cursor-not-allowed',
          error ? 'border-red-500' : 'border-slate-300',
          className
        )}
        {...props}
      />

      {error && <p className="text-xs text-red-500">{error}</p>}
      {!error && helperText && (
        <p className="text-xs text-slate-500">{helperText}</p>
      )}
    </div>
  );
};
