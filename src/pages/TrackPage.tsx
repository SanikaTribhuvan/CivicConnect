// src/pages/TrackPage.tsx
import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { getTickets } from '../services/api';
import { motion } from 'framer-motion';
import { useSearchParams } from 'react-router-dom';
import type { Ticket } from '../types';

export default function TrackPage() {
  const [searchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');

  const { data: tickets = [], isLoading } = useQuery<Ticket[]>({
    queryKey: ['tickets'],
    queryFn: getTickets,
  });

  useEffect(() => {
    const queryParam = searchParams.get('search');
    if (queryParam) {
      setSearchTerm(queryParam);
    }
  }, [searchParams]);

  const cleanQuery = searchTerm.trim().toLowerCase();
  const filteredTickets = tickets.filter((t) => {
    if (!cleanQuery) return true;
    const matchesId = t.id.toLowerCase().includes(cleanQuery);
    const matchesPhone = t.phone ? t.phone.includes(cleanQuery) : false;
    const matchesCategory = t.category.toLowerCase().includes(cleanQuery);
    const matchesWard = t.location.ward.toLowerCase().includes(cleanQuery);
    return matchesId || matchesPhone || matchesCategory || matchesWard;
  });

  const getStatusColor = (status: Ticket['status']) => {
    switch (status) {
      case 'Resolved':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'In Progress':
        return 'bg-amber-100 text-amber-800 border-amber-300';
      case 'Assigned':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      default:
        return 'bg-neutral-100 text-neutral-800 border-neutral-300';
    }
  };

  return (
    <motion.div
      className="min-h-[calc(100vh-72px)] bg-forest-950 text-white px-6 py-10 md:px-12 max-w-5xl mx-auto"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-sage/70 font-semibold">
            CivicConnect ● Ahilyanagar ● Status Tracker
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mt-1 text-white">
            Track Civic Complaint
          </h1>
        </div>
        <span className="text-[11px] px-3 py-1 rounded-full border border-white/20 bg-white/10 text-white/80 self-start md:self-auto">
          Demo data
        </span>
      </div>

      {/* Search Input Box */}
      <div className="glass-light p-6 rounded-[28px] border border-white/20 mb-8 bg-white/10">
        <label className="block text-sm font-semibold text-sage mb-2">
          Search by Ticket ID (e.g. CC-2026-00041) or Citizen Phone
        </label>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            className="flex-1 rounded-2xl bg-white/20 border border-white/30 text-white placeholder-white/50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-saffron"
            placeholder="Enter Ticket ID (CC-2026-...) or Phone (98220...)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="px-5 py-3 rounded-2xl bg-white/10 text-sage hover:bg-white/20 transition font-medium"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {isLoading ? (
        <div className="text-center py-12 text-sage">Loading reports...</div>
      ) : filteredTickets.length === 0 ? (
        <div className="glass-green p-8 rounded-[28px] text-center border border-white/20">
          <p className="text-sage text-lg">No matching reports found for "{searchTerm}".</p>
          <p className="text-white/60 text-sm mt-2">
            Try searching by ticket ID (e.g. CC-2026-00041) or phone number.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-xs uppercase tracking-wider text-sage/70 mb-2 font-medium">
            Found {filteredTickets.length} ticket(s)
          </div>
          {filteredTickets.map((t) => (
            <div
              key={t.id}
              className="glass-green p-6 rounded-[28px] border border-white/20 shadow-lg hover:border-white/40 transition"
            >
              <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
                <div className="flex items-center gap-3">
                  <span className="font-mono font-bold text-lg text-saffron">{t.id}</span>
                  <span className="text-xs text-white/60">●</span>
                  <span className="font-semibold text-white">{t.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-3 py-1 rounded-full font-bold border ${getStatusColor(
                      t.status
                    )}`}
                  >
                    {t.status}
                  </span>
                  <span className="text-[10px] uppercase text-white/50 border border-white/20 px-2 py-0.5 rounded-full">
                    Demo data
                  </span>
                </div>
              </div>

              <p className="text-sage text-sm leading-relaxed mb-4">{t.note}</p>

              <div className="flex flex-wrap items-center justify-between text-xs text-white/60 pt-3 border-t border-white/10">
                <div>
                  Ward: <strong className="text-white">{t.location.ward}</strong>
                  {t.phone && (
                    <span className="ml-3">
                      Phone: <span className="font-mono text-white/80">{t.phone}</span>
                    </span>
                  )}
                </div>
                <div>Reported: {new Date(t.createdAt).toLocaleDateString()}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </motion.div>
  );
}
