// components/AnalysisView.tsx
import React from 'react';

const AnalysisView: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center">
      {/* Animated Spinner or Pulsing Dots */}
      <div className="flex items-center justify-center space-x-2">
        <div className="w-4 h-4 bg-sky-400 rounded-full animate-pulse [animation-delay:-0.3s]"></div>
        <div className="w-4 h-4 bg-sky-400 rounded-full animate-pulse [animation-delay:-0.15s]"></div>
        <div className="w-4 h-4 bg-sky-400 rounded-full animate-pulse"></div>
      </div>

      <h1 className="text-3xl font-bold text-white mt-8 animate-pulse">
        AURA AI IS ANALYZING...
      </h1>
      <p className="text-slate-300 mt-2">
        Please wait a moment while we process the vehicle image.
      </p>
    </div>
  );
};

export default AnalysisView;