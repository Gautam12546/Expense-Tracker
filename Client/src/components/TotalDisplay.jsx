import React from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { formatCurrency } from '../utils/formatters';

const TotalDisplay = () => {
  const { totalAmount, expenses, selectedCategory, getSortDisplay } = useExpenses();

  const getFilterDescription = () => {
    const parts = [];
    if (selectedCategory) {
      parts.push(`category: ${selectedCategory}`);
    }
    parts.push(getSortDisplay().toLowerCase());
    return parts.length > 0 ? ` (${parts.join(', ')})` : '';
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 mb-5 flex flex-wrap justify-between items-center gap-4">
      <div>
        <p className="text-sm text-gray-500 mb-1">Total Visible Expenses</p>
        <p className="text-3xl font-bold text-green-600">{formatCurrency(totalAmount)}</p>
        <p className="text-xs text-gray-500 mt-1">
          Based on {expenses.length} {expenses.length === 1 ? 'entry' : 'entries'}
          <span className="ml-1 inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-primary-100 text-primary-800">
            {getFilterDescription()}
          </span>
        </p>
      </div>
      
      <div className="text-right">
        <p className="text-sm text-gray-500 mb-1">Average per entry</p>
        <p className="text-xl font-semibold text-primary-600">
          {expenses.length > 0 ? formatCurrency(totalAmount / expenses.length) : '₹0.00'}
        </p>
      </div>
    </div>
  );
};

export default TotalDisplay;