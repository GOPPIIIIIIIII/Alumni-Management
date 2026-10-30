import React, { useState, useEffect } from 'react';
import {
  Heart,
  Target,
  DollarSign,
  Award,
  ShieldCheck,
  CheckCircle2,
  Receipt,
  Sparkles,
  TrendingUp,
  CreditCard
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { donationApi } from '../api/donationApi';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Input } from '../components/common/Input';
import { Skeleton } from '../components/common/Skeleton';
import { EmptyState } from '../components/common/EmptyState';
import { Modal } from '../components/common/Modal';
import { notifySuccess } from '../api/axiosInstance';

export const DonationsPage = () => {
  const { user } = useAuth();

  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  // Payment Modal state
  const [donateModalOpen, setDonateModalOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [amount, setAmount] = useState(100);
  const [customAmount, setCustomAmount] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [donating, setDonating] = useState(false);

  // Receipt Modal state
  const [receiptModalOpen, setReceiptModalOpen] = useState(false);
  const [activeReceipt, setActiveReceipt] = useState(null);

  const fetchCampaigns = async () => {
    setLoading(true);
    try {
      const data = await donationApi.getCampaigns();
      if (!data || data.length === 0) {
        setCampaigns([
          {
            id: 1,
            title: 'Annual STEM Scholarship & Research Endowment',
            targetAmount: 50000.0,
            raisedAmount: 32500.0,
            endDate: '2026-12-31',
            status: 'ACTIVE',
            donorsCount: 142,
          },
          {
            id: 2,
            title: 'Campus Student Innovation Hub & AI Lab',
            targetAmount: 100000.0,
            raisedAmount: 68000.0,
            endDate: '2026-11-30',
            status: 'ACTIVE',
            donorsCount: 89,
          },
          {
            id: 3,
            title: 'Emergency Student Hardship Assistance Fund',
            targetAmount: 25000.0,
            raisedAmount: 18400.0,
            endDate: '2026-10-15',
            status: 'ACTIVE',
            donorsCount: 210,
          },
        ]);
      } else {
        setCampaigns(data);
      }
    } catch (err) {
      console.warn(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  const handleOpenDonateModal = (campaign) => {
    setSelectedCampaign(campaign);
    setDonateModalOpen(true);
  };

  const handleDonateSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCampaign) return;

    const finalAmount = customAmount ? parseFloat(customAmount) : amount;
    if (isNaN(finalAmount) || finalAmount <= 0) return;

    setDonating(true);
    try {
      const donationRes = await donationApi.donate(
        selectedCampaign.id,
        user?.id || 1,
        finalAmount,
        isAnonymous
      );

      // Create synthetic receipt representation if mock
      const receipt = donationRes || {
        id: Date.now(),
        transactionId: `NEX-${Math.floor(100000 + Math.random() * 900000)}`,
        amount: finalAmount,
        donationDate: new Date().toISOString(),
        isAnonymous,
        campaignTitle: selectedCampaign.title,
      };

      setActiveReceipt(receipt);
      setDonateModalOpen(false);
      setReceiptModalOpen(true);

      // Update campaigns state
      setCampaigns((prev) =>
        prev.map((c) =>
          c.id === selectedCampaign.id
            ? { ...c, raisedAmount: parseFloat(c.raisedAmount) + finalAmount }
            : c
        )
      );

      notifySuccess(`Thank you for your donation of $${finalAmount}!`, 'Contribution Received');
    } catch (err) {
      console.warn(err);
    } finally {
      setDonating(false);
    }
  };

  const primaryCampaign = campaigns[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <Heart className="w-6 h-6 text-rose-400" /> Endowment & Giving Campaigns
        </h1>
        <p className="text-xs text-slate-400">Support future generations, campus facilities, and research endowments</p>
      </div>

      {/* Featured Campaign Progress Hero */}
      {primaryCampaign && (
        <Card className="relative overflow-hidden border-rose-500/20 bg-gradient-to-r from-slate-900 via-rose-950/20 to-slate-900">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div className="space-y-3 flex-1">
              <Badge variant="rose" size="sm">
                <Sparkles className="w-3.5 h-3.5 mr-1" /> Featured Campaign 2026
              </Badge>
              <h2 className="text-xl sm:text-2xl font-black text-white">{primaryCampaign.title}</h2>

              {/* Progress Bar */}
              <div className="space-y-1.5 max-w-xl">
                <div className="flex justify-between text-xs font-bold">
                  <span className="text-rose-300">${primaryCampaign.raisedAmount?.toLocaleString()} Raised</span>
                  <span className="text-slate-400">Target: ${primaryCampaign.targetAmount?.toLocaleString()}</span>
                </div>
                <div className="h-3 w-full bg-slate-800 rounded-full overflow-hidden p-0.5">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-rose-500 to-amber-400 transition-all duration-500"
                    style={{
                      width: `${Math.min(
                        100,
                        Math.round((primaryCampaign.raisedAmount / primaryCampaign.targetAmount) * 100)
                      )}%`,
                    }}
                  />
                </div>
                <p className="text-[11px] text-slate-400">
                  <span className="text-emerald-400 font-bold">
                    {Math.round((primaryCampaign.raisedAmount / primaryCampaign.targetAmount) * 100)}%
                  </span>{' '}
                  achieved by {primaryCampaign.donorsCount || 142} alumni donors
                </p>
              </div>
            </div>

            <Button
              variant="primary"
              size="lg"
              icon={Heart}
              className="bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-500 hover:to-pink-500 shadow-rose-500/25"
              onClick={() => handleOpenDonateModal(primaryCampaign)}
            >
              Donate to Campaign
            </Button>
          </div>
        </Card>
      )}

      {/* Campaign Cards Grid */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton type="card" />
          <Skeleton type="card" />
          <Skeleton type="card" />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {campaigns.map((camp) => {
            const pct = Math.min(100, Math.round((camp.raisedAmount / camp.targetAmount) * 100));
            return (
              <Card key={camp.id} hoverEffect className="flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <Badge variant="rose" size="sm">Active Campaign</Badge>
                    <span className="text-xs text-slate-400 font-medium">Ends {camp.endDate}</span>
                  </div>

                  <h3 className="text-base font-bold text-white leading-snug">{camp.title}</h3>

                  <div className="mt-4 space-y-1.5">
                    <div className="flex justify-between text-xs font-bold">
                      <span className="text-rose-400">${camp.raisedAmount?.toLocaleString()}</span>
                      <span className="text-slate-500">Goal: ${camp.targetAmount?.toLocaleString()}</span>
                    </div>
                    <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-rose-500 transition-all duration-300" style={{ width: `${pct}%` }} />
                    </div>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                  <span className="text-xs font-bold text-emerald-400">{pct}% Funded</span>
                  <Button variant="primary" size="sm" icon={Heart} onClick={() => handleOpenDonateModal(camp)}>
                    Donate Now
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}

      {/* Donation Modal */}
      <Modal
        isOpen={donateModalOpen}
        onClose={() => setDonateModalOpen(false)}
        title={`Donate to ${selectedCampaign?.title}`}
        subtitle="Select contribution amount or enter a custom contribution"
      >
        <form onSubmit={handleDonateSubmit} className="space-y-4">
          <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <span className="text-xs text-slate-400">Payment Gateway Status:</span>
            <Badge variant="amber" size="sm">Controlled Mock Gateway Active</Badge>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-300 mb-2">Preset Giving Amounts ($)</label>
            <div className="grid grid-cols-4 gap-2">
              {[25, 50, 100, 250].map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => {
                    setAmount(preset);
                    setCustomAmount('');
                  }}
                  className={`py-2.5 rounded-xl border text-xs font-bold transition ${
                    amount === preset && !customAmount
                      ? 'bg-rose-600 text-white border-rose-500 shadow-md'
                      : 'bg-slate-900 text-slate-300 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  ${preset}
                </button>
              ))}
            </div>
          </div>

          <Input
            label="Or Custom Amount ($)"
            placeholder="e.g. 500"
            type="number"
            value={customAmount}
            onChange={(e) => setCustomAmount(e.target.value)}
          />

          <label className="flex items-center gap-2 text-xs text-slate-300 cursor-pointer pt-1">
            <input
              type="checkbox"
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
              className="rounded bg-slate-900 border-slate-700 text-rose-600 focus:ring-rose-500"
            />
            <span>Make this donation anonymous on public donor boards</span>
          </label>

          <div className="flex justify-end gap-2 pt-2">
            <Button variant="secondary" onClick={() => setDonateModalOpen(false)}>
              Cancel
            </Button>
            <Button
              type="submit"
              variant="primary"
              icon={CreditCard}
              isLoading={donating}
              className="bg-gradient-to-r from-rose-600 to-pink-600"
            >
              Complete Contribution
            </Button>
          </div>
        </form>
      </Modal>

      {/* Receipt Modal */}
      <Modal
        isOpen={receiptModalOpen}
        onClose={() => setReceiptModalOpen(false)}
        title="Donation Receipt"
        subtitle="Official confirmation of contribution"
      >
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs space-y-2">
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Transaction ID:</span>
              <span className="font-mono text-indigo-400 font-bold">{activeReceipt?.transactionId || 'NEX-849201'}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Donor Name:</span>
              <span className="font-bold text-white">{activeReceipt?.isAnonymous ? 'Anonymous Donor' : user?.name || 'Alumnus'}</span>
            </div>
            <div className="flex justify-between border-b border-slate-800 pb-2">
              <span className="text-slate-400">Amount Paid:</span>
              <span className="font-bold text-emerald-400 text-sm">${activeReceipt?.amount} USD</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Date:</span>
              <span className="text-slate-300">{new Date(activeReceipt?.donationDate || Date.now()).toLocaleDateString()}</span>
            </div>
          </div>

          <div className="flex justify-end">
            <Button variant="primary" icon={Receipt} onClick={() => setReceiptModalOpen(false)}>
              Close Receipt
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
