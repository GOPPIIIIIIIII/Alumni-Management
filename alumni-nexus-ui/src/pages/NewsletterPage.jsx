import React, { useState } from 'react';
import { Newspaper, Mail, Send, Award, ArrowRight } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Input } from '../components/common/Input';
import { notifySuccess } from '../api/axiosInstance';

export const NewsletterPage = () => {
  const [email, setEmail] = useState('');

  const articles = [
    { title: 'AI & Quantum Computing: The Next Alumni Frontier', date: 'Q3 2026 Edition', category: 'Tech Trends', readTime: '5 min read' },
    { title: 'Over $500,000 Raised for Student STEM Endowments', date: 'August 2026', category: 'Giving Impact', readTime: '4 min read' },
    { title: 'Global Leadership Summit Highlights & Key Takeaways', date: 'July 2026', category: 'Events', readTime: '6 min read' },
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    notifySuccess(`Subscribed ${email} to Alumni Nexus Quarterly Digest!`);
    setEmail('');
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <Newspaper className="w-6 h-6 text-indigo-400" /> Alumni Newsletter & Publications
        </h1>
        <p className="text-xs text-slate-400">Quarterly digests, institutional achievements, and spotlight stories</p>
      </div>

      {/* Subscription Card */}
      <Card className="border-indigo-500/20 bg-gradient-to-r from-slate-900 via-indigo-950/30 to-slate-900 p-8 text-center space-y-4">
        <h2 className="text-xl font-extrabold text-white">Subscribe to Quarterly Alumni Nexus Digest</h2>
        <p className="text-xs text-slate-300 max-w-md mx-auto">
          Get curated updates on career advancement, global chapter meetups, and campus endowments delivered to your inbox.
        </p>

        <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex items-center gap-2">
          <Input
            placeholder="Enter your email..."
            type="email"
            icon={Mail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit" variant="primary" icon={Send}>
            Subscribe
          </Button>
        </form>
      </Card>

      {/* Articles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {articles.map((art, idx) => (
          <Card key={idx} hoverEffect className="flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <Badge variant="indigo">{art.category}</Badge>
                <span className="text-[11px] text-slate-400">{art.readTime}</span>
              </div>
              <h3 className="text-base font-bold text-white leading-snug">{art.title}</h3>
              <p className="text-xs text-slate-400 mt-2">Published {art.date}</p>
            </div>

            <button className="text-xs font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1">
              Read Full Article <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
};
