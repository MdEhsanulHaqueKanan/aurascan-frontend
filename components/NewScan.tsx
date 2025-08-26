import React, { useState, useCallback } from 'react';
import { UploadIcon } from './icons/UploadIcon';

// --- FIX: Interface updated to match App.tsx ---
interface NewScanProps {
  onScan: (file: File) => void;
  errorMessage: string | null;
}

const NewScan: React.FC<NewScanProps> = ({ onScan, errorMessage }) => {
  // --- FIX: State simplified to handle a single file ---
  const [file, setFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [context, setContext] = useState(''); // Context is kept for potential future use

  const handleFileChange = (selectedFiles: FileList | null) => {
    if (selectedFiles && selectedFiles.length > 0) {
      // --- FIX: Only take the first file ---
      setFile(selectedFiles[0]);
    }
  };
  
  const onDragEnter = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files);
    }
  }, []);
  
  const handleSubmit = () => {
    // --- FIX: Check for a single file and call onScan ---
    if (file) {
      onScan(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-full p-4">
      <div className="w-full max-w-3xl glass-panel rounded-2xl p-8 text-center shadow-2xl">
        <h1 className="text-4xl font-bold text-white mb-2">Create a New Damage Analysis</h1>
        <p className="text-slate-300 mb-8">Upload an image of the vehicle to begin the AI-powered scan.</p>

        <div
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onClick={() => document.getElementById('file-upload')?.click()}
          className={`
            relative w-full border-2 border-dashed rounded-xl p-10 cursor-pointer transition-all duration-300
            ${isDragging ? 'border-sky-400 bg-sky-400/20 shadow-[inset_0_0_20px_rgba(56,189,248,0.5)]' : 'border-slate-500 hover:border-slate-400'}
          `}
        >
          <input 
            id="file-upload" 
            type="file" 
            accept="image/*" 
            className="hidden" 
            onChange={(e) => handleFileChange(e.target.files)} 
          />
          <div className="flex flex-col items-center justify-center space-y-4">
            <UploadIcon className={`w-16 h-16 transition-colors duration-300 ${isDragging ? 'text-sky-300' : 'text-slate-400'}`} />
            <p className="text-lg font-semibold text-white">Drag & Drop a Vehicle Image Here</p>
            <p className="text-slate-400">or click to browse</p>
          </div>
        </div>

        {file && (
          <div className="mt-6 text-left">
            <h3 className="font-semibold text-white">Selected File:</h3>
            <p className="text-slate-300 mt-2">{file.name}</p>
          </div>
        )}
        
        {/* --- FIX: Display the error message from props --- */}
        {errorMessage && <p className="text-red-400 mt-4">{errorMessage}</p>}

        <button
          onClick={handleSubmit}
          disabled={!file}
          className="w-full mt-8 bg-sky-500 text-white font-bold py-3 px-6 rounded-lg text-lg
            disabled:bg-slate-600 disabled:cursor-not-allowed disabled:text-slate-400
            btn-glow transition-all duration-300 transform hover:scale-105"
        >
          Analyze Image
        </button>
      </div>
    </div>
  );
};

export default NewScan;