import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { getUploadSignature } from "@/lib/cloudinary";
import { cloudinaryUploadSchema } from "@/lib/validators";

export const POST = async (request: Request) => {
  const session = await auth();
  if (!session?.user || !["ADMIN", "EDITOR"].includes(session.user.role)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const parsed = cloudinaryUploadSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  }

  const signature = getUploadSignature(parsed.data.folder, parsed.data.filename);
  return NextResponse.json({
    ...signature,
    resourceType: parsed.data.resourceType ?? "image"
  });
};
