"use client";

import { useEffect, useState } from "react";
import { Calendar, TrendingUp } from "lucide-react";

export default function TotalSpend({ refresh }: { refresh: boolean }) {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [period, setPeriod] = useState<"month" | "year">("month");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/transactions");
        if (res.ok) {
          const data = await res.json();
          if (Array.isArray(data)) {
            setTransactions(data);
          } else if (data && typeof data === "object" && Array.isArray(data.transactions)) {
            setTransactions(data.transactions);
          } else {
            console.warn("Unexpected API response format:", data);
            setTransactions([]);
          }
        } else {
          setTransactions([]);
        }
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
        setTransactions([]);
      }
    }
    fetchData();
  }, [refresh]);

  const calculateTotal = () => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    return transactions.reduce((total, tx) => {
      const txDate = new Date(tx.date);
      
      if (period === "month") {
        if (txDate.getMonth() === currentMonth && txDate.getFullYear() === currentYear) {
          return total + tx.amount;
        }
      } else {
        if (txDate.getFullYear() === currentYear) {
          return total + tx.amount;
        }
      }
      
      return total;
    }, 0);
  };

  const total = calculateTotal();
  const now = new Date();
  const periodLabel = period === "month" 
    ? now.toLocaleString('default', { month: 'long', year: 'numeric' })
    : now.getFullYear();

  return (
    <div className="p-6 rounded-lg border dark:border-gray-700 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-blue-600 dark:text-blue-400" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Total Spending</h3>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setPeriod("month")}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              period === "month"
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setPeriod("year")}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              period === "year"
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
            }`}
          >
            Year
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">{periodLabel}</span>
        </div>
        <div className="text-4xl font-bold text-gray-800 dark:text-white">
          ₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Total spent in this {period}
        </p>
      </div>
    </div>
  );
}
