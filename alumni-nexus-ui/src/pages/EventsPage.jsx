import React, { useState, useEffect } from 'react';
import {
  Calendar,
  MapPin,
  Users,
  Plus,
  CheckCircle2,
  Clock,
  Sparkles,
  Search,
  Tag
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { eventsApi } from '../api/eventsApi';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Input } from '../components/common/Input';
import { Skeleton } from '../components/common/Skeleton';
import { EmptyState } from '../components/common/EmptyState';
import { Modal } from '../components/common/Modal';
import { notifySuccess } from '../api/axiosInstance';

export const EventsPage = () => {
  const { role } = useAuth();
  const isAdminOrLead = ['ADMIN', 'ALUMNI_RELATIONS_OFFICE', 'CHAPTER_LEAD'].includes(role?.toUpperCase());

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeFilter, setActiveFilter] = useState('upcoming'); // 'upcoming' | 'registered' | 'past'
  const [searchTerm, setSearchTerm] = useState('');

  // RSVP Modal state
  const [rsvpModalOpen, setRsvpModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [rsvpLoading, setRsvpLoading] = useState(false);

  // Create Event Modal state
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: '',
    date: '',
    location: '',
    category: 'Conference',
    speaker: '',
    totalSeats: 100,
  });
  const [creating, setCreating] = useState(false);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const data = await eventsApi.getEvents();
      // Provide vibrant fallback events if backend data empty
      if (!data || data.length === 0) {
        setEvents([
          {
            id: 1,
            title: 'Global Alumni Tech & AI Summit 2026',
            date: '2026-09-24 10:00 AM',
            location: 'Main Auditorium & Virtual Zoom',
            category: 'Summit',
            speaker: 'Dr. Evelyn Vance (VP AI Research)',
            availableSeats: 42,
            totalSeats: 200,
            rsvp: false,
            featured: true,
          },
          {
            id: 2,
            title: 'Annual Endowment Gala & Network Reception',
            date: '2026-10-12 06:30 PM',
            location: 'Grand Ballroom, London UK',
            category: 'Gala',
            speaker: 'Alumni Relations Directorate',
            availableSeats: 18,
            totalSeats: 150,
            rsvp: false,
            featured: false,
          },
          {
            id: 3,
            title: 'Career Transitions & Executive Leadership Webinar',
            date: '2026-11-05 02:00 PM',
            location: 'Virtual Broadcast',
            category: 'Workshop',
            speaker: 'Marcus Sterling (Senior Partner)',
            availableSeats: 90,
            totalSeats: 300,
            rsvp: true,
            featured: false,
          },
        ]);
      } else {
        setEvents(data);
      }
    } catch (err) {
      console.warn(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleOpenRsvpModal = (eventItem) => {
    setSelectedEvent(eventItem);
    setRsvpModalOpen(true);
  };

  const handleConfirmRsvp = async () => {
    if (!selectedEvent) return;
    setRsvpLoading(true);
    try {
      await eventsApi.rsvp(selectedEvent.id, { rsvp: true });
      // Update UI state without full page refresh
      setEvents((prev) =>
        prev.map((e) =>
          e.id === selectedEvent.id
            ? { ...e, rsvp: true, availableSeats: Math.max(0, e.availableSeats - 1) }
            : e
        )
      );
      notifySuccess(`Successfully RSVPed to ${selectedEvent.title}!`, 'RSVP Confirmed');
      setRsvpModalOpen(false);
    } catch (err) {
      console.warn(err);
    } finally {
      setRsvpLoading(false);
    }
  };

  const handleCreateEventSubmit = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      const created = await eventsApi.createEvent(newEvent);
      setEvents((prev) => [created || { ...newEvent, id: Date.now(), availableSeats: newEvent.totalSeats, rsvp: false }, ...prev]);
      notifySuccess('New event created and published!', 'Event Published');
      setCreateModalOpen(false);
    } catch (err) {
      console.warn(err);
    } finally {
      setCreating(false);
    }
  };

  const featuredEvent = events.find((e) => e.featured) || events[0];

  const filteredEvents = events.filter((e) => {
    const matchesSearch =
      !searchTerm ||
      e.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      e.location.toLowerCase().includes(searchTerm.toLowerCase());

    if (activeFilter === 'registered') return matchesSearch && e.rsvp;
    return matchesSearch;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <Calendar className="w-6 h-6 text-amber-400" /> Alumni Events & Summits
          </h1>
          <p className="text-xs text-slate-400">Discover global conferences, workshops, and networking galas</p>
        </div>

        {isAdminOrLead && (
          <Button variant="primary" icon={Plus} onClick={() => setCreateModalOpen(true)}>
            Post New Event
          </Button>
        )}
      </div>

      {/* Featured Event Banner */}
      {featuredEvent && (
        <Card className="relative overflow-hidden border-amber-500/20 bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-900">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2">
              <Badge variant="amber" size="sm">
                <Sparkles className="w-3.5 h-3.5 mr-1" /> Featured Event
              </Badge>
              <h2 className="text-xl sm:text-2xl font-black text-white">{featuredEvent.title}</h2>
              <p className="text-xs text-slate-300 flex flex-wrap items-center gap-4">
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4 text-amber-400" /> {featuredEvent.date}</span>
                <span className="flex items-center gap-1.5"><MapPin className="w-4 h-4 text-rose-400" /> {featuredEvent.location}</span>
                <span className="flex items-center gap-1.5"><Users className="w-4 h-4 text-teal-400" /> {featuredEvent.availableSeats} Seats Left</span>
              </p>
            </div>

            <Button
              variant={featuredEvent.rsvp ? 'secondary' : 'primary'}
              size="lg"
              disabled={featuredEvent.rsvp}
              onClick={() => handleOpenRsvpModal(featuredEvent)}
            >
              {featuredEvent.rsvp ? 'RSVP Confirmed ✓' : 'Reserve My Seat'}
            </Button>
          </div>
        </Card>
      )}

      {/* Filter and Search Bar */}
      <Card className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={() => setActiveFilter('upcoming')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeFilter === 'upcoming' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-900 text-slate-400'
            }`}
          >
            All Upcoming ({events.length})
          </button>
          <button
            onClick={() => setActiveFilter('registered')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              activeFilter === 'registered' ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-900 text-slate-400'
            }`}
          >
            My Registered ({events.filter((e) => e.rsvp).length})
          </button>
        </div>

        <div className="w-full sm:w-72">
          <Input
            placeholder="Search events..."
            icon={Search}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </Card>

      {/* Grid of Event Cards */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton type="card" />
          <Skeleton type="card" />
          <Skeleton type="card" />
        </div>
      ) : filteredEvents.length === 0 ? (
        <EmptyState
          title="No Events Found"
          description="There are no events matching your criteria at this time."
          actionLabel="Clear Search"
          onAction={() => setSearchTerm('')}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredEvents.map((ev) => (
            <Card key={ev.id} hoverEffect className="flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-start justify-between mb-3">
                  <Badge variant="indigo" size="sm">{ev.category}</Badge>
                  {ev.rsvp && (
                    <Badge variant="emerald" size="sm">
                      <CheckCircle2 className="w-3 h-3 mr-1" /> Attending
                    </Badge>
                  )}
                </div>

                <h3 className="text-base font-bold text-white leading-snug">{ev.title}</h3>
                <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-2">
                  <Clock className="w-3.5 h-3.5 text-amber-400 shrink-0" /> {ev.date}
                </p>
                <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
                  <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" /> {ev.location}
                </p>
                {ev.speaker && (
                  <p className="text-xs text-indigo-300 font-medium mt-1">Keynote: {ev.speaker}</p>
                )}
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium">{ev.availableSeats} seats left</span>
                <Button
                  variant={ev.rsvp ? 'secondary' : 'primary'}
                  size="sm"
                  disabled={ev.rsvp}
                  onClick={() => handleOpenRsvpModal(ev)}
                >
                  {ev.rsvp ? 'RSVPed ✓' : 'RSVP Now'}
                </Button>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* RSVP Confirmation Modal */}
      <Modal
        isOpen={rsvpModalOpen}
        onClose={() => setRsvpModalOpen(false)}
        title="Confirm Event RSVP"
        subtitle={`Reserve your pass for ${selectedEvent?.title}`}
      >
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-2">
            <h4 className="text-sm font-bold text-white">{selectedEvent?.title}</h4>
            <p className="text-xs text-slate-400">Date: {selectedEvent?.date}</p>
            <p className="text-xs text-slate-400">Location: {selectedEvent?.location}</p>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setRsvpModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" isLoading={rsvpLoading} onClick={handleConfirmRsvp}>
              Confirm RSVP Registration
            </Button>
          </div>
        </div>
      </Modal>

      {/* Create Event Modal */}
      <Modal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
        title="Post New Alumni Event"
        subtitle="Publish a summit, workshop, or chapter gala for the community"
      >
        <form onSubmit={handleCreateEventSubmit} className="space-y-4">
          <Input
            label="Event Title"
            value={newEvent.title}
            onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            required
          />
          <Input
            label="Date & Time"
            placeholder="e.g. 2026-10-15 10:00 AM"
            value={newEvent.date}
            onChange={(e) => setNewEvent({ ...newEvent, date: e.target.value })}
            required
          />
          <Input
            label="Location / Link"
            value={newEvent.location}
            onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
            required
          />
          <Input
            label="Keynote Speaker"
            value={newEvent.speaker}
            onChange={(e) => setNewEvent({ ...newEvent, speaker: e.target.value })}
          />

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setCreateModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" isLoading={creating}>
              Publish Event
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
