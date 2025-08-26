// App.tsx

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import NewScan from "./components/NewScan";
import AnalysisView from "./components/AnalysisView";
import DamageReport from "./components/DamageReport";
import ScanHistory from "./components/ScanHistory";
import Dashboard from "./components/Dashboard";

// --- Import our new service and response type ---
import { analyzeImage, ApiResponse } from "./services/auraScanService";

// Define the possible pages/views in our app
type View = "dashboard" | "new-scan" | "analysis" | "report" | "history";

export default function App() {
  // --- State Management ---
  // 1. 'currentView' tracks which page the user is on.
  const [currentView, setCurrentView] = useState<View>("dashboard");
  // 2. 'analysisResult' will store the JSON response from our API.
  const [analysisResult, setAnalysisResult] = useState<ApiResponse | null>(null);
  // 3. 'isLoading' will track when the API call is in progress.
  const [isLoading, setIsLoading] = useState(false);
   // 4. 'errorMessage' will store any error messages.
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // --- Core Application Logic ---
  const handleScan = async (file: File) => {
    // This function is called when the user uploads a file on the NewScan page
    setIsLoading(true);
    setErrorMessage(null);
    setCurrentView("analysis"); // Switch to the loading/analysis view

    const result = await analyzeImage(file); // Call our API service

    setIsLoading(false);
    setAnalysisResult(result);

    if (result.success) {
      setCurrentView("report"); // If successful, show the damage report
    } else {
      setErrorMessage(result.error || "Failed to analyze image.");
      setCurrentView("new-scan"); // If failed, go back to the scan page to show the error
    }
  };

  const handleStartNewScan = () => {
    // Reset state and go to the new scan page
    setAnalysisResult(null);
    setErrorMessage(null);
    setCurrentView("new-scan");
  };

  // --- Render Logic ---
  // This function decides which component to show based on the currentView state
  const renderCurrentView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard onNewScanClick={handleStartNewScan} />;
      case "new-scan":
        return <NewScan onScan={handleScan} errorMessage={errorMessage} />;
      case "analysis":
        return <AnalysisView />;
      case "report":
        return <DamageReport result={analysisResult} onNewScanClick={handleStartNewScan} />;
      case "history":
        return <ScanHistory />;
      default:
        return <Dashboard onNewScanClick={handleStartNewScan} />;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      <Sidebar onNavigate={setCurrentView} />
      <main className="flex-1 p-8 overflow-y-auto">
        {renderCurrentView()}
      </main>
    </div>
  );
}