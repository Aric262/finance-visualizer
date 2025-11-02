import { NextRequest, NextResponse } from "next/server";
import Transaction from "@/models/Transaction";
import { connectToDatabase } from "@/lib/db";
import { getUserIdFromRequest } from "@/lib/auth";

export async function POST(req: NextRequest) {
  try {
    const userId = await getUserIdFromRequest();
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectToDatabase();

    const currentDate = new Date();
    const currentMonth = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}`;

    const recurringTransactions = await Transaction.find({
      userId,
      isRecurring: true,
      $or: [
        { lastGeneratedMonth: { $ne: currentMonth } },
        { lastGeneratedMonth: null }
      ]
    });

    let generatedCount = 0;

    for (const recurring of recurringTransactions) {
      const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
      const originalDate = new Date(recurring.date);
      const dayOfMonth = originalDate.getDate();
      
      const lastDayOfCurrentMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
      const targetDay = Math.min(dayOfMonth, lastDayOfCurrentMonth);
      
      const newTransactionDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), targetDay);

      const existingTransaction = await Transaction.findOne({
        userId,
        originalRecurringId: recurring._id.toString(),
        date: {
          $gte: firstDayOfMonth,
          $lt: new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
        }
      });

      if (!existingTransaction) {
        await Transaction.create({
          userId,
          amount: recurring.amount,
          description: `${recurring.description} (Auto-generated)`,
          date: newTransactionDate,
          category: recurring.category,
          isRecurring: false,
          originalRecurringId: recurring._id.toString(),
        });

        generatedCount++;
      }

      recurring.lastGeneratedMonth = currentMonth;
      await recurring.save();
    }

    return NextResponse.json({
      success: true,
      generated: generatedCount,
      message: generatedCount > 0 
        ? `Generated ${generatedCount} recurring transaction(s) for ${currentMonth}`
        : 'No new recurring transactions to generate'
    });

  } catch (error: any) {
    console.error("Error generating recurring transactions:", error);
    return NextResponse.json(
      { error: error.message || "Failed to generate recurring transactions" },
      { status: 500 }
    );
  }
}
