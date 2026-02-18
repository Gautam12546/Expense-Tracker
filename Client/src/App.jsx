import React, { useState, useEffect } from 'react';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import ExpenseFilters from './components/ExpenseFilters';
import TotalDisplay from './components/TotalDisplay';
import Toast from './components/common/Toast';
import { useExpenses } from './context/ExpenseContext';

function App() {
  const { error, refreshExpenses } = useExpenses();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');
  const [toastType, setToastType] = useState('success');
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    if (error) {
      setToastMessage(error);
      setToastType('error');
      setShowToast(true);
      
      const timer = setTimeout(() => {
        setShowToast(false);
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [error]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 400);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Header */}
        <header className="bg-white rounded-xl shadow-md p-6 mb-6 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">💰 Expense Tracker</h1>
          <p className="text-gray-500">
            Track your spending, understand where your money goes
          </p>
        </header>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sidebar - Form */}
          <aside className="lg:col-span-1">
            <div className="sticky top-6">
              <ExpenseForm />
              
              {/* Quick Tips */}
              <div className="bg-white rounded-xl shadow-md p-5 mt-5">
                <h4 className="font-semibold text-gray-700 mb-3 flex items-center">
                  <span className="text-xl mr-2">📝</span> Quick Tips
                </h4>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    Use categories to organize expenses
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    Add description for better tracking
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    Filter by category to analyze spending
                  </li>
                  <li className="flex items-start">
                    <span className="text-primary-500 mr-2">•</span>
                    Sort to see newest expenses first
                  </li>
                </ul>
              </div>
            </div>
          </aside>

          {/* Main Content Area */}
          <main className="lg:col-span-2">
            <TotalDisplay />
            <ExpenseFilters />
            <ExpenseList />
          </main>
        </div>

        {/* Footer */}
        <footer className="mt-8 text-center py-6 border-t border-gray-200">
          <p className="text-sm text-gray-500">
            Expense Tracker v1.0.0 | Built with React & Tailwind CSS
          </p>
          <p className="text-xs text-gray-400 mt-1">
            All amounts in Indian Rupees (₹)
          </p>
        </footer>
      </div>

      {/* Scroll to top / Refresh button */}
      {showScrollButton && (
        <button 
          onClick={() => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
            refreshExpenses();
          }}
          className="fixed bottom-5 right-5 bg-primary-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-primary-700 transition-all duration-200 flex items-center gap-2 z-40"
        >
          <span>🔄</span>
          <span className="hidden sm:inline">Refresh</span>
        </button>
      )}

      {/* Toast Notification */}
      {showToast && (
        <Toast 
          message={toastMessage} 
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </div>
  );
}

export default App;