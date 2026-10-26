// src/pages/ReportPage.tsx
import React, { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { addTicket, NewTicketInput } from '../services/api';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import type { Ticket } from '../types';

const CATEGORIES = [
  'Garbage',
  'Open Drains',
  'Potholes',
  'Manholes',
  'Streetlights',
  'Waterlogging',
];

const WARDS = [
  'Ward 1 (Tophkhana)',
  'Ward 2 (Station Road)',
  'Ward 3 (Savedi)',
  'Ward 4 (Market Yard)',
  'Ward 5 (Delhi Gate)',
  'Ward 6 (Sarjepura)',
  'Ward 7 (Kedgaon)',
  'Ward 12 (Bhingar)',
];

export default function ReportPage() {
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [ward, setWard] = useState(WARDS[0]);
  const [note, setNote] = useState('');
  const [phone, setPhone] = useState('');
  const [createdTicket, setCreatedTicket] = useState<Ticket | null>(null);

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (input: NewTicketInput) => addTicket(input),
    onSuccess: (newTicket) => {
      queryClient.invalidateQueries({ queryKey: ['tickets'] });
      setCreatedTicket(newTicket);
      setNote('');
      setPhone('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!note.trim()) return;
    mutation.mutate({
      category,
      ward,
      note,
      phone: phone.trim() || undefined,
    });
  };

  return (
    <motion.div
      className="min-h-[calc(100vh-72px)] bg-cream px-6 py-10 md:px-12 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div className="flex items-center justify-between mb-6">
        <div>
          <span className="text-xs uppercase tracking-widest text-ink/60 font-semibold">
            CivicConnect ● Ahilyanagar ● Report Flow
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-ink tracking-tight mt-1">
            Report an Issue
          </h1>
        </div>
        <span className="text-[11px] px-3 py-1 rounded-full border border-ink/20 bg-white/40 text-ink/70">
          Demo data
        </span>
      </div>

      {createdTicket ? (
        <div className="glass-light p-8 rounded-[28px] border border-white/40 shadow-xl space-y-5 bg-white/50">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-800 text-sm font-semibold rounded-full">
            ✓ Ticket Created Successfully
          </div>
          <h2 className="text-2xl font-bold text-ink">
            Your Ticket ID:{' '}
            <span className="text-saffron font-mono selection:bg-saffron/20">
              {createdTicket.id}
            </span>
          </h2>
          <p className="text-ink/80 text-sm">
            Category: <strong>{createdTicket.category}</strong> | Ward: <strong>{createdTicket.location.ward}</strong>
          </p>
          <p className="text-ink/70 text-sm bg-white/60 p-4 rounded-xl border border-black/5">
            "{createdTicket.note}"
          </p>
          <div className="flex flex-wrap gap-4 pt-2">
            <Link
              to={`/track?search=${encodeURIComponent(createdTicket.id)}`}
              className="px-6 py-2.5 bg-saffron text-white font-bold rounded-full hover:bg-saffron/90 transition shadow-sm"
            >
              Track this Ticket
            </Link>
            <button
              onClick={() => setCreatedTicket(null)}
              className="px-6 py-2.5 bg-white border border-ink/20 text-ink font-semibold rounded-full hover:bg-white/80 transition"
            >
              File Another Report
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="glass-light p-6 md:p-8 rounded-[28px] border border-white/50 space-y-6 shadow-lg bg-white/40">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-ink mb-2">Issue Category</label>
              <select
                className="w-full rounded-2xl bg-white/70 border border-ink/15 text-ink p-3 focus:outline-none focus:ring-2 focus:ring-saffron"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-bold text-ink mb-2">Ward / Locality</label>
              <select
                className="w-full rounded-2xl bg-white/70 border border-ink/15 text-ink p-3 focus:outline-none focus:ring-2 focus:ring-saffron"
                value={ward}
                onChange={(e) => setWard(e.target.value)}
              >
                {WARDS.map((w) => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-ink mb-2">Description / Note</label>
            <textarea
              className="w-full rounded-2xl bg-white/70 border border-ink/15 text-ink p-3 focus:outline-none focus:ring-2 focus:ring-saffron resize-none"
              placeholder="Describe the civic problem (location specifics, hazards, urgency)..."
              rows={4}
              value={note}
              onChange={(e) => setNote(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-bold text-ink mb-2">
              Citizen Mobile Phone (optional, for status tracking)
            </label>
            <input
              type="tel"
              className="w-full rounded-2xl bg-white/70 border border-ink/15 text-ink p-3 focus:outline-none focus:ring-2 focus:ring-saffron"
              placeholder="e.g. 9822012345"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={mutation.isPending}
              className="px-8 py-3 bg-saffron text-white font-bold rounded-full hover:bg-saffron/90 transition shadow-md disabled:opacity-50"
            >
              {mutation.isPending ? 'Submitting Report...' : 'Submit Civic Report'}
            </button>
          </div>
        </form>
      )}
    </motion.div>
  );
}
