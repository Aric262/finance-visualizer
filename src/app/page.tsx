"use client";

import { useState } from "react";
<<<<<<< HEAD
=======
import { useAuth } from "@/contexts/AuthContext";
import AuthModal from "@/components/AuthModal";
import Sidebar from "@/components/Sidebar";
>>>>>>> 67e2183 (Clean fixes and resolved issues for Nov 02)
import TransactionForm from "@/components/TransactionForm";
import TransactionList from "@/components/TransactionList";
import MonthlyChart from "@/components/MonthlyChart";
import CategoryChart from "@/components/CategoryChart";
import DashboardSummary from "@/components/DashboardSummary";
import BudgetForm from "@/components/BudgetForm";
import BudgetVsActualChart from "@/components/BudgetVsActualChart";
import SpendingInsights from "@/components/SpendingInsights";
<<<<<<< HEAD
import { LineChart, PlusCircle, ClipboardList, Wallet } from "lucide-react";

export default function Home() {
  const [refresh, setRefresh] = useState(false);

  return (
    <main className="max-w-6xl mx-auto py-8 px-4 space-y-10 bg-white min-h-screen">
      {/* Header */}
      <header className="text-center space-y-2">
        <h1 className="text-4xl font-bold text-gray-800">
          Personal Finance Visualizer
        </h1>
        <p className="text-gray-600 text-sm">Track your expenses, budgets, and insights with ease</p>
      </header>

      {/* Overview Summary */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-gray-700 mb-2">
          <LineChart className="text-blue-500" />
          <h2 className="text-xl font-semibold">Overview</h2>
        </div>
        <DashboardSummary refresh={refresh}/>
        <SpendingInsights refresh={refresh}/>
      </section>

      {/* Add Transaction */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-gray-700 mb-2">
          <PlusCircle className="text-green-600" />
          <h2 className="text-xl font-semibold">Add Transaction</h2>
        </div>
        <TransactionForm refresh={() => setRefresh(!refresh)} />
      </section>

      {/* Charts Section */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-gray-700 mb-2">
          <LineChart className="text-purple-600" />
          <h2 className="text-xl font-semibold">Analytics</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <MonthlyChart refresh={refresh}/>
          <CategoryChart refresh={refresh} />
        </div>
      </section>

      {/* Transaction History */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-gray-700 mb-2">
          <ClipboardList className="text-gray-600" />
          <h2 className="text-xl font-semibold">Transaction History</h2>
        </div>
        <TransactionList refresh={refresh} />
      </section>

      {/* Budget Tools */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 text-gray-700 mb-2">
          <Wallet className="text-emerald-600" />
          <h2 className="text-xl font-semibold">Budget Planning</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <BudgetForm refresh={refresh} />
          <BudgetVsActualChart refresh={refresh} />
        </div>
      </section>
    </main>
=======
import SavingsDisplay from "@/components/SavingsDisplay";
import SavingsForm from "@/components/SavingsForm";
import SavingsList from "@/components/SavingsList";
import { LineChart, PlusCircle, Wallet, BarChart3, PiggyBank } from "lucide-react";

export default function Home() {
  const [refresh, setRefresh] = useState(false);
  const [activeSection, setActiveSection] = useState("overview");
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900">
        <div className="text-xl text-gray-600 dark:text-gray-300">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return <AuthModal />;
  }

  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      
      <main className="flex-1 lg:ml-0 overflow-x-hidden">
        <div className="max-w-7xl mx-auto py-8 px-4 lg:px-8 mt-16 lg:mt-0">
          {activeSection === "overview" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                  Overview
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Your financial dashboard at a glance
                </p>
              </div>
              
              <SavingsDisplay refresh={refresh} />
              <DashboardSummary refresh={refresh} />
              <SpendingInsights refresh={refresh} />
            </div>
          )}

          {activeSection === "transactions" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                  Transactions
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Manage and track all your transactions
                </p>
              </div>
              
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <PlusCircle className="text-green-600 dark:text-green-400" />
                  <h2 className="text-xl font-semibold">Add New Transaction</h2>
                </div>
                <TransactionForm refresh={() => setRefresh(!refresh)} />
              </section>
              
              <TransactionList refresh={refresh} />
            </div>
          )}

          {activeSection === "savings" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                  Savings Management
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Build and manage your savings goals
                </p>
              </div>

              <section className="space-y-4">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <PiggyBank className="text-green-600 dark:text-green-400" />
                  <h2 className="text-xl font-semibold">Add New Savings</h2>
                </div>
                <SavingsForm refresh={() => setRefresh(!refresh)} />
              </section>

              <section className="space-y-4">
                <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                  <PlusCircle className="text-green-600 dark:text-green-400" />
                  <h2 className="text-xl font-semibold">Your Savings</h2>
                </div>
                <SavingsList refresh={refresh} />
              </section>
            </div>
          )}

          {activeSection === "budgets" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                  Budget Planning
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Set and track your monthly budgets
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <Wallet className="text-emerald-600 dark:text-emerald-400" />
                    <h2 className="text-xl font-semibold">Set Budget</h2>
                  </div>
                  <BudgetForm refresh={refresh} />
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <LineChart className="text-blue-600 dark:text-blue-400" />
                    <h2 className="text-xl font-semibold">Budget vs Actual</h2>
                  </div>
                  <BudgetVsActualChart refresh={refresh} />
                </div>
              </div>
            </div>
          )}

          {activeSection === "analytics" && (
            <div className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
                  Analytics
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Visualize your spending patterns
                </p>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <BarChart3 className="text-purple-600 dark:text-purple-400" />
                    <h2 className="text-xl font-semibold">Monthly Trends</h2>
                  </div>
                  <MonthlyChart refresh={refresh} />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                    <LineChart className="text-blue-600 dark:text-blue-400" />
                    <h2 className="text-xl font-semibold">Category Breakdown</h2>
                  </div>
                  <CategoryChart refresh={refresh} />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
>>>>>>> 67e2183 (Clean fixes and resolved issues for Nov 02)
  );
}
