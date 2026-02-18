import React, { useState } from 'react';
import { useExpenses } from '../context/ExpenseContext';
import { validateExpense } from '../utils/validators';
import { formatDateForInput } from '../utils/formatters';

const ExpenseForm = () => {
  const { addExpense, loading } = useExpenses();
  const [formData, setFormData] = useState({
    amount: '',
    category: '',
    description: '',
    date: formatDateForInput(new Date())
  });
  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState({ type: null, message: '' });

  const categories = ['Food', 'Transport', 'Shopping', 'Entertainment', 'Bills', 'Healthcare', 'Education', 'Other'];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: null
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const validation = validateExpense(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      setSubmitStatus({
        type: 'error',
        message: 'Please fix the errors in the form'
      });
      return;
    }

    const expenseData = {
      ...formData,
      amount: parseFloat(formData.amount)
    };

    const result = await addExpense(expenseData);
    
    if (result.success) {
      setFormData({
        amount: '',
        category: '',
        description: '',
        date: formatDateForInput(new Date())
      });
      setErrors({});
      setSubmitStatus({
        type: 'success',
        message: 'Expense added successfully!'
      });
      
      setTimeout(() => {
        setSubmitStatus({ type: null, message: '' });
      }, 3000);
    } else {
      setSubmitStatus({
        type: 'error',
        message: result.error || 'Failed to add expense'
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-md p-6 mb-5">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Expense</h3>
      
      {submitStatus.message && (
        <div className={`mb-4 p-3 rounded-lg ${
          submitStatus.type === 'success' 
            ? 'bg-green-50 text-green-700 border border-green-200' 
            : 'bg-red-50 text-red-700 border border-red-200'
        }`}>
          {submitStatus.message}
        </div>
      )}
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Amount (₹)
          </label>
          <input
            type="number"
            name="amount"
            step="0.01"
            min="0.01"
            value={formData.amount}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all ${
              errors.amount ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter amount"
            disabled={loading}
          />
          {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all ${
              errors.category ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
            }`}
            disabled={loading}
          >
            <option value="">Select a category</option>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all ${
              errors.description ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
            }`}
            placeholder="Enter description"
            disabled={loading}
          />
          {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            max={formatDateForInput(new Date())}
            className={`w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 transition-all ${
              errors.date ? 'border-red-500 focus:ring-red-500' : 'border-gray-300'
            }`}
            disabled={loading}
          />
          {errors.date && <p className="text-red-500 text-sm mt-1">{errors.date}</p>}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary-600 text-white px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors duration-200 font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? 'Adding...' : 'Add Expense'}
        </button>
      </div>
    </form>
  );
};

export default ExpenseForm;