// src/models/Savings.ts
import mongoose from "mongoose";

const SavingsSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },
  name: {
    type: String,
    required: true,
  },
  amount: {
    type: Number,
    required: true,
    min: 0,
  },
  type: {
    type: String,
    enum: ["Emergency Fund", "Vacation", "Retirement", "Investment", "Other"],
    default: "Other",
  },
  isSpendable: {
    type: Boolean,
    default: true,
  },
  isRecurring: {
    type: Boolean,
    default: false,
  },
  recurringAmount: {
    type: Number,
    default: 0,
  },
  lastGeneratedMonth: {
    type: String,
    default: null,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

export default mongoose.models.Savings ||
  mongoose.model("Savings", SavingsSchema);
