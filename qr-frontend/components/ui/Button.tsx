import { LucideIcon } from "lucide-react";
import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  icon?: LucideIcon;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  icon: Icon,
  isLoading,
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none";

  const variants = {
    primary: `
      bg-[rgb(var(--color-primary))]
      text-white
      hover:bg-[rgb(var(--color-primary-dark))]
      focus:ring-[rgb(var(--color-primary))]
      shadow-sm
    `,
    secondary: `
      bg-[rgb(var(--color-text))]
      text-white
      hover:opacity-90
      focus:ring-[rgb(var(--color-text))]
    `,
    danger: `
      bg-red-600
      text-white
      hover:bg-red-700
      focus:ring-red-500
    `,
    ghost: `
      bg-transparent
      text-[rgb(var(--color-subtext))]
      hover:bg-[rgb(var(--color-muted))]
      hover:text-[rgb(var(--color-text))]
    `,
    outline: `
      border
      border-[rgb(var(--color-muted))]
      bg-white
      text-[rgb(var(--color-text))]
      hover:bg-[rgb(var(--color-muted))]
      focus:ring-[rgb(var(--color-primary))]
    `,
  };

  const sizes = {
    sm: "h-8 px-3 text-[var(--text-xs)]",
    md: "h-10 px-4 py-2 text-[var(--text-sm)]",
    lg: "h-12 px-6 text-[var(--text-base)]",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {isLoading && (
        <span className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
      )}
      {!isLoading && Icon && <Icon className="mr-2 h-4 w-4" />}
      {children}
    </button>
  );
};
