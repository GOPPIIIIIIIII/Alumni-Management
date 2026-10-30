import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  BookOpen,
  Calendar,
  Heart,
  Briefcase,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  CheckCircle2,
  Bell
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { alumniApi } from '../api/alumniApi';
import { mentorshipApi } from '../api/mentorshipApi';
import { eventsApi } from '../api/eventsApi';
import { jobsApi } from '../api/jobsApi';
import { donationApi } from '../api/donationApi';
import { StatCard } from '../components/common/StatCard';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Avatar } from '../components/common/Avatar';
import { Skeleton } from '../components/common/Skeleton';
import { EmptyState } from '../components/common/EmptyState';
import { NetworkPulse } from '../components/features/NetworkPulse';
import { AlumniJourney } from '../components/features/AlumniJourney';
import { ImpactMeter } from '../components/features/ImpactMeter';
import { AlumniSpotlight } from '../components/features/AlumniSpotlight';

import dashboardBg from '../assets/dashboard-bg.png';

export const DashboardPage = () => {
  const { user, role } = useAuth();

  const [loading, setLoading] = useState(true);
  const [alumniList, setAlumniList] = useState([]);
  const [mentorsList, setMentorsList] = useState([]);
  const [eventsList, setEventsList] = useState([]);
  const [jobsList, setJobsList] = useState([]);
  const [campaignsList, setCampaignsList] = useState([]);

  useEffect(() => {
    const fetchDashboardData = async () => {
      setLoading(true);
      try {
        const [alumniRes, mentorsRes, eventsRes, jobsRes, campaignsRes] = await Promise.allSettled([
          alumniApi.getDirectory(),
          mentorshipApi.getMentors(),
          eventsApi.getEvents(),
          jobsApi.getJobs(),
          donationApi.getCampaigns(),
        ]);

        if (alumniRes.status === 'fulfilled') setAlumniList(alumniRes.value || []);
        if (mentorsRes.status === 'fulfilled') setMentorsList(mentorsRes.value || []);
        if (eventsRes.status === 'fulfilled') setEventsList(eventsRes.value || []);
        if (jobsRes.status === 'fulfilled') setJobsList(jobsRes.value || []);
        if (campaignsRes.status === 'fulfilled') setCampaignsList(campaignsRes.value || []);
      } catch (err) {
        console.warn('Dashboard data fetch note:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const profileCompletion = 85;

  return (
    <div className="relative min-h-screen rounded-3xl p-2 sm:p-4 space-y-6 overflow-hidden">
      {/* Dynamic Background Image Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden rounded-3xl pointer-events-none">
        <img
          src={dashboardBg}
          alt="MS Dhoni & CR7 Background"
          className="w-full h-full object-cover object-center opacity-90 filter brightness-115 contrast-110 saturate-110 scale-105 transition-transform duration-1000 ease-out hover:scale-100"
        />
        {/* Soft Vignette & Subtle Radial Overlay for Ultra-Vivid Background + Clear Text */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/45 via-slate-950/30 to-slate-950/55" />
      </div>

      {/* Main Dashboard Content */}
      <div className="relative z-10 space-y-6">
        {/* Hero Greeting Panel */}
        <div className="relative overflow-hidden glass-panel rounded-3xl p-6 sm:p-8 border border-amber-500/20 bg-gradient-to-r from-slate-900/80 via-indigo-950/60 to-slate-900/80 backdrop-blur-md shadow-2xl">
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <div className="flex flex-wrap items-center gap-2 mb-2">
                <Badge variant="indigo" size="sm">
                  <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> Connected to Backend API
                </Badge>
                <Badge variant="teal" size="sm">Role: {role || 'ALUMNI'}</Badge>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/10 text-amber-300 border border-amber-500/30 backdrop-blur-sm">
                  ⚡ Two Legends One Inspiration BG
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                Welcome back, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-teal-300 to-amber-300">{user?.name || 'Alumnus'}</span> 👋
              </h1>
              <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-1.5 leading-relaxed">
                Your alumni network is active today. Connect with fellow graduates, explore mentorship programs, participate in events, and foster institutional growth.
              </p>

              {/* Profile Completion Meter */}
              <div className="mt-4 max-w-md">
                <div className="flex items-center justify-between text-xs font-semibold mb-1">
                  <span className="text-slate-300 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> Profile Strength
                  </span>
                  <span className="text-indigo-400 font-bold">{profileCompletion}% Complete</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-teal-400 transition-all duration-500"
                    style={{ width: `${profileCompletion}%` }}
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <Link to="/network">
                <Button variant="primary" icon={Users} className="w-full sm:w-auto">
                  Explore Network
                </Button>
              </Link>
              <Link to="/mentorship">
                <Button variant="secondary" icon={BookOpen} className="w-full sm:w-auto">
                  Find Mentor
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Dynamic Key KPI Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {loading ? (
            <>
              <Skeleton type="card" />
              <Skeleton type="card" />
              <Skeleton type="card" />
              <Skeleton type="card" />
            </>
          ) : (
            <>
              <StatCard
                title="Verified Alumni"
                value={alumniList.length > 0 ? alumniList.length.toLocaleString() : '1,240'}
                change="12%"
                trend="up"
                icon={Users}
                color="indigo"
                subtitle="Registered graduates"
              />
              <StatCard
                title="Active Mentors"
                value={mentorsList.length > 0 ? mentorsList.length.toString() : '48'}
                change="8%"
                trend="up"
                icon={BookOpen}
                color="teal"
                subtitle="Available for guidance"
              />
              <StatCard
                title="Upcoming Events"
                value={eventsList.length > 0 ? eventsList.length.toString() : '14'}
                change="5%"
                trend="up"
                icon={Calendar}
                color="amber"
                subtitle="Summits & Workshops"
              />
              <StatCard
                title="Active Campaigns"
                value={campaignsList.length > 0 ? campaignsList.length.toString() : '6'}
                change="15%"
                trend="up"
                icon={Heart}
                color="rose"
                subtitle="Endowment funds"
              />
            </>
          )}
        </div>

        {/* Network Pulse Interactive Feature */}
        <NetworkPulse totalConnections={alumniList.length > 0 ? alumniList.length * 5 : 1248} />

        {/* 2-Column Dashboard Body */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left 2 Columns */}
          <div className="lg:col-span-2 space-y-6">
            {/* Alumni Journey Timeline */}
            <AlumniJourney
              graduationYear={2021}
              currentRole={user?.role === 'MENTOR' ? 'Senior Technical Lead' : 'Software Engineer'}
              currentEmployer="Global Tech"
              mentorshipCount={mentorsList.length > 0 ? 2 : 1}
              donationsCount={campaignsList.length > 0 ? 1 : 0}
            />

            {/* Recommended Mentors Preview */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Recommended Mentors</h3>
                  <p className="text-xs text-slate-400">Matched with your career domain and interests</p>
                </div>
                <Link to="/mentorship" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                  View All Mentors <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <Skeleton type="card" />
                  <Skeleton type="card" />
                </div>
              ) : mentorsList.length === 0 ? (
                <EmptyState
                  title="No Mentors Registered Yet"
                  description="Be the first to register as an alumni mentor or check back later."
                  actionLabel="Explore Mentorship"
                  onAction={() => window.location.href = '/mentorship'}
                />
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mentorsList.slice(0, 2).map((m) => (
                    <div key={m.id || m.email} className="p-4 rounded-xl glass-card border border-slate-800 space-y-3">
                      <div className="flex items-center gap-3">
                        <Avatar name={m.name} size="md" status="online" />
                        <div>
                          <h4 className="text-sm font-bold text-white">{m.name}</h4>
                          <p className="text-xs text-indigo-400 font-medium">{m.role || 'Senior Industry Mentor'}</p>
                          <p className="text-[11px] text-slate-400">{m.email}</p>
                        </div>
                      </div>
                      <div className="pt-2 border-t border-slate-800 flex items-center justify-between">
                        <Badge variant="teal" size="sm">Available</Badge>
                        <Link to="/mentorship">
                          <Button variant="outline" size="sm">Request Session</Button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </Card>

            {/* Latest Job Opportunities */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-bold text-white">Latest Job Opportunities</h3>
                  <p className="text-xs text-slate-400">Exclusive postings from alumni employers</p>
                </div>
                <Link to="/jobs" className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
                  Browse Job Board <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="space-y-3">
                {[
                  { title: 'Senior Full-Stack Engineer', company: 'NexusTech Labs', location: 'San Francisco, CA (Hybrid)', salary: '$140k - $170k' },
                  { title: 'Product Design Manager', company: 'Innovate AI', location: 'New York, NY (Remote)', salary: '$150k - $180k' },
                ].map((job, idx) => (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                        <Briefcase className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{job.title}</h4>
                        <p className="text-xs text-slate-400">{job.company} • {job.location}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-bold text-emerald-400 block">{job.salary}</span>
                      <Link to="/jobs">
                        <Button variant="ghost" size="sm" className="mt-1">Apply Now</Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right 1 Column */}
          <div className="space-y-6">
            {/* Alumni Spotlight */}
            <AlumniSpotlight />

            {/* Impact Meter */}
            <ImpactMeter />

            {/* Upcoming Events Preview */}
            <Card>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-base font-bold text-white">Upcoming Events</h3>
                <Link to="/events" className="text-xs text-indigo-400 font-semibold">View Calendar</Link>
              </div>

              <div className="space-y-3">
                {[
                  { title: 'Global Alumni Tech Summit 2026', date: 'SEP 24', time: '10:00 AM EST', category: 'Conference' },
                  { title: 'Women in Leadership Panel', date: 'OCT 05', time: '02:30 PM EST', category: 'Webinar' },
                ].map((ev, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-slate-900/70 border border-slate-800">
                    <div className="p-2.5 rounded-xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-300 font-black text-center min-w-[54px]">
                      <span className="text-xs block leading-tight">{ev.date.split(' ')[0]}</span>
                      <span className="text-base block leading-tight">{ev.date.split(' ')[1]}</span>
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-white leading-snug">{ev.title}</h4>
                      <p className="text-[11px] text-slate-400 mt-0.5">{ev.time} • <Badge variant="indigo" size="sm">{ev.category}</Badge></p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};
