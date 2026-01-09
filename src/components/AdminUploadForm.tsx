"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { Select } from "@/components/ui/Select";

export const AdminUploadForm = () => {
  const [status, setStatus] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const handleUpload = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("Uploading...");
    setUploadedUrl(null);

    const form = event.currentTarget;
    const fileInput = form.elements.namedItem("file") as HTMLInputElement;
    const typeInput = form.elements.namedItem("type") as HTMLSelectElement;
    const file = fileInput?.files?.[0];
    const uploadType = typeInput?.value ?? "image";

    if (!file) {
      setStatus("Please select a file.");
      return;
    }

    if (uploadType === "image" && !file.type.startsWith("image/")) {
      setStatus("Please upload a valid image file.");
      return;
    }

    if (uploadType === "brochure" && file.type !== "application/pdf") {
      setStatus("Please upload a PDF brochure.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      setStatus("Please upload files smaller than 5MB.");
      return;
    }

    const signatureResponse = await fetch("/api/upload-signature", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        filename: file.name.split(".")[0],
        contentType: file.type,
        folder: "cribcove",
        resourceType: uploadType === "brochure" ? "raw" : "image"
      })
    });

    if (!signatureResponse.ok) {
      setStatus("Failed to prepare upload.");
      return;
    }

    const signatureData = await signatureResponse.json();

    const body = new FormData();
    body.append("file", file);
    body.append("api_key", signatureData.apiKey);
    body.append("timestamp", signatureData.timestamp.toString());
    body.append("signature", signatureData.signature);
    body.append("folder", "cribcove");

    const resourceType =
      signatureData.resourceType === "raw" ? "raw" : "image";

    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/${signatureData.cloudName}/${resourceType}/upload`,
      {
        method: "POST",
        body
      }
    );

    if (!uploadResponse.ok) {
      setStatus("Upload failed. Check Cloudinary credentials.");
      return;
    }

    const result = await uploadResponse.json();
    setUploadedUrl(result.secure_url);
    setStatus("Upload complete.");
    form.reset();
  };

  return (
    <form onSubmit={handleUpload} className="space-y-4">
      <Select name="type" defaultValue="image">
        <option value="image">Image</option>
        <option value="brochure">Brochure (PDF)</option>
      </Select>
      <Input name="file" type="file" accept="image/*,application/pdf" required />
      <Button type="submit">Upload image</Button>
      {status ? <p className="text-sm text-ink/60">{status}</p> : null}
      {uploadedUrl ? (
        <div className="rounded-2xl border border-ink/10 bg-ivory p-4 text-sm">
          <p className="font-semibold">Uploaded URL</p>
          <p className="break-all text-ink/60">{uploadedUrl}</p>
        </div>
      ) : null}
    </form>
  );
};
