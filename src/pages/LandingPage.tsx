import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// Mock API call – reads from localStorage
const fetchTicketCount = async () => {
  const tickets = JSON.parse(localStorage.getItem('civic_tickets') || '[]');
  return tickets.length;
};

const categories = [
  { name: 'Garbage', icon: '🗑️' },
  { name: 'Open Drains', icon: '🌧️' },
  { name: 'Potholes', icon: '🕳️' },
  { name: 'Manholes', icon: '⚠️' },
  { name: 'Streetlights', icon: '💡' },
  { name: 'Waterlogging', icon: '💧' },
];

export default function LandingPage() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchTicketCount().then(setCount);
  }, []);

  return (
    <div className="space-y-12">
      {/* Hero */}
      <section className="text-center py-12 bg-saffron text-white rounded-lg shadow-lg">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Your City. Your Voice.</h1>
        <p className="text-lg md:text-xl mb-6">
          Report civic issues. Track them. See them resolved.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            to="/report"
            className="px-6 py-3 bg-white text-saffron font-semibold rounded hover:bg-gray-100 transition"
          >
            Report an Issue
          </Link>
          <Link
            to="/track"
            className="px-6 py-3 bg-white text-saffron font-semibold rounded hover:bg-gray-100 transition"
          >
            Track Complaint
          </Link>
        </div>
      </section>

      {/* Live Counter */}
      <section className="text-center">
        <p className="text-2xl font-medium">
          {count} issues reported so far <span className="ml-2 text-sm text-gray-500">Demo data</span>
        </p>
      </section>

      {/* Category Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="card flex flex-col items-center p-4 bg-white rounded-lg border border-gray-200 hover:shadow-lg transition"
          >
            <div className="text-4xl mb-2">{cat.icon}</div>
            <h2 className="text-lg font-semibold text-navy">{cat.name}</h2>
          </div>
        ))}
      </section>

      {/* How It Works */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold text-center mb-6 text-teal">How it works</h2>
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center text-white font-bold mb-2">
              1
            </div>
            <p className="text-center">Report</p>
          </div>
          <div className="text-2xl">&rarr;</div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center text-white font-bold mb-2">
              2
            </div>
            <p className="text-center">Assign</p>
          </div>
          <div className="text-2xl">&rarr;</div>
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 bg-navy rounded-full flex items-center justify-center text-white font-bold mb-2">
              3
            </div>
            <p className="text-center">Resolve</p>
          </div>
        </div>
      </section>
    </div>
  );
}
