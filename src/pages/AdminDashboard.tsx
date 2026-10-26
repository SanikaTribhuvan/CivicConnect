// src/pages/AdminDashboard.tsx
import { useQuery } from '@tanstack/react-query';
import { getTickets } from '../services/api';
import { motion } from 'framer-motion';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import type { Ticket } from '../types';

export default function AdminDashboard() {
  const { data: tickets = [], isLoading } = useQuery<Ticket[]>({
    queryKey: ['tickets'],
    queryFn: getTickets,
  });

  // Aggregate tickets per category
  const categoryCounts = tickets.reduce<Record<string, number>>((acc, t) => {
    const cat = t.category || 'Other';
    acc[cat] = (acc[cat] ?? 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(categoryCounts).map(([name, count]) => ({
    name,
    count,
  }));

  const totalComplaints = tickets.length;
  const resolvedCount = tickets.filter((t) => t.status === 'Resolved').length;
  const inProgressCount = tickets.filter((t) => t.status === 'In Progress').length;
  const reportedCount = tickets.filter((t) => t.status === 'Reported').length;

  const COLORS = ['#F7941D', '#588357', '#489EB2', '#E5484D', '#163B27', '#88A8BD'];

  return (
    <motion.div
      className="min-h-[calc(100vh-72px)] bg-cream px-6 py-10 md:px-12 max-w-6xl mx-auto text-ink"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <span className="text-xs uppercase tracking-widest text-ink/60 font-semibold">
            CivicConnect ● Ahilyanagar ● Administrator
          </span>
          <h1 className="text-3xl md:text-5xl font-extrabold text-ink tracking-tight mt-1">
            City Indicators & Admin Panel
          </h1>
        </div>
        <span className="text-[11px] px-3 py-1 rounded-full border border-ink/20 bg-white/60 text-ink/80 self-start md:self-auto font-medium">
          Demo data
        </span>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
        <div className="glass-light p-5 rounded-[28px] border border-white/60 bg-white/40 shadow-sm">
          <div className="text-xs uppercase font-bold text-ink/60">Total Tickets</div>
          <div className="text-3xl md:text-4xl font-extrabold text-ink mt-2">{totalComplaints}</div>
          <div className="text-[10px] text-ink/50 mt-1">Demo data</div>
        </div>
        <div className="glass-light p-5 rounded-[28px] border border-white/60 bg-white/40 shadow-sm">
          <div className="text-xs uppercase font-bold text-ink/60">Reported</div>
          <div className="text-3xl md:text-4xl font-extrabold text-amber-600 mt-2">{reportedCount}</div>
          <div className="text-[10px] text-ink/50 mt-1">Pending triage</div>
        </div>
        <div className="glass-light p-5 rounded-[28px] border border-white/60 bg-white/40 shadow-sm">
          <div className="text-xs uppercase font-bold text-ink/60">In Progress</div>
          <div className="text-3xl md:text-4xl font-extrabold text-blue-600 mt-2">{inProgressCount}</div>
          <div className="text-[10px] text-ink/50 mt-1">Field assigned</div>
        </div>
        <div className="glass-light p-5 rounded-[28px] border border-white/60 bg-white/40 shadow-sm">
          <div className="text-xs uppercase font-bold text-ink/60">Resolved</div>
          <div className="text-3xl md:text-4xl font-extrabold text-emerald-600 mt-2">{resolvedCount}</div>
          <div className="text-[10px] text-ink/50 mt-1">Closed successfully</div>
        </div>
      </div>

      {/* Category Chart Section */}
      <section className="glass-light p-6 md:p-8 rounded-[28px] border border-white/60 mb-8 bg-white/50 shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-ink">Complaints by Category</h2>
          <span className="text-[10px] uppercase tracking-wider text-ink/50 border border-ink/20 px-2 py-0.5 rounded-full">
            Demo data
          </span>
        </div>
        {chartData.length === 0 ? (
          <div className="text-center py-10 text-ink/60">No ticket category data available.</div>
        ) : (
          <div className="w-full h-[280px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <XAxis
                  dataKey="name"
                  stroke="#0B1F14"
                  tick={{ fill: '#0B1F14', fontSize: 12 }}
                  interval={0}
                  angle={-15}
                  textAnchor="end"
                />
                <YAxis
                  stroke="#0B1F14"
                  tick={{ fill: '#0B1F14', fontSize: 12 }}
                  allowDecimals={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0F2A1C',
                    color: '#fff',
                    borderRadius: '16px',
                    border: 'none',
                  }}
                  itemStyle={{ color: '#F7941D' }}
                />
                <Bar dataKey="count" radius={[8, 8, 0, 0]}>
                  {chartData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </section>

      {/* All Reports List */}
      <section className="glass-light p-6 md:p-8 rounded-[28px] border border-white/60 bg-white/50 shadow-md">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl md:text-2xl font-bold text-ink">All City Complaints</h2>
          <span className="text-[10px] uppercase tracking-wider text-ink/50 border border-ink/20 px-2 py-0.5 rounded-full">
            Demo data
          </span>
        </div>

        {isLoading ? (
          <div className="text-center py-8 text-ink/60">Loading civic complaints...</div>
        ) : tickets.length === 0 ? (
          <div className="text-center py-8 text-ink/60">No complaints registered yet.</div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {tickets.map((t) => (
              <div
                key={t.id}
                className="bg-white/80 p-5 rounded-2xl border border-black/5 shadow-sm hover:shadow transition"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono font-bold text-sm text-saffron">{t.id}</span>
                  <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-neutral-100 text-ink">
                    {t.status}
                  </span>
                </div>
                <div className="text-sm font-bold text-ink mb-1">{t.category}</div>
                <p className="text-ink/70 text-xs line-clamp-2 mb-3">{t.note}</p>
                <div className="text-[11px] text-ink/50 flex justify-between border-t border-black/5 pt-2">
                  <span>{t.location.ward}</span>
                  <span>{new Date(t.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </motion.div>
  );
}
