import React from 'react';
import { Calendar, Heart, BookOpen, UserPlus } from 'lucide-react';
import { Card } from '../common/Card';

export const ContributionTimeline = () => {
  const activities = [
    { id: 1, type: 'event', title: 'RSVPed to Annual Tech Alumni Summit 2026', time: '2 hours ago', icon: Calendar, color: 'text-indigo-400 bg-indigo-500/10' },
    { id: 2, type: 'donation', title: 'Contributed $250 to STEM Scholarship Campaign', time: '1 day ago', icon: Heart, color: 'text-rose-400 bg-rose-500/10' },
    { id: 3, type: 'mentorship', title: 'Accepted mentorship request from Alex Johnson', time: '3 days ago', icon: BookOpen, color: 'text-teal-400 bg-teal-500/10' },
    { id: 4, type: 'connection', title: 'Connected with Sarah Jenkins (Class of 2019)', time: '5 days ago', icon: UserPlus, color: 'text-amber-400 bg-amber-500/10' },
  ];

  return (
    <Card>
      <h3 className="text-lg font-bold text-white mb-1">Recent Activity & Contributions</h3>
      <p className="text-xs text-slate-400 mb-6">Your latest engagements across Alumni Nexus</p>

      <div className="space-y-4 relative before:absolute before:inset-0 before:left-3.5 before:w-0.5 before:bg-slate-800">
        {activities.map((act) => {
          const Icon = act.icon;
          return (
            <div key={act.id} className="relative flex items-start gap-4 pl-8">
              <div className={`absolute left-0 p-1.5 rounded-lg border border-slate-800 ${act.color}`}>
                <Icon className="w-4 h-4" />
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-200">{act.title}</p>
                <p className="text-[11px] text-slate-500 mt-0.5">{act.time}</p>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
