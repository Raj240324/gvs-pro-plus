import React from 'react';

const LoadingSpinner = () => (
  <div className="flex items-center justify-center min-h-screen bg-white dark:bg-slate-900">
    <div className="relative w-16 h-16">
      <div className="absolute top-0 left-0 w-full h-full border-4 border-slate-200 dark:border-slate-700 rounded-full"></div>
      <div className="absolute top-0 left-0 w-full h-full border-4 border-teal-500 rounded-full border-t-transparent animate-spin"></div>
    </div>
  </div>
);

export default LoadingSpinner;
