import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET(req: Request, { params }: { params: { id: string } }) {
  try {
    const product = await prisma.product.findUnique({
      where: { id: params.id },
      include: {
        category: true,
        feedbacks: {
          include: {
            user: true,
          },
        },
      },
    });

    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }

    const ratings = product.feedbacks.map((f) => f.rating);
    const avgRating =
      ratings.length > 0
        ? ratings.reduce((sum: number, r: number) => sum + r, 0) / ratings.length
        : 0;

    return NextResponse.json({
      id: product.id,
      name: product.name,
      description: product.description,
      category: product.category.name,
      image: product.Image,
      rating: Number(avgRating.toFixed(1)),
      feedbackCount: ratings.length,
      feedbacks: product.feedbacks.map((f) => ({
        id: f.id,
        comment: f.comment,
        rating: f.rating,
        updatedAt: f.updatedAt,
        user: { email: f.user.email },
      })),
    });
  } catch (error) {
    return new NextResponse("Internal Server Error:" + error, { status: 500 });
  }
}
