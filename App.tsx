import React, { useState } from 'react';
import { Home, Calendar, Users, Info, ChevronLeft } from 'lucide-react';
import AbstractsView from './components/AbstractsView';
import ScheduleView from './components/ScheduleView';
import SponsorsView from './components/SponsorsView';
import { Abstract } from './types';
import AbstractDetail from './components/AbstractDetail';

type View = 'abstracts' | 'schedule' | 'sponsors';

export default function App() {
  const [currentView, setCurrentView] = useState<View>('abstracts');
  const [selectedAbstract, setSelectedAbstract] = useState<Abstract | null>(null);

  const handleAbstractClick = (abstract: Abstract) => {
    setSelectedAbstract(abstract);
  };

  const handleBack = () => {
    setSelectedAbstract(null);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-[#1E4D2B] text-white shadow-md z-20">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {selectedAbstract ? (
              <button onClick={handleBack} className="p-1 hover:bg-[#153820] rounded-full transition-colors" aria-label="Back">
                <ChevronLeft size={24} />
              </button>
            ) : (
              <img 
                src="https://picsum.photos/40/40" 
                alt="CVMBS Logo" 
                className="w-10 h-10 rounded-full border-2 border-[#C8C372]"
              />
            )}
            <h1 className="text-xl font-bold truncate">
              {selectedAbstract ? 'Abstract Details' : 'CVMBS Research Day 2026'}
            </h1>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 overflow-y-auto no-scrollbar scroll-smooth">
          {selectedAbstract ? (
            <AbstractDetail abstract={selectedAbstract} />
          ) : (
            <>
              {currentView === 'abstracts' && <AbstractsView onAbstractClick={handleAbstractClick} />}
              {currentView === 'schedule' && <ScheduleView />}
              {currentView === 'sponsors' && <SponsorsView />}
            </>
          )}
          {/* Bottom spacer for nav */}
          <div className="h-24"></div>
        </div>
      </main>

      {/* Bottom Navigation (Mobile & Desktop sticky) */}
      {!selectedAbstract && (
        <nav className="bg-white border-t border-gray-200 shadow-lg z-30 fixed bottom-0 w-full pb-safe-area">
          <div className="max-w-7xl mx-auto flex justify-around items-center h-16">
            <NavButton 
              active={currentView === 'abstracts'} 
              onClick={() => setCurrentView('abstracts')} 
              icon={<Home size={24} />} 
              label="Abstracts" 
            />
            <NavButton 
              active={currentView === 'schedule'} 
              onClick={() => setCurrentView('schedule')} 
              icon={<Calendar size={24} />} 
              label="Schedule" 
            />
            <NavButton 
              active={currentView === 'sponsors'} 
              onClick={() => setCurrentView('sponsors')} 
              icon={<Users size={24} />} 
              label="Sponsors" 
            />
          </div>
        </nav>
      )}
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