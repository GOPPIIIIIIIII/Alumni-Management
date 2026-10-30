import React from 'react';
import { Activity, UserPlus, Briefcase, Calendar } from 'lucide-react';

export const CommunityPulse = () => {
  const events = [
    { type: 'member', text: 'Sarah Jenkins joined the UK Alumni Chapter', time: '10m ago' },
    { type: 'job', text: 'New Senior Frontend Architect job posted by TechCorp', time: '25m ago' },
    { type: 'event', text: '50+ registered for Global Leadership Symposium', time: '1h ago' },
  ];

  return (
    <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-3 flex items-center gap-3 overflow-hidden text-xs">
      <div className="flex items-center gap-1.5 font-bold text-indigo-400 shrink-0 uppercase tracking-wider">
        <Activity className="w-4 h-4 text-emerald-400 animate-pulse" /> Live Community Pulse:
      </div>
      <div className="flex items-center space-x-6 overflow-x-auto no-scrollbar whitespace-nowrap text-slate-300">
        {events.map((e, idx) => (
          <div key={idx} className="flex items-center gap-1.5">
            {e.type === 'member' && <UserPlus className="w-3.5 h-3.5 text-teal-400" />}
            {e.type === 'job' && <Briefcase className="w-3.5 h-3.5 text-amber-400" />}
            {e.type === 'event' && <Calendar className="w-3.5 h-3.5 text-rose-400" />}
            <span>{e.text}</span>
            <span className="text-[10px] text-slate-500 font-mono">({e.time})</span>
          </div>
        ))}
      </div>
    </div>
  );
};
