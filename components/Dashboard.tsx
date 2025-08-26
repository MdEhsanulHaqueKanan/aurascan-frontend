import React from 'react';
import { CalendarIcon } from './icons/CalendarIcon';
import { ShieldIcon } from './icons/ShieldIcon';
import { DollarIcon } from './icons/DollarIcon';
import { ArrowRightIcon } from './icons/ArrowRightIcon';
import SeverityPill from './SeverityPill';

// Import a dummy type for now, as we're not using real reports here yet
enum Severity { LOW = "Low", MEDIUM = "Medium", HIGH = "High", CRITICAL = "Critical" }

// --- FIX: The interface is simplified. It only needs one function. ---
interface DashboardProps {
  onNewScanClick: () => void;
}

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="glass-panel rounded-xl p-5 flex items-center space-x-4 transition-all duration-300 glow-on-hover hover:scale-105">
      <div className="bg-slate-900/50 p-3 rounded-full text-sky-400">
        {icon}
      </div>
      <div>
        <p className="text-slate-300 text-sm font-medium">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
      </div>
    </div>
  );
  
const Dashboard: React.FC<DashboardProps> = ({ onNewScanClick }) => {
    // This component can still show mock/static data for demonstration.
    // The "Start New Scan" button functionality is what's important.

    return (
      <div className="flex flex-col h-full space-y-6 animate-[fadeIn_0.5s_ease-out]">
        <style>{`@keyframes fadeIn { 0% { opacity: 0; transform: translateY(10px); } 100% { opacity: 1; transform: translateY(0); } }`}</style>
        <div>
          <h1 className="text-4xl font-bold text-white">Welcome Back, User</h1>
          <p className="text-slate-300 mt-1">Ready to start a new analysis?</p>
        </div>
  
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatCard title="Scans This Month" value="128" icon={<CalendarIcon />} />
          <StatCard title="Avg. Damage Severity" value="Medium" icon={<ShieldIcon />} />
          <StatCard title="Total Est. Costs" value="$34,500" icon={<DollarIcon />} />
        </div>
        
        {/* --- A simplified call to action --- */}
        <div className="flex-1 flex items-center justify-center">
            <button 
                onClick={onNewScanClick} 
                className="bg-sky-500 text-white font-bold py-4 px-8 rounded-lg text-xl btn-glow transition-all duration-300 transform hover:scale-105"
            >
                Start New Damage Analysis
            </button>
        </div>
      </div>
    );
  };
  
  export default Dashboard;