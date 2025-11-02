"use client";

import { useEffect, useState } from "react";
import { PiggyBank, TrendingUp } from "lucide-react";

export default function SavingsDisplay({ refresh }: { refresh: boolean }) {
  const [savings, setSavings] = useState<any[]>([]);
  const [period, setPeriod] = useState<"month" | "year">("month");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch("/api/savings");
        if (res.ok) {
          const data = await res.json();
          setSavings(data);
        } else {
          setSavings([]);
        }
      } catch (error) {
        console.error("Failed to fetch savings:", error);
        setSavings([]);
      }
    }
    fetchData();
  }, [refresh]);

  const calculateTotalSavings = () => {
    return savings.reduce((total, saving) => total + saving.amount, 0);
  };

  const totalSavings = calculateTotalSavings();
  const now = new Date();
  const periodLabel = period === "month"
    ? now.toLocaleString('default', { month: 'long', year: 'numeric' })
    : now.getFullYear();

  return (
    <div className="p-6 rounded-lg border dark:border-gray-700 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-2">
          <PiggyBank className="w-6 h-6 text-green-600 dark:text-green-400" />
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Total Savings</h3>
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => setPeriod("month")}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              period === "month"
                ? "bg-green-600 text-white"
                : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
            }`}
          >
            Month
          </button>
          <button
            onClick={() => setPeriod("year")}
            className={`px-3 py-1 rounded-lg text-sm font-medium transition-colors ${
              period === "year"
                ? "bg-green-600 text-white"
                : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600"
            }`}
          >
            Year
          </button>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
          <TrendingUp className="w-4 h-4" />
          <span className="text-sm">{periodLabel}</span>
        </div>
        <div className="text-4xl font-bold text-gray-800 dark:text-white">
          ₹{totalSavings.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Total saved across all accounts
        </p>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {savings.length} savings account{savings.length !== 1 ? 's' : ''}
        </div>
      </div>
    </div>
  );
}
