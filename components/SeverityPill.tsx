
import React from 'react';
import { Severity } from '../types';

interface SeverityPillProps {
  severity: Severity;
}

const SeverityPill: React.FC<SeverityPillProps> = ({ severity }) => {
  const severityStyles: { [key in Severity]: string } = {
    [Severity.LOW]: 'bg-green-500/20 text-green-300 border-green-500/50',
    [Severity.MEDIUM]: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/50',
    [Severity.HIGH]: 'bg-orange-500/20 text-orange-300 border-orange-500/50',
    [Severity.CRITICAL]: 'bg-red-500/20 text-red-300 border-red-500/50',
  };
  return (
    <span className={`px-2 py-1 text-xs font-semibold rounded-full border ${severityStyles[severity]}`}>
      {severity.toUpperCase()}
    </span>
  );
};

export default SeverityPill;
