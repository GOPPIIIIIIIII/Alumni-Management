import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Search,
  Filter,
  Grid,
  List,
  MapPin,
  Briefcase,
  GraduationCap,
  UserPlus,
  CheckCircle2,
  Mail,
  Phone
} from 'lucide-react';
import { alumniApi } from '../api/alumniApi';
import { Card } from '../components/common/Card';
import { Input } from '../components/common/Input';
import { Select } from '../components/common/Select';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Avatar } from '../components/common/Avatar';
import { Skeleton } from '../components/common/Skeleton';
import { EmptyState } from '../components/common/EmptyState';
import { ErrorState } from '../components/common/ErrorState';
import { Modal } from '../components/common/Modal';
import { Pagination } from '../components/common/Pagination';
import { notifySuccess } from '../api/axiosInstance';

export const AlumniDirectoryPage = () => {
  const [alumni, setAlumni] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters state
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedProgramme, setSelectedProgramme] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'list'

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  // Connect modal state
  const [connectModalOpen, setConnectModalOpen] = useState(false);
  const [selectedAlumni, setSelectedAlumni] = useState(null);
  const [connectMessage, setConnectMessage] = useState('');
  const [connecting, setConnecting] = useState(false);

  const fetchDirectory = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await alumniApi.getDirectory();
      setAlumni(data || []);
    } catch (err) {
      setError(err.message || 'Failed to load alumni directory');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDirectory();
  }, []);

  // Filter logic
  const filteredAlumni = alumni.filter((item) => {
    const matchesSearch =
      !searchTerm ||
      item.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.currentEmployer?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.currentRole?.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesYear = !selectedYear || String(item.graduationYear) === selectedYear;
    const matchesProgramme = !selectedProgramme || item.programme === selectedProgramme;
    const matchesLocation = !selectedLocation || item.location === selectedLocation;

    return matchesSearch && matchesYear && matchesProgramme && matchesLocation;
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredAlumni.length / itemsPerPage);
  const paginatedAlumni = filteredAlumni.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleConnectClick = (item) => {
    setSelectedAlumni(item);
    setConnectMessage(`Hi ${item.name}, I would love to connect with you on Alumni Nexus!`);
    setConnectModalOpen(true);
  };

  const handleSendConnection = async () => {
    if (!selectedAlumni) return;
    setConnecting(true);
    try {
      await alumniApi.requestConnection(selectedAlumni.id);
      notifySuccess(`Connection request sent to ${selectedAlumni.name}!`, 'Request Sent');
      setConnectModalOpen(false);
    } catch (err) {
      console.warn(err);
    } finally {
      setConnecting(false);
    }
  };

  // Extract unique filter options
  const yearOptions = Array.from(new Set(alumni.map((a) => a.graduationYear).filter(Boolean)))
    .sort((a, b) => b - a)
    .map((y) => ({ value: String(y), label: `Class of ${y}` }));

  const programmeOptions = Array.from(new Set(alumni.map((a) => a.programme).filter(Boolean)))
    .map((p) => ({ value: p, label: p }));

  const locationOptions = Array.from(new Set(alumni.map((a) => a.location).filter(Boolean)))
    .map((l) => ({ value: l, label: l }));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Users className="w-6 h-6 text-indigo-400" /> Alumni Directory
          </h1>
          <p className="text-xs text-slate-400">Discover and network with verified graduates across the globe</p>
        </div>

        {/* View Toggle */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2.5 rounded-xl border transition ${
              viewMode === 'grid'
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
            title="Grid View"
          >
            <Grid className="w-4 h-4" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2.5 rounded-xl border transition ${
              viewMode === 'list'
                ? 'bg-indigo-600 text-white border-indigo-500 shadow-md'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
            title="List View"
          >
            <List className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Search and Filters Control Bar */}
      <Card className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          <div className="md:col-span-1">
            <Input
              placeholder="Search by name, company, role..."
              icon={Search}
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>

          <Select
            placeholder="All Graduation Years"
            options={yearOptions}
            value={selectedYear}
            onChange={(e) => {
              setSelectedYear(e.target.value);
              setCurrentPage(1);
            }}
          />

          <Select
            placeholder="All Programmes"
            options={programmeOptions}
            value={selectedProgramme}
            onChange={(e) => {
              setSelectedProgramme(e.target.value);
              setCurrentPage(1);
            }}
          />

          <Select
            placeholder="All Locations"
            options={locationOptions}
            value={selectedLocation}
            onChange={(e) => {
              setSelectedLocation(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        {(searchTerm || selectedYear || selectedProgramme || selectedLocation) && (
          <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs text-slate-400">
            <span>Found <span className="text-white font-bold">{filteredAlumni.length}</span> matching alumni</span>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedYear('');
                setSelectedProgramme('');
                setSelectedLocation('');
                setCurrentPage(1);
              }}
              className="text-indigo-400 hover:text-indigo-300 font-semibold"
            >
              Reset Filters
            </button>
          </div>
        )}
      </Card>

      {/* Main Content View */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Skeleton type="card" />
          <Skeleton type="card" />
          <Skeleton type="card" />
          <Skeleton type="card" />
        </div>
      ) : error ? (
        <ErrorState message={error} onRetry={fetchDirectory} />
      ) : paginatedAlumni.length === 0 ? (
        <EmptyState
          title="No Alumni Match Your Criteria"
          description="Try broadening your search keywords or resetting filters."
          actionLabel="Clear Search Filters"
          onAction={() => {
            setSearchTerm('');
            setSelectedYear('');
            setSelectedProgramme('');
            setSelectedLocation('');
          }}
        />
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {paginatedAlumni.map((item) => (
            <Card key={item.id} hoverEffect className="flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-start justify-between mb-3">
                  <Avatar name={item.name} size="lg" status={item.status === 'ACTIVE' ? 'online' : 'offline'} />
                  {item.verified && (
                    <Badge variant="teal" size="sm">
                      <CheckCircle2 className="w-3 h-3 mr-1" /> Verified
                    </Badge>
                  )}
                </div>

                <h3 className="text-base font-bold text-white leading-snug">{item.name}</h3>
                <p className="text-xs text-indigo-400 font-medium">{item.currentRole || 'Professional Alumni'}</p>
                {item.currentEmployer && (
                  <p className="text-xs text-slate-300 flex items-center gap-1.5 mt-1">
                    <Briefcase className="w-3.5 h-3.5 text-slate-500 shrink-0" /> {item.currentEmployer}
                  </p>
                )}
                {item.programme && (
                  <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-500 shrink-0" /> {item.programme} ({item.graduationYear})
                  </p>
                )}
                {item.location && (
                  <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" /> {item.location}
                  </p>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center gap-2">
                <Link to={`/network/${item.id}`} className="flex-1">
                  <Button variant="secondary" size="sm" className="w-full">
                    View Profile
                  </Button>
                </Link>
                <Button
                  variant="primary"
                  size="sm"
                  icon={UserPlus}
                  onClick={() => handleConnectClick(item)}
                >
                  Connect
                </Button>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <Card className="divide-y divide-slate-800 p-0 overflow-hidden">
          {paginatedAlumni.map((item) => (
            <div key={item.id} className="p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-slate-900/50 transition">
              <div className="flex items-center gap-4">
                <Avatar name={item.name} size="md" status={item.status === 'ACTIVE' ? 'online' : 'offline'} />
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white">{item.name}</h3>
                    {item.verified && (
                      <Badge variant="teal" size="sm">Verified</Badge>
                    )}
                  </div>
                  <p className="text-xs text-indigo-400 font-medium">{item.currentRole} at {item.currentEmployer}</p>
                  <p className="text-[11px] text-slate-400">{item.programme} • Class of {item.graduationYear} • {item.location}</p>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <Link to={`/network/${item.id}`}>
                  <Button variant="secondary" size="sm">
                    Profile
                  </Button>
                </Link>
                <Button variant="primary" size="sm" icon={UserPlus} onClick={() => handleConnectClick(item)}>
                  Connect
                </Button>
              </div>
            </div>
          ))}
        </Card>
      )}

      {/* Pagination */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
        totalItems={filteredAlumni.length}
        itemsPerPage={itemsPerPage}
      />

      {/* Connection Request Modal */}
      <Modal
        isOpen={connectModalOpen}
        onClose={() => setConnectModalOpen(false)}
        title={`Connect with ${selectedAlumni?.name}`}
        subtitle="Send a personalized connection request on Alumni Nexus"
      >
        <div className="space-y-4">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-slate-950 border border-slate-800">
            <Avatar name={selectedAlumni?.name} size="md" />
            <div>
              <p className="text-sm font-bold text-white">{selectedAlumni?.name}</p>
              <p className="text-xs text-indigo-400">{selectedAlumni?.currentRole} @ {selectedAlumni?.currentEmployer}</p>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-300 mb-1.5">
              Personalized Note (Optional)
            </label>
            <textarea
              rows={3}
              className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
              value={connectMessage}
              onChange={(e) => setConnectMessage(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setConnectModalOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="primary"
              icon={UserPlus}
              isLoading={connecting}
              onClick={handleSendConnection}
            >
              Send Request
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
