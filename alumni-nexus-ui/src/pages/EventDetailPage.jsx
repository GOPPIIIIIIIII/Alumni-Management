import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Calendar, MapPin, Users } from 'lucide-react';
import { Card } from '../components/common/Card';

export const EventDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <Link to="/events" className="inline-flex items-center gap-2 text-xs text-indigo-400 font-bold">
        <ArrowLeft className="w-4 h-4" /> Back to Events
      </Link>

      <Card>
        <h2 className="text-xl font-bold text-white mb-2">Event Information</h2>
        <p className="text-xs text-slate-400">Detailed view for Event #{id}</p>
      </Card>
    </div>
  );
};
