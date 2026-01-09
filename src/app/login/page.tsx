import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth, signIn } from "@/lib/auth";
import { Container } from "@/components/Container";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { loginSchema } from "@/lib/validators";

export const metadata: Metadata = {
  title: "Sign in",
  alternates: { canonical: "https://cribcove.ie/login" }
};

const loginAction = async (_: unknown, formData: FormData) => {
  "use server";
  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password")
  });

  if (!parsed.success) {
    return { error: "Invalid credentials." };
  }

  await signIn("credentials", {
    email: parsed.data.email,
    password: parsed.data.password,
    redirectTo: "/account"
  });
  return { error: null };
};

export default async function LoginPage() {
  const session = await auth();
  if (session?.user) {
    redirect("/account");
  }

  return (
    <Container className="py-16">
      <div className="mx-auto max-w-md space-y-6 rounded-3xl border border-ink/10 bg-white p-8">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-ink/50">
            Access
          </p>
          <h1 className="text-3xl font-semibold">Welcome back</h1>
        </div>
        <form action={loginAction} className="space-y-4">
          <Input name="email" type="email" placeholder="Email" required />
          <Input name="password" type="password" placeholder="Password" required />
          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
      </div>
    </Container>
  );
}
