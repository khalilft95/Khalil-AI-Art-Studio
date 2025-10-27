
import React from 'react';

export const UploadIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className || "h-8 w-8 text-gray-400"}
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"
    />
  </svg>
);

export const SparkleIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={className || "h-5 w-5 mr-2 inline-block"} 
        viewBox="0 0 24 24" 
        fill="currentColor"
    >
        <path d="M12 2.25a.75.75 0 01.75.75v3.655a.25.25 0 00.19.24l3.655.75a.75.75 0 010 1.41l-3.655.75a.25.25 0 00-.19.24v3.655a.75.75 0 01-1.5 0v-3.655a.25.25 0 00-.19-.24l-3.655-.75a.75.75 0 010-1.41l3.655-.75a.25.25 0 00.19-.24V3a.75.75 0 01.75-.75zM10.5 15.75a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75zM15 9.75a.75.75 0 01.75.75v2.25a.75.75 0 01-1.5 0v-2.25a.75.75 0 01.75-.75z" />
    </svg>
);


export const DownloadIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className || "h-5 w-5 mr-2"}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  </svg>
);

export const LoadingSpinner: React.FC = () => (
    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);
