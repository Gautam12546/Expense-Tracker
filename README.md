# ExpenseTracker
Expense-Tracker/
│
├── Client/                          # Frontend - React + Vite
│   ├── node_modules/
│   ├── public/
│   │   └── vite.svg
│   │
│   ├── src/
│   │   ├── components/
│   │   │   ├── ExpenseForm.jsx      # Form to add new expenses
│   │   │   ├── ExpenseList.jsx      # Table to display expenses
│   │   │   ├── ExpenseFilters.jsx   # Filter by category & sort
│   │   │   ├── TotalDisplay.jsx     # Show total of visible expenses
│   │   │   │
│   │   │   └── common/              # Reusable components
│   │   │       ├── Loader.jsx        # Loading spinner
│   │   │       ├── ErrorMessage.jsx  # Error display with retry
│   │   │       └── Toast.jsx         # Success/error notifications
│   │   │
│   │   ├── services/
│   │   │   ├── expenseService.js    # API calls for expenses
│   │   │   └── apiClient.js          # Axios configuration with retry logic
│   │   │
│   │   ├── hooks/
│   │   │   ├── useExpenses.js        # Custom hook for expense logic
│   │   │   └── useDebounce.js        # Debounce hook for performance
│   │   │
│   │   ├── utils/
│   │   │   ├── formatters.js         # Currency & date formatting
│   │   │   └── validators.js         # Form validation functions
│   │   │
│   │   ├── context/
│   │   │   └── ExpenseContext.jsx    # Global state management
│   │   │
│   │   ├── App.jsx                    # Main application component
│   │   ├── main.jsx                   # Entry point
│   │   ├── index.css                   # Tailwind styles
│   │   └── App.css                     # App-specific styles
│   │
│   ├── .gitignore
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── README.md
│   ├── vite.config.js
│   ├── tailwind.config.js              # Tailwind configuration
│   ├── postcss.config.js               # PostCSS configuration
│   ├── .env.development                 # Dev environment variables
│   └── .env.production                  # Prod environment variables
│
├── Server/                          # Backend - Node.js + Express
│   ├── node_modules/
│   │
│   ├── config/
│   │   └── database.js               # MongoDB connection setup
│   │
│   ├── controllers/
│   │   └── expenseController.js      # Business logic for expenses
│   │
│   ├── middleware/
│   │   ├── validateExpense.js        # Input validation
│   │   ├── errorHandler.js            # Centralized error handling
│   │   └── idempotency.js             # Prevent duplicate submissions
│   │
│   ├── models/
│   │   └── Expense.js                 # MongoDB schema
│   │
│   ├── routes/
│   │   └── expenseRoutes.js           # API endpoints
│   │
│   ├── .env                            # Environment variables
│   ├── index.js                        # Server entry point
│   ├── package-lock.json
│   ├── package.json
│   └── README.md                        # API documentation
│
└── README.md                            # Project overview
📝 Project Description
Expense Tracker - Personal Finance Tool
A full-stack expense tracking application built with the MERN stack (MongoDB, Express.js, React, Node.js) that helps users record and analyze their personal expenses.

✨ Core Features
Create Expenses

Add new expenses with amount, category, description, and date

Real-time form validation

Prevents duplicate submissions (idempotency)

View Expenses

Sortable table displaying all expenses

Format dates (DD/MM/YYYY) and currency (₹)

Empty state handling

Filter by Category

Dropdown filter populated from existing categories

Clear filters option

Active filter indicators

Sort by Date

Newest first (default)

Oldest first option

Visual sort indicators

Real-time Total

Shows sum of visible expenses

Updates instantly with filters/sorting

Displays average per entry

🛠️ Technology Stack
Frontend:

React 18 with Vite for fast builds

Tailwind CSS for styling

Axios for API calls with retry logic

Context API for state management

date-fns for date manipulation

Backend:

Node.js with Express

MongoDB with Mongoose ODM

Idempotency for duplicate prevention

Comprehensive error handling

Input validation

🏗️ Key Design Decisions
Idempotency: Implemented request deduplication to handle network retries and page refreshes safely

MongoDB: Chosen for flexible schema and native JSON support

Client-side sorting: Reduces API calls and provides instant feedback

Retry logic: 3 attempts with exponential backoff for resilience

Money handling: Stored as decimal with 2 decimal places to prevent floating-point issues

📡 API Endpoints
Method	Endpoint	Description
POST	/api/expenses	Create new expense
GET	/api/expenses	Get all expenses (with filters)
GET	/api/expenses?category=Food	Filter by category
GET	/api/expenses?sort=date_desc	Sort by date
GET	/api/expenses/summary	Get category summary
🚀 Quick Start
Backend:

bash
cd Server
npm install
npm run dev
Frontend:

bash
cd Client
npm install
npm run dev
