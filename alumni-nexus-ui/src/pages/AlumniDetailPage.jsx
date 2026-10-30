import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  UserPlus,
  BookOpen,
  Calendar,
  Award,
  Globe
} from 'lucide-react';
import { alumniApi } from '../api/alumniApi';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Avatar } from '../components/common/Avatar';
import { Skeleton } from '../components/common/Skeleton';
import { ErrorState } from '../components/common/ErrorState';
import { notifySuccess } from '../api/axiosInstance';

export const AlumniDetailPage = () => {
  const { id } = useParams();
  const [alumni, setAlumni] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchAlumni = async () => {
      setLoading(true);
      try {
        const data = await alumniApi.getById(id);
        setAlumni(data);
      } catch (err) {
        setError(err.message || 'Alumni profile not found');
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchAlumni();
  }, [id]);

  const handleConnect = async () => {
    try {
      await alumniApi.requestConnection(id);
      notifySuccess(`Connection request sent to ${alumni.name}!`);
    } catch (err) {
      console.warn(err);
    }
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <Skeleton type="box" className="h-40" />
        <Skeleton type="card" />
      </div>
    );
  }

  if (error || !alumni) {
    return (
      <div className="space-y-4">
        <Link to="/network" className="inline-flex items-center gap-2 text-xs text-indigo-400 font-bold">
          <ArrowLeft className="w-4 h-4" /> Back to Alumni Directory
        </Link>
        <ErrorState message={error || 'Profile could not be loaded'} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Link to="/network" className="inline-flex items-center gap-2 text-xs text-indigo-400 font-bold hover:text-indigo-300">
        <ArrowLeft className="w-4 h-4" /> Back to Directory
      </Link>

      {/* Header Banner Card */}
      <Card className="relative overflow-hidden border-indigo-500/20 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Avatar name={alumni.name} size="xl" status={alumni.status === 'ACTIVE' ? 'online' : 'offline'} />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-white">{alumni.name}</h1>
                {alumni.verified && (
                  <Badge variant="teal" size="sm">
                    <CheckCircle2 className="w-3 h-3 mr-1" /> Verified Alumni
                  </Badge>
                )}
              </div>
              <p className="text-sm font-semibold text-indigo-300 mt-0.5">{alumni.currentRole} at {alumni.currentEmployer}</p>
              <p className="text-xs text-slate-400 flex items-center gap-3 mt-1">
                {alumni.location && <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {alumni.location}</span>}
                {alumni.graduationYear && <span className="flex items-center gap-1"><GraduationCap className="w-3.5 h-3.5" /> Class of {alumni.graduationYear}</span>}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full sm:w-auto">
            <Button variant="primary" icon={UserPlus} onClick={handleConnect} className="flex-1 sm:flex-none">
              Connect
            </Button>
            <Link to="/messages">
              <Button variant="secondary" icon={Mail} className="flex-1 sm:flex-none">
                Message
              </Button>
            </Link>
          </div>
        </div>
      </Card>

      {/* Details Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <h3 className="text-base font-bold text-white mb-4">Professional Overview</h3>
            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-white">{alumni.currentRole || 'N/A'}</p>
                  <p className="text-slate-400">{alumni.currentEmployer || 'Independent Practitioner'}</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">Primary industry sector: Technology & Information Systems</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-4 border-t border-slate-800">
                <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-white">{alumni.programme || 'Degree Programme'}</p>
                  <p className="text-slate-400">Graduation Year: {alumni.graduationYear || 'N/A'}</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">Institution: Main Campus</p>
                </div>
              </div>
            </div>
          </Card>

          {/* Activity History */}
          <Card>
            <h3 className="text-base font-bold text-white mb-3">Community Contributions</h3>
            <div className="space-y-3 text-xs">
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-300">Mentorship Status</span>
                <Badge variant="emerald">Available as Mentor</Badge>
              </div>
              <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-300">Events Attended</span>
                <span className="font-bold text-white">4 Summits & Workshops</span>
              </div>
            </div>
          </Card>
        </div>

        {/* Contact Sidebar */}
        <div className="space-y-6">
          <Card>
            <h3 className="text-base font-bold text-white mb-4">Contact Information</h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3 text-slate-300">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="truncate">{alumni.email}</span>
              </div>
              {alumni.phone && (
                <div className="flex items-center gap-3 text-slate-300">
                  <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                  <span>+1 {alumni.phone}</span>
                </div>
              )}
              {alumni.location && (
                <div className="flex items-center gap-3 text-slate-300">
                  <MapPin className="w-4 h-4 text-rose-400 shrink-0" />
                  <span>{alumni.location}</span>
                </div>
              )}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
