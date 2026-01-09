import Link from "next/link";
import { Container } from "@/components/Container";
import { AdminUploadForm } from "@/components/AdminUploadForm";
import { requireAdmin } from "@/lib/rbac";

export default async function AdminMediaPage() {
  await requireAdmin();

  return (
    <Container className="py-16">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-ink/50">Media</p>
            <h1 className="text-3xl font-semibold">Upload listing imagery</h1>
          </div>
          <Link href="/admin" className="text-xs uppercase tracking-[0.2em] underline">
            Back to dashboard
          </Link>
        </div>
        <div className="rounded-3xl border border-ink/10 bg-white p-6">
          <p className="text-sm text-ink/60">
            Upload high-resolution imagery and brochures for listings. Files are
            sent directly to Cloudinary with validation and signed requests.
          </p>
          <div className="mt-6">
            <AdminUploadForm />
          </div>
        </div>
      </div>
    </Container>
  );
}
