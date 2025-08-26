// src/services/auraScanService.ts (Corrected)

export interface CostRange {
  min: number;
  max: number;
}

export interface Damage {
  id: string;
  type: string;
  location: string;
  severity: string;
  estimatedCost: CostRange;
  coordinates: number[][];
}

// --- FIX: This is the "flat" structure our API is actually sending ---
export interface ApiResponse {
  success: boolean;
  totalDamages?: number;
  overallSeverity?: string;
  confidence?: string;
  costRange?: CostRange;
  damages?: Damage[];
  error?: string;
}

const API_URL = "https://ehsanulhaque92-aurascanai.hf.space/analyze";

export const analyzeImage = async (file: File): Promise<ApiResponse> => {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "An unknown server error occurred.");
    }

    const data: ApiResponse = await response.json();
    return data;

  } catch (error) {
    console.error("Error analyzing image:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown network error occurred.",
    };
  }
};