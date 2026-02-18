
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
