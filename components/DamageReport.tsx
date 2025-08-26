import React from 'react';
// --- FIX: Import our real API response type ---
import { ApiResponse } from '../services/auraScanService'; 
import { PdfIcon } from './icons/PdfIcon';
import SeverityPill from './SeverityPill';

// --- FIX: Updated interface to match App.tsx ---
interface DamageReportProps {
  result: ApiResponse | null;
  onNewScanClick: () => void;
}

const StatCard: React.FC<{ title: string; value: string | number; colorClass?: string }> = ({ title, value, colorClass = "text-white" }) => (
  <div className="glass-panel rounded-xl p-4 flex-1">
    <p className="text-slate-300 text-sm">{title}</p>
    <p className={`text-3xl font-bold ${colorClass}`}>{value}</p>
  </div>
);

const DamageReport: React.FC<DamageReportProps> = ({ result, onNewScanClick }) => {
  // If there's no result or the analysis failed, show an error message.
  if (!result || !result.success || !result.predictions) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-bold text-red-400">Analysis Failed</h2>
        <p className="text-slate-300 mt-2">{result?.error || "An unknown error occurred."}</p>
        <button 
          onClick={onNewScanClick}
          className="mt-4 bg-sky-500 text-white font-bold py-2 px-4 rounded-lg btn-glow transition-transform hover:scale-105"
        >
          Try Again
        </button>
      </div>
    );
  }

  const { severity, bounding_box } = result.predictions;

  // --- Logic to handle severity display ---
  const displaySeverity = severity.class === 'unspecified' ? 'Damage Detected' : severity.class;
  const severityColorClass = {
    'minor': 'text-green-400',
    'moderate': 'text-yellow-400',
    'severe': 'text-orange-400',
    'unspecified': 'text-sky-400', // A neutral color for 'unspecified'
  }[severity.class] || 'text-sky-400';

  return (
    <div className="h-full flex flex-col space-y-6 animate-[fadeIn_0.5s_ease-out]">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-4xl font-bold">Damage Report</h1>
        <div className="flex items-center gap-4">
          <button 
            onClick={onNewScanClick}
            className="bg-sky-500 text-white font-bold py-2 px-4 rounded-lg btn-glow transition-transform hover:scale-105"
          >
            Start New Scan
          </button>
        </div>
      </div>
      
      <div className="flex flex-wrap gap-4">
        {/* --- FIX: Displaying real data from the API response --- */}
        <StatCard title="Overall Assessment" value={displaySeverity} colorClass={severityColorClass} />
        <StatCard title="Confidence" value={`${(parseFloat(severity.confidence) * 100).toFixed(2)}%`} colorClass="text-white" />
      </div>

      <p className="text-slate-400">
        Note: Bounding box visualization and damage ledger are features for future development. 
        The raw coordinates detected by the AI are: {JSON.stringify(bounding_box.box_coordinates)}.
      </p>

      {/* Placeholder for the visual inspector and ledger */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-6 min-h-0">
        <div className="lg:col-span-3 glass-panel rounded-xl p-4 flex items-center justify-center text-slate-400">
          Visual Inspector (Image with Bounding Box) - Coming Soon
        </div>
        <div className="lg:col-span-2 glass-panel rounded-xl p-4 flex items-center justify-center text-slate-400">
          Damage Ledger - Coming Soon
        </div>
      </div>
    </div>
  );
};

export default DamageReport;