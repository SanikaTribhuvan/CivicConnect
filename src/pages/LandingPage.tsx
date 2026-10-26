// src/pages/LandingPage.tsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getTickets, subscribeUpdates } from '../services/api';
import type { Ticket } from '../types';

const PROBLEMS = [
  { name: 'Garbage', icon: '🗑️', sla: '24', dept: 'Solid Waste Management' },
  { name: 'Open Drains', icon: '🌧️', sla: '48', dept: 'Drainage & Sanitation' },
  { name: 'Potholes', icon: '🕳️', sla: '72', dept: 'Roads & Infrastructure' },
  { name: 'Waterlogging', icon: '💧', sla: '12', dept: 'Storm Water Dept' },
  { name: 'Manholes', icon: '⚠️', sla: '12', dept: 'Public Safety & Roads' },
  { name: 'Streetlights', icon: '💡', sla: '24', dept: 'Electrical Department' },
];

const AHILYA_WARDS = [
  { name: 'Prabhag 1', locality: 'Tophkhana', count: 3 },
  { name: 'Prabhag 2', locality: 'Station Road', count: 5 },
  { name: 'Prabhag 3', locality: 'Savedi', count: 8 },
  { name: 'Prabhag 4', locality: 'Market Yard', count: 4 },
  { name: 'Prabhag 5', locality: 'Delhi Gate', count: 6 },
  { name: 'Prabhag 7', locality: 'Kedgaon', count: 7 },
  { name: 'Prabhag 12', locality: 'Bhingar', count: 5 },
];

