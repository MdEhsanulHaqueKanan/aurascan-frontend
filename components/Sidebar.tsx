import React from 'react';
import { DashboardIcon } from './icons/DashboardIcon';
import { NewScanIcon } from './icons/NewScanIcon';
import { HistoryIcon } from './icons/HistoryIcon';
import { SettingsIcon } from './icons/SettingsIcon';

// --- FIX: Define the View type to match App.tsx ---
type View = "dashboard" | "new-scan" | "analysis" | "report" | "history" | "settings";

// --- FIX: Simplified interface ---
interface SidebarProps {
  onNavigate: (view: View) => void;
}

const NavItem: React.FC<{
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}> = ({ icon, label, onClick }) => {
  // Simplified NavItem for clarity
  return (
    <li
      onClick={onClick}
      className={`
        flex items-center space-x-4 p-3 rounded-lg cursor-pointer transition-all duration-300
        group hover:bg-white/20
      `}
    >
      <div className="text-slate-400 group-hover:text-white">{icon}</div>
      <span className="font-medium text-slate-300 group-hover:text-white">
        {label}
      </span>
    </li>
  );
};


const Sidebar: React.FC<SidebarProps> = ({ onNavigate }) => {
  return (
    <aside className="w-64 glass-panel p-6 flex-shrink-0 hidden md:flex flex-col">
      <div className="flex items-center space-x-2 mb-12">
        <div className="w-10 h-10 bg-gradient-to-br from-sky-400 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
          <div className="w-4 h-4 border-2 border-white rounded-full"></div>
        </div>
        <h1 className="text-2xl font-bold text-white tracking-wider">AuraScan AI</h1>
      </div>

      <nav>
        <ul className="space-y-3">
          {/* --- FIX: onClick handlers now directly call onNavigate --- */}
          <NavItem
            icon={<DashboardIcon />}
            label="Dashboard"
            onClick={() => onNavigate('dashboard')}
          />
          <NavItem
            icon={<NewScanIcon />}
            label="New Scan"
            onClick={() => onNavigate('new-scan')}
          />
          <NavItem
            icon={<HistoryIcon />}
            label="Scan History"
            onClick={() => onNavigate('history')}
          />
        </ul>
      </nav>

      <div className="mt-auto">
        <ul className="space-y-2">
            <NavItem
                icon={<SettingsIcon />}
                label="Settings"
                onClick={() => onNavigate('settings')}
            />
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;