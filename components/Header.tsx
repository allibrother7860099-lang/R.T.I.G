
import React from 'react';
import { AppView } from '../types';
import { INSTITUTE_DETAILS } from '../constants';
import { Monitor, ShieldCheck, Search } from 'lucide-react';

interface HeaderProps {
  currentView: AppView;
  setView: (view: AppView) => void;
}

const Header: React.FC<HeaderProps> = ({ currentView, setView }) => {
  return (
    <header className="bg-indigo-700 text-white shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row justify-between items-center">
        <div 
          className="flex items-center gap-3 cursor-pointer group mb-4 md:mb-0"
          onClick={() => setView(AppView.SEARCH)}
        >
          <div className="bg-white p-2 rounded-lg text-indigo-700 shadow-md transform group-hover:scale-110 transition-transform">
            <Monitor size={28} />
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">{INSTITUTE_DETAILS.name}</h1>
            <p className="text-indigo-200 text-xs font-medium uppercase tracking-wider">{INSTITUTE_DETAILS.tagline}</p>
          </div>
        </div>

        <nav className="flex items-center gap-2">
          <button
            onClick={() => setView(AppView.SEARCH)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              currentView === AppView.SEARCH 
                ? 'bg-white text-indigo-700 shadow-inner' 
                : 'hover:bg-indigo-600'
            }`}
          >
            <Search size={18} />
            Student Search
          </button>
          <button
            onClick={() => setView(AppView.ADMIN_LOGIN)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              currentView === AppView.ADMIN_LOGIN || currentView === AppView.ADMIN_DASHBOARD
                ? 'bg-white text-indigo-700 shadow-inner' 
                : 'hover:bg-indigo-600'
            }`}
          >
            <ShieldCheck size={18} />
            Admin Panel
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
