import React from 'react';

const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-900">
      <div className="flex flex-col items-center">
        <div className="w-16 h-16 rounded-full bg-green-500 animate-spin-slow">
          <svg
            className="w-full h-full text-white p-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 12h2m7-7h2M3 18h2m6 0h1M21 12h2m-9-7h1M4 8h16M4 16h16"
            />
          </svg>
        </div>

        <p className="text-white mt-4 text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
