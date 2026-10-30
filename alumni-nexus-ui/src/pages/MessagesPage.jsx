import React, { useState } from 'react';
import { MessageSquare, Send, Search, Phone, Video } from 'lucide-react';
import { Card } from '../components/common/Card';
import { Avatar } from '../components/common/Avatar';
import { Button } from '../components/common/Button';

export const MessagesPage = () => {
  const [activeThread, setActiveThread] = useState(1);
  const [inputText, setInputText] = useState('');

  const threads = [
    { id: 1, name: 'Dr. Evelyn Vance', role: 'VP AI Research', time: '10m ago', unread: 2, lastMsg: 'Looking forward to our mentorship session on Thursday!' },
    { id: 2, name: 'Marcus Sterling', role: 'Senior Partner', time: '2h ago', unread: 0, lastMsg: 'I have attached the job description for the architect role.' },
    { id: 3, name: 'Sarah Jenkins', role: 'London Chapter Lead', time: '1d ago', unread: 0, lastMsg: 'Thanks for RSVPing to the UK Alumni Summit!' },
  ];

  const [chatMessages, setChatMessages] = useState([
    { sender: 'Dr. Evelyn Vance', text: 'Hello! Thanks for reaching out through Alumni Nexus.', time: '10:14 AM' },
    { sender: 'You', text: 'Hi Dr. Vance! Excited to discuss cloud computing trends with you.', time: '10:15 AM' },
    { sender: 'Dr. Evelyn Vance', text: 'Looking forward to our mentorship session on Thursday!', time: '10:16 AM' },
  ]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    setChatMessages((prev) => [...prev, { sender: 'You', text: inputText, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }]);
    setInputText('');
  };

  const activeContact = threads.find((t) => t.id === activeThread) || threads[0];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
          <MessageSquare className="w-6 h-6 text-indigo-400" /> Alumni Messages & Chat
        </h1>
        <p className="text-xs text-slate-400">Direct peer messaging, mentorship communication, and chapter networking</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[600px] glass-card rounded-2xl overflow-hidden border border-slate-800">
        {/* Left Thread List */}
        <div className="border-r border-slate-800 flex flex-col bg-slate-900/60">
          <div className="p-4 border-b border-slate-800">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full px-3 py-2 text-xs bg-slate-950 border border-slate-800 rounded-xl text-slate-200 focus:outline-none"
            />
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-slate-800/60">
            {threads.map((t) => (
              <div
                key={t.id}
                onClick={() => setActiveThread(t.id)}
                className={`p-4 flex items-center gap-3 cursor-pointer transition ${
                  activeThread === t.id ? 'bg-indigo-600/15 border-l-4 border-indigo-500' : 'hover:bg-slate-800/40'
                }`}
              >
                <Avatar name={t.name} size="md" status="online" />
                <div className="flex-1 overflow-hidden">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-bold text-white truncate">{t.name}</h4>
                    <span className="text-[10px] text-slate-500">{t.time}</span>
                  </div>
                  <p className="text-[11px] text-indigo-300 truncate">{t.role}</p>
                  <p className="text-[11px] text-slate-400 truncate mt-0.5">{t.lastMsg}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Active Chat */}
        <div className="lg:col-span-2 flex flex-col bg-slate-950/60">
          {/* Chat Header */}
          <div className="p-4 border-b border-slate-800 flex items-center justify-between bg-slate-900/80">
            <div className="flex items-center gap-3">
              <Avatar name={activeContact.name} size="sm" status="online" />
              <div>
                <h3 className="text-sm font-bold text-white">{activeContact.name}</h3>
                <p className="text-[11px] text-indigo-400">{activeContact.role}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-900 border border-slate-800">
                <Phone className="w-4 h-4" />
              </button>
              <button className="p-2 text-slate-400 hover:text-white rounded-xl bg-slate-900 border border-slate-800">
                <Video className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Chat Messages */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            {chatMessages.map((msg, idx) => {
              const isMe = msg.sender === 'You';
              return (
                <div key={idx} className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`max-w-md p-3 rounded-2xl text-xs leading-relaxed ${
                      isMe
                        ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white rounded-br-none'
                        : 'bg-slate-900 text-slate-200 border border-slate-800 rounded-bl-none'
                    }`}
                  >
                    {msg.text}
                  </div>
                  <span className="text-[10px] text-slate-500 mt-1">{msg.time}</span>
                </div>
              );
            })}
          </div>

          {/* Input Bar */}
          <form onSubmit={handleSend} className="p-4 border-t border-slate-800 flex items-center gap-2 bg-slate-900/80">
            <input
              type="text"
              placeholder="Type your message..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-100 focus:outline-none focus:border-indigo-500"
            />
            <Button type="submit" variant="primary" size="md" icon={Send}>
              Send
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};
