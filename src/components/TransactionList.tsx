// src/components/TransactionList.tsx
"use client";
<<<<<<< HEAD
import { useEffect, useState } from "react";

export default function TransactionList({ refresh }: { refresh: boolean }) {
  const [transactions, setTransactions] = useState<any[]>([]);

  useEffect(() => {
    async function fetchData() {
=======
import { useEffect, useState, useMemo } from "react";
import { Download, Edit2, Check, X, Search, Filter } from "lucide-react";
import Papa from "papaparse";

export default function TransactionList({ refresh }: { refresh: boolean }) {
  const [transactions, setTransactions] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});
  
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterRecurring, setFilterRecurring] = useState("All");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const categories = ["All", "Food", "Rent", "Travel", "Shopping", "Bills", "Other"];

  useEffect(() => {
    async function fetchData() {
      await fetch("/api/transactions/generate-recurring", {
        method: "POST",
      });
      
>>>>>>> 67e2183 (Clean fixes and resolved issues for Nov 02)
      const res = await fetch("/api/transactions");
      const data = await res.json();
      setTransactions(data);
    }
    fetchData();
  }, [refresh]);

  async function handleDelete(id: string) {
    await fetch("/api/transactions", {
      method: "DELETE",
<<<<<<< HEAD
=======
      headers: { "Content-Type": "application/json" },
>>>>>>> 67e2183 (Clean fixes and resolved issues for Nov 02)
      body: JSON.stringify({ id }),
    });
    setTransactions((prev) => prev.filter((t) => t._id !== id));
  }

<<<<<<< HEAD
  if (!transactions.length) return <p className="p-4 text-gray-500">No transactions yet.</p>;

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800">Transaction History</h2>
    <ul className="space-y-2 p-4">
      {transactions.map((tx) => (
        <li key={tx._id} className="flex justify-between items-center border p-2 rounded">
          <p className="text-sm text-blue-500">{tx.category}</p>
          <div>
            <p className="font-medium">{tx.description}</p>
            <p className="text-sm text-gray-500">{new Date(tx.date).toDateString()}</p>
          </div>
          <div className="flex items-center gap-4">
            <p className="font-bold">₹{tx.amount}</p>
            <button
              onClick={() => handleDelete(tx._id)}
              className="text-red-600 hover:underline"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
=======
  function handleExportCSV() {
    const csvData = transactions.map((tx) => ({
      Date: new Date(tx.date).toLocaleDateString(),
      Description: tx.description,
      Category: tx.category,
      Amount: tx.amount,
      Recurring: tx.isRecurring ? "Yes" : "No",
    }));

    const csv = Papa.unparse(csvData);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `transactions-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  }

  function startEdit(tx: any) {
    setEditingId(tx._id);
    setEditData({
      amount: tx.amount,
      description: tx.description,
      category: tx.category,
      date: new Date(tx.date).toISOString().split("T")[0],
    });
  }

  async function saveEdit(id: string) {
    const res = await fetch("/api/transactions", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, ...editData }),
    });

    if (res.ok) {
      const updated = await res.json();
      setTransactions((prev) =>
        prev.map((t) => (t._id === id ? updated : t))
      );
      setEditingId(null);
    }
  }

  function cancelEdit() {
    setEditingId(null);
    setEditData({});
  }

  const filteredTransactions = useMemo(() => {
    return transactions.filter((tx) => {
      const matchesSearch = tx.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = filterCategory === "All" || tx.category === filterCategory;
      const matchesRecurring = 
        filterRecurring === "All" || 
        (filterRecurring === "Yes" && tx.isRecurring) || 
        (filterRecurring === "No" && !tx.isRecurring);
      
      const txDate = new Date(tx.date);
      const matchesDateFrom = !dateFrom || txDate >= new Date(dateFrom);
      const matchesDateTo = !dateTo || txDate <= new Date(dateTo);
      
      return matchesSearch && matchesCategory && matchesRecurring && matchesDateFrom && matchesDateTo;
    });
  }, [transactions, searchTerm, filterCategory, filterRecurring, dateFrom, dateTo]);

  if (!transactions.length) return <p className="p-4 text-gray-500 dark:text-gray-400">No transactions yet.</p>;

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h2 className="text-lg font-semibold text-gray-800 dark:text-white">Transaction History</h2>
        <div className="flex gap-2">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
          >
            <Filter className="w-4 h-4" />
            Filters
          </button>
          <button
            onClick={handleExportCSV}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          placeholder="Search transactions..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
        />
      </div>

      {showFilters && (
        <div className="p-4 border dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-800 space-y-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category
              </label>
              <select
                value={filterCategory}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Recurring
              </label>
              <select
                value={filterRecurring}
                onChange={(e) => setFilterRecurring(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                <option value="All">All</option>
                <option value="Yes">Recurring Only</option>
                <option value="No">Non-Recurring</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                From Date
              </label>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                To Date
              </label>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              />
            </div>
          </div>

          <div className="flex justify-between items-center pt-2">
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Showing {filteredTransactions.length} of {transactions.length} transactions
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setFilterCategory("All");
                setFilterRecurring("All");
                setDateFrom("");
                setDateTo("");
              }}
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Clear Filters
            </button>
          </div>
        </div>
      )}

      <ul className="space-y-2">
        {filteredTransactions.map((tx) => (
          <li key={tx._id} className="flex justify-between items-center border dark:border-gray-700 p-3 rounded-lg bg-white dark:bg-gray-800">
            {editingId === tx._id ? (
              <>
                <input
                  type="number"
                  value={editData.amount}
                  onChange={(e) => setEditData({ ...editData, amount: e.target.value })}
                  className="w-20 px-2 py-1 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <input
                  type="text"
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  className="flex-1 mx-2 px-2 py-1 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <select
                  value={editData.category}
                  onChange={(e) => setEditData({ ...editData, category: e.target.value })}
                  className="px-2 py-1 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                >
                  <option value="Food">Food</option>
                  <option value="Rent">Rent</option>
                  <option value="Travel">Travel</option>
                  <option value="Shopping">Shopping</option>
                  <option value="Bills">Bills</option>
                  <option value="Other">Other</option>
                </select>
                <input
                  type="date"
                  value={editData.date}
                  onChange={(e) => setEditData({ ...editData, date: e.target.value })}
                  className="mx-2 px-2 py-1 border rounded dark:bg-gray-700 dark:text-white dark:border-gray-600"
                />
                <div className="flex gap-2">
                  <button onClick={() => saveEdit(tx._id)} className="text-green-600 hover:text-green-700">
                    <Check className="w-5 h-5" />
                  </button>
                  <button onClick={cancelEdit} className="text-red-600 hover:text-red-700">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-3 flex-1">
                  <span className="text-sm font-medium text-blue-500 dark:text-blue-400 min-w-[80px]">
                    {tx.category}
                  </span>
                  <div>
                    <p className="font-medium text-gray-800 dark:text-white">{tx.description}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {new Date(tx.date).toDateString()}
                      {tx.isRecurring && <span className="ml-2 text-xs bg-purple-100 dark:bg-purple-900 text-purple-600 dark:text-purple-300 px-2 py-0.5 rounded">Recurring</span>}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <p className="font-bold text-gray-800 dark:text-white">₹{tx.amount}</p>
                  <button
                    onClick={() => startEdit(tx)}
                    className="text-blue-600 dark:text-blue-400 hover:text-blue-700"
                    title="Edit"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(tx._id)}
                    className="text-red-600 dark:text-red-400 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
>>>>>>> 67e2183 (Clean fixes and resolved issues for Nov 02)
    </div>
  );
}
