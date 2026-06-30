'use client';

import React, { useState, useEffect } from 'react';
import { 
  RefreshCw, 
  Inbox, 
  Calendar, 
  Phone, 
  Mail, 
  FileText, 
  ArrowUpDown, 
  Clock,
  Briefcase,
  TrendingUp,
  ChevronDown,
  Building,
  DollarSign,
  LogOut
} from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ContactSubmission {
  id: string;
  type: string;
  name: string;
  email: string;
  phone: string;
  company: string | null;
  message: string;
  projectName: string | null;
  bidAmount: string | null;
  blueprintFileName: string | null;
  transactionId: string;
  status: string;
  createdAt: string;
}

interface EstimateInquiry {
  id: string;
  projectType: string;
  budget: string;
  timeline: string;
  name: string;
  email: string;
  phone: string;
  details: string | null;
  transactionId: string;
  status: string;
  createdAt: string;
}

const statusColors: Record<string, { bg: string; text: string; border: string }> = {
  new: { 
    bg: 'bg-gold-500/10', 
    text: 'text-gold-400', 
    border: 'border-gold-500/20' 
  },
  contacted: { 
    bg: 'bg-blue-500/10', 
    text: 'text-blue-400', 
    border: 'border-blue-500/20' 
  },
  quoted: { 
    bg: 'bg-emerald-500/10', 
    text: 'text-emerald-400', 
    border: 'border-emerald-500/20' 
  },
  closed: { 
    bg: 'bg-obsidian-600/20', 
    text: 'text-obsidian-400', 
    border: 'border-white/5' 
  },
};

