import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { RoleProtectedRoute } from './RoleProtectedRoute';

// Layouts
import { MainLayout } from '../layouts/MainLayout';
import { AuthLayout } from '../layouts/AuthLayout';

// Pages
import { LoginPage } from '../pages/LoginPage';
import { RegisterPage } from '../pages/RegisterPage';
import { DashboardPage } from '../pages/DashboardPage';
import { AlumniDirectoryPage } from '../pages/AlumniDirectoryPage';
import { AlumniDetailPage } from '../pages/AlumniDetailPage';
import { ProfilePage } from '../pages/ProfilePage';
import { MentorshipPage } from '../pages/MentorshipPage';
import { MentorshipDetailPage } from '../pages/MentorshipDetailPage';
import { EventsPage } from '../pages/EventsPage';
import { EventDetailPage } from '../pages/EventDetailPage';
import { JobBoardPage } from '../pages/JobBoardPage';
import { JobDetailPage } from '../pages/JobDetailPage';
import { DonationsPage } from '../pages/DonationsPage';
import { ChaptersPage } from '../pages/ChaptersPage';
import { MessagesPage } from '../pages/MessagesPage';
import { NewsletterPage } from '../pages/NewsletterPage';
import { AnalyticsPage } from '../pages/AnalyticsPage';
import { AdminDashboardPage } from '../pages/AdminDashboardPage';
import { SettingsPage } from '../pages/SettingsPage';
import { HelpPage } from '../pages/HelpPage';

export const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Auth Routes */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Protected Main App Routes */}
      <Route
        element={
          <ProtectedRoute>
            <MainLayout />
          </ProtectedRoute>
        }
      >
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/network" element={<AlumniDirectoryPage />} />
        <Route path="/network/:id" element={<AlumniDetailPage />} />
        <Route path="/mentorship" element={<MentorshipPage />} />
        <Route path="/mentorship/:id" element={<MentorshipDetailPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/events/:id" element={<EventDetailPage />} />
        <Route path="/jobs" element={<JobBoardPage />} />
        <Route path="/jobs/:id" element={<JobDetailPage />} />
        <Route path="/donations" element={<DonationsPage />} />
        <Route path="/donations/:id" element={<DonationsPage />} />
        <Route path="/chapters" element={<ChaptersPage />} />
        <Route path="/messages" element={<MessagesPage />} />
        <Route path="/newsletter" element={<NewsletterPage />} />
        <Route path="/analytics" element={<AnalyticsPage />} />
        <Route path="/settings" element={<SettingsPage />} />
        <Route path="/help" element={<HelpPage />} />

        {/* Admin RBAC Guarded Routes */}
        <Route
          path="/admin/*"
          element={
            <RoleProtectedRoute allowedRoles={['ADMIN', 'ALUMNI_RELATIONS_OFFICE']}>
              <AdminDashboardPage />
            </RoleProtectedRoute>
          }
        />
      </Route>

      {/* Catch-all fallback */}
      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
};
