import React from 'react';
import { GraduationCap, Briefcase, Users, HeartHandshake, Award } from 'lucide-react';
import { Card } from '../common/Card';

export const AlumniJourney = ({
  graduationYear = 2021,
  currentRole = 'Senior Software Engineer',
  currentEmployer = 'Google',
  mentorshipCount = 4,
  donationsCount = 2,
}) => {
  const steps = [
    {
      title: 'Graduation',
      description: `Graduated Class of ${graduationYear}`,
      icon: GraduationCap,
      color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
      active: true,
    },
    {
      title: 'Career Advancement',
      description: `${currentRole} at ${currentEmployer}`,
      icon: Briefcase,
      color: 'bg-teal-500/10 text-teal-400 border-teal-500/30',
      active: true,
    },
    {
      title: 'Mentorship',
      description: `${mentorshipCount} Active Mentee Connections`,
      icon: Users,
      color: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
      active: mentorshipCount > 0,
    },
    {
      title: 'Community Contribution',
      description: `${donationsCount} Endowment Contributions`,
      icon: HeartHandshake,
      color: 'bg-rose-500/10 text-rose-400 border-rose-500/30',
      active: donationsCount > 0,
    },
  ];

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-bold text-white">Alumni Journey Timeline</h3>
          <p className="text-xs text-slate-400">Your lifecycle of achievement, growth, and community impact</p>
        </div>
        <div className="p-2 rounded-xl bg-violet-500/10 text-violet-400 border border-violet-500/20">
          <Award className="w-5 h-5" />
        </div>
      </div>

      <div className="relative">
        {/* Connecting line */}
        <div className="hidden md:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2 z-0" />

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 relative z-10">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <div
                key={step.title}
                className={`p-4 rounded-xl border transition-all ${
                  step.active
                    ? 'bg-slate-900/90 border-slate-700 shadow-md'
                    : 'bg-slate-950/40 border-slate-800/50 opacity-60'
                }`}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className={`p-2.5 rounded-xl border ${step.color}`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  <span className="text-xs font-bold text-slate-500 uppercase">Step 0{idx + 1}</span>
                </div>
                <h4 className="text-sm font-bold text-white">{step.title}</h4>
                <p className="text-xs text-slate-400 mt-1">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </Card>
  );
};
