import React from 'react';

const Loader = ({ size = 'medium', message = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-5 h-5 border-2',
    medium: 'w-10 h-10 border-4',
    large: 'w-16 h-16 border-4'
  };

  const textSizes = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base'
  };

  return (
    <div className="flex flex-col items-center justify-center p-5">
      <div className={`${sizeClasses[size]} border-gray-200 border-t-primary-600 rounded-full animate-spin`}></div>
      {message && (
        <div className={`mt-3 text-gray-600 ${textSizes[size]}`}>{message}</div>
      )}
    </div>
  );
};

export default Loader;