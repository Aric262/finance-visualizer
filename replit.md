# Personal Finance Visualizer

## Overview

Personal Finance Visualizer is a secure, multi-user Next.js web application that helps users track their expenses, set monthly budgets, and visualize spending patterns through interactive charts and insights. The application features user authentication, dark mode, CSV export, inline editing, recurring transactions, and real-time financial analytics to help users manage their personal finances effectively.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes (October 2025)

### Authentication & Security
- Implemented JWT-based authentication with bcrypt password hashing
- Added user registration, login, and logout functionality
- Protected all API routes with user authentication middleware
- Multi-user support with data isolation per user

### New Features
- **Dark Mode**: System-sync dark mode using next-themes library with hydration fix
- **CSV Export**: Download transaction history as CSV files
- **Inline Editing**: Edit transactions directly in the list view
- **Recurring Transactions**: Mark transactions as recurring with checkbox
- **Automatic Recurring Transaction Generation**: Recurring transactions automatically create new instances for the current month

### Latest Updates (October 22, 2025)
- Fixed dark mode hydration issues by adding mounted state check to prevent layout shift
- Implemented automatic recurring transaction generation system
  - Added `lastGeneratedMonth` and `originalRecurringId` fields to Transaction model
  - Created `/api/transactions/generate-recurring` endpoint for automatic generation
  - Integrated automatic generation into TransactionList component on mount
  - Prevents duplicate recurring transactions for the same month
- Added transaction filtering and search functionality
  - Search by description with real-time filtering
  - Filter by category (All, Food, Rent, Travel, Shopping, Bills, Other)
  - Filter by recurring status (All, Recurring Only, Non-Recurring)
  - Date range filtering (From/To dates)
  - Shows count of filtered vs total transactions
  - Clear filters button to reset all filters
- Implemented responsive sidebar navigation
  - Collapsible sidebar with mobile hamburger menu
  - Navigation sections: Overview, Transactions, Budgets, Analytics
  - Integrated dark mode toggle in sidebar
  - Logout button moved to sidebar
  - Smooth transitions and mobile-friendly overlay
  - Fixed sidebar color shifting issue using CSS variables
- Enhanced Overview section
  - Added Total Spend component with month/year toggle
  - Removed transaction form from Overview (moved to Transactions section)
  - Clean, focused dashboard view with spending insights

## System Architecture

### Frontend Architecture

**Framework**: Next.js 15.3.5 with React 19 and TypeScript
- **Rendering Strategy**: Client-side rendering for interactive components using the "use client" directive
- **Styling**: Tailwind CSS v4 with custom CSS variables for theming
- **State Management**: Local component state using React hooks (useState, useEffect)
- **UI Components**: Custom components with lucide-react icons for visual consistency

**Component Structure**:
- Page components in `src/app/` following Next.js App Router convention
- Reusable UI components in `src/components/`
- Real-time data refresh mechanism using a boolean toggle pattern passed as props

**Key Design Decisions**:
- Client-side data fetching in components for real-time updates
- Prop-based refresh mechanism to trigger re-fetching across multiple components
- Responsive design with mobile-first approach using Tailwind's grid system

### Backend Architecture

**Framework**: Next.js API Routes (serverless functions)
- **API Pattern**: RESTful endpoints in `src/app/api/` directory
- **Request Handling**: Native Next.js Request/Response objects
- **Data Operations**: Standard CRUD operations (GET, POST, DELETE)

**API Endpoints**:
- `/api/auth/register` - User registration with email/password
- `/api/auth/login` - User login with session creation
- `/api/auth/logout` - User logout and session destruction
- `/api/auth/user` - Get current authenticated user
- `/api/transactions` - Manage financial transactions (GET, POST, PATCH, DELETE) - Protected
- `/api/transactions/generate-recurring` - Automatically generate recurring transactions for the current month - Protected
- `/api/budgets` - Manage monthly budgets (GET, POST with upsert) - Protected

**Key Design Decisions**:
- Serverless architecture leveraging Next.js API routes for automatic scaling
- Upsert pattern for budgets to prevent duplicate category-month combinations
- JSON-based request/response format

### Data Storage

**Database**: MongoDB with Mongoose ODM
- **Connection Management**: Cached connection pattern to prevent exhausting database connections in serverless environment
- **Schema Design**: Two main models with simple, flat structures

**Data Models**:

*User Model*:
- email (String, unique, required)
- password (String, hashed with bcrypt, required)
- name (String, required)
- createdAt (Date)

*Transaction Model*:
- userId (String, required, indexed) - Links to User
- amount (Number)
- description (String)
- date (Date)
- category (Enum: Food, Rent, Travel, Shopping, Bills, Other)
- isRecurring (Boolean, default: false)
- lastGeneratedMonth (String, nullable) - Tracks which month recurring transaction was last generated
- originalRecurringId (String, nullable) - Links auto-generated transactions to their recurring template

*Budget Model*:
- userId (String, required, indexed) - Links to User
- category (String)
- amount (Number)
- month (String, format: "YYYY-MM")

**Key Design Decisions**:
- Connection caching to reuse database connections across serverless invocations
- Enum validation for transaction categories to ensure data consistency
- Month stored as string for simplified querying and comparison
- Mongoose models with conditional creation to prevent re-compilation errors in development

### External Dependencies

**Database Service**:
- MongoDB (cloud or self-hosted) - Requires MONGODB_URI environment variable

**Authentication**:
- jsonwebtoken v9.x - JWT token generation and verification
- bcryptjs v2.x - Password hashing and comparison
- HTTP-only cookies for session management

**Data Processing**:
- papaparse v5.x - CSV generation and parsing for data export

**UI Libraries**:
- Recharts v3.0.2 - Bar, Pie, and Line charts with responsive containers
- lucide-react v0.525.0 - Consistent iconography throughout the application
- next-themes v0.x - System-sync dark mode support

**CSS Framework**:
- Tailwind CSS v4.1.11 with @tailwindcss/postcss plugin for styling
- Autoprefixer for CSS compatibility
- Dark mode support via Tailwind's dark: variants

**Font Optimization**:
- next/font with Geist and Geist Mono font families for optimized loading

**Development Server**:
- Configured to run on port 5000 with 0.0.0.0 host binding for Replit compatibility

**Environment Variables Required**:
- `MONGODB_URI` - MongoDB connection string (required)
- `JWT_SECRET` - Secret key for JWT token signing (required, min 32 characters)