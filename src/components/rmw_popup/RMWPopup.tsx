"use client";
import React, { useEffect, useState } from "react";

interface RMWPopupProps {
  message: string;
  status: number;
  onClose?: () => void;
}

function RMWPopup({ message, status, onClose }: RMWPopupProps) {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      handleClose();
    }, 3000);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };
  
  const getStatusColor = () => {
    if (status >= 200 && status < 300) return "#10B981"; // Emerald green for success
    if (status >= 400 && status < 500) return "#F59E0B"; // Amber for client errors
    if (status >= 500) return "#EF4444"; // Red for server errors
    return "#3B82F6"; // Blue for other status codes
  };
  
  const getStatusIcon = () => {
    if (status >= 200 && status < 300) {
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      );
    }
    if (status >= 400) {
      return (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      );
    }
    return (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    );
  };

  const getStatusTitle = () => {
    if (status >= 200 && status < 300) return "Success";
    if (status >= 400 && status < 500) return "Warning";
    if (status >= 500) return "Error";
    return "Information";
  };

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-end justify-center p-4 px-4 py-6 pointer-events-none sm:p-6 sm:items-start sm:justify-end z-50">
      <div className="max-w-sm w-full bg-white shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
        <div className="p-4">
          <div className="flex items-start">
            <div 
              className="flex-shrink-0 p-2 rounded-full"
              style={{ backgroundColor: `${getStatusColor()}20` }}
            >
              <div style={{ color: getStatusColor() }}>
                {getStatusIcon()}
              </div>
            </div>
            <div className="ml-3 w-0 flex-1 pt-0.5">
              <p className="text-sm font-medium text-gray-900">
                {getStatusTitle()}
              </p>
              <p className="mt-1 text-sm text-gray-500">
                {message}
              </p>
              <div className="mt-2 flex items-center">
                <span 
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium"
                  style={{ 
                    backgroundColor: `${getStatusColor()}20`,
                    color: getStatusColor()
                  }}
                >
                  Status: {status}
                </span>
                <span className="ml-2 text-xs text-gray-400">
                  Ritz Media World
                </span>
              </div>
            </div>
            <div className="ml-4 flex-shrink-0 flex">
              <button
                className="bg-white rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleClose}
              >
                <span className="sr-only">Close</span>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        <div 
          className="h-1 w-full bg-gray-200"
          style={{ backgroundColor: `${getStatusColor()}40` }}
        >
          <div 
            className="h-full transition-all duration-3000 ease-linear"
            style={{ 
              width: "100%",
              backgroundColor: getStatusColor(),
              animation: "progress 3s linear forwards"
            }}
          ></div>
        </div>
      </div>

      <style jsx>{`
        @keyframes progress {
          from { width: 100%; }
          to { width: 0%; }
        }
        @keyframes fadeIn {
          from { 
            opacity: 0;
            transform: translateY(100%);
          }
          to { 
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (min-width: 640px) {
          @keyframes fadeIn {
            from { 
              opacity: 0;
              transform: translateY(-100%);
            }
            to { 
              opacity: 1;
              transform: translateY(0);
            }
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default RMWPopup;