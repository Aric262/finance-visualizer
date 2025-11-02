// src/app/api/transactions/route.ts
<<<<<<< HEAD
import { connectToDatabase } from "@/lib/db";
import Transaction from "@/models/Transaction";

export async function GET() {
  await connectToDatabase();
  const transactions = await Transaction.find().sort({ date: -1 });
  return Response.json(transactions);
}

export async function POST(req: Request) {
  const data = await req.json();
  await connectToDatabase();
  const transaction = await Transaction.create(data);
  return Response.json(transaction);
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  await connectToDatabase();
  await Transaction.findByIdAndDelete(id);
  return Response.json({ success: true });
=======
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Transaction from "@/models/Transaction";
import { getUserIdFromRequest } from "@/lib/auth";

export async function GET() {
  const userId = await getUserIdFromRequest();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();
  const transactions = await Transaction.find({ userId }).sort({ date: -1 });
  return NextResponse.json(transactions);
}

export async function POST(req: NextRequest) {
  const userId = await getUserIdFromRequest();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  await connectToDatabase();
  const transaction = await Transaction.create({ ...data, userId });
  return NextResponse.json(transaction);
}

export async function PATCH(req: NextRequest) {
  const userId = await getUserIdFromRequest();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, ...updates } = await req.json();
  await connectToDatabase();
  const transaction = await Transaction.findOneAndUpdate(
    { _id: id, userId },
    { $set: updates },
    { new: true }
  );
  
  if (!transaction) {
    return NextResponse.json({ error: "Transaction not found" }, { status: 404 });
  }
  
  return NextResponse.json(transaction);
}

export async function DELETE(req: NextRequest) {
  const userId = await getUserIdFromRequest();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();
  await connectToDatabase();
  await Transaction.findOneAndDelete({ _id: id, userId });
  return NextResponse.json({ success: true });
>>>>>>> 67e2183 (Clean fixes and resolved issues for Nov 02)
}
