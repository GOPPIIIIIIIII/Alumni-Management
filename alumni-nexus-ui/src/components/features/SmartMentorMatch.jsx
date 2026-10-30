import React from 'react';
import { Sparkles, CheckCircle2 } from 'lucide-react';
import { Badge } from '../common/Badge';

export const SmartMentorMatch = ({ reasons = [] }) => {
  if (!reasons || reasons.length === 0) return null;

  return (
    <div className="mt-3 p-2.5 rounded-xl bg-indigo-950/40 border border-indigo-500/20 text-xs">
      <div className="flex items-center gap-1.5 text-indigo-300 font-bold mb-1.5">
        <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
        <span>Smart Match Insights</span>
      </div>
      <div className="space-y-1">
        {reasons.map((reason, idx) => (
          <div key={idx} className="flex items-start gap-1.5 text-slate-300">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
            <span className="text-[11px]">{reason}</span>
          </div>
        ))}
      </div>
    </div>
  );
};
