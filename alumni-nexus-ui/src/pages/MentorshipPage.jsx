import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Users,
  CheckCircle2,
  Clock,
  Sparkles,
  MessageSquare,
  Send,
  UserCheck,
  Check,
  X,
  Award
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { mentorshipApi } from '../api/mentorshipApi';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Avatar } from '../components/common/Avatar';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Skeleton } from '../components/common/Skeleton';
import { EmptyState } from '../components/common/EmptyState';
import { Modal } from '../components/common/Modal';
import { SmartMentorMatch } from '../components/features/SmartMentorMatch';
import { notifySuccess } from '../api/axiosInstance';

export const MentorshipPage = () => {
  const { user } = useAuth();

  const [activeTab, setActiveTab] = useState('find'); // 'find' | 'my' | 'requests'
  const [mentors, setMentors] = useState([]);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // Request session modal
  const [requestModalOpen, setRequestModalOpen] = useState(false);
  const [selectedMentor, setSelectedMentor] = useState(null);
  const [areaOfMentorship, setAreaOfMentorship] = useState('Career Growth & Tech Leadership');
  const [submitting, setSubmitting] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [mentorsRes, requestsRes] = await Promise.allSettled([
        mentorshipApi.getMentors(),
        mentorshipApi.getAllRequests(),
      ]);

      if (mentorsRes.status === 'fulfilled') setMentors(mentorsRes.value || []);
      if (requestsRes.status === 'fulfilled') setRequests(requestsRes.value || []);
    } catch (err) {
      console.warn('Mentorship fetch note:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenRequestModal = (mentor) => {
    setSelectedMentor(mentor);
    setRequestModalOpen(true);
  };

  const handleSendRequest = async (e) => {
    e.preventDefault();
    if (!selectedMentor) return;

    setSubmitting(true);
    try {
      await mentorshipApi.createRequest(
        selectedMentor.id || 1,
        user?.id || 2,
        areaOfMentorship
      );
      notifySuccess(`Mentorship request submitted to ${selectedMentor.name}!`, 'Request Sent');
      setRequestModalOpen(false);
      fetchData();
    } catch (err) {
      console.warn(err);
    } finally {
      setSubmitting(false);
    }
  };

  const handleUpdateStatus = async (requestId, status) => {
    try {
      await mentorshipApi.updateStatus(requestId, status);
      notifySuccess(`Mentorship status updated to ${status}`, 'Status Updated');
      fetchData();
    } catch (err) {
      console.warn(err);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-teal-400" /> Mentorship Center
          </h1>
          <p className="text-xs text-slate-400">Connect with industry leaders, gain career guidance, or mentor fellow alumni</p>
        </div>

        {/* Tab Selection */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-900 border border-slate-800 self-start md:self-auto">
          <button
            onClick={() => setActiveTab('find')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'find' ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Find Mentors ({mentors.length})
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeTab === 'requests' ? 'bg-gradient-to-r from-teal-600 to-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
            }`}
          >
            Requests ({requests.length})
          </button>
        </div>
      </div>

      {/* Tab 1: Find Mentors */}
      {activeTab === 'find' && (
        <div className="space-y-6">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Skeleton type="card" />
              <Skeleton type="card" />
              <Skeleton type="card" />
            </div>
          ) : mentors.length === 0 ? (
            <EmptyState
              title="No Mentors Currently Available"
              description="There are no alumni registered as mentors in this list. Be the first to volunteer!"
              actionLabel="Volunteer as Mentor"
              onAction={() => alert('Mentorship signup enabled.')}
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mentors.map((mentor) => (
                <Card key={mentor.id || mentor.email} hoverEffect className="flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-start justify-between mb-3">
                      <Avatar name={mentor.name} size="lg" status="online" />
                      <Badge variant="teal" size="sm">Available</Badge>
                    </div>

                    <h3 className="text-base font-bold text-white">{mentor.name}</h3>
                    <p className="text-xs text-teal-400 font-semibold">{mentor.role || 'Senior Industry Mentor'}</p>
                    <p className="text-xs text-slate-400 mt-1">{mentor.email}</p>

                    {/* Smart Mentor Match Reason Tag */}
                    <SmartMentorMatch reasons={[
                      'Matches your interest in Cloud Computing & AI',
                      'Same Graduation Programme'
                    ]} />
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      icon={Send}
                      className="w-full"
                      onClick={() => handleOpenRequestModal(mentor)}
                    >
                      Book Session
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Requests */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          {loading ? (
            <Skeleton type="table" />
          ) : requests.length === 0 ? (
            <EmptyState
              title="No Active Mentorship Requests"
              description="You have no pending or active mentorship requests at this time."
              actionLabel="Find a Mentor"
              onAction={() => setActiveTab('find')}
            />
          ) : (
            <div className="space-y-3">
              {requests.map((req) => (
                <Card key={req.id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <Avatar name={req.mentor?.name || 'Mentor'} size="md" />
                    <div>
                      <h4 className="text-sm font-bold text-white">
                        Mentorship with <span className="text-teal-400">{req.mentor?.name || 'Mentor'}</span>
                      </h4>
                      <p className="text-xs text-slate-400">Area: {req.areaOfMentorship || 'General Guidance'}</p>
                      <p className="text-[11px] text-slate-500 mt-0.5">Sessions Completed: {req.sessionsCompleted || 0}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <Badge
                      variant={
                        req.status === 'ACCEPTED' || req.status === 'ACTIVE'
                          ? 'emerald'
                          : req.status === 'COMPLETED'
                          ? 'indigo'
                          : req.status === 'DECLINED'
                          ? 'rose'
                          : 'amber'
                      }
                    >
                      Status: {req.status}
                    </Badge>

                    {req.status === 'REQUESTED' && (
                      <>
                        <Button
                          variant="secondary"
                          size="sm"
                          icon={Check}
                          onClick={() => handleUpdateStatus(req.id, 'ACCEPTED')}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="danger"
                          size="sm"
                          icon={X}
                          onClick={() => handleUpdateStatus(req.id, 'DECLINED')}
                        >
                          Decline
                        </Button>
                      </>
                    )}
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Book Session Modal */}
      <Modal
        isOpen={requestModalOpen}
        onClose={() => setRequestModalOpen(false)}
        title={`Request Session with ${selectedMentor?.name}`}
        subtitle="Submit your mentorship goals and preferred area of guidance"
      >
        <form onSubmit={handleSendRequest} className="space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
            <Avatar name={selectedMentor?.name} size="md" />
            <div>
              <p className="text-sm font-bold text-white">{selectedMentor?.name}</p>
              <p className="text-xs text-teal-400">{selectedMentor?.email}</p>
            </div>
          </div>

          <Select
            label="Area of Mentorship"
            options={[
              { value: 'Career Advancement & Leadership', label: 'Career Advancement & Leadership' },
              { value: 'Cloud Computing & Software Architecture', label: 'Cloud Computing & Software Architecture' },
              { value: 'Startup Advisory & Fundraising', label: 'Startup Advisory & Fundraising' },
              { value: 'Academic Research & PhD Guidance', label: 'Academic Research & PhD Guidance' },
            ]}
            value={areaOfMentorship}
            onChange={(e) => setAreaOfMentorship(e.target.value)}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setRequestModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" icon={Send} isLoading={submitting}>
              Submit Request
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