export default function HQPortalDashboard() {
  const router = useRouter();

  // Data state — no auth state needed; middleware + cookie handles access control
  const [contacts, setContacts] = useState<ContactSubmission[]>([]);
  const [estimates, setEstimates] = useState<EstimateInquiry[]>([]);
  const [counts, setCounts] = useState({ total: 0, new: 0, contacts: 0, estimates: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');

  // UI State
  const [activeTab, setActiveTab] = useState<'contacts' | 'estimates'>('contacts');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  // Filter & Search State
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'name' | 'status'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Auto-fetch on mount — browser sends hq_session cookie automatically
  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setIsLoading(true);
    setLoadError('');
    try {
      const [contactsRes, estimatesRes] = await Promise.all([
        fetch('/api/contact'),
        fetch('/api/estimate')
      ]);

      if (contactsRes.status === 401 || estimatesRes.status === 401) {
        setLoadError('Session expired or unauthorized. Please re-authenticate.');
        return;
      }

      if (!contactsRes.ok || !estimatesRes.ok) {
        setLoadError('Failed to load data. Please refresh.');
        return;
      }

      const contactsData = await contactsRes.json();
      const estimatesData = await estimatesRes.json();

      const contactList: ContactSubmission[] = contactsData.submissions || [];
      const estimateList: EstimateInquiry[] = estimatesData.inquiries || [];

      setContacts(contactList);
      setEstimates(estimateList);

      const newContacts = contactList.filter(c => c.status === 'new').length;
      const newEstimates = estimateList.filter(e => e.status === 'new').length;

      setCounts({
        total: contactList.length + estimateList.length,
        new: newContacts + newEstimates,
        contacts: contactList.length,
        estimates: estimateList.length,
      });
    } catch {
      setLoadError('Network error. Please refresh.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    // Navigate to middleware-handled logout path which clears the hq_session cookie
    router.push('/hq-portal-tx98z/logout');
  };

  const handleStatusCycle = async (id: string, currentStatus: string, type: 'contact' | 'estimate') => {
    const statuses = ['new', 'contacted', 'quoted', 'closed'];
    const nextIdx = (statuses.indexOf(currentStatus) + 1) % statuses.length;
    const nextStatus = statuses[nextIdx];

    try {
      const endpoint = type === 'contact' ? `/api/contact/${id}` : `/api/estimate/${id}`;
      // Browser sends hq_session cookie automatically (no manual headers needed)
      const res = await fetch(endpoint, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextStatus })
      });

      if (res.ok) {
        if (type === 'contact') {
          setContacts(prev => prev.map(c => c.id === id ? { ...c, status: nextStatus } : c));
        } else {
          setEstimates(prev => prev.map(e => e.id === id ? { ...e, status: nextStatus } : e));
        }
        // Re-sync counts
        setTimeout(fetchAllData, 100);
      }
    } catch {
      console.error('Failed to update status');
    }
  };

  const markAsContacted = async (id: string, currentStatus: string, type: 'contact' | 'estimate') => {
    if (currentStatus !== 'new') return;
    try {
      const endpoint = type === 'contact' ? `/api/contact/${id}` : `/api/estimate/${id}`;
      const res = await fetch(endpoint, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'contacted' })
      });
      if (res.ok) {
        if (type === 'contact') {
          setContacts(prev => prev.map(c => c.id === id ? { ...c, status: 'contacted' } : c));
        } else {
          setEstimates(prev => prev.map(e => e.id === id ? { ...e, status: 'contacted' } : e));
        }
        setTimeout(fetchAllData, 100);
      }
    } catch {
      console.error('Failed to auto-update status to contacted');
    }
  };

  const toggleSort = (field: 'date' | 'name' | 'status') => {
    if (sortBy === field) {
      setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortOrder('desc');
    }
  };

  const sortItems = <T extends { name: string; status: string; createdAt: string }>(items: T[]) =>
    [...items].sort((a, b) => {
      let cmp = 0;
      if (sortBy === 'date') cmp = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      else if (sortBy === 'name') cmp = a.name.localeCompare(b.name);
      else if (sortBy === 'status') cmp = a.status.localeCompare(b.status);
      return sortOrder === 'asc' ? cmp : -cmp;
    });

  const filterContacts = () =>
    sortItems(contacts.filter(item => {
      const q = searchTerm.toLowerCase();
      const matchSearch = item.name.toLowerCase().includes(q) || item.email.toLowerCase().includes(q) ||
        item.transactionId.toLowerCase().includes(q) || item.message.toLowerCase().includes(q);
      const matchStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchType = typeFilter === 'all' || item.type === typeFilter;
      return matchSearch && matchStatus && matchType;
    }));

  const filterEstimates = () =>
    sortItems(estimates.filter(item => {
      const q = searchTerm.toLowerCase();
      const matchSearch = item.name.toLowerCase().includes(q) || item.email.toLowerCase().includes(q) ||
        item.transactionId.toLowerCase().includes(q) || (item.details || '').toLowerCase().includes(q);
      const matchStatus = statusFilter === 'all' || item.status === statusFilter;
      const matchType = typeFilter === 'all' || item.projectType === typeFilter;
      return matchSearch && matchStatus && matchType;
    }));

  const filteredContacts = filterContacts();
  const filteredEstimates = filterEstimates();

  // Loading / error states
  if (isLoading) {
    return (
      <div data-admin-page="true" className="min-h-screen bg-obsidian-950 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-obsidian-400">
          <RefreshCw className="h-8 w-8 animate-spin text-gold-500" />
          <span className="text-xs font-display uppercase tracking-widest">Loading portal data…</span>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div data-admin-page="true" className="min-h-screen bg-obsidian-950 flex items-center justify-center p-8">
        <div className="glass-panel-dark p-8 rounded-sm border border-red-500/10 max-w-sm text-center space-y-4">
          <p className="text-red-400 text-sm">{loadError}</p>
          <button
            onClick={() => router.push('/hq-portal-tx98z/logout')}
            className="text-xs font-display uppercase tracking-wider text-gold-400 hover:text-gold-300 transition-colors cursor-pointer"
          >
            Re-authenticate
          </button>
        </div>
      </div>
    );
  }

  return (
    <div
      data-admin-page="true"
      className="min-h-screen bg-obsidian-950 text-white blueprint-grid-dark p-6 md:p-10 flex flex-col gap-8 font-sans selection:bg-gold-500 selection:text-obsidian-950"
    >
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 pb-6 border-b border-white/5">
        <div>
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-display font-semibold uppercase tracking-wider text-gold-500 px-2 py-0.5 rounded-full bg-gold-950/50 border border-gold-500/20">
              Secure Terminal
            </span>
            <span className="text-xs text-obsidian-500">HQ Portal — Authenticated Session</span>
          </div>
          <h1 className="font-display font-bold text-2xl uppercase tracking-widest mt-2">
            Leads &amp; Bidding <span className="text-gold-500 gold-glow">Dashboard</span>
          </h1>
          <p className="text-xs text-obsidian-400 mt-1">
            Realtime client inquiries, subcontractor bids, and project intake requests. Click status badges to cycle states.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchAllData}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2.5 rounded-sm bg-white/5 border border-white/10 hover:bg-white/10 hover:border-gold-500/20 text-xs font-display font-semibold uppercase tracking-wider text-obsidian-300 hover:text-white transition-all cursor-pointer"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isLoading ? 'animate-spin text-gold-500' : ''}`} />
            Sync Database
          </button>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2.5 rounded-sm bg-red-950/20 border border-red-500/10 hover:bg-red-500/10 hover:border-red-500/30 text-xs font-display font-semibold uppercase tracking-wider text-red-400 transition-all cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {[
          { label: 'Total Actions', value: counts.total, icon: Inbox, color: 'text-gold-500', sub: 'Combined entries stored', highlight: false },
          { label: 'New Action Items', value: counts.new, icon: Clock, color: 'text-gold-400', sub: 'Awaiting response triage', highlight: true },
          { label: 'Tender Bids / Contacts', value: counts.contacts, icon: Briefcase, color: 'text-blue-400', sub: 'Client inquiries + sub bids', highlight: false },
          { label: 'Intake Estimates', value: counts.estimates, icon: TrendingUp, color: 'text-emerald-400', sub: 'Cost widget intakes', highlight: false },
        ].map(({ label, value, icon: Icon, color, sub, highlight }) => (
          <div key={label} className={`glass-panel-dark p-6 rounded-sm border border-white/5 flex flex-col justify-between hover:border-gold-500/20 transition-all group duration-300 ${highlight ? 'bg-gold-950/5' : ''}`}>
            <div className="flex items-center justify-between text-obsidian-400">
              <span className="text-[10px] font-display font-semibold uppercase tracking-wider">{label}</span>
              <Icon className={`h-4 w-4 ${color} group-hover:scale-110 transition-transform ${highlight ? 'animate-pulse' : ''}`} />
            </div>
            <div className="mt-4">
              <span className={`block font-display font-bold text-3xl tracking-tight ${highlight ? 'text-gold-400' : 'text-white'}`}>{value}</span>
              <span className="text-[10px] text-obsidian-500 mt-1 block">{sub}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Main Table Panel */}
      <div className="glass-panel-dark rounded-sm border border-white/5 overflow-hidden flex flex-col">
        {/* Tabs & Filters */}
        <div className="border-b border-white/5 p-6 flex flex-col xl:flex-row xl:items-center justify-between gap-6 bg-obsidian-950/40">
          <div className="flex bg-obsidian-900/60 p-1 rounded-sm border border-white/5 self-start">
            {(['contacts', 'estimates'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => { setActiveTab(tab); setTypeFilter('all'); setSearchTerm(''); setExpandedId(null); }}
                className={`px-5 py-2.5 rounded-sm text-xs font-display font-bold uppercase tracking-wider transition-all cursor-pointer ${activeTab === tab ? 'bg-gold-500 text-obsidian-950 shadow-md shadow-gold-500/5' : 'text-obsidian-400 hover:text-white'}`}
              >
                {tab === 'contacts' ? `Contact Queue (${contacts.length})` : `Estimate Intakes (${estimates.length})`}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 flex-grow max-w-4xl xl:ml-6">
            <div className="relative sm:col-span-2">
              <input
                type="text"
                placeholder="Search by name, email, txn ID, details..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full glass-input-dark px-4 py-2.5 rounded-sm text-xs border border-white/10 text-white placeholder-obsidian-500 focus:outline-none focus:border-gold-500"
              />
            </div>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-[9px] uppercase font-display font-semibold tracking-wider text-obsidian-500 pointer-events-none">Status</span>
              <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)} className="w-full glass-input-dark pl-14 pr-4 py-2.5 rounded-sm text-xs border border-white/10 text-white focus:outline-none focus:border-gold-500 cursor-pointer appearance-none">
                <option value="all">All States</option>
                <option value="new">New</option>
                <option value="contacted">Contacted</option>
                <option value="quoted">Quoted</option>
                <option value="closed">Closed</option>
              </select>
              <ChevronDown className="h-3 w-3 absolute right-3 text-obsidian-400 pointer-events-none" />
            </div>
            <div className="relative flex items-center">
              <span className="absolute left-3 text-[9px] uppercase font-display font-semibold tracking-wider text-obsidian-500 pointer-events-none">Lane</span>
              <select value={typeFilter} onChange={e => setTypeFilter(e.target.value)} className="w-full glass-input-dark pl-12 pr-4 py-2.5 rounded-sm text-xs border border-white/10 text-white focus:outline-none focus:border-gold-500 cursor-pointer appearance-none">
                {activeTab === 'contacts' ? (
                  <><option value="all">All Lanes</option><option value="client">Client Inquiries</option><option value="subcontractor">Subcontractor Bids</option></>
                ) : (
                  <><option value="all">All Types</option><option value="residential">Residential</option><option value="commercial">Commercial</option><option value="infrastructure">Infrastructure</option></>
                )}
              </select>
              <ChevronDown className="h-3 w-3 absolute right-3 text-obsidian-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Data Tables */}
        <div className="overflow-x-auto">
          {activeTab === 'contacts' ? (
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-white/5 bg-obsidian-900/30 text-[10px] font-display font-bold uppercase tracking-wider text-obsidian-400">
                  <th className="px-6 py-4"><button onClick={() => toggleSort('name')} className="flex items-center gap-1.5 hover:text-white cursor-pointer">Representative / Company <ArrowUpDown className="h-3 w-3" /></button></th>
                  <th className="px-6 py-4">Contact Info</th>
                  <th className="px-6 py-4">Lane</th>
                  <th className="px-6 py-4">Bid / Project Specs</th>
                  <th className="px-6 py-4">Transaction ID</th>
                  <th className="px-6 py-4"><button onClick={() => toggleSort('date')} className="flex items-center gap-1.5 hover:text-white cursor-pointer">Submitted Date <ArrowUpDown className="h-3 w-3" /></button></th>
                  <th className="px-6 py-4 text-center"><button onClick={() => toggleSort('status')} className="flex items-center gap-1.5 hover:text-white cursor-pointer mx-auto">State <ArrowUpDown className="h-3 w-3" /></button></th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {filteredContacts.length === 0 ? (
                  <tr><td colSpan={8} className="px-6 py-12 text-center text-obsidian-500 font-display text-xs uppercase tracking-widest">No matching contact submissions found.</td></tr>
                ) : filteredContacts.map(item => {
                  const isExpanded = expandedId === item.id;
                  const color = statusColors[item.status] || statusColors.new;
                  return (
                    <React.Fragment key={item.id}>
                      <tr className={`hover:bg-white/2 cursor-pointer transition-colors ${isExpanded ? 'bg-white/2' : ''}`}>
                        <td className="px-6 py-4" onClick={() => setExpandedId(isExpanded ? null : item.id)}>
                          <div className="font-semibold text-white">{item.name}</div>
                          <div className="text-xs text-obsidian-400 mt-0.5">{item.company || 'Private Party'}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <a href={`mailto:${item.email}`} onClick={e => { e.stopPropagation(); markAsContacted(item.id, item.status, 'contact'); }} className="flex items-center gap-1.5 text-xs text-obsidian-300 hover:text-gold-400 transition-colors w-fit">
                              <Mail className="h-3.5 w-3.5 text-gold-500/70" /><span>{item.email}</span>
                            </a>
                            <a href={`tel:${item.phone}`} onClick={e => { e.stopPropagation(); markAsContacted(item.id, item.status, 'contact'); }} className="flex items-center gap-1.5 text-xs text-obsidian-400 hover:text-gold-400 transition-colors mt-1 w-fit">
                              <Phone className="h-3.5 w-3.5 text-gold-500/70" /><span>{item.phone}</span>
                            </a>
                          </div>
                        </td>
                        <td className="px-6 py-4" onClick={() => setExpandedId(isExpanded ? null : item.id)}>
                          <span className={`text-[10px] font-display font-semibold uppercase tracking-wider px-2 py-0.5 rounded border ${item.type === 'subcontractor' ? 'bg-gold-500/5 text-gold-400 border-gold-500/10' : 'bg-white/5 text-obsidian-300 border-white/5'}`}>{item.type}</span>
                        </td>
                        <td className="px-6 py-4" onClick={() => setExpandedId(isExpanded ? null : item.id)}>
                          {item.type === 'subcontractor' ? (
                            <div className="text-xs"><div className="font-semibold text-gold-400">{item.bidAmount}</div><div className="text-[10px] text-obsidian-400 mt-0.5 truncate max-w-[150px]">{item.projectName}</div></div>
                          ) : <span className="text-xs text-obsidian-400">Regular Client Spec</span>}
                        </td>
                        <td className="px-6 py-4 font-mono text-xs text-obsidian-300" onClick={() => setExpandedId(isExpanded ? null : item.id)}>{item.transactionId}</td>
                        <td className="px-6 py-4" onClick={() => setExpandedId(isExpanded ? null : item.id)}>
                          <div className="flex items-center gap-1.5 text-xs text-obsidian-300"><Calendar className="h-3.5 w-3.5 text-obsidian-500" /><span>{new Date(item.createdAt).toLocaleDateString()}</span></div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button onClick={e => { e.stopPropagation(); handleStatusCycle(item.id, item.status, 'contact'); }} className={`px-3 py-1 rounded-full text-[10px] font-display font-semibold uppercase tracking-wider border cursor-pointer select-none transition-all hover:scale-105 active:scale-95 ${color.bg} ${color.text} ${color.border}`} title="Click to cycle status">{item.status}</button>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => setExpandedId(isExpanded ? null : item.id)} className="text-xs font-display font-bold uppercase tracking-wider text-gold-500 hover:text-gold-400 transition-colors cursor-pointer">{isExpanded ? 'Collapse' : 'Inspect'}</button>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr>
                          <td colSpan={8} className="bg-obsidian-950/70 p-6 border-b border-white/5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed text-obsidian-300">
                              <div className="space-y-4">
                                <h4 className="font-display font-bold uppercase tracking-wider text-white border-b border-white/5 pb-2 text-[10px]">Submission Inquiry Details</h4>
                                <div>
                                  <span className="text-obsidian-500 block mb-1">Attached Message Details</span>
                                  <div className="bg-obsidian-900/60 p-4 rounded-sm border border-white/5 text-obsidian-300 whitespace-pre-wrap leading-relaxed">{item.message}</div>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <h4 className="font-display font-bold uppercase tracking-wider text-white border-b border-white/5 pb-2 text-[10px]">Internal Specifications & Meta Data</h4>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="bg-white/2 p-3 rounded-sm border border-white/5"><span className="text-obsidian-500 block text-[9px] uppercase tracking-wider">Transaction Status</span><span className="font-semibold text-white block mt-1 uppercase">{item.status}</span></div>
                                  <div className="bg-white/2 p-3 rounded-sm border border-white/5"><span className="text-obsidian-500 block text-[9px] uppercase tracking-wider">Submission Lane</span><span className="font-semibold text-white block mt-1 uppercase">{item.type}</span></div>
                                  <div className="bg-white/2 p-3 rounded-sm border border-white/5"><span className="text-obsidian-500 block text-[9px] uppercase tracking-wider">Record DB Key</span><span className="font-mono text-obsidian-400 block mt-1 truncate">{item.id}</span></div>
                                  <div className="bg-white/2 p-3 rounded-sm border border-white/5"><span className="text-obsidian-500 block text-[9px] uppercase tracking-wider">System Timestamp</span><span className="text-obsidian-400 block mt-1">{new Date(item.createdAt).toLocaleString()}</span></div>
                                  {item.type === 'subcontractor' && (
                                    <div className="bg-gold-500/2 p-3 rounded-sm border border-gold-500/10 col-span-2 flex items-center justify-between">
                                      <div><span className="text-gold-500/60 block text-[9px] uppercase tracking-wider">Blueprint File Spec</span><span className="font-semibold text-gold-400 block mt-1 font-mono">{item.blueprintFileName}</span></div>
                                      <div className="p-2 rounded bg-gold-950/20 text-gold-400 border border-gold-500/20"><FileText className="h-4 w-4" /></div>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-white/5 bg-obsidian-900/30 text-[10px] font-display font-bold uppercase tracking-wider text-obsidian-400">
                  <th className="px-6 py-4"><button onClick={() => toggleSort('name')} className="flex items-center gap-1.5 hover:text-white cursor-pointer">Client Contact Name <ArrowUpDown className="h-3 w-3" /></button></th>
                  <th className="px-6 py-4">Contact Info</th>
                  <th className="px-6 py-4">Project Type</th>
                  <th className="px-6 py-4">Estimated Budget</th>
                  <th className="px-6 py-4">Wanted Timeline</th>
                  <th className="px-6 py-4">Transaction ID</th>
                  <th className="px-6 py-4"><button onClick={() => toggleSort('date')} className="flex items-center gap-1.5 hover:text-white cursor-pointer">Submitted Date <ArrowUpDown className="h-3 w-3" /></button></th>
                  <th className="px-6 py-4 text-center"><button onClick={() => toggleSort('status')} className="flex items-center gap-1.5 hover:text-white cursor-pointer mx-auto">State <ArrowUpDown className="h-3 w-3" /></button></th>
                  <th className="px-6 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-sm">
                {filteredEstimates.length === 0 ? (
                  <tr><td colSpan={9} className="px-6 py-12 text-center text-obsidian-500 font-display text-xs uppercase tracking-widest">No matching cost inquiries found.</td></tr>
                ) : filteredEstimates.map(item => {
                  const isExpanded = expandedId === item.id;
                  const color = statusColors[item.status] || statusColors.new;
                  return (
                    <React.Fragment key={item.id}>
                      <tr className={`hover:bg-white/2 cursor-pointer transition-colors ${isExpanded ? 'bg-white/2' : ''}`}>
                        <td className="px-6 py-4" onClick={() => setExpandedId(isExpanded ? null : item.id)}>
                          <div className="font-semibold text-white">{item.name}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-col gap-1">
                            <a href={`mailto:${item.email}`} onClick={e => { e.stopPropagation(); markAsContacted(item.id, item.status, 'estimate'); }} className="flex items-center gap-1.5 text-xs text-obsidian-300 hover:text-gold-400 transition-colors w-fit">
                              <Mail className="h-3.5 w-3.5 text-gold-500/70" /><span>{item.email}</span>
                            </a>
                            <a href={`tel:${item.phone}`} onClick={e => { e.stopPropagation(); markAsContacted(item.id, item.status, 'estimate'); }} className="flex items-center gap-1.5 text-xs text-obsidian-400 hover:text-gold-400 transition-colors mt-1 w-fit">
                              <Phone className="h-3.5 w-3.5 text-gold-500/70" /><span>{item.phone}</span>
                            </a>
                          </div>
                        </td>
                        <td className="px-6 py-4" onClick={() => setExpandedId(isExpanded ? null : item.id)}>
                          <span className="text-xs text-white capitalize flex items-center gap-1.5"><Building className="h-3.5 w-3.5 text-gold-500/60" />{item.projectType}</span>
                        </td>
                        <td className="px-6 py-4 text-xs font-semibold text-gold-400" onClick={() => setExpandedId(isExpanded ? null : item.id)}>
                          <span className="flex items-center gap-0.5"><DollarSign className="h-3.5 w-3.5" />{item.budget}</span>
                        </td>
                        <td className="px-6 py-4 text-xs text-obsidian-300 capitalize" onClick={() => setExpandedId(isExpanded ? null : item.id)}>{item.timeline.replace('-', ' ')}</td>
                        <td className="px-6 py-4 font-mono text-xs text-obsidian-300" onClick={() => setExpandedId(isExpanded ? null : item.id)}>{item.transactionId}</td>
                        <td className="px-6 py-4" onClick={() => setExpandedId(isExpanded ? null : item.id)}>
                          <div className="flex items-center gap-1.5 text-xs text-obsidian-300"><Calendar className="h-3.5 w-3.5 text-obsidian-500" /><span>{new Date(item.createdAt).toLocaleDateString()}</span></div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <button onClick={e => { e.stopPropagation(); handleStatusCycle(item.id, item.status, 'estimate'); }} className={`px-3 py-1 rounded-full text-[10px] font-display font-semibold uppercase tracking-wider border cursor-pointer select-none transition-all hover:scale-105 active:scale-95 ${color.bg} ${color.text} ${color.border}`} title="Click to cycle status">{item.status}</button>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button onClick={() => setExpandedId(isExpanded ? null : item.id)} className="text-xs font-display font-bold uppercase tracking-wider text-gold-500 hover:text-gold-400 transition-colors cursor-pointer">{isExpanded ? 'Collapse' : 'Inspect'}</button>
                        </td>
                      </tr>
                      {isExpanded && (
                        <tr>
                          <td colSpan={9} className="bg-obsidian-950/70 p-6 border-b border-white/5">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs leading-relaxed text-obsidian-300">
                              <div className="space-y-4">
                                <h4 className="font-display font-bold uppercase tracking-wider text-white border-b border-white/5 pb-2 text-[10px]">Project Details & Scope</h4>
                                <div>
                                  <span className="text-obsidian-500 block mb-1">Attached Requirements Details</span>
                                  <div className="bg-obsidian-900/60 p-4 rounded-sm border border-white/5 text-obsidian-300 whitespace-pre-wrap leading-relaxed">{item.details || 'No specific project details were provided.'}</div>
                                </div>
                              </div>
                              <div className="space-y-4">
                                <h4 className="font-display font-bold uppercase tracking-wider text-white border-b border-white/5 pb-2 text-[10px]">Lead Metadata & Specifications</h4>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="bg-white/2 p-3 rounded-sm border border-white/5"><span className="text-obsidian-500 block text-[9px] uppercase tracking-wider">Transaction State</span><span className="font-semibold text-white block mt-1 uppercase">{item.status}</span></div>
                                  <div className="bg-white/2 p-3 rounded-sm border border-white/5"><span className="text-obsidian-500 block text-[9px] uppercase tracking-wider">Project Type</span><span className="font-semibold text-white block mt-1 uppercase">{item.projectType}</span></div>
                                  <div className="bg-white/2 p-3 rounded-sm border border-white/5"><span className="text-obsidian-500 block text-[9px] uppercase tracking-wider">Assigned Budget</span><span className="font-semibold text-gold-400 block mt-1 uppercase">{item.budget}</span></div>
                                  <div className="bg-white/2 p-3 rounded-sm border border-white/5"><span className="text-obsidian-500 block text-[9px] uppercase tracking-wider">Target Timeline</span><span className="font-semibold text-white block mt-1 uppercase">{item.timeline.replace('-', ' ')}</span></div>
                                  <div className="bg-white/2 p-3 rounded-sm border border-white/5"><span className="text-obsidian-500 block text-[9px] uppercase tracking-wider">Record DB Key</span><span className="font-mono text-obsidian-400 block mt-1 truncate">{item.id}</span></div>
                                  <div className="bg-white/2 p-3 rounded-sm border border-white/5"><span className="text-obsidian-500 block text-[9px] uppercase tracking-wider">System Timestamp</span><span className="text-obsidian-400 block mt-1">{new Date(item.createdAt).toLocaleString()}</span></div>
                                </div>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
