import React, { useState } from 'react';

interface FileUploadProps {
  error: string | null;
  fileInputRef: React.RefObject<HTMLInputElement>;
  handleFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFileDrop?: (file: File) => void;
}

const FileUpload: React.FC<FileUploadProps> = ({ error, fileInputRef, handleFileChange, onFileDrop }) => {
  const [isDragActive, setIsDragActive] = useState(false);

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragActive(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragActive(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragActive(false);
    const file = e.dataTransfer.files[0];
    if (file && onFileDrop) {
      onFileDrop(file);
    }
  };

  return (
    <div className="w-full h-full min-h-[60vh] flex flex-col items-center justify-center bg-blue-50">
      <div className="w-full max-w-xl flex flex-col items-center justify-center">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4">AI Data Analyst</h1>
        <p className="text-lg mb-10">
          Upload your CSV file to get started with an automated analysis.
        </p>
        <div className="items-center justify-center mx-auto">
          <label
            htmlFor="file-upload"
            className={`relative cursor-pointer rounded-xl border-2 border-dashed border-blue-400 p-10 flex flex-col items-center justify-center transition-colors ${isDragActive ? 'border-blue-600 bg-blue-100' : 'hover:border-blue-600'}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <svg
              className="w-16 h-16 text-blue-500 mb-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-4-4V7a4 4 0 014-4h5l2 2h4a2 2 0 012 2v2a4 4 0 01-4 4H7z"></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 16V6m0 0L7 8m2-2l2 2"></path>
            </svg>
            <span className="text-blue-700 font-bold text-lg mb-2">
              Click or drag & drop to upload a file
            </span>
            <p className="text-sm text-blue-500 mt-1">CSV files only</p>
          </label>
          <input
            id="file-upload"
            ref={fileInputRef}
            type="file"
            accept=".csv"
            className="sr-only"
            onChange={handleFileChange}
          />
        </div>
        {error && (
          <p className="mt-4 text-red-600 bg-red-100 p-3 rounded-lg">
            {error}
          </p>
        )}
      </div>
    </div>
  );
};

export default FileUpload; 