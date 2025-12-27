"use client";

import MemeCard from "@/components/memes/MemeCard";
import { MemeCardSkeleton } from "@/components/memes/MemeCardSkeleton";
import { useGetMemes } from "@/hooks/useMemes";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function MemesGrid() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "all";
  const search = searchParams.get("q") || "";

  const { data: memes, isLoading, isError } = useGetMemes(category, search);

  if (isLoading) {
    return (
      <section className="p-4 columns-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <MemeCardSkeleton key={i} />
        ))}
      </section>
    );
  }

  if (isError)
    return <div className="p-10 text-center">Error al cargar memes</div>;

  if (!memes) return null;

  return (
    <section className="p-4 columns-2 gap-4">
      {memes?.length > 0 ? (
        memes.map((meme) => <MemeCard key={meme.id} {...meme} />)
      ) : (
        <div className="col-span-2 text-center py-20 text-foreground/40 font-bold">
          No hay memes
        </div>
      )}
    </section>
  );
}

export default function Home() {
  return (
    <main className="min-h-screen pb-24">
      <Suspense fallback={<div className="p-4 text-center">Cargando...</div>}>
        <MemesGrid />
      </Suspense>
    </main>
  );
}
