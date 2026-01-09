import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export const requireAdmin = async () => {
  const session = await auth();
  if (!session?.user || !["ADMIN", "EDITOR"].includes(session.user.role)) {
    redirect("/login");
  }
  return session.user;
};
