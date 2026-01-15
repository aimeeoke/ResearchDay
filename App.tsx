import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { Home, Calendar, Users, ChevronLeft, Info } from 'lucide-react';
import AbstractsView from './components/AbstractsView';
import ScheduleView from './components/ScheduleView';
import SponsorsView from './components/SponsorsView';
import AboutView from './components/AboutView';
import { Abstract, AbstractFilters } from './types';
import AbstractDetail from './components/AbstractDetail';
import { abstractsData } from './data';
import ErrorBoundary from './components/ErrorBoundary';

function AbstractDetailPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Extract abstract ID from URL path
  const pathParts = location.pathname.split('/');
  const abstractId = pathParts[pathParts.length - 1];
  const abstract = abstractsData.find(a => a.id === abstractId);

  const handleBack = () => {
    navigate('/abstracts');
  };

  if (!abstract) {
    return <Navigate to="/abstracts" replace />;
  }

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-800">
      <header className="bg-[#1E4D2B] text-white shadow-md z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button onClick={handleBack} className="p-1 hover:bg-[#153820] rounded-full transition-colors" aria-label="Back">
              <ChevronLeft size={24} />
            </button>
            <h1 className="text-xl font-bold truncate">Abstract Details</h1>
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 overflow-y-auto no-scrollbar scroll-smooth">
          <AbstractDetail abstract={abstract} />
          <div className="h-24"></div>
        </div>
      </main>
    </div>
  );
}

function MainLayout() {
  const navigate = useNavigate();
  const location = useLocation();

  // Filter state lifted from AbstractsView so it persists when viewing details
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<AbstractFilters>({
    department: '',
    researchType: '',
    mentor: '',
    affiliation: '',
    presenterLevel: ''
  });

  const handleAbstractClick = (abstract: Abstract) => {
    navigate(`/abstracts/${abstract.id}`);
  };

  const toggleFilters = () => {
    setShowFilters(prev => !prev);
  };

  // Determine current view from URL
  const currentView = location.pathname.startsWith('/schedule') ? 'schedule'
    : location.pathname.startsWith('/sponsors') ? 'sponsors'
    : location.pathname.startsWith('/about') ? 'about'
    : 'abstracts';

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-[#1E4D2B] text-white shadow-md z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img
              src="/CSU-Ram-Head.png"
              alt="CVMBS Logo"
              className="w-10 h-10 rounded-full"
            />
            <h1 className="text-xl font-bold truncate">CVMBS Research Day 2026</h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 overflow-y-auto no-scrollbar scroll-smooth">
          {currentView === 'abstracts' && (
            <AbstractsView
              onAbstractClick={handleAbstractClick}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
              showFilters={showFilters}
              toggleFilters={toggleFilters}
              filters={filters}
              setFilters={setFilters}
            />
          )}
          {currentView === 'schedule' && <ScheduleView />}
          {currentView === 'sponsors' && <SponsorsView />}
          {currentView === 'about' && <AboutView />}
          {/* Bottom spacer for nav */}
          <div className="h-24"></div>
        </div>
      </main>

      {/* Bottom Navigation */}
      <nav className="bg-white border-t border-gray-200 shadow-lg z-30 fixed bottom-0 w-full pb-safe-area">
        <div className="max-w-7xl mx-auto flex justify-around items-center h-16">
          <NavButton
            active={currentView === 'abstracts'}
            onClick={() => navigate('/abstracts')}
            icon={<Home size={24} />}
            label="Abstracts"
          />
          <NavButton
            active={currentView === 'schedule'}
            onClick={() => navigate('/schedule')}
            icon={<Calendar size={24} />}
            label="Schedule"
          />
          <NavButton
            active={currentView === 'sponsors'}
            onClick={() => navigate('/sponsors')}
            icon={<Users size={24} />}
            label="Sponsors"
          />
          <NavButton
            active={currentView === 'about'}
            onClick={() => navigate('/about')}
            icon={<Info size={24} />}
            label="About"
          />
        </div>
      </nav>
    </div>
  );
}

interface NavButtonProps {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
}

const NavButton: React.FC<NavButtonProps> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`flex flex-col items-center justify-center w-full h-full space-y-1 transition-colors ${
      active ? 'text-[#1E4D2B]' : 'text-gray-400 hover:text-gray-600'
    }`}
  >
    <div className={`p-1 rounded-full ${active ? 'bg-green-50' : ''}`}>
      {icon}
    </div>
    <span className="text-xs font-medium">{label}</span>
  </button>
);

export default function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navigate to="/abstracts" replace />} />
          <Route path="/abstracts" element={<MainLayout />} />
          <Route path="/abstracts/:id" element={<AbstractDetailPage />} />
          <Route path="/schedule" element={<MainLayout />} />
          <Route path="/sponsors" element={<MainLayout />} />
          <Route path="/about" element={<MainLayout />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  );
}
