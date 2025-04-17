import { PrismaClient } from "@prisma/client";
import fs from "fs";
import path from "path";

const prisma = new PrismaClient();

function imageToBase64(filePath: string): string {
  const file = fs.readFileSync(filePath);
  return `data:image/webp;base64,${file.toString("base64")}`;
}

async function main() {
  const categories = {
    Clothing: await prisma.category.upsert({
      where: { name: "Clothing" },
      update: {},
      create: { name: "Clothing" },
    }),
    Footwear: await prisma.category.upsert({
      where: { name: "Footwear" },
      update: {},
      create: { name: "Footwear" },
    }),
    Electronics: await prisma.category.upsert({
      where: { name: "Electronics" },
      update: {},
      create: { name: "Electronics" },
    }),
    Accessories: await prisma.category.upsert({
      where: { name: "Accessories" },
      update: {},
      create: { name: "Accessories" },
    }),
    "Home & Office": await prisma.category.upsert({
      where: { name: "Home & Office" },
      update: {},
      create: { name: "Home & Office" },
    }),
  };

  const basePath = path.join(process.cwd(), "public", "images");

  const products = [
    {
      name: "T-Shirt Premium",
      description: "Soft and breathable cotton t-shirt for everyday comfort.",
      category: categories.Clothing,
      image: imageToBase64(path.join(basePath, "t-shirt.webp")),
    },
    {
      name: "Running Sneakers",
      description: "Lightweight and responsive shoes designed for performance.",
      category: categories.Footwear,
      image: imageToBase64(path.join(basePath, "sneakers.webp")),
    },
    {
      name: "Winter Jacket",
      description: "Warm and insulated jacket for cold weather protection.",
      category: categories.Clothing,
      image: imageToBase64(path.join(basePath, "jacket.webp")),
    },
    {
      name: "Bluetooth Headphones",
      description: "Wireless headphones with high-fidelity sound and comfort.",
      category: categories.Electronics,
      image: imageToBase64(path.join(basePath, "headphones.webp")),
    },
    {
      name: "Water Bottle",
      description: "Stainless steel water bottle to stay hydrated all day.",
      category: categories.Accessories,
      image: imageToBase64(path.join(basePath, "bottles.webp")),
    },
    {
      name: "Desk Lamp",
      description: "LED desk lamp with adjustable brightness and minimalist design.",
      category: categories["Home & Office"],
      image: imageToBase64(path.join(basePath, "desk-lamp.webp")),
    },
  ];

  for (const product of products) {
    await prisma.product.create({
      data: {
        name: product.name,
        description: product.description,
        Image: product.image,
        categoryId: product.category.id,
      },
    });
  }
}

main()
  .catch((e) => {
    console.error("Error during seed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
