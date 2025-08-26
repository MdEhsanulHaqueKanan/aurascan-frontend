// App.tsx (Final Version)

import { useState } from "react";
import Sidebar from "./components/Sidebar";
import NewScan from "./components/NewScan";
import AnalysisView from "./components/AnalysisView";
import DamageReport from "./components/DamageReport";
import ScanHistory from "./components/ScanHistory";
import Dashboard from "./components/Dashboard";
import { analyzeImage, ApiResponse } from "./services/auraScanService";

type View = "dashboard" | "new-scan" | "analysis" | "report" | "history" | "settings";

export default function App() {
  const [currentView, setCurrentView] = useState<View>("dashboard");
  const [analysisResult, setAnalysisResult] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // --- NEW: State to hold the uploaded image file ---
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleScan = async (file: File) => {
    setIsLoading(true);
    setErrorMessage(null);
    setImageFile(file); // --- NEW: Save the file to state ---
    setCurrentView("analysis");

    const result = await analyzeImage(file);

    setIsLoading(false);
    setAnalysisResult(result);

    if (result.success) {
      setCurrentView("report");
    } else {
      setErrorMessage(result.error || "Failed to analyze image.");
      setCurrentView("new-scan");
    }
  };

  const handleStartNewScan = () => {
    setAnalysisResult(null);
    setErrorMessage(null);
    setImageFile(null); // --- NEW: Reset the image file ---
    setCurrentView("new-scan");
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case "dashboard":
        return <Dashboard onNewScanClick={handleStartNewScan} />;
      case "new-scan":
        return <NewScan onScan={handleScan} errorMessage={errorMessage} />;
      case "analysis":
        return <AnalysisView />;
      case "report":
        // --- NEW: Pass the imageFile to the DamageReport component ---
        return <DamageReport result={analysisResult} onNewScanClick={handleStartNewScan} imageFile={imageFile} />;
      case "history":
        return <ScanHistory />;
      default: // Added a settings placeholder
        return (
          <div className="text-center">
            <h1 className="text-4xl font-bold">Settings</h1>
            <p className="text-slate-400 mt-4">This page is under construction.</p>
          </div>
        )
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