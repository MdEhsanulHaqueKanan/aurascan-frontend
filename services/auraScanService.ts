// services/auraScanService.ts

// The public URL of our live Hugging Face API
const API_URL = "https://ehsanulhaque92-aurascanai.hf.space/analyze";

export interface SeverityPrediction {
  class: string;
  confidence: string;
}

export interface BoundingBoxPrediction {
  box_coordinates: [number, number, number, number];
}

export interface PredictionResult {
  severity: SeverityPrediction;
  bounding_box: BoundingBoxPrediction;
}

export interface ApiResponse {
  success: boolean;
  predictions?: PredictionResult;
  error?: string;
}

export const analyzeImage = async (file: File): Promise<ApiResponse> => {
  // 1. Create a FormData object to hold the file
  const formData = new FormData();
  formData.append("file", file);

  try {
    // 2. Send the POST request using fetch
    const response = await fetch(API_URL, {
      method: "POST",
      body: formData,
    });

    // 3. Check if the request was successful
    if (!response.ok) {
      // If the server returns an error (e.g., 500), throw an error
      const errorData = await response.json();
      throw new Error(errorData.error || "An unknown server error occurred.");
    }

    // 4. Parse the JSON response and return it
    const data: ApiResponse = await response.json();
    return data;

  } catch (error) {
    console.error("Error analyzing image:", error);
    // Return a structured error response
    return {
      success: false,
      error: error instanceof Error ? error.message : "An unknown error occurred.",
    };
  }
};