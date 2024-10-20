import React, { useState } from 'react';

function Filter() {
  const [showCount, setShowCount] = useState(16);
  const [sortOption, setSortOption] = useState('Default');

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between bg-[#f9f3eb] p-4 space-y-4 sm:space-y-0">
      {/* Left Section (Filter + View Options + Results Count) */}
      <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4 w-full sm:w-auto justify-between">
        <button className="flex items-center text-black">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707l-7.414 7.414a1 1 0 00-.293.707v3.172a1 1 0 01-1.707.707l-2.828-2.828a1 1 0 01-.293-.707V12.12a1 1 0 00-.293-.707L3.293 6.707A1 1 0 013 6V4z" />
          </svg>
          <span className="ml-1">Filter</span>
        </button>

        <div className="flex space-x-2">
          <button className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" stroke="currentColor">
              <circle cx="4" cy="4" r="2"></circle>
              <circle cx="4" cy="12" r="2"></circle>
              <circle cx="4" cy="20" r="2"></circle>
              <circle cx="12" cy="4" r="2"></circle>
              <circle cx="12" cy="12" r="2"></circle>
              <circle cx="12" cy="20" r="2"></circle>
              <circle cx="20" cy="4" r="2"></circle>
              <circle cx="20" cy="12" r="2"></circle>
              <circle cx="20" cy="20" r="2"></circle>
            </svg>
          </button>
          <button className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7h18M3 12h18m-7 5h7" />
            </svg>
          </button>
        </div>

        <div className="border-l h-6 hidden sm:block"></div>
        <span className="text-gray-600">Showing 1-16 of 32 results</span>
      </div>

      {/* Right Section (Show Count + Sort Option) */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-1">
          <span className="text-gray-600">Show</span>
          <input
            type="number"
            className="w-12 p-1 text-center border"
            value={showCount}
            onChange={(e) => setShowCount(e.target.value)}
          />
        </div>

        <div className="flex items-center space-x-1">
          <span className="text-gray-600">Sort by</span>
          <select
            className="p-1 border"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="Default">Default</option>
            <option value="Price: Low to High">Price: Low to High</option>
            <option value="Price: High to Low">Price: High to Low</option>
          </select>
        </div>
      </div>
    </div>
  );
}

export default Filter;