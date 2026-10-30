import React from 'react';
import { Award, ExternalLink } from 'lucide-react';
import { Card } from '../common/Card';
import { Avatar } from '../common/Avatar';
import { Badge } from '../common/Badge';

export const AlumniSpotlight = () => {
  const spotlight = {
    name: 'Dr. Evelyn Vance',
    programme: 'B.Tech Computer Science (2018)',
    role: 'VP of AI Research at QuantumLabs',
    location: 'San Francisco, CA',
    quote: 'Mentoring through Alumni Nexus helped me connect with incredible talent and give back to my alma mater.',
    achievement: 'Named Forbes 30 Under 30 in AI Science',
  };

  return (
    <Card className="relative overflow-hidden border-amber-500/20 bg-gradient-to-br from-slate-900 via-indigo-950/20 to-slate-900">
      <div className="flex items-center justify-between mb-4">
        <Badge variant="amber" size="sm">
          <Award className="w-3.5 h-3.5 mr-1" /> Alumni Spotlight
        </Badge>
        <span className="text-[11px] font-medium text-slate-400">Featured Monthly Story</span>
      </div>

      <div className="flex items-start gap-4">
        <Avatar name={spotlight.name} size="lg" />
        <div>
          <h4 className="text-base font-bold text-white">{spotlight.name}</h4>
          <p className="text-xs text-indigo-300 font-medium">{spotlight.role}</p>
          <p className="text-[11px] text-slate-400">{spotlight.programme}</p>
        </div>
      </div>

      <p className="text-xs text-slate-300 italic my-4 bg-slate-950/40 p-3 rounded-xl border border-slate-800">
        "{spotlight.quote}"
      </p>

      <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
        <span className="text-amber-400 font-semibold">{spotlight.achievement}</span>
        <button className="text-indigo-400 hover:text-indigo-300 font-semibold inline-flex items-center gap-1">
          Read Story <ExternalLink className="w-3 h-3" />
        </button>
      </div>
    </Card>
  );
};
