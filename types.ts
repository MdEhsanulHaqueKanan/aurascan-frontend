
export type Page = 'dashboard' | 'new-scan' | 'history' | 'settings';

export enum Severity {
  LOW = 'Low',
  MEDIUM = 'Medium',
  HIGH = 'High',
  CRITICAL = 'Critical',
}

export interface Damage {
  id: string;
  type: string;
  location: string;
  severity: Severity;
  estimatedCost: number;
  coordinates: {
    x: number; // percentage
    y: number; // percentage
    width: number; // percentage
    height: number; // percentage
  };
  description: string;
}

export interface Report {
  id: string;
  date: string;
  vehicle: string;
  thumbnailUrl: string;
  imageUrl: string;
  totalDamages: number;
  overallSeverity: Severity;
  costRange: {
    min: number;
    max: number;
  };
  damages: Damage[];
}
