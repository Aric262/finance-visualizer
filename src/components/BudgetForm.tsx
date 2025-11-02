"use client";
import { useEffect, useState } from "react";
import { Wallet } from "lucide-react";

const categories = ["Food", "Rent", "Travel", "Shopping", "Bills", "Other"];

export default function BudgetForm({ refresh }: { refresh: boolean }) {
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");
  const [currentMonth, setCurrentMonth] = useState<string | null>(null);

  // Safely calculate current month on client
  useEffect(() => {
    const now = new Date().toISOString().slice(0, 7); // yyyy-mm
    setCurrentMonth(now);
  }, [refresh]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!amount || !currentMonth) return alert("Enter all fields");

    await fetch("/api/budgets", {
      method: "POST",
<<<<<<< HEAD
=======
      headers: { "Content-Type": "application/json" },
>>>>>>> 67e2183 (Clean fixes and resolved issues for Nov 02)
      body: JSON.stringify({
        category,
        amount: Number(amount),
        month: currentMonth,
      }),
    });

    setAmount("");
    // onUpdate();
  }

  if (!currentMonth) return null; // or return a skeleton/loader

  return (
<<<<<<< HEAD
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Wallet className="text-green-600" />
        <h3 className="text-lg font-semibold text-gray-800">Set Monthly Budget</h3>
=======
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
      <div className="flex items-center gap-2 mb-4">
        <Wallet className="text-green-600 dark:text-green-400" />
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Set Monthly Budget</h3>
>>>>>>> 67e2183 (Clean fixes and resolved issues for Nov 02)
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
<<<<<<< HEAD
          <label className="block text-sm font-medium text-gray-700 mb-1">
=======
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
>>>>>>> 67e2183 (Clean fixes and resolved issues for Nov 02)
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
<<<<<<< HEAD
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
=======
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
>>>>>>> 67e2183 (Clean fixes and resolved issues for Nov 02)
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div>
<<<<<<< HEAD
          <label className="block text-sm font-medium text-gray-700 mb-1">
=======
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
>>>>>>> 67e2183 (Clean fixes and resolved issues for Nov 02)
            Budget Amount (₹)
          </label>
          <input
            type="number"
            placeholder="e.g., 5000"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
<<<<<<< HEAD
            className="w-full p-2 border border-gray-300 rounded focus:ring-2 focus:ring-green-500"
=======
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
>>>>>>> 67e2183 (Clean fixes and resolved issues for Nov 02)
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition-all"
        >
          Save Budget
        </button>
      </form>
    </div>
  );
}
