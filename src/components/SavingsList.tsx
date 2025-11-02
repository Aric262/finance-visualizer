"use client";
import { useEffect, useState } from "react";
import { PiggyBank, Edit, Trash2, Plus } from "lucide-react";

export default function SavingsList({ refresh }: { refresh: boolean }) {
  const [savings, setSavings] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editAmount, setEditAmount] = useState("");

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

  const handleEdit = (saving: any) => {
    setEditingId(saving._id);
    setEditAmount(saving.amount.toString());
  };

  const handleSaveEdit = async (id: string) => {
    await fetch("/api/savings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, amount: Number(editAmount) }),
    });
    setEditingId(null);
    setEditAmount("");
    // Trigger refresh by calling parent refresh
    window.location.reload(); // Simple refresh for now
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this savings?")) {
      await fetch("/api/savings", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
      // Trigger refresh
      window.location.reload();
    }
  };

  const handleAddToSavings = async (saving: any, addAmount: number) => {
    const newAmount = saving.amount + addAmount;
    await fetch("/api/savings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: saving._id, amount: newAmount }),
    });
    window.location.reload();
  };

  return (
    <div className="space-y-4">
      {savings.length === 0 ? (
        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
          <PiggyBank className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>No savings yet. Start building your savings!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {savings.map((saving) => (
            <div
              key={saving._id}
              className="p-4 rounded-lg border dark:border-gray-700 bg-white dark:bg-gray-800 shadow-sm"
            >
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-800 dark:text-white">
                    {saving.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {saving.type}
                  </p>
                </div>
                <div className="flex gap-1">
                  <button
                    onClick={() => handleEdit(saving)}
                    className="p-1 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(saving._id)}
                    className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {editingId === saving._id ? (
                <div className="space-y-2">
                  <input
                    type="number"
                    value={editAmount}
                    onChange={(e) => setEditAmount(e.target.value)}
                    className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white"
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleSaveEdit(saving._id)}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm py-1 px-2 rounded"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="flex-1 bg-gray-600 hover:bg-gray-700 text-white text-sm py-1 px-2 rounded"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">
                    ₹{saving.amount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      saving.isSpendable
                        ? "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300"
                        : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
                    }`}>
                      {saving.isSpendable ? "Spendable" : "Locked"}
                    </span>
                    {saving.isRecurring && (
                      <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full">
                        Recurring
                      </span>
                    )}
                  </div>
                  <button
                    onClick={() => {
                      const addAmount = prompt("Enter amount to add:");
                      if (addAmount && !isNaN(Number(addAmount))) {
                        handleAddToSavings(saving, Number(addAmount));
                      }
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white text-sm py-2 px-4 rounded transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                    Add Money
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
