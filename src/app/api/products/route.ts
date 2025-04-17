import { NextResponse } from "next/server";

import { prisma } from "@/lib/prisma";

export async function GET() {
  const products = await prisma.product.findMany({
    include: {
      category: true,
      feedbacks: true,
    },
  });

  const result = products.map((product) => {
    const ratings = product.feedbacks.map((f) => f.rating);
    const avgRating =
      ratings.length > 0
        ? ratings.reduce((sum: number, r: number) => sum + r, 0) / ratings.length
        : 0;

    return {
      id: product.id,
      name: product.name,
      description: product.description,
      image: product.Image, // base64
      category: product.category.name,
      rating: Number(avgRating.toFixed(1)),
      feedbackCount: ratings.length,
    };
  });

  return NextResponse.json(result);
}
