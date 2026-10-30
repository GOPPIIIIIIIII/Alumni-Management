import React, { useState, useEffect } from 'react';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Briefcase,
  GraduationCap,
  CheckCircle2,
  Edit3,
  Shield,
  Award,
  Heart,
  BookOpen
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { userApi } from '../api/userApi';
import { alumniApi } from '../api/alumniApi';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { Badge } from '../components/common/Badge';
import { Avatar } from '../components/common/Avatar';
import { Skeleton } from '../components/common/Skeleton';
import { Modal } from '../components/common/Modal';
import { notifySuccess } from '../api/axiosInstance';
import { AlumniJourney } from '../components/features/AlumniJourney';

export const ProfilePage = () => {
  const { user, role, updateUserProfile } = useAuth();
  const [profile, setProfile] = useState(user || null);
  const [loading, setLoading] = useState(true);

  // Edit profile state
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    phoneNumber: user?.phoneNumber || '',
    email: user?.email || '',
    currentEmployer: 'Tech Global Inc.',
    currentRole: 'Senior Professional',
    location: 'San Francisco, CA',
    graduationYear: 2021,
    programme: 'B.Tech Computer Science',
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const data = await userApi.getProfile();
        setProfile(data);
        setFormData((prev) => ({
          ...prev,
          name: data.name || prev.name,
          phoneNumber: data.phoneNumber || prev.phoneNumber,
          email: data.email || prev.email,
        }));
      } catch (err) {
        console.warn('Profile fetch notice:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, []);

  const handleSaveProfile = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      updateUserProfile({
        name: formData.name,
        phoneNumber: formData.phoneNumber,
        email: formData.email,
      });
      notifySuccess('Profile updated successfully!', 'Update Saved');
      setEditModalOpen(false);
    } catch (err) {
      console.warn(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner Card */}
      <Card className="relative overflow-hidden border-indigo-500/20 bg-gradient-to-r from-slate-900 via-indigo-950/40 to-slate-900">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <Avatar name={profile?.name || 'User'} size="xl" status="online" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-white">{profile?.name || 'Alumni Member'}</h1>
                <Badge variant="teal" size="sm">
                  <CheckCircle2 className="w-3 h-3 mr-1" /> Verified Profile
                </Badge>
              </div>
              <p className="text-sm font-semibold text-indigo-300 mt-0.5">{formData.currentRole} at {formData.currentEmployer}</p>
              <p className="text-xs text-slate-400 flex items-center gap-3 mt-1">
                <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {formData.location}</span>
                <span className="flex items-center gap-1"><GraduationCap className="w-3.5 h-3.5" /> {formData.programme} ({formData.graduationYear})</span>
              </p>
            </div>
          </div>

          <Button variant="primary" icon={Edit3} onClick={() => setEditModalOpen(true)}>
            Edit Profile
          </Button>
        </div>
      </Card>

      {/* Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Journey Component */}
          <AlumniJourney
            graduationYear={formData.graduationYear}
            currentRole={formData.currentRole}
            currentEmployer={formData.currentEmployer}
            mentorshipCount={2}
            donationsCount={1}
          />

          {/* Education & Employment */}
          <Card>
            <h3 className="text-base font-bold text-white mb-4">Professional & Academic Information</h3>
            <div className="space-y-4 text-xs text-slate-300">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                  <Briefcase className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-white">{formData.currentRole}</p>
                  <p className="text-slate-400">{formData.currentEmployer}</p>
                  <p className="text-slate-500 text-[11px] mt-0.5">Verified Industry Professional</p>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-4 border-t border-slate-800">
                <div className="p-2.5 rounded-xl bg-teal-500/10 text-teal-400 border border-teal-500/20">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <p className="font-bold text-white">{formData.programme}</p>
                  <p className="text-slate-400">Graduation Year: {formData.graduationYear}</p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          <Card>
            <h3 className="text-base font-bold text-white mb-4">Account Details</h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-center gap-3 text-slate-300">
                <Mail className="w-4 h-4 text-indigo-400 shrink-0" />
                <span className="truncate">{profile?.email || user?.email}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Phone className="w-4 h-4 text-teal-400 shrink-0" />
                <span>+1 {profile?.phoneNumber || user?.phoneNumber || '1234567890'}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-300">
                <Shield className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Role: <Badge variant="indigo" size="sm">{role || 'ALUMNI'}</Badge></span>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal
        isOpen={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        title="Edit Alumni Profile"
        subtitle="Update your profile info visible to the alumni network"
      >
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <Input
            label="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
          />
          <Input
            label="Phone Number"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            required
          />
          <Input
            label="Current Role"
            value={formData.currentRole}
            onChange={(e) => setFormData({ ...formData, currentRole: e.target.value })}
          />
          <Input
            label="Current Employer"
            value={formData.currentEmployer}
            onChange={(e) => setFormData({ ...formData, currentEmployer: e.target.value })}
          />
          <Input
            label="Location"
            value={formData.location}
            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setEditModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={saving}>
              Save Profile
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
