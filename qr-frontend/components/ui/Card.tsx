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
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
      )}
      <CardContent className={title ? 'pt-0' : ''}>
        {children}
      </CardContent>
    </div>
  );
};

export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div className={`px-6 py-4 border-b border-[rgb(var(--color-muted))] ${className}`}>
    {children}
  </div>
);

export const CardTitle: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <h3 className={`text-lg font-semibold text-[rgb(var(--color-text))] ${className}`}>
    {children}
  </h3>
);

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({
  children,
  className = "",
}) => (
  <div className={`p-6 text-[rgb(var(--color-text))] ${className}`}>
    {children}
  </div>
);
