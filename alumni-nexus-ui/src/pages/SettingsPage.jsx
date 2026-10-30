import React, { useState } from 'react';
import { Settings, Bell, Shield, Lock, Eye, Moon, CheckCircle2 } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { notifySuccess } from '../api/axiosInstance';

export const SettingsPage = () => {
  const [notifications, setNotifications] = useState({
    emailDigest: true,
    mentorshipAlerts: true,
    eventReminders: true,
    jobAlerts: false,
  });

  const handleSaveSettings = (e) => {
    e.preventDefault();
    notifySuccess('Preferences saved successfully!');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <Settings className="w-6 h-6 text-indigo-400" /> Account & System Settings
        </h1>
        <p className="text-xs text-slate-400">Configure notification preferences, security parameters, and privacy options</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Notification Preferences */}
          <Card>
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Bell className="w-4 h-4 text-indigo-400" /> Notification Preferences
            </h3>

            <div className="space-y-4 text-xs">
              {Object.entries({
                emailDigest: 'Receive weekly email digests of alumni activity',
                mentorshipAlerts: 'Receive immediate alerts for new mentorship session requests',
                eventReminders: 'Receive calendar reminders 24h before registered events',
                jobAlerts: 'Receive notifications when new jobs matching your profile are posted',
              }).map(([key, label]) => (
                <label key={key} className="flex items-center justify-between p-3 rounded-xl bg-slate-900 border border-slate-800 cursor-pointer">
                  <span className="text-slate-200">{label}</span>
                  <input
                    type="checkbox"
                    checked={notifications[key]}
                    onChange={(e) => setNotifications({ ...notifications, [key]: e.target.checked })}
                    className="rounded bg-slate-950 border-slate-700 text-indigo-600 focus:ring-indigo-500"
                  />
                </label>
              ))}
            </div>
          </Card>

          {/* Security & Password */}
          <Card>
            <h3 className="text-base font-bold text-white mb-4 flex items-center gap-2">
              <Lock className="w-4 h-4 text-teal-400" /> Password & Security
            </h3>

            <form onSubmit={handleSaveSettings} className="space-y-4">
              <Input label="Current Password" type="password" placeholder="••••••••" />
              <Input label="New Password" type="password" placeholder="••••••••" />
              <div className="flex justify-end">
                <Button type="submit" variant="primary">
                  Update Security Credentials
                </Button>
              </div>
            </form>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card>
            <h3 className="text-base font-bold text-white mb-3 flex items-center gap-2">
              <Shield className="w-4 h-4 text-rose-400" /> Security Status
            </h3>
            <div className="p-3 rounded-xl bg-slate-900 border border-slate-800 text-xs space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">JWT Token Auth:</span>
                <span className="text-emerald-400 font-bold">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Spring Security RBAC:</span>
                <span className="text-emerald-400 font-bold">Enforced</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
