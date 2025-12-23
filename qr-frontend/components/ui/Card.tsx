import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = "",
  title,
}) => {
  return (
    <div
      className={`
        bg-[rgb(var(--color-bg))]
        rounded-xl
        border border-[rgb(var(--color-muted))]
        shadow-sm
        overflow-hidden
        ${className}
      `}
    >
      {title && (
        <div className="px-6 py-4 border-b border-[rgb(var(--color-muted))]">
          <h3 className="text-lg font-semibold text-[rgb(var(--color-text))]">
            {title}
          </h3>
        </div>
      )}
      <div className="p-6 text-[rgb(var(--color-text))]">
        {children}
      </div>
    </div>
  );
};
