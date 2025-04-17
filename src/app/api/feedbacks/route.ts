import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/lib/prisma";

import { authOptions } from "../auth/[...nextauth]/route";

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { productId, rating, comment } = body;

  if (!productId || typeof rating !== "number" || !comment) {
    return NextResponse.json({ message: "Invalid input" }, { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const feedback = await prisma.feedback.create({
      data: {
        comment,
        rating,
        productId,
        userId: user.id,
      },
    });

    return NextResponse.json(feedback, { status: 201 });
  } catch (error) {
    console.error("Feedback post error", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session || !session.user?.email) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const isAdmin = session.user.role === "ADMIN";

  try {
    const feedbacks = await prisma.feedback.findMany({
      where: isAdmin ? {} : { user: { email: session.user.email } },
      include: {
        user: true,
        product: true,
      },
      orderBy: { updatedAt: "desc" },
    });

    return NextResponse.json(feedbacks);
  } catch (error) {
    console.error("Feedback get error", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
