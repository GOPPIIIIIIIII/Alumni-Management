import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { ToastContainer } from '../components/common/ToastContainer';
import dashboardBg from '../assets/dashboard-bg.png';

export const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center p-4 relative overflow-hidden bg-slate-950">
      <ToastContainer />

      {/* Dynamic Background Image Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src={dashboardBg}
          alt="MS Dhoni & CR7 Background"
          className="w-full h-full object-cover object-center opacity-90 filter brightness-115 contrast-110 saturate-110"
        />
        {/* Soft dark overlay for contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/45 via-slate-950/30 to-slate-950/55" />
      </div>

      {/* Decorative Glow Elements */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/20 rounded-full blur-3xl pointer-events-none" />

      {/* Header Brand */}
      <div className="mb-8 text-center z-10">
        <Link to="/" className="inline-flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-teal-400 flex items-center justify-center text-white font-extrabold text-xl shadow-xl shadow-indigo-500/25">
            AN
          </div>
          <div className="text-left">
            <h1 className="text-2xl font-black tracking-tight text-white">ALUMNI <span className="text-indigo-400">NEXUS</span></h1>
            <p className="text-xs text-slate-400 font-semibold tracking-wider uppercase">Global Alumni Network</p>
          </div>
        </Link>
      </div>

      {/* Auth Card Container */}
      <div className="w-full max-w-md z-10">
        <Outlet />
      </div>

      {/* Footer */}
      <footer className="mt-12 text-center text-xs text-slate-400 z-10">
        <p>© 2026 Alumni Nexus Portal. Connected to Spring Boot & MySQL Backend.</p>
      </footer>
    </div>
  );
};
