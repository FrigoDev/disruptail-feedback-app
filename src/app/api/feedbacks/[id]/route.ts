import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { prisma } from "@/lib/prisma";

import { authOptions } from "../../auth/[...nextauth]/route";

export async function DELETE(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const feedback = await prisma.feedback.findUnique({
    where: { id: params.id },
    include: { user: true },
  });

  if (!feedback) {
    return NextResponse.json({ message: "Feedback not found" }, { status: 404 });
  }

  const isAdmin = session.user.role === "ADMIN";
  const isOwner = session.user.email === feedback.user.email;

  if (!isAdmin && !isOwner) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  await prisma.feedback.delete({
    where: { id: params.id },
  });

  return NextResponse.json({ message: "Feedback deleted" }, { status: 200 });
}

export async function PATCH(req: NextRequest, { params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const { comment, rating } = body;

  if (!comment || typeof rating !== "number") {
    return NextResponse.json({ message: "Invalid input" }, { status: 400 });
  }

  const feedback = await prisma.feedback.findUnique({
    where: { id: params.id },
    include: { user: true },
  });

  if (!feedback) {
    return NextResponse.json({ message: "Feedback not found" }, { status: 404 });
  }

  const isOwner = session.user.email === feedback.user.email;

  if (!isOwner) {
    return NextResponse.json({ message: "Forbidden" }, { status: 403 });
  }

  const updated = await prisma.feedback.update({
    where: { id: params.id },
    data: {
      comment,
      rating,
    },
  });

  return NextResponse.json(updated, { status: 200 });
}
