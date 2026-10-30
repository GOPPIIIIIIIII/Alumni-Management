import React from 'react';

export const Card = ({
  children,
  className = '',
  hoverEffect = false,
  glass = true,
  onClick,
  ...props
}) => {
  const baseClass = glass ? 'glass-card' : 'bg-slate-900 border border-slate-800';
  const hoverClass = hoverEffect ? 'glass-card-hover cursor-pointer' : '';

  return (
    <div
      onClick={onClick}
      className={`rounded-2xl p-6 transition-all duration-200 ${baseClass} ${hoverClass} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
