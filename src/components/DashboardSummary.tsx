"use client";
import { useEffect, useState } from "react";
<<<<<<< HEAD
import { ReceiptText, TrendingDown } from "lucide-react";

export default function DashboardSummary({ refresh }: { refresh: boolean }) {
  const [total, setTotal] = useState(0);
  const [recent, setRecent] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/transactions");
      const txs = await res.json();
      setTotal(txs.reduce((acc: number, tx: any) => acc + tx.amount, 0));
      setRecent(txs.slice(0, 3)); // ✅ Show only top 3
    }
    fetchData();
=======
import { PiggyBank, TrendingDown, ReceiptText } from "lucide-react";

export default function DashboardSummary({ refresh }: { refresh: boolean }) {
  const [totalSavings, setTotalSavings] = useState(0);
  const [recentSavings, setRecentSavings] = useState<any[]>([]);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [recentTransactions, setRecentTransactions] = useState<any[]>([]);

  useEffect(() => {
    async function fetchSavingsData() {
      try {
        const res = await fetch("/api/savings");
        if (res.ok) {
          const savings = await res.json();
          setTotalSavings(savings.reduce((acc: number, s: any) => acc + s.amount, 0));
          setRecentSavings(savings.slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to fetch savings:", error);
      }
    }

    async function fetchTransactionsData() {
      try {
        const res = await fetch("/api/transactions");
        if (res.ok) {
          const txs = await res.json();
          setTotalExpenses(txs.reduce((acc: number, tx: any) => acc + tx.amount, 0));
          setRecentTransactions(txs.slice(0, 3));
        }
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
      }
    }

    fetchSavingsData();
    fetchTransactionsData();
>>>>>>> 67e2183 (Clean fixes and resolved issues for Nov 02)
  }, [refresh]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4 py-6">
<<<<<<< HEAD
      {/* Total Card */}
=======
      {/* Total Savings Card */}
      <div className="bg-gradient-to-br from-green-500 to-green-600 text-white p-6 rounded-lg shadow-md flex items-center gap-4">
        <PiggyBank className="w-10 h-10" />
        <div>
          <h3 className="text-sm uppercase tracking-wide font-medium">Total Savings</h3>
          <p className="text-3xl font-bold mt-1">₹{totalSavings.toLocaleString('en-IN')}</p>
        </div>
      </div>

      {/* Total Expenses Card */}
>>>>>>> 67e2183 (Clean fixes and resolved issues for Nov 02)
      <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white p-6 rounded-lg shadow-md flex items-center gap-4">
        <ReceiptText className="w-10 h-10" />
        <div>
          <h3 className="text-sm uppercase tracking-wide font-medium">Total Expenses</h3>
<<<<<<< HEAD
          <p className="text-3xl font-bold mt-1">₹{total}</p>
        </div>
      </div>

      {/* Recent Transactions Card */}
      <div className="bg-white col-span-2 p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-2 mb-3">
          <TrendingDown className="text-rose-500" />
          <h3 className="text-lg font-semibold text-gray-800">Recent Transactions</h3>
        </div>

        {recent.length === 0 ? (
          <p className="text-gray-500 text-sm">No recent transactions</p>
        ) : (
          <ul className="divide-y divide-gray-100 text-sm">
            {recent.map((tx) => (
              <li
                key={tx._id}
                className="flex justify-between items-center py-2 text-gray-700"
              >
                <div>
                  <p className="font-medium">{tx.description}</p>
                  <span className="text-xs text-gray-500">
=======
          <p className="text-3xl font-bold mt-1">₹{totalExpenses.toLocaleString('en-IN')}</p>
        </div>
      </div>

      {/* Recent Activity Card */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="flex items-center gap-2 mb-3">
          <TrendingDown className="text-rose-500 dark:text-rose-400" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Recent Activity</h3>
        </div>

        {recentTransactions.length === 0 && recentSavings.length === 0 ? (
          <p className="text-gray-500 dark:text-gray-400 text-sm">No recent activity</p>
        ) : (
          <ul className="divide-y divide-gray-100 dark:divide-gray-700 text-sm space-y-2">
            {recentSavings.slice(0, 2).map((saving) => (
              <li
                key={`saving-${saving._id}`}
                className="flex justify-between items-center py-2 text-gray-700 dark:text-gray-300"
              >
                <div>
                  <p className="font-medium">{saving.name}</p>
                  <span className="text-xs text-green-600 dark:text-green-400">
                    Savings
                  </span>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">+₹{saving.amount}</p>
                </div>
              </li>
            ))}
            {recentTransactions.slice(0, 2).map((tx) => (
              <li
                key={`tx-${tx._id}`}
                className="flex justify-between items-center py-2 text-gray-700 dark:text-gray-300"
              >
                <div>
                  <p className="font-medium">{tx.description}</p>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
>>>>>>> 67e2183 (Clean fixes and resolved issues for Nov 02)
                    {new Date(tx.date).toLocaleDateString()}
                  </span>
                </div>
                <div className="text-right">
                  <p className="font-semibold">₹{tx.amount}</p>
<<<<<<< HEAD
                  <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
=======
                  <span className="text-xs px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
>>>>>>> 67e2183 (Clean fixes and resolved issues for Nov 02)
                    {tx.category}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
