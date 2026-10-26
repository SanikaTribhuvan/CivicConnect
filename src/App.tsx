import { BrowserRouter as Router, Routes, Route, Link, NavLink } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-white text-gray-900 font-sans">
        <header className="bg-nav text-white p-4 flex justify-between items-center">
          <nav className="flex space-x-4">
            <NavLink to="/" end className={({ isActive }) => isActive ? 'text-saffron font-bold' : 'text-white'}>Home</NavLink>
            <NavLink to="/report" className={({ isActive }) => isActive ? 'text-saffron font-bold' : 'text-white'}>Report</NavLink>
            <NavLink to="/track" className={({ isActive }) => isActive ? 'text-saffron font-bold' : 'text-white'}>Track</NavLink>
          </nav>
          <div className="flex space-x-2">
            {/* Role switcher placeholder */}
            <select className="bg-white text-gray-800 rounded" defaultValue="citizen">
              <option value="citizen">Citizen</option>
              <option value="officer">Officer</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        </header>
        <main className="flex-1 p-4">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            {/* Additional routes to be added later */}
          </Routes>
        </main>
        <footer className="bg-gray-100 text-center p-4 text-sm">
          Ward-wise tracking for Ahilyanagar
        </footer>
      </div>
    </Router>
  );
}

export default App;
