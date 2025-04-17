import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";

import { authOptions } from "../api/auth/[...nextauth]/route";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  if (session) {
    redirect("/dashboard/products");
  }
}
