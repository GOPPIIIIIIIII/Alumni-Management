import React, { useState, useEffect } from 'react';
import { Briefcase, Search, Plus, MapPin, DollarSign, Building, ExternalLink } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { jobsApi } from '../api/jobsApi';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Input } from '../components/common/Input';
import { Skeleton } from '../components/common/Skeleton';
import { EmptyState } from '../components/common/EmptyState';
import { Modal } from '../components/common/Modal';
import { notifySuccess } from '../api/axiosInstance';

export const JobBoardPage = () => {
  const { role } = useAuth();
  const isAllowedToPost = ['ADMIN', 'ALUMNI_RELATIONS_OFFICE', 'ALUMNI', 'MENTOR'].includes(role?.toUpperCase());

  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  // Post Job modal state
  const [postModalOpen, setPostModalOpen] = useState(false);
  const [newJob, setNewJob] = useState({
    title: '',
    company: '',
    location: '',
    type: 'Full-time',
    salary: '',
    description: '',
  });
  const [posting, setPosting] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const data = await jobsApi.getJobs();
      if (!data || data.length === 0) {
        setJobs([
          {
            id: 1,
            title: 'Lead Software Architect — AI Systems',
            company: 'QuantumLabs Global',
            location: 'San Francisco, CA (Hybrid)',
            type: 'Full-time',
            salary: '$180,000 - $220,000',
            posted: '2 days ago',
            featured: true,
          },
          {
            id: 2,
            title: 'Senior Product Manager',
            company: 'FinTech Nexus',
            location: 'New York, NY (Remote)',
            type: 'Full-time',
            salary: '$150,000 - $180,000',
            posted: '3 days ago',
            featured: false,
          },
          {
            id: 3,
            title: 'Principal Machine Learning Engineer',
            company: 'BioHealth Corp',
            location: 'Boston, MA',
            type: 'Full-time',
            salary: '$190,000 - $240,000',
            posted: '5 days ago',
            featured: false,
          },
        ]);
      } else {
        setJobs(data);
      }
    } catch (err) {
      console.warn(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  const handlePostJob = async (e) => {
    e.preventDefault();
    setPosting(true);
    try {
      const created = await jobsApi.createJob(newJob);
      setJobs((prev) => [created || { ...newJob, id: Date.now(), posted: 'Just now' }, ...prev]);
      notifySuccess('Job opportunity posted successfully!', 'Job Published');
      setPostModalOpen(false);
    } catch (err) {
      console.warn(err);
    } finally {
      setPosting(false);
    }
  };

  const filteredJobs = jobs.filter(
    (j) =>
      !searchTerm ||
      j.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      j.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Briefcase className="w-6 h-6 text-indigo-400" /> Alumni Job Board
          </h1>
          <p className="text-xs text-slate-400">Exclusive career opportunities posted by alumni and partner companies</p>
        </div>

        {isAllowedToPost && (
          <Button variant="primary" icon={Plus} onClick={() => setPostModalOpen(true)}>
            Post Job Opportunity
          </Button>
        )}
      </div>

      {/* Search Bar */}
      <Card>
        <Input
          placeholder="Search by job title, company, location..."
          icon={Search}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Card>

      {/* Job Cards */}
      {loading ? (
        <div className="space-y-3">
          <Skeleton type="table" />
        </div>
      ) : filteredJobs.length === 0 ? (
        <EmptyState
          title="No Job Postings Found"
          description="There are currently no active job listings matching your search."
          actionLabel="Clear Search"
          onAction={() => setSearchTerm('')}
        />
      ) : (
        <div className="space-y-4">
          {filteredJobs.map((job) => (
            <Card key={job.id} hoverEffect className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-2xl bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 shrink-0 mt-0.5">
                  <Building className="w-6 h-6" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-base font-bold text-white">{job.title}</h3>
                    {job.featured && <Badge variant="amber" size="sm">Featured</Badge>}
                  </div>
                  <p className="text-xs text-indigo-300 font-semibold mt-0.5">{job.company}</p>
                  <p className="text-xs text-slate-400 flex flex-wrap items-center gap-3 mt-1.5">
                    <span className="flex items-center gap-1"><MapPin className="w-3.5 h-3.5" /> {job.location}</span>
                    <span className="flex items-center gap-1"><DollarSign className="w-3.5 h-3.5 text-emerald-400" /> {job.salary}</span>
                    <Badge variant="slate" size="sm">{job.type}</Badge>
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3 self-end sm:self-auto">
                <Button variant="outline" size="sm" icon={ExternalLink} onClick={() => notifySuccess(`Redirecting to application for ${job.title}`)}>
                  Apply Now
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Post Job Modal */}
      <Modal
        isOpen={postModalOpen}
        onClose={() => setPostModalOpen(false)}
        title="Post Job Opportunity"
        subtitle="Share a career opening with qualified university alumni"
      >
        <form onSubmit={handlePostJob} className="space-y-4">
          <Input
            label="Job Title"
            placeholder="e.g. Senior Software Architect"
            value={newJob.title}
            onChange={(e) => setNewJob({ ...newJob, title: e.target.value })}
            required
          />
          <Input
            label="Company Name"
            placeholder="e.g. NexusTech"
            value={newJob.company}
            onChange={(e) => setNewJob({ ...newJob, company: e.target.value })}
            required
          />
          <Input
            label="Location"
            placeholder="e.g. San Francisco, CA (Hybrid)"
            value={newJob.location}
            onChange={(e) => setNewJob({ ...newJob, location: e.target.value })}
            required
          />
          <Input
            label="Estimated Salary Range"
            placeholder="e.g. $140,000 - $170,000"
            value={newJob.salary}
            onChange={(e) => setNewJob({ ...newJob, salary: e.target.value })}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setPostModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={posting}>
              Publish Job Listing
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
