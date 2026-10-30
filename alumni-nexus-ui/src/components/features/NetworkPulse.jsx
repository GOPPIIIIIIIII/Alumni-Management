import React, { useState } from 'react';
import { Users, Globe, Zap, Network } from 'lucide-react';
import { Card } from '../common/Card';
import { Badge } from '../common/Badge';

export const NetworkPulse = ({ totalConnections = 1248, activeNodes = 86 }) => {
  const [selectedHub, setSelectedHub] = useState('Tech');

  const hubs = [
    { name: 'Tech & Engineering', count: 480, growth: '+18%', color: 'from-indigo-500 to-purple-600' },
    { name: 'Finance & Consulting', count: 310, growth: '+12%', color: 'from-teal-500 to-emerald-600' },
    { name: 'Healthcare & Biotech', count: 210, growth: '+15%', color: 'from-rose-500 to-pink-600' },
    { name: 'Arts & Media', count: 248, growth: '+9%', color: 'from-amber-500 to-orange-600' },
  ];

  return (
    <Card className="relative overflow-hidden border-indigo-500/20">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <Badge variant="indigo" size="sm">
              <Network className="w-3.5 h-3.5 mr-1" /> Living Ecosystem
            </Badge>
          </div>
          <h3 className="text-xl font-bold text-white tracking-tight">Alumni Network Pulse</h3>
          <p className="text-xs text-slate-400">Real-time ecosystem connectivity across global chapters</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right">
            <p className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-teal-300">
              {totalConnections.toLocaleString()}
            </p>
            <p className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">Active Connections</p>
          </div>
        </div>
      </div>

      {/* Visual Hub Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {hubs.map((hub) => (
          <div
            key={hub.name}
            onClick={() => setSelectedHub(hub.name)}
            className={`p-4 rounded-xl cursor-pointer transition-all duration-200 border ${
              selectedHub === hub.name
                ? 'bg-slate-800/90 border-indigo-500 shadow-glow'
                : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${hub.color} flex items-center justify-center text-white text-xs font-bold`}>
                {hub.name[0]}
              </div>
              <span className="text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full">
                {hub.growth}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-medium truncate">{hub.name}</p>
            <p className="text-lg font-bold text-white mt-0.5">{hub.count} members</p>
          </div>
        ))}
      </div>

      {/* Simulated Ecosystem Mesh */}
      <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
            <Zap className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <p className="text-xs font-bold text-white">Live Network Pulse</p>
            <p className="text-[11px] text-slate-400">
              <span className="text-indigo-400 font-semibold">{activeNodes} mentor sessions</span> active now in {selectedHub} hub
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center space-x-1">
          {[...Array(8)].map((_, i) => (
            <span
              key={i}
              className="w-1.5 rounded-full bg-indigo-500 animate-pulse"
              style={{
                height: `${Math.floor(Math.random() * 20) + 10}px`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>
    </Card>
  );
};
