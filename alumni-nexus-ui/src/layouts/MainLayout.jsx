import React, { useState } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  User,
  Users,
  BookOpen,
  Briefcase,
  Calendar,
  Heart,
  Globe,
  MessageSquare,
  Newspaper,
  BarChart3,
  ShieldAlert,
  Settings,
  HelpCircle,
  Menu,
  X,
  LogOut,
  Bell,
  Search,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { Avatar } from '../components/common/Avatar';
import { Badge } from '../components/common/Badge';
import { ToastContainer } from '../components/common/ToastContainer';
import { CommunityPulse } from '../components/features/CommunityPulse';

import dashboardBg from '../assets/dashboard-bg.png';

export const MainLayout = () => {
  const { user, role, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const currentRole = role ? role.toUpperCase() : 'GUEST';
  const isAdmin = currentRole === 'ADMIN' || currentRole === 'ALUMNI_RELATIONS_OFFICE';

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'My Profile', path: '/profile', icon: User },
    { label: 'Alumni Network', path: '/network', icon: Users },
    { label: 'Mentorship', path: '/mentorship', icon: BookOpen },
    { label: 'Jobs', path: '/jobs', icon: Briefcase },
    { label: 'Events', path: '/events', icon: Calendar },
    { label: 'Donations', path: '/donations', icon: Heart },
    { label: 'Chapters', path: '/chapters', icon: Globe },
    { label: 'Messages', path: '/messages', icon: MessageSquare },
    { label: 'Newsletter', path: '/newsletter', icon: Newspaper },
    { label: 'Analytics', path: '/analytics', icon: BarChart3 },
    ...(isAdmin ? [{ label: 'Admin', path: '/admin', icon: ShieldAlert }] : []),
    { label: 'Settings', path: '/settings', icon: Settings },
    { label: 'Help & Support', path: '/help', icon: HelpCircle },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen relative flex flex-col font-sans bg-slate-950">
      {/* Dynamic Background Image Layer */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={dashboardBg}
          alt="MS Dhoni & CR7 Background"
          className="w-full h-full object-cover object-center opacity-85 filter brightness-110 contrast-110 saturate-110"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/45 via-slate-950/30 to-slate-950/55" />
      </div>

      {/* Toast Notification Container */}
      <ToastContainer />

      {/* Top Navbar */}
      <header className="sticky top-0 z-40 glass-panel border-b border-slate-800/80 px-4 lg:px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-xl bg-slate-900"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>

          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-teal-400 flex items-center justify-center text-white font-extrabold shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition">
              AN
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-black tracking-tight text-white">ALUMNI <span className="text-indigo-400">NEXUS</span></span>
              <span className="block text-[10px] text-slate-400 uppercase tracking-widest font-semibold">Networking Portal</span>
            </div>
          </Link>
        </div>

        {/* Global Search Bar */}
        <div className="hidden md:flex items-center max-w-md w-full mx-6">
          <div className="relative w-full">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="text"
              placeholder="Search alumni, mentors, events, jobs..."
              className="w-full pl-10 pr-4 py-2 text-xs bg-slate-900/90 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition"
            />
          </div>
        </div>

        {/* Top Right Controls */}
        <div className="flex items-center gap-3">
          <button className="relative p-2 text-slate-400 hover:text-white rounded-xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-indigo-500" />
          </button>

          <div className="h-6 w-px bg-slate-800 hidden sm:block" />

          {/* User Profile Badge */}
          <div className="flex items-center gap-3">
            <Link to="/profile" className="flex items-center gap-2.5 hover:opacity-90 transition">
              <Avatar name={user?.name || 'User'} size="sm" status="online" />
              <div className="hidden sm:block text-left">
                <p className="text-xs font-bold text-white leading-none">{user?.name || 'Alumni User'}</p>
                <p className="text-[11px] text-slate-400 mt-1 leading-none">
                  <Badge variant="indigo" size="sm">{role || 'ALUMNI'}</Badge>
                </p>
              </div>
            </Link>

            <button
              onClick={handleLogout}
              title="Logout"
              className="p-2 text-slate-400 hover:text-rose-400 rounded-xl bg-slate-900/80 border border-slate-800 hover:border-rose-500/30 transition ml-1"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Body Grid */}
      <div className="flex-1 flex overflow-hidden">
        {/* Desktop Sidebar */}
        <aside
          className={`hidden lg:flex flex-col glass-panel border-r border-slate-800/80 transition-all duration-300 z-30 ${
            collapsed ? 'w-20' : 'w-64'
          }`}
        >
          <div className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto no-scrollbar">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path));
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-xs transition-all duration-150 ${
                    active
                      ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white shadow-md shadow-indigo-500/20 font-bold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900/80'
                  }`}
                  title={collapsed ? item.label : undefined}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${active ? 'text-white' : 'text-slate-400'}`} />
                  {!collapsed && <span>{item.label}</span>}
                </Link>
              );
            })}
          </div>

          {/* Sidebar Collapse Toggle */}
          <div className="p-3 border-t border-slate-800/80 flex items-center justify-between">
            {!collapsed && <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">v1.0.0 SaaS</span>}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-900 border border-slate-800 mx-auto"
            >
              {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
            </button>
          </div>
        </aside>

        {/* Mobile Navigation Drawer */}
        {mobileOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <div className="relative w-72 max-w-full bg-slate-900 border-r border-slate-800 p-4 flex flex-col h-full z-10">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800 mb-4">
                <span className="font-bold text-white text-base">Navigation</span>
                <button onClick={() => setMobileOpen(false)} className="text-slate-400 p-1">
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="flex-1 space-y-1 overflow-y-auto">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  const active = location.pathname === item.path;
                  return (
                    <Link
                      key={item.path}
                      to={item.path}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium ${
                        active ? 'bg-indigo-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-800'
                      }`}
                    >
                      <Icon className="w-4 h-4" />
                      <span>{item.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 space-y-6">
          <CommunityPulse />
          <Outlet />
        </main>
      </div>
    </div>
  );
};
