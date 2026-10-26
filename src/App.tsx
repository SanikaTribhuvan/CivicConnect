// src/App.tsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, NavLink, useNavigate } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import ReportPage from './pages/ReportPage';
import TrackPage from './pages/TrackPage';
import AdminDashboard from './pages/AdminDashboard';
import './index.css';

function NavigationBar() {
  const [role, setRole] = useState<'citizen' | 'officer' | 'admin'>('citizen');
  const [lang, setLang] = useState<'en' | 'mr' | 'hi'>('en');
  const navigate = useNavigate();

  const handleRoleChange = (newRole: 'citizen' | 'officer' | 'admin') => {
    setRole(newRole);
    if (newRole === 'admin') {
      navigate('/admin');
    } else if (newRole === 'officer') {
      navigate('/track');
    } else {
      navigate('/');
    }
  };

  return (
    <header className="sticky top-0 z-50 flex h-[72px] items-center justify-between px-4 sm:px-8 md:px-12 bg-white/70 backdrop-blur-[22px] border-b border-black/5 shadow-sm">
      {/* Brand & Monogram */}
      <div className="flex items-center gap-3">
        <NavLink to="/" className="flex items-center gap-2.5">
          <div className="w-10 h-10 bg-forest-900 rounded-full flex items-center justify-center shadow-sm">
            <span className="font-serif font-bold text-lg text-white">CC</span>
          </div>
          <div className="hidden sm:block">
            <div className="text-sm font-extrabold tracking-tight text-ink">CivicConnect</div>
            <div className="text-[10px] uppercase tracking-wider text-ink/60 -mt-0.5">Ahilyanagar</div>
          </div>
        </NavLink>
      </div>

      {/* Nav Links */}
      <nav className="flex items-center space-x-3 sm:space-x-6 text-xs sm:text-sm font-bold uppercase tracking-wider">
        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? 'text-saffron border-b-2 border-saffron pb-1' : 'text-ink/80 hover:text-ink pb-1'
          }
        >
          Home
        </NavLink>
        <NavLink
          to="/report"
          className={({ isActive }) =>
            isActive ? 'text-saffron border-b-2 border-saffron pb-1' : 'text-ink/80 hover:text-ink pb-1'
          }
        >
          Report
        </NavLink>
        <NavLink
          to="/track"
          className={({ isActive }) =>
            isActive ? 'text-saffron border-b-2 border-saffron pb-1' : 'text-ink/80 hover:text-ink pb-1'
          }
        >
          Track
        </NavLink>
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            isActive ? 'text-saffron border-b-2 border-saffron pb-1' : 'text-ink/80 hover:text-ink pb-1'
          }
        >
          Admin
        </NavLink>
      </nav>

      {/* Role + Language Switchers */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        <select
          value={role}
          onChange={(e) => handleRoleChange(e.target.value as any)}
          aria-label="Role Switcher"
          className="text-xs font-semibold bg-white/80 border border-ink/20 text-ink rounded-full px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-saffron cursor-pointer"
        >
          <option value="citizen">Citizen</option>
          <option value="officer">Officer</option>
          <option value="admin">Admin</option>
        </select>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value as any)}
          aria-label="Language Switcher"
          className="text-xs font-semibold bg-white/80 border border-ink/20 text-ink rounded-full px-2.5 py-1 focus:outline-none focus:ring-1 focus:ring-saffron cursor-pointer"
        >
          <option value="en">EN</option>
          <option value="mr">मराठी</option>
          <option value="hi">हिंदी</option>
        </select>
      </div>
    </header>
  );
}

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-cream text-ink font-inter antialiased">
        <NavigationBar />

        <main className="flex-1">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/track" element={<TrackPage />} />
            <Route path="/admin" element={<AdminDashboard />} />
          </Routes>
        </main>

        <footer className="bg-forest-950 text-white py-8 px-6 text-center text-xs border-t border-white/10">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="font-bold text-sm tracking-wide">CivicConnect Ahilyanagar</span>
              <span className="text-[10px] px-2 py-0.5 rounded-full border border-white/20 bg-white/10 text-white/70">
                Demo data
              </span>
            </div>
            <div className="text-sage/70">
              Ward-wise civic tracking & grievance resolution for Ahilyanagar
            </div>
            <div className="text-white/40 text-[11px]">
              Prototype • Master Branch
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
