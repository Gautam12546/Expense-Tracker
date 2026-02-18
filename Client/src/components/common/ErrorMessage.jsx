import React from 'react';

const ErrorMessage = ({ message, onRetry }) => {
  return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-4 my-2 flex items-center justify-between flex-wrap gap-3">
      <span className="text-red-700 text-sm flex-1">⚠️ {message}</span>
      {onRetry && (
        <button 
          onClick={onRetry}
          className="px-3 py-1.5 bg-red-600 text-white text-sm font-medium rounded-md hover:bg-red-700 transition-colors duration-200"
        >
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorMessage;