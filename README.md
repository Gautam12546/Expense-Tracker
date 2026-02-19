📊 Expense Tracker - Personal Finance Tool
📋 Project Overview
A full-stack expense tracking application built with the MERN stack (MongoDB, Express.js, React, Node.js) that helps users record, manage, and analyze their personal expenses. Designed for production-like quality with resilience features for real-world conditions including unreliable networks, browser refreshes, and duplicate submissions.

🚀 Live Demo
Frontend: https://expense-tracker-3if9.vercel.app/

Backend API: https://expense-tracker-hddt.onrender.com

**✨ Features**
*Core Features (All Implemented ✓)*
**Feature	          Description**
Create Expenses	    Add new expenses with amount (₹), category, description, and date
View Expenses	      Sortable table displaying all expenses with proper formatting
Filter by Category	Dynamic dropdown filter populated from existing categories
Sort by Date	      Newest first (default) with toggle option for oldest first
Real-time Total	    Automatic calculation of visible expenses with ₹ formatting

*Resilience Features*
Idempotency: Prevents duplicate expense creation on page refresh or retry
Retry Logic: Automatic retry (3 attempts) with exponential backoff for failed API calls
Loading States: Visual feedback during all async operations
Error Handling: User-friendly error messages with retry options
Form Validation: Client-side validation before submission
Error Boundary: Graceful component failure handling

**Nice-to-Have Features**
✅ Basic validation (no negative amounts, required fields, max limits)
✅ Summary view (total per category with counts and averages)
✅ Error and loading states throughout UI
✅ Responsive design for mobile/desktop
✅ Toast notifications for success/error feedback
✅ Debounced inputs for performance

🛠️ Technology Stack
**FRONTEND**
**Technology   Purpose**
React 18	    UI library with hooks and functional components
Vite	        Fast build tool and development server
Tailwind CSS	Utility-first CSS framework for styling
Axios	        HTTP client with interceptors and retry logic
date-fns	    Date manipulation and formatting
Context API	  State management
**BACKEND**
**Technology	Purpose**
Node.js	      JavaScript runtime
Express	      Web framework
MongoDB	      NoSQL database
Mongoose	    ODM for data modeling
Helmet	      Security headers
Express       Rate Limit	API rate limiting
CORS	        Cross-origin resource sharing

**PROJECT STRUCTURE**

📦 Expense-Tracker
│
├── 📂 Client/                          # Frontend - React + Vite
│   ├── 📂 src/
│   │   ├── 📂 components/
│   │   │   ├── 📄 ExpenseForm.jsx          # Form to add new expenses
│   │   │   ├── 📄 ExpenseList.jsx          # Table to display expenses
│   │   │   ├── 📄 ExpenseFilters.jsx       # Filter by category & sort
│   │   │   ├── 📄 TotalDisplay.jsx         # Show total of visible expenses
│   │   │   │
│   │   │   └── 📂 common/                   # Reusable components
│   │   │       ├── 📄 Loader.jsx            # Loading spinner
│   │   │       ├── 📄 ErrorBoundary.jsx     # Error boundary for components
│   │   │       └── 📄 Toast.jsx             # Success/error notifications
│   │   │
│   │   ├── 📂 services/
│   │   │   ├── 📄 expenseService.js         # API calls for expenses
│   │   │   └── 📄 apiClient.js              # Axios config with retry logic
│   │   │
│   │   ├── 📂 hooks/
│   │   │   ├── 📄 useExpenses.js            # Custom hook for expense logic
│   │   │   └── 📄 useDebounce.js            # Debounce hook for performance
│   │   │
│   │   ├── 📂 utils/
│   │   │   ├── 📄 formatters.js             # Currency & date formatting
│   │   │   └── 📄 validators.js             # Form validation functions
│   │   │
│   │   ├── 📂 context/
│   │   │   └── 📄 ExpenseContext.jsx        # Global state management
│   │   │
│   │   ├── 📄 App.jsx                        # Main application component
│   │   └── 📄 main.jsx                       # Entry point
│   │
│   ├── 📄 .env.development                    # Dev environment variables
│   ├── 📄 .env.production                     # Prod environment variables
│   ├── 📄 index.html
│   ├── 📄 package.json
│   └── 📄 vite.config.js
│
├── 📂 Server/                              # Backend - Node.js + Express
│   ├── 📂 models/
│   │   └── 📄 Expense.js                    # MongoDB schema
│   │
│   ├── 📂 controllers/
│   │   └── 📄 expenseController.js          # Business logic for expenses
│   │
│   ├── 📂 routes/
│   │   └── 📄 expenseRoutes.js              # API endpoints
│   │
│   ├── 📂 middleware/
│   │   ├── 📄 validateExpense.js            # Input validation
│   │   ├── 📄 errorHandler.js                # Centralized error handling
│   │   └── 📄 idempotency.js                 # Prevent duplicate submissions
│   │
│   ├── 📂 config/
│   │   └── 📄 database.js                    # MongoDB connection setup
│   │
│   ├── 📂 utils/
│   │   └── 📄 constants.js                   # Shared constants
│   │
│   ├── 📄 .env                                # Environment variables
│   ├── 📄 index.js                            # Server entry point
│   └── 📄 package.json
│
└── 📄 README.md                                # Project documentation


**Backend Setup**
bash
# Clone the repository
git clone <repository-url>
cd Server

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Update .env with your MongoDB URI

# Start development server
npm run dev
Frontend Setup
bash
cd Client

# Install dependencies
npm install

# Create environment file
cp .env.example .env
# Update VITE_API_URL if needed (default: http://localhost:5000/api)

# Start development server
npm run dev
