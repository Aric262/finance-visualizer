// src/models/Transaction.ts
import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema({
<<<<<<< HEAD
=======
  userId: {
    type: String,
    required: true,
    index: true,
  },
>>>>>>> 67e2183 (Clean fixes and resolved issues for Nov 02)
  amount: Number,
  description: String,
  date: Date,
  category: {
    type: String,
    enum: ["Food", "Rent", "Travel", "Shopping", "Bills", "Other"],
    default: "Other",
  },
<<<<<<< HEAD
=======
  isRecurring: {
    type: Boolean,
    default: false,
  },
  lastGeneratedMonth: {
    type: String,
    default: null,
  },
  originalRecurringId: {
    type: String,
    default: null,
  },
>>>>>>> 67e2183 (Clean fixes and resolved issues for Nov 02)
});


export default mongoose.models.Transaction ||
  mongoose.model("Transaction", TransactionSchema);
