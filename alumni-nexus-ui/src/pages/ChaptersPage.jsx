import React from 'react';
import { Globe, Users, MapPin, ExternalLink, Shield } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const ChaptersPage = () => {
  const chapters = [
    { name: 'London & UK Alumni Chapter', members: 420, lead: 'Dr. Arthur Pendelton', location: 'London, United Kingdom' },
    { name: 'US East Coast Tech Hub', members: 680, lead: 'Sarah Jenkins', location: 'New York, USA' },
    { name: 'Silicon Valley Innovation Chapter', members: 950, lead: 'Marcus Sterling', location: 'San Francisco, USA' },
    { name: 'Asia-Pacific Regional Network', members: 310, lead: 'Li Wei', location: 'Singapore' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <Globe className="w-6 h-6 text-teal-400" /> Global Alumni Chapters
        </h1>
        <p className="text-xs text-slate-400">Regional hubs connecting alumni across continents and industries</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {chapters.map((ch, idx) => (
          <Card key={idx} hoverEffect className="space-y-4">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-base font-bold text-white">{ch.name}</h3>
                <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-teal-400" /> {ch.location}
                </p>
              </div>
              <Badge variant="teal">{ch.members} Members</Badge>
            </div>

            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs flex items-center justify-between">
              <span className="text-slate-400">Chapter Lead:</span>
              <span className="font-bold text-white">{ch.lead}</span>
            </div>

            <Button variant="secondary" size="sm" icon={ExternalLink} className="w-full">
              Join Regional Chapter
            </Button>
          </Card>
        ))}
      </div>
    </div>
  );
};
