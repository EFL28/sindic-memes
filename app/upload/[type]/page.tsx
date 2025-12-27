"use client";

import { SubmitMeme } from "@/components/upload-page/SubmitMeme";
import { MemeType, UploadTypeLabel } from "@/types/memes.types";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { use } from "react";

export default function UploadFormPage({
  params,
}: {
  params: Promise<{ type: MemeType }>;
}) {
  const { type } = use(params);
  const router = useRouter();

  return (
    <main className="min-h-screen bg-background px-6 pb-24 pt-10">
      <header className="mb-8 flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 rounded-full bg-card border border-card-border text-foreground/70 active:scale-90 transition-all"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-black font-heading uppercase tracking-tighter text-brand">
          Guardar {UploadTypeLabel[type]}
        </h1>
      </header>

      <section className="bg-card border border-card-border rounded-4xl p-6 shadow-xl">
        <SubmitMeme type={type} />
      </section>
    </main>
  );
}
