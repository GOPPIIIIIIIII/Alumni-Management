import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Briefcase } from 'lucide-react';
import { Card } from '../components/common/Card';

export const JobDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="space-y-6">
      <Link to="/jobs" className="inline-flex items-center gap-2 text-xs text-indigo-400 font-bold">
        <ArrowLeft className="w-4 h-4" /> Back to Job Board
      </Link>

      <Card>
        <h2 className="text-xl font-bold text-white mb-2">Job Details</h2>
        <p className="text-xs text-slate-400">Viewing Job Position #{id}</p>
      </Card>
    </div>
  );
};
