import React from 'react';

export const Skeleton = ({ className = '', type = 'box' }) => {
  if (type === 'card') {
    return (
      <div className="glass-card rounded-2xl p-6 space-y-4 skeleton-shimmer">
        <div className="flex items-center space-x-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-800" />
          <div className="flex-1 space-y-2">
            <div className="h-4 bg-slate-800 rounded w-3/4" />
            <div className="h-3 bg-slate-800 rounded w-1/2" />
          </div>
        </div>
        <div className="h-3 bg-slate-800 rounded w-full" />
        <div className="h-3 bg-slate-800 rounded w-5/6" />
      </div>
    );
  }

  if (type === 'table') {
    return (
      <div className="space-y-3 skeleton-shimmer">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 bg-slate-900 rounded-xl border border-slate-800" />
        ))}
      </div>
    );
  }

  return <div className={`skeleton-shimmer bg-slate-800/60 rounded-xl ${className}`} />;
};
