import React from 'react';

interface AlertProps {
  type: 'success' | 'error';
  message: string;
  onClose?: () => void;
}

const Alert: React.FC<AlertProps> = ({ type, message, onClose }) => {
  const baseClass =
    'p-4 rounded-lg mb-4 flex items-center justify-between shadow-md';
  const typeClass =
    type === 'success'
      ? 'bg-green-100 text-green-800 border border-green-300'
      : 'bg-red-100 text-red-700 border border-red-300';

  return (
    <div className={`${baseClass} ${typeClass}`}> 
      <span>{message}</span>
      {onClose && (
        <button
          onClick={onClose}
          className="ml-4 text-lg font-bold focus:outline-none"
          aria-label="Close alert"
        >
          &times;
        </button>
      )}
    </div>
  );
};

export default Alert; 