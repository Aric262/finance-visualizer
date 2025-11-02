// src/app/api/savings/route.ts
import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/db";
import Savings from "@/models/Savings";
import { getUserIdFromRequest } from "@/lib/auth";

export async function GET() {
  const userId = await getUserIdFromRequest();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await connectToDatabase();
  const savings = await Savings.find({ userId }).sort({ createdAt: -1 });
  return NextResponse.json(savings);
}

export async function POST(req: NextRequest) {
  const userId = await getUserIdFromRequest();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await req.json();
  await connectToDatabase();
  const savings = await Savings.create({ ...data, userId });
  return NextResponse.json(savings);
}

export async function PATCH(req: NextRequest) {
  const userId = await getUserIdFromRequest();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id, ...updates } = await req.json();
  await connectToDatabase();
  const savings = await Savings.findOneAndUpdate(
    { _id: id, userId },
    { $set: { ...updates, updatedAt: new Date() } },
    { new: true }
  );

  if (!savings) {
    return NextResponse.json({ error: "Savings not found" }, { status: 404 });
  }

  return NextResponse.json(savings);
}

export async function DELETE(req: NextRequest) {
  const userId = await getUserIdFromRequest();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await req.json();
  await connectToDatabase();
  await Savings.findOneAndDelete({ _id: id, userId });
  return NextResponse.json({ success: true });
}
