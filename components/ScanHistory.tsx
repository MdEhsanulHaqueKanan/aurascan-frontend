// components/ScanHistory.tsx
import React from 'react';

const ScanHistory: React.FC = () => {
  return (
    <div className="flex flex-col h-full space-y-6">
      <h1 className="text-4xl font-bold">Scan History</h1>
      <div className="flex-1 glass-panel rounded-xl p-8 flex items-center justify-center text-slate-400">
        <p>This feature is under construction. Past scans will be displayed here.</p>
      </div>
    </div>
  );
};

export default ScanHistory;