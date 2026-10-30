import React from 'react';
import { Target, Users, BookOpen, DollarSign } from 'lucide-react';
import { Card } from '../common/Card';

export const ImpactMeter = ({
  connections = 42,
  mentorshipHours = 18,
  eventsAttended = 6,
  donatedAmount = 500,
}) => {
  const metrics = [
    { label: 'Network Connections', value: connections, max: 100, icon: Users, color: 'from-indigo-500 to-violet-500' },
    { label: 'Mentorship Hours', value: mentorshipHours, max: 50, icon: BookOpen, color: 'from-teal-500 to-emerald-500' },
    { label: 'Events Attended', value: eventsAttended, max: 12, icon: Target, color: 'from-amber-500 to-rose-500' },
    { label: 'Donation Contribution ($)', value: `$${donatedAmount}`, percentage: 65, icon: DollarSign, color: 'from-rose-500 to-pink-500' },
  ];

  return (
    <Card>
      <h3 className="text-lg font-bold text-white mb-1">Personal Impact Meter</h3>
      <p className="text-xs text-slate-400 mb-6">Quantifying your contribution to the alumni ecosystem</p>

      <div className="space-y-4">
        {metrics.map((m) => {
          const pct = m.percentage || Math.min(100, Math.round((m.value / m.max) * 100));
          const Icon = m.icon;
          return (
            <div key={m.label} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                  <Icon className="w-3.5 h-3.5 text-indigo-400" /> {m.label}
                </span>
                <span className="font-bold text-white">{m.value}</span>
              </div>
              <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden p-0.5">
                <div
                  className={`h-full rounded-full bg-gradient-to-r ${m.color} transition-all duration-500`}
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};
