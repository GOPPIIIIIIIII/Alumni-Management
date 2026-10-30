import React from 'react';

export const Avatar = ({
  name = 'User',
  src,
  size = 'md',
  status,
  className = ''
}) => {
  const getInitials = (str) => {
    if (!str) return 'U';
    const parts = str.trim().split(' ');
    if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    return str.substring(0, 2).toUpperCase();
  };

  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-14 h-14 text-lg',
    xl: 'w-20 h-20 text-2xl',
  };

  // Gradient selection based on initials
  const gradients = [
    'from-indigo-600 to-violet-600',
    'from-teal-500 to-emerald-600',
    'from-amber-500 to-rose-500',
    'from-blue-600 to-cyan-500',
    'from-purple-600 to-pink-600',
  ];
  const charCodeSum = name.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const gradient = gradients[charCodeSum % gradients.length];

  return (
    <div className="relative inline-block">
      <div
        className={`rounded-2xl flex items-center justify-center font-bold text-white shadow-md border border-white/10 ${sizes[size]} ${
          src ? '' : `bg-gradient-to-br ${gradient}`
        } ${className}`}
      >
        {src ? (
          <img src={src} alt={name} className="w-full h-full object-cover rounded-2xl" />
        ) : (
          getInitials(name)
        )}
      </div>

      {status && (
        <span
          className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-slate-950 ${
            status === 'online' ? 'bg-emerald-500' : status === 'busy' ? 'bg-rose-500' : 'bg-slate-500'
          }`}
        />
      )}
    </div>
  );
};
