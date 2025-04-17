import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash("123456", 10);

  await prisma.user.createMany({
    data: [
      {
        email: "admin@test.com",
        password: passwordHash,
        role: "ADMIN",
      },
      {
        email: "user@test.com",
        password: passwordHash,
        role: "USER",
      },
    ],
    skipDuplicates: true,
  });
}

main().finally(() => prisma.$disconnect());
