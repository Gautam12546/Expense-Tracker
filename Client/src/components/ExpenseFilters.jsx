import React, { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';

const ExpenseFilters = () => {
  const { 
    categories, 
    selectedCategory, 
    setSelectedCategory, 
    sortBy,
    sortOrder,
    setSortBy,
    setSortOrder,
    getSortDisplay
  } = useExpenses();
  
  const [showSortMenu, setShowSortMenu] = useState(false);

  const handleClearFilters = () => {
    setSelectedCategory('');
    setSortBy('date');
    setSortOrder('desc');
  };

  const handleSort = (type, order) => {
    setSortBy(type);
    setSortOrder(order);
    setShowSortMenu(false);
  };

  const sortOptions = [
    { label: 'Newest First', type: 'date', order: 'desc' },
    { label: 'Oldest First', type: 'date', order: 'asc' },
    { label: 'Amount (High to Low)', type: 'amount', order: 'desc' },
    { label: 'Amount (Low to High)', type: 'amount', order: 'asc' },
    { label: 'Category (A-Z)', type: 'category', order: 'asc' },
    { label: 'Category (Z-A)', type: 'category', order: 'desc' }
  ];

  return (
    <div className="bg-white rounded-xl shadow-md p-4 mb-5">
      <div className="flex flex-wrap gap-4 items-end">
        {/* Category Filter */}
        <div className="flex-1 min-w-[200px]">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Filter by Category
          </label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
          >
            <option value="">All Categories</option>
            {categories.map(category => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Dropdown */}
        <div className="flex-1 min-w-[200px] relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Sort by
          </label>
          <button
            onClick={() => setShowSortMenu(!showSortMenu)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent text-left flex justify-between items-center"
          >
            <span>{getSortDisplay()}</span>
            <svg 
              className={`w-5 h-5 text-gray-400 transition-transform ${showSortMenu ? 'rotate-180' : ''}`} 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {/* Sort Dropdown Menu */}
          {showSortMenu && (
            <>
              <div 
                className="fixed inset-0 z-10"
                onClick={() => setShowSortMenu(false)}
              ></div>
              <div className="absolute z-20 mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg">
                {sortOptions.map((option) => (
                  <button
                    key={option.label}
                    onClick={() => handleSort(option.type, option.order)}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                      sortBy === option.type && sortOrder === option.order
                        ? 'bg-primary-50 text-primary-700 font-medium'
                        : 'text-gray-700'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Clear Filters Button */}
        <div>
          <button
            onClick={handleClearFilters}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors duration-200 font-medium"
          >
            Clear Filters
          </button>
        </div>
      </div>

      {/* Active Filters Display */}
      {(selectedCategory || sortBy !== 'date' || sortOrder !== 'desc') && (
        <div className="mt-3 flex flex-wrap gap-2">
          <span className="text-xs text-gray-500">Active filters:</span>
          {selectedCategory && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800">
              Category: {selectedCategory}
              <button 
                onClick={() => setSelectedCategory('')}
                className="ml-1 hover:text-primary-900"
              >
                ×
              </button>
            </span>
          )}
          {(sortBy !== 'date' || sortOrder !== 'desc') && (
            <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800">
              Sort: {getSortDisplay()}
              <button 
                onClick={() => {
                  setSortBy('date');
                  setSortOrder('desc');
                }}
                className="ml-1 hover:text-primary-900"
              >
                ×
              </button>
            </span>
          )}
        </div>
      )}
    </div>
  );
};

export default ExpenseFilters;