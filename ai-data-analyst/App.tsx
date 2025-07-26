/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
/* tslint:disable */
import React, { useState, useCallback, useRef } from 'react';
import Papa from 'papaparse';
import FileUpload from './components/FileUpload';
import AnalysisView from './components/AnalysisView';
import Alert from './components/Alert';
import Sidebar from './components/Sidebar';
import { streamAnalysis } from './services/geminiService';
import { ML_MODELS } from './constants';

const App: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileContent, setFileContent] = useState<string>('');
  const [analysisResult, setAnalysisResult] = useState<string>('');
  const [currentTask, setCurrentTask] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleReset = () => {
    setFile(null);
    setFileContent('');
    setAnalysisResult('');
    setCurrentTask('');
    setError(null);
    setSuccess(false);
    setIsLoading(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const runAnalysis = useCallback(async (task: string, content: string) => {
    if (!content) {
      setError('No file content to analyze.');
      return;
    }
    setIsLoading(true);
    setError(null);
    setAnalysisResult('');
    setCurrentTask(task);
    setSuccess(false);

    try {
      const stream = streamAnalysis(task, content);
      for await (const chunk of stream) {
        setAnalysisResult((prev) => prev + chunk);
      }
      setSuccess(true);
    } catch (e: any) {
      setError(e.message || 'An unexpected error occurred during analysis.');
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.type !== 'text/csv') {
        setError('Please upload a valid CSV file.');
        return;
      }
      setFile(selectedFile);
      setError(null);

      const reader = new FileReader();
      reader.onload = async (e) => {
        const text = e.target?.result as string;
        setFileContent(text);
        // Automatically run EDA on file upload
        await runAnalysis(ML_MODELS[0], text);
      };
      reader.onerror = () => {
        setError('Failed to read the file.');
      };
      reader.readAsText(selectedFile);
    }
  };

  // Drag-and-drop support for FileUpload
  const handleFileDrop = (droppedFile: File) => {
    if (droppedFile.type !== 'text/csv') {
      setError('Please upload a valid CSV file.');
      return;
    }
    setFile(droppedFile);
    setError(null);

    const reader = new FileReader();
    reader.onload = async (e) => {
      const text = e.target?.result as string;
      setFileContent(text);
      await runAnalysis(ML_MODELS[0], text);
    };
    reader.onerror = () => {
      setError('Failed to read the file.');
    };
    reader.readAsText(droppedFile);
  };

  const handleTaskSelection = (task: string) => {
    if (fileContent) {
      runAnalysis(task, fileContent);
    } else {
      setError('Please upload a file first.');
    }
  };

  // Sidebar button handlers (placeholders)
  const handleUploadClick = () => {
    handleReset();
  };
  const handleSettingsClick = () => {
    alert('Settings coming soon!');
  };
  const handleAboutClick = () => {
    alert('AI Data Analyst\nVersion 1.0.0');
  };

  return (
    <div className="min-h-screen w-full flex flex-col md:flex-row bg-blue-50">
      {/* Sidebar: overlays on mobile, sits left on desktop */}
      <div className="md:w-72 md:min-w-[15rem] md:max-w-80 md:h-screen md:sticky md:top-0">
        <Sidebar
          analysisTasks={ML_MODELS}
          currentTask={currentTask}
          onTaskSelect={handleTaskSelection}
          onUploadClick={handleUploadClick}
          onSettingsClick={handleSettingsClick}
          onAboutClick={handleAboutClick}
        />
      </div>
      {/* Main content: fills available space, centers card */}
      <main className="flex-1 w-full h-full flex items-center justify-center bg-blue-50">
        {/* Alerts for error and success */}
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-lg">
          {error && (
            <Alert type="error" message={error} onClose={() => setError(null)} />
          )}
          {/* {success && !isLoading && !error && (
            <Alert type="success" message="Analysis complete!" onClose={() => setSuccess(false)} />
          )} */}
        </div>
        {/* Upload card or analysis view, centered and full area */}
        {!fileContent ? (
          <div className="flex w-full h-full items-center justify-center">
            <FileUpload
              error={error}
              fileInputRef={fileInputRef}
              handleFileChange={handleFileChange}
              onFileDrop={handleFileDrop}
            />
          </div>
        ) : (
          <AnalysisView
            file={file}
            currentTask={currentTask}
            isLoading={isLoading}
            error={error}
            analysisResult={analysisResult}
            ML_MODELS={ML_MODELS}
            handleTaskSelection={handleTaskSelection}
            handleReset={handleReset}
          />
        )}
      </main>
    </div>
  );
};

export default App;
