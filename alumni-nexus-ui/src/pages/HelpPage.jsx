import React, { useState } from 'react';
import { HelpCircle, Mail, MessageSquare, Send, ChevronDown, ChevronUp } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Input } from '../components/common/Input';
import { notifySuccess } from '../api/axiosInstance';

export const HelpPage = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const faqs = [
    {
      q: 'How do I request a mentorship session with an alumnus?',
      a: 'Navigate to the Mentorship Center, browse recommended mentors, click "Book Session", select your area of mentorship, and submit your request.',
    },
    {
      q: 'How are alumni verification badges granted?',
      a: 'Verification is managed by the Alumni Relations Office based on institutional graduation records. Verified profiles display a green badge.',
    },
    {
      q: 'Are donation transactions secure?',
      a: 'Yes! All financial transactions are processed through authenticated Spring Boot API REST endpoints connected to secure payment gateways.',
    },
  ];

  const handleSupportSubmit = (e) => {
    e.preventDefault();
    notifySuccess('Support ticket submitted to Alumni Relations Help Desk!', 'Ticket Logged');
    setSubject('');
    setMessage('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-indigo-400" /> Help & Support Desk
        </h1>
        <p className="text-xs text-slate-400">Frequently asked questions, user guides, and direct support tickets</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* FAQs */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <h3 className="text-base font-bold text-white mb-4">Frequently Asked Questions</h3>

            <div className="space-y-3">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;
                return (
                  <div key={idx} className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-2">
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full flex items-center justify-between text-left font-bold text-xs text-white"
                    >
                      <span>{faq.q}</span>
                      {isOpen ? <ChevronUp className="w-4 h-4 text-indigo-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
                    </button>
                    {isOpen && <p className="text-xs text-slate-400 pt-2 border-t border-slate-800/80 leading-relaxed">{faq.a}</p>}
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Support Ticket Form */}
        <Card>
          <h3 className="text-base font-bold text-white mb-4">Submit Support Ticket</h3>

          <form onSubmit={handleSupportSubmit} className="space-y-4">
            <Input
              label="Subject"
              placeholder="e.g. Profile Verification Query"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
            />
            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1.5">Description</label>
              <textarea
                rows={4}
                className="w-full rounded-xl bg-slate-900 border border-slate-800 p-3 text-xs text-slate-200 focus:outline-none focus:border-indigo-500"
                placeholder="Explain your inquiry in detail..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <Button type="submit" variant="primary" icon={Send} className="w-full">
              Submit Ticket
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};
