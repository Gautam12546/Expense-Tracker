import React, { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { formatCurrency, formatDate } from '../utils/formatters';
import Loader from './common/Loader';
import ErrorMessage from './common/ErrorMessage';

const ExpenseList = () => {
  const { expenses, loading, error, refreshExpenses, sortBy, sortOrder, setSortBy, setSortOrder } = useExpenses();
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortBy === key) {
      direction = sortOrder === 'asc' ? 'desc' : 'asc';
    }
    setSortBy(key);
    setSortOrder(direction);
  };

  const getSortIcon = (key) => {
    if (sortBy !== key) return '↕️';
    return sortOrder === 'asc' ? '↑' : '↓';
  };

  const getSortClass = (key) => {
    return sortBy === key ? 'text-primary-600 font-semibold' : 'text-gray-600';
  };

  if (loading && expenses.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <Loader message="Loading expenses..." />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-md p-6">
        <ErrorMessage message={error} onRetry={refreshExpenses} />
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-md p-8">
        <div className="text-center">
          <p className="text-gray-500 text-lg">📭 No expenses found</p>
          <p className="text-gray-400 text-sm mt-2">
            Add your first expense using the form above
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">Expense History</h3>
        <span className="text-sm text-gray-500">
          {expenses.length} {expenses.length === 1 ? 'entry' : 'entries'}
        </span>
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              <th 
                className={`text-left py-3 px-4 text-sm font-medium cursor-pointer hover:bg-gray-50 transition-colors ${getSortClass('date')}`}
                onClick={() => handleSort('date')}
              >
                Date {getSortIcon('date')}
              </th>
              <th 
                className={`text-left py-3 px-4 text-sm font-medium cursor-pointer hover:bg-gray-50 transition-colors ${getSortClass('category')}`}
                onClick={() => handleSort('category')}
              >
                Category {getSortIcon('category')}
              </th>
              <th className="text-left py-3 px-4 text-sm font-medium text-gray-600">
                Description
              </th>
              <th 
                className={`text-right py-3 px-4 text-sm font-medium cursor-pointer hover:bg-gray-50 transition-colors ${getSortClass('amount')}`}
                onClick={() => handleSort('amount')}
              >
                Amount {getSortIcon('amount')}
              </th>
            </tr>
          </thead>
          <tbody>
            {expenses.map((expense) => (
              <tr key={expense._id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 text-sm text-gray-700">{formatDate(expense.date)}</td>
                <td className="py-3 px-4">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    {expense.category}
                  </span>
                </td>
                <td className="py-3 px-4 text-sm text-gray-700">{expense.description}</td>
                <td className="py-3 px-4 text-sm font-semibold text-green-600 text-right">
                  {formatCurrency(expense.amount)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Row */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center text-sm">
          <span className="text-gray-600">Total:</span>
          <span className="font-bold text-green-600">
            {formatCurrency(expenses.reduce((sum, exp) => sum + exp.amount, 0))}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ExpenseList;