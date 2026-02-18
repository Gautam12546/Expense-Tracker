import React, { createContext, useState, useContext, useCallback, useEffect } from 'react';
import { expenseService } from '../services/expenseService';

const ExpenseContext = createContext();

export const useExpenses = () => {
  const context = useContext(ExpenseContext);
  if (!context) {
    throw new Error('useExpenses must be used within ExpenseProvider');
  }
  return context;
};

export const ExpenseProvider = ({ children }) => {
  const [expenses, setExpenses] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]); // Store unfiltered expenses
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('date'); // 'date', 'amount', 'category'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc' or 'desc'

  // Fetch expenses from API
  const fetchExpenses = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = {};
      if (selectedCategory) params.category = selectedCategory;
      
      const response = await expenseService.getExpenses(params);
      setAllExpenses(response.data);
      if (response.filters?.categories) {
        setCategories(response.filters.categories);
      }
    } catch (err) {
      setError(err.message || 'Failed to fetch expenses');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  // Add new expense
  const addExpense = async (expenseData) => {
    setLoading(true);
    setError(null);
    try {
      await expenseService.createExpense(expenseData);
      await fetchExpenses(); // Refresh the list
      return { success: true };
    } catch (err) {
      const errorMessage = err.message || 'Failed to add expense';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  // Load expenses on mount and when category filter changes
  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  // Apply sorting to expenses
  const sortedAndFilteredExpenses = React.useMemo(() => {
    let filtered = [...allExpenses];
    
    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (sortBy) {
        case 'date':
          comparison = new Date(a.date) - new Date(b.date);
          break;
        case 'amount':
          comparison = a.amount - b.amount;
          break;
        case 'category':
          comparison = a.category.localeCompare(b.category);
          break;
        default:
          comparison = 0;
      }
      
      return sortOrder === 'desc' ? -comparison : comparison;
    });
    
    return filtered;
  }, [allExpenses, sortBy, sortOrder]);

  // Calculate total
  const totalAmount = React.useMemo(() => {
    return sortedAndFilteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  }, [sortedAndFilteredExpenses]);

  // Get sort display name
  const getSortDisplay = () => {
    const sortMap = {
      date: sortOrder === 'desc' ? 'Newest First' : 'Oldest First',
      amount: sortOrder === 'desc' ? 'Amount (High to Low)' : 'Amount (Low to High)',
      category: sortOrder === 'desc' ? 'Category (Z-A)' : 'Category (A-Z)'
    };
    return sortMap[sortBy] || 'Newest First';
  };

  const value = {
    expenses: sortedAndFilteredExpenses,
    allExpenses,
    categories,
    loading,
    error,
    selectedCategory,
    sortBy,
    sortOrder,
    totalAmount,
    setSelectedCategory,
    setSortBy,
    setSortOrder,
    addExpense,
    refreshExpenses: fetchExpenses,
    getSortDisplay
  };

  return (
    <ExpenseContext.Provider value={value}>
      {children}
    </ExpenseContext.Provider>
  );
};