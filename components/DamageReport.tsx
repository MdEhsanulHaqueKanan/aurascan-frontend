// src/components/DamageReport.tsx (Final, Complete, and Corrected Version)

import React, { useState, useEffect } from 'react';
import { ApiResponse } from '../services/auraScanService';
import SeverityPill from './SeverityPill';

// --- FIX: Add the missing interface definition back in ---
interface DamageReportProps {
  result: ApiResponse | null;
  onNewScanClick: () => void;
  imageFile: File | null; 
}

// --- FIX: Add the missing StatCard component definition back in ---
const StatCard: React.FC<{ title: string; value: string | number; colorClass?: string }> = ({ title, value, colorClass = "text-white" }) => (
  <div className="glass-panel rounded-xl p-4 flex-1 text-center">
    <p className="text-slate-300 text-sm">{title}</p>
    <p className={`text-3xl font-bold ${colorClass}`}>{value}</p>
  </div>
);

const DamageReport: React.FC<DamageReportProps> = ({ result, onNewScanClick, imageFile }) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  useEffect(() => {
    if (imageFile) {
      const url = URL.createObjectURL(imageFile);
      setImageUrl(url);
      return () => URL.revokeObjectURL(url);
    }
  }, [imageFile]);

  if (!result || !result.success || !result.damages) {
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
  
  const { totalDamages, overallSeverity, costRange, damages } = result;

  const severityColorClass = {
    'minor': 'text-green-400',
    'moderate': 'text-yellow-400',
    'severe': 'text-red-400',
    'unspecified': 'text-sky-400',
  }[overallSeverity] || 'text-sky-400';

  return (
    <div className="h-full flex flex-col space-y-6 animate-[fadeIn_0.5s_ease-out]">
      {/* --- FIX: Restore the header and stat cards --- */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-4xl font-bold">Damage Report</h1>
        <button 
          onClick={onNewScanClick}
          className="bg-sky-500 text-white font-bold py-2 px-4 rounded-lg btn-glow transition-transform hover:scale-105"
        >
          Start New Scan
        </button>
      </div>
      
      <div className="flex flex-wrap gap-4">
        <StatCard title="Total Damages Found" value={totalDamages} colorClass="text-sky-400" />
        <StatCard title="Overall Severity" value={overallSeverity} colorClass={severityColorClass} />
        <StatCard title="Est. Repair Cost" value={`$${costRange.min} - $${costRange.max}`} />
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-5 gap-6 min-h-0">
        <div className="lg:col-span-3 glass-panel rounded-xl p-4 flex items-center justify-center overflow-hidden">
            <div className="relative w-full h-full">
                {imageUrl && <img src={imageUrl} alt="Vehicle analysis" className="w-full h-full object-contain" />}
                
                {damages.map((damage) => {
                    const box = damage.coordinates[0];
                    const x_min_raw = box[0];
                    const y_min_raw = box[1];
                    const x_max_raw = box[2];
                    const y_max_raw = box[3];
                    
                    // --- FIX: Use a refined normalization factor for better accuracy ---
                    const NORMALIZATION_FACTOR = 1600.0; // Adjusted based on visual feedback
                    
                    const left_pct = (x_min_raw / NORMALIZATION_FACTOR) * 100;
                    const top_pct = (y_min_raw / NORMALIZATION_FACTOR) * 100;
                    const width_pct = ((x_max_raw - x_min_raw) / NORMALIZATION_FACTOR) * 100;
                    const height_pct = ((y_max_raw - y_min_raw) / NORMALIZATION_FACTOR) * 100;

                    return (
                        <div
                            key={damage.id}
                            className="absolute border-4 border-red-500 rounded-md box-content"
                            style={{
                                left: `${left_pct}%`,
                                top: `${top_pct}%`,
                                width: `${width_pct}%`,
                                height: `${height_pct}%`,
                            }}
                        ></div>
                    );
                })}
            </div>
        </div>
        
         {/* --- FIX: Restore the Damage Ledger --- */}
         <div className="lg:col-span-2 glass-panel rounded-xl p-2 flex flex-col">
            <h2 className="text-2xl font-bold p-4">Damage Ledger</h2>
            <div className="flex-1 overflow-y-auto pr-2 space-y-3">
            {damages.map(damage => (
                <div key={damage.id} className="glass-panel p-4 rounded-lg">
                    <div className="flex justify-between items-start">
                        <div>
                            <h3 className="font-bold text-lg">{damage.type}</h3>
                            <p className="text-sm text-slate-300">{damage.location}</p>
                        </div>
                        <SeverityPill severity={damage.severity} />
                    </div>
                    <p className="text-right font-semibold text-white mt-2">
                      Est. Cost: ${damage.estimatedCost.min} - ${damage.estimatedCost.max}
                    </p>
                </div>
            ))}
            </div>
        </div>
      </div>
    </div>
  );
};

export default DamageReport;