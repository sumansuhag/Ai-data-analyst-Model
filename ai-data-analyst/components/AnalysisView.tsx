import React from 'react';
import { GeneratedContent } from '../GeneratedContent';

interface AnalysisViewProps {
  file: File | null;
  currentTask: string;
  isLoading: boolean;
  error: string | null;
  analysisResult: string;
  ML_MODELS: string[];
  handleTaskSelection: (task: string) => void;
  handleReset: () => void;
}

const AnalysisView: React.FC<AnalysisViewProps> = ({
  file,
  currentTask,
  isLoading,
  error,
  analysisResult,
  ML_MODELS,
  handleTaskSelection,
  handleReset,
}) => (
  <div className="w-full h-full flex flex-col relative">
    <header className="flex-shrink-0 bg-white shadow-sm p-4 border-b flex items-center justify-between">
      <div>
        <h1 className="text-xl font-bold text-gray-800">
          Analysis Report
        </h1>
        <p className="text-sm text-gray-500">
          {file?.name} - {currentTask}
        </p>
      </div>
    </header>

    {/* Top bar for task selection */}
    <div className="w-full bg-gray-50 p-4 border-b flex flex-wrap gap-2 items-center">
      {ML_MODELS.map((task) => (
        <button
          key={task}
          onClick={() => handleTaskSelection(task)}
          disabled={isLoading}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors
            ${currentTask === task
              ? 'bg-blue-600 text-white'
              : 'bg-white text-gray-700 hover:bg-blue-100'}
            disabled:opacity-50 disabled:cursor-not-allowed`}
        >
          {task}
        </button>
      ))}
    </div>

    <main className="flex-1 p-6 overflow-y-auto bg-gray-50/50 relative w-full h-full">
      {isLoading && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-white bg-opacity-70 z-20">
          <svg className="mb-4" width="64" height="64" viewBox="0 0 44 44" xmlns="http://www.w3.org/2000/svg" stroke="#2563eb">
            <g fill="none" fillRule="evenodd" strokeWidth="4">
              <circle cx="22" cy="22" r="20" strokeOpacity=".2"/>
              <path d="M42 22c0-11.046-8.954-20-20-20">
                <animateTransform
                  attributeName="transform"
                  type="rotate"
                  from="0 22 22"
                  to="360 22 22"
                  dur="1s"
                  repeatCount="indefinite" />
              </path>
            </g>
          </svg>
          <p className="text-lg text-blue-700 font-semibold">Generating analysis, please wait...</p>
        </div>
      )}
      {!isLoading && error ? (
        <div className="card bg-red-100 text-red-700">
          <h2 className="text-2xl font-bold">An Error Occurred</h2>
          <p>{error}</p>
        </div>
      ) : !isLoading ? (
        <GeneratedContent htmlContent={analysisResult} />
      ) : null}
    </main>
  </div>
);

export default AnalysisView; 