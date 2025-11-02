"use client";
<<<<<<< HEAD
import { useState } from "react";
=======
import { useState, useEffect } from "react";
>>>>>>> 67e2183 (Clean fixes and resolved issues for Nov 02)
import { PlusCircle } from "lucide-react";

export default function TransactionForm({ refresh }: { refresh: () => void }) {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
<<<<<<< HEAD

  const categories = ["Food", "Rent", "Travel", "Shopping", "Bills", "Other"];

=======
  const [isRecurring, setIsRecurring] = useState(false);
  const [deductFromSavings, setDeductFromSavings] = useState(false);
  const [selectedSavings, setSelectedSavings] = useState("");
  const [savings, setSavings] = useState<any[]>([]);

  const categories = ["Food", "Rent", "Travel", "Shopping", "Bills", "Other"];

  useEffect(() => {
    async function fetchSavings() {
      try {
        const res = await fetch("/api/savings");
        if (res.ok) {
          const data = await res.json();
          setSavings(data.filter((s: any) => s.isSpendable));
        }
      } catch (error) {
        console.error("Failed to fetch savings:", error);
      }
    }
    fetchSavings();
  }, []);

>>>>>>> 67e2183 (Clean fixes and resolved issues for Nov 02)
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!amount || !description || !date || !category)
      return alert("Fill all fields");

<<<<<<< HEAD
    await fetch("/api/transactions", {
      method: "POST",
=======
    if (deductFromSavings && !selectedSavings)
      return alert("Please select a savings account to deduct from");

    // If deducting from savings, check if sufficient balance
    if (deductFromSavings && selectedSavings) {
      const selectedSaving = savings.find(s => s._id === selectedSavings);
      if (selectedSaving && selectedSaving.amount < Number(amount)) {
        return alert("Insufficient savings balance");
      }
    }

    await fetch("/api/transactions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
>>>>>>> 67e2183 (Clean fixes and resolved issues for Nov 02)
      body: JSON.stringify({
        amount: Number(amount),
        description,
        date,
        category,
<<<<<<< HEAD
      }),
    });

=======
        isRecurring,
        deductFromSavings: deductFromSavings ? selectedSavings : null,
      }),
    });

    // If deducting from savings, update the savings amount
    if (deductFromSavings && selectedSavings) {
      const selectedSaving = savings.find(s => s._id === selectedSavings);
      if (selectedSaving) {
        const newAmount = selectedSaving.amount - Number(amount);
        await fetch("/api/savings", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ id: selectedSavings, amount: newAmount }),
        });
      }
    }

>>>>>>> 67e2183 (Clean fixes and resolved issues for Nov 02)
    setAmount("");
    setDescription("");
    setDate("");
    setCategory("");
<<<<<<< HEAD
=======
    setIsRecurring(false);
    setDeductFromSavings(false);
    setSelectedSavings("");
>>>>>>> 67e2183 (Clean fixes and resolved issues for Nov 02)
    refresh?.();
  }

  return (
<<<<<<< HEAD
    <div className="p-6 rounded-lg border shadow-sm bg-white space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <PlusCircle className="text-blue-600" />
        <h2 className="text-xl font-semibold text-blue-700">
=======
    <div className="p-6 rounded-lg border dark:border-gray-700 shadow-sm bg-white dark:bg-gray-800 space-y-4">
      <div className="flex items-center gap-2 mb-2">
        <PlusCircle className="text-blue-600 dark:text-blue-400" />
        <h2 className="text-xl font-semibold text-blue-700 dark:text-blue-400">
>>>>>>> 67e2183 (Clean fixes and resolved issues for Nov 02)
          Add New Transaction
        </h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
<<<<<<< HEAD
            <label className="block text-sm font-medium text-gray-700">
=======
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
>>>>>>> 67e2183 (Clean fixes and resolved issues for Nov 02)
              Amount (₹)
            </label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount"
<<<<<<< HEAD
              className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
=======
              className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
>>>>>>> 67e2183 (Clean fixes and resolved issues for Nov 02)
            />
          </div>

          <div>
<<<<<<< HEAD
            <label className="block text-sm font-medium text-gray-700">
=======
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
>>>>>>> 67e2183 (Clean fixes and resolved issues for Nov 02)
              Date
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
<<<<<<< HEAD
              className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
=======
              className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
>>>>>>> 67e2183 (Clean fixes and resolved issues for Nov 02)
            />
          </div>
        </div>

        <div>
<<<<<<< HEAD
          <label className="block text-sm font-medium text-gray-700">
=======
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
>>>>>>> 67e2183 (Clean fixes and resolved issues for Nov 02)
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="E.g., Grocery shopping"
<<<<<<< HEAD
            className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
=======
            className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
>>>>>>> 67e2183 (Clean fixes and resolved issues for Nov 02)
          />
        </div>

        <div>
<<<<<<< HEAD
          <label className="block text-sm font-medium text-gray-700">
=======
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
>>>>>>> 67e2183 (Clean fixes and resolved issues for Nov 02)
            Category
          </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
<<<<<<< HEAD
            className="mt-1 w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
=======
            className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
>>>>>>> 67e2183 (Clean fixes and resolved issues for Nov 02)
          >
            <option value="" disabled>
              Select a category
            </option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

<<<<<<< HEAD
=======
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="recurring"
            checked={isRecurring}
            onChange={(e) => setIsRecurring(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="recurring" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Recurring transaction (monthly)
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="deductSavings"
            checked={deductFromSavings}
            onChange={(e) => setDeductFromSavings(e.target.checked)}
            className="w-4 h-4 text-green-600 border-gray-300 rounded focus:ring-green-500"
          />
          <label htmlFor="deductSavings" className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Deduct from savings
          </label>
        </div>

        {deductFromSavings && (
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Select Savings Account
            </label>
            <select
              value={selectedSavings}
              onChange={(e) => setSelectedSavings(e.target.value)}
              className="mt-1 w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
            >
              <option value="" disabled>
                Select a savings account
              </option>
              {savings.map((saving) => (
                <option key={saving._id} value={saving._id}>
                  {saving.name} (₹{saving.amount.toLocaleString('en-IN')})
                </option>
              ))}
            </select>
          </div>
        )}

>>>>>>> 67e2183 (Clean fixes and resolved issues for Nov 02)
        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-all duration-200"
          >
            Add Transaction
          </button>
        </div>
      </form>
    </div>
  );
}
