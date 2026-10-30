import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BookOpen, Clock, UserCheck } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';

export const MentorshipDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <Link to="/mentorship" className="inline-flex items-center gap-2 text-xs text-indigo-400 font-bold">
        <ArrowLeft className="w-4 h-4" /> Back to Mentorship Center
      </Link>

      <Card>
        <h2 className="text-xl font-bold text-white mb-2">Mentorship Program Details</h2>
        <p className="text-xs text-slate-400">Detailed track view for Mentorship Session #{id}</p>
      </Card>
    </div>
  );
};
