import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Users,
  BookOpen,
  DollarSign,
  Filter,
  Download
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend
} from 'recharts';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';

export const AnalyticsPage = () => {
  const [timeRange, setTimeRange] = useState('monthly');

  const growthData = [
    { month: 'Jan', alumni: 840, connections: 2100, donations: 12000 },
    { month: 'Feb', alumni: 920, connections: 2450, donations: 18500 },
    { month: 'Mar', alumni: 990, connections: 2890, donations: 22000 },
    { month: 'Apr', alumni: 1080, connections: 3400, donations: 29000 },
    { month: 'May', alumni: 1150, connections: 3900, donations: 34500 },
    { month: 'Jun', alumni: 1248, connections: 4520, donations: 42000 },
  ];

  const roleDistributionData = [
    { name: 'Alumni Members', value: 780, color: '#6366f1' },
    { name: 'Mentors', value: 120, color: '#14b8a6' },
    { name: 'Chapter Leads', value: 45, color: '#f59e0b' },
    { name: 'Alumni Officers', value: 15, color: '#ec4899' },
  ];

  const engagementData = [
    { category: 'Mentorship', count: 184 },
    { category: 'Event RSVPs', count: 320 },
    { category: 'Job Applications', count: 240 },
    { category: 'Direct Messages', count: 510 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-indigo-400" /> Executive Analytics & Reports
          </h1>
          <p className="text-xs text-slate-400">Institutional insights, engagement metrics, and growth trends</p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="flex items-center p-1 rounded-xl bg-slate-900 border border-slate-800 text-xs font-bold">
            <button
              onClick={() => setTimeRange('weekly')}
              className={`px-3 py-1.5 rounded-lg transition ${
                timeRange === 'weekly' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Weekly
            </button>
            <button
              onClick={() => setTimeRange('monthly')}
              className={`px-3 py-1.5 rounded-lg transition ${
                timeRange === 'monthly' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setTimeRange('yearly')}
              className={`px-3 py-1.5 rounded-lg transition ${
                timeRange === 'yearly' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Yearly
            </button>
          </div>

          <Button variant="secondary" size="sm" icon={Download}>
            Export PDF
          </Button>
        </div>
      </div>

      {/* Chart Row 1: Area Chart Growth */}
      <Card>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-white">Alumni Growth & Connectivity Velocity</h3>
            <p className="text-xs text-slate-400">Cumulative profile registrations and connection requests</p>
          </div>
          <Badge variant="indigo">+24.8% YoY</Badge>
        </div>

        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={growthData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="colorAlumni" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorConn" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#14b8a6" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#14b8a6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" stroke="#64748b" fontSize={12} />
              <YAxis stroke="#64748b" fontSize={12} />
              <Tooltip
                contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Area type="monotone" dataKey="alumni" name="Total Alumni" stroke="#6366f1" fillOpacity={1} fill="url(#colorAlumni)" />
              <Area type="monotone" dataKey="connections" name="Connections" stroke="#14b8a6" fillOpacity={1} fill="url(#colorConn)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Chart Row 2: Bar Chart & Pie Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Engagement Bar Chart */}
        <Card>
          <h3 className="text-base font-bold text-white mb-1">Ecosystem Engagement by Category</h3>
          <p className="text-xs text-slate-400 mb-4">Total interactions recorded across features</p>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="category" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                <Bar dataKey="count" fill="#818cf8" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Role Distribution Pie Chart */}
        <Card>
          <h3 className="text-base font-bold text-white mb-1">User Role Distribution</h3>
          <p className="text-xs text-slate-400 mb-4">Proportion of roles across active accounts</p>

          <div className="h-64 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={roleDistributionData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {roleDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '12px', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
};
