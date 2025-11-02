"use client";
import { useState } from "react";
import { PlusCircle } from "lucide-react";

export default function SavingsForm({ refresh }: { refresh: () => void }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [isSpendable, setIsSpendable] = useState(true);
  const [isRecurring, setIsRecurring] = useState(false);
  const [recurringAmount, setRecurringAmount] = useState("");

  const types = ["Emergency Fund", "Vacation", "Retirement", "Investment", "Other"];

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name || !amount || !type)
      return alert("Fill all required fields");

    await fetch("/api/savings", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        amount: Number(amount),
        type,
        isSpendable,
        isRecurring,
        recurringAmount: isRecurring ? Number(recurringAmount) : 0,
      }),
    });

    setName("");
    setAmount("");
    setType("");
    setIsSpendable(true);
    setIsRecurring(false);
    setRecurringAmount("");
    refresh?.();
  }

  return (
    <div className="p-6 rounded-lg border dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <PlusCircle className="text-green-600 dark:text-green-400" />
        <h2 className="text-xl font-semibold text-green-700 dark:text-green-400">
          Add New Savings
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Savings Name *
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="E.g., Emergency Fund"
              className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Initial Amount (₹) *
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
              className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Type *
          </label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
          >
            <option value="" disabled>
              Select a type
            </option>
            {types.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="spendable"
            checked={isSpendable}
            onChange={(e) => setIsSpendable(e.target.checked)}
            className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
          />
          <label htmlFor="spendable" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Spendable (can be used for transactions)
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="recurring"
            checked={isRecurring}
            onChange={(e) => setIsRecurring(e.target.checked)}
            className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
          />
          <label htmlFor="recurring" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Recurring savings (monthly)
          </label>
        </div>

        {isRecurring && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Recurring Amount (₹)
            </label>
            <input
              type="number"
              value={recurringAmount}
              onChange={(e) => setRecurringAmount(e.target.value)}
              placeholder="Monthly savings amount"
              className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
            />
          </div>
        )}

        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded transition-all duration-200"
          >
            Add Savings
          </button>
        </div>
      </form>
    </div>
  );
}
