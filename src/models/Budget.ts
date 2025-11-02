import mongoose from "mongoose";

const BudgetSchema = new mongoose.Schema({
<<<<<<< HEAD
=======
  userId: {
    type: String,
    required: true,
    index: true,
  },
>>>>>>> 67e2183 (Clean fixes and resolved issues for Nov 02)
  category: { type: String, required: true },
  amount: { type: Number, required: true },
  month: { type: String, required: true }, // "2025-07"
});

export default mongoose.models.Budget || mongoose.model("Budget", BudgetSchema);
