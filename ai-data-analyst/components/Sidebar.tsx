import React, { useState } from 'react';
import logo from './assets/logo.png';

interface SidebarProps {
  analysisTasks: string[];
  currentTask: string;
  onTaskSelect: (task: string) => void;
  onUploadClick: () => void;
  onSettingsClick: () => void;
  onAboutClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({
  analysisTasks,
  currentTask,
  onTaskSelect,
  onUploadClick,
  onSettingsClick,
  onAboutClick,
}) => {
  const [open, setOpen] = useState(false);

  // Sidebar content
  const sidebarContent = (
    <div className="px-8 flex flex-col h-full w-72 bg-blue-700 text-white border-r shadow-lg z-30">
      <div className="p-8 flex flex-col items-center space-y-2">
        <img src={logo} alt="AI Analyst Logo" className="w-full rounded-full shadow-lg mb-2" />
      </div>
      <div className="flex flex-col gap-2">
        <button
          className="w-full text-left px-8 py-3 font-medium hover:bg-blue-600 transition-colors whitespace-nowrap rounded-lg"
          onClick={() => { setOpen(false); onUploadClick(); }}
        >
          Upload Data
        </button>
        <div className="mt-2">
          <h3 className="px-8 text-xs text-blue-200 uppercase mb-3 whitespace-nowrap tracking-wider">Analysis Tasks</h3>
          <ul className="flex flex-col gap-2">
            {analysisTasks.map((task) => (
              <li key={task}>
                <button
                  className={`w-full text-left px-8 py-3 rounded-lg transition-colors text-base font-medium whitespace-nowrap flex items-center gap-2
                    ${currentTask === task
                      ? 'bg-blue-100 text-blue-800 shadow-sm'
                      : 'hover:bg-blue-600 hover:text-white text-blue-50/90'}
                  `}
                  onClick={() => { setOpen(false); onTaskSelect(task); }}
                >
                  {task}
                </button>
              </li>
            ))}
          </ul>
        </div>
        <button
          className="w-full text-left px-8 py-3 font-medium hover:bg-blue-600 transition-colors whitespace-nowrap rounded-lg"
          onClick={() => { setOpen(false); onSettingsClick(); }}
        >
          Settings
        </button>
        <button
          className="w-full text-left px-8 py-3 font-medium hover:bg-blue-600 transition-colors whitespace-nowrap rounded-lg"
          onClick={() => { setOpen(false); onAboutClick(); }}
        >
          About
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Hamburger for mobile only, toggles open/close */}
      <button
        className="md:hidden fixed top-4 left-4 z-40 bg-white text-black rounded-full p-2 shadow focus:outline-none border border-gray-200"
        onClick={() => setOpen((prev) => !prev)}
        aria-label={open ? 'Close sidebar' : 'Open sidebar'}
      >
        {open ? (
          // X icon
          <span className="block w-6 h-6 text-2xl font-bold">&times;</span>
        ) : (
          // Hamburger icon
          <>
            <span className="block w-6 h-0.5 bg-black mb-1"></span>
            <span className="block w-6 h-0.5 bg-black mb-1"></span>
            <span className="block w-6 h-0.5 bg-black"></span>
          </>
        )}
      </button>
      {/* Sidebar overlay for mobile: only render when open */}
      {open && (
        <div
          className="fixed inset-0 z-30 md:hidden"
          aria-hidden={!open}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black bg-opacity-5 transition-opacity duration-300"
            onClick={() => setOpen(false)}
          />
          {/* Sidebar panel */}
          <div
            className="absolute left-0 top-0 h-full transition-transform duration-300 bg-blue-700"
          >
            {sidebarContent}
          </div>
        </div>
      )}
      {/* Sidebar for desktop */}
      <div className="hidden md:flex md:flex-col md:h-full md:w-72 md:static md:relative z-10">
        {sidebarContent}
      </div>
    </>
  );
};

export default Sidebar; 