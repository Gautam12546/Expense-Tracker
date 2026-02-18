import { useState, useEffect, useCallback, useMemo } from 'react';
import { expenseService } from '../services/expenseService';

export const useExpenses = () => {
  const [expenses, setExpenses] = useState([]);
  const [allExpenses, setAllExpenses] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [sortOrder, setSortOrder] = useState('desc');

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
    } finally {
      setLoading(false);
    }
  }, [selectedCategory]);

  const addExpense = async (expenseData) => {
    setLoading(true);
    setError(null);
    try {
      await expenseService.createExpense(expenseData);
      await fetchExpenses();
      return { success: true };
    } catch (err) {
      const errorMessage = err.message || 'Failed to add expense';
      setError(errorMessage);
      return { success: false, error: errorMessage };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const sortedAndFilteredExpenses = useMemo(() => {
    let filtered = [...allExpenses];
    
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

  const totalAmount = useMemo(() => {
    return sortedAndFilteredExpenses.reduce((sum, exp) => sum + exp.amount, 0);
  }, [sortedAndFilteredExpenses]);

  const getSortDisplay = () => {
    const sortMap = {
      date: sortOrder === 'desc' ? 'Newest First' : 'Oldest First',
      amount: sortOrder === 'desc' ? 'Amount (High to Low)' : 'Amount (Low to High)',
      category: sortOrder === 'desc' ? 'Category (Z-A)' : 'Category (A-Z)'
    };
    return sortMap[sortBy] || 'Newest First';
  };

  return {
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
};