export default function LandingPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  const loadData = async () => {
    const list = await getTickets();
    setTickets(list);
  };

  useEffect(() => {
    loadData();
    // BroadcastChannel: updates across tabs without page refresh
    const unsubscribe = subscribeUpdates(() => {
      loadData();
    });
    return () => {
      unsubscribe();
    };
  }, []);

  const totalReports = tickets.length;
  const resolvedReports = tickets.filter((t) => t.status === 'Resolved').length;

  return (
    <div className="w-full overflow-x-hidden text-ink font-inter">
      {/* ── CHAPTER 1: The reveal ──────────────────────────────── */}
      <section className="relative min-h-[85vh] flex flex-col justify-between p-6 md:p-14 bg-gradient-to-b from-[#F5EEEA] via-[#F6D9C4] to-[#F5EEEA] border-b border-black/5">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-xs uppercase tracking-widest text-ink/70 font-bold">
              CivicConnect ● Ahilyanagar
            </span>
          </div>
          {/* Live counter from real app data */}
          <div className="glass-light px-4 py-1.5 rounded-full border border-white/60 bg-white/40 text-xs font-semibold text-ink shadow-sm flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>
              {totalReports} reports so far, {resolvedReports} resolved
            </span>
            <span className="text-[10px] text-ink/50 border border-ink/20 px-1.5 py-0.2 rounded-full">
              Demo data
            </span>
          </div>
        </div>

        <div className="py-12 md:py-20 max-w-4xl">
          <div className="text-xs uppercase tracking-widest text-saffron font-extrabold mb-3">
            CHAPTER 1: THE REVEAL
          </div>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-ink leading-none mb-6">
            YOUR CITY.<br />
            <span className="text-forest-900">YOUR VOICE.</span>
          </h1>
          <p className="text-lg md:text-2xl text-ink/80 font-medium max-w-2xl mb-8 leading-snug">
            Report civic issues. Track them. See them resolved.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              to="/report"
              className="px-8 py-3.5 bg-saffron text-white font-bold rounded-full hover:bg-saffron/90 transition shadow-md"
            >
              Report an Issue
            </Link>
            <Link
              to="/track"
              className="px-8 py-3.5 bg-white/70 border border-ink/20 text-ink font-bold rounded-full hover:bg-white transition shadow-sm"
            >
              Track Complaint
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap justify-between items-end text-xs text-ink/60 border-t border-black/5 pt-4">
          <span>Smart Municipal Grievance Redressal</span>
          <span>Ahilyanagar Municipal Corporation Region</span>
        </div>
      </section>

      {/* ── CHAPTER 2: Report anything ─────────────────────────── */}
      <section className="relative py-24 px-6 md:px-14 bg-forest-950 text-white border-b border-white/10">
        <div className="max-w-4xl mx-auto text-center">
          <div className="text-xs uppercase tracking-widest text-saffron font-bold mb-4">
            CHAPTER 2: REPORT ANYTHING
          </div>
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="text-saffron text-xl">✦</span>
            <h2 className="text-4xl md:text-6xl font-light text-white">
              <span className="italic font-serif">Report</span> anything
            </h2>
            <span className="text-saffron text-xl">✦</span>
          </div>
          <p className="text-sage text-base md:text-lg max-w-2xl mx-auto mb-8 font-light">
            From potholes and overflowing garbage to darkened streetlights and open drains, capture issues instantly with photos and automated ward tagging.
          </p>
          <Link
            to="/report"
            className="inline-block px-8 py-3 border border-white/40 text-white font-semibold rounded-full hover:bg-white hover:text-forest-950 transition text-sm tracking-wide"
          >
            Report an issue now
          </Link>
        </div>
      </section>

      {/* ── CHAPTER 3: Six problems ────────────────────────────── */}
      <section className="py-24 px-6 md:px-14 bg-sage border-b border-black/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
            <div>
              <div className="text-xs uppercase tracking-widest text-moss font-bold mb-2">
                CHAPTER 3: ISSUE CATEGORIES
              </div>
              <h2 className="text-4xl md:text-6xl font-extrabold text-moss tracking-tight">
                SIX CITY PROBLEMS
              </h2>
            </div>
            <div className="mt-4 md:mt-0 text-sm text-ink/70 max-w-xs">
              Every complaint is auto-routed to the designated municipal department with guaranteed SLA response times.
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROBLEMS.map((prob) => (
              <Link
                key={prob.name}
                to={`/report?category=${encodeURIComponent(prob.name)}`}
                className="glass-light p-6 rounded-[28px] border border-white/60 bg-white/50 hover:shadow-xl transition transform hover:-translate-y-1 block"
              >
                <div className="text-4xl mb-4">{prob.icon}</div>
                <h3 className="text-2xl font-black uppercase text-moss tracking-tight mb-2">
                  {prob.name}
                </h3>
                <div className="text-xs text-ink/80 font-semibold mb-1">
                  SLA: <span className="text-saffron font-bold">{prob.sla} hrs</span>
                </div>
                <div className="text-xs text-ink/60">
                  {prob.dept}
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHAPTER 4: Ward by ward ────────────────────────────── */}
      <section className="py-24 px-6 md:px-14 bg-[#E9E2D6] border-b border-black/5">
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
            <div>
              <div className="text-xs uppercase tracking-widest text-pool font-bold mb-2">
                CHAPTER 4: WARD BY WARD
              </div>
              <h2 className="text-3xl md:text-5xl font-extrabold text-ink">
                17 wards. One live map.
              </h2>
            </div>
            <div className="mt-2 md:mt-0 text-sm text-ink/70">
              Live tickets: <span className="font-bold text-saffron">{totalReports}</span> across all 17 Prabhags
              <span className="ml-2 text-[10px] border border-ink/20 px-2 py-0.5 rounded-full">Demo data</span>
            </div>
          </div>

          <div className="glass-light p-8 rounded-[28px] border border-white/60 bg-white/40 shadow-md">
            <div className="relative h-64 md:h-72 w-full rounded-2xl bg-[#E2E6D2] overflow-hidden flex items-center justify-center border border-black/10">
              {/* Sina River simulation band */}
              <div className="absolute w-full h-12 bg-pool/40 -rotate-12 translate-y-6 flex items-center justify-center text-[11px] font-bold tracking-widest text-pool">
                SINA RIVER STREAM CORRIDOR
              </div>
              <div className="relative z-10 text-center px-4">
                <div className="text-2xl font-bold text-forest-900 mb-1">
                  Ahilyanagar Municipal Territory
                </div>
                <div className="text-xs text-ink/70">
                  Savedi • Kedgaon • Bhingar • Delhi Gate • Station Road • Tophkhana • Market Yard • Sarjepura
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3 mt-6">
              {AHILYA_WARDS.map((w) => (
                <div key={w.name} className="bg-white/70 p-3 rounded-xl border border-black/5 text-center">
                  <div className="text-xs font-bold text-forest-900">{w.name}</div>
                  <div className="text-[11px] text-ink/60">{w.locality}</div>
                  <div className="text-[10px] text-saffron font-bold mt-1">Active</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CHAPTER 5: One city ────────────────────────────────── */}
      <section className="py-24 px-6 md:px-14 bg-gradient-to-b from-[#88A8BD] to-[#BFD8E6] border-b border-black/5 text-white">
        <div className="max-w-5xl mx-auto text-center">
          <div className="text-xs uppercase tracking-widest text-white/80 font-bold mb-3">
            CHAPTER 5: ONE CITY
          </div>
          <h2 className="text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight mb-4">
            <span className="text-white">AHILYA</span> <span className="text-saffron">NAGAR</span>
          </h2>
          <p className="text-white/90 text-base md:text-xl max-w-2xl mx-auto mb-8">
            Uniting citizens, ward officers, and municipal leadership into one transparent civic ecosystem.
          </p>
          <div className="inline-flex flex-wrap justify-center gap-4">
            <Link
              to="/admin"
              className="px-8 py-3 bg-forest-900 text-white font-bold rounded-full hover:bg-forest-950 transition shadow-lg text-sm"
            >
              View Admin Indicators
            </Link>
            <Link
              to="/track"
              className="px-8 py-3 bg-white text-ink font-bold rounded-full hover:bg-white/90 transition shadow-lg text-sm"
            >
              Track Any Complaint
            </Link>
          </div>
        </div>
      </section>

      {/* ── OUTRO ──────────────────────────────────────────────── */}
      <section className="py-20 px-6 md:px-14 bg-sage">
        <div className="max-w-5xl mx-auto text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 text-left">
            <div className="glass-light p-6 rounded-[28px] border border-white/60 bg-white/50">
              <div className="w-10 h-10 rounded-full bg-saffron text-white font-bold flex items-center justify-center mb-3">
                1
              </div>
              <h3 className="text-xl font-bold text-forest-900 mb-1">Report</h3>
              <p className="text-ink/70 text-sm">
                Submit an issue in seconds with photo, ward location, and description.
              </p>
            </div>
            <div className="glass-light p-6 rounded-[28px] border border-white/60 bg-white/50">
              <div className="w-10 h-10 rounded-full bg-saffron text-white font-bold flex items-center justify-center mb-3">
                2
              </div>
              <h3 className="text-xl font-bold text-forest-900 mb-1">Assign</h3>
              <p className="text-ink/70 text-sm">
                Smart triage routes the ticket to the respective ward officer and department.
              </p>
            </div>
            <div className="glass-light p-6 rounded-[28px] border border-white/60 bg-white/50">
              <div className="w-10 h-10 rounded-full bg-saffron text-white font-bold flex items-center justify-center mb-3">
                3
              </div>
              <h3 className="text-xl font-bold text-forest-900 mb-1">Resolve</h3>
              <p className="text-ink/70 text-sm">
                Track live progress, verify on-ground resolution, and confirm closure.
              </p>
            </div>
          </div>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-forest-900 mb-8">
            REPORT. TRACK. RESOLVE.
          </h2>

          <div className="inline-block">
            <Link
              to="/report"
              className="px-10 py-4 bg-saffron text-white font-extrabold rounded-full hover:bg-saffron/90 transition shadow-xl text-lg"
            >
              Report an Issue
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
