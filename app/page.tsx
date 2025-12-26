"use client";

import MemeCard from "@/components/MemeCard";
import { MEMES_DATA, MemeTypeMap } from "@/utils/memes.utils";
import { useSearchParams } from "next/navigation";

export default function Home() {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams.get("category");

  const filteredMemes = MEMES_DATA.filter((meme) => {
    if (!categoryFilter || categoryFilter === "todos") return true;

    return meme.type === MemeTypeMap[categoryFilter];
  });

  return (
    <main className="min-h-screen pb-24">
      <section className="p-4 columns-2 gap-4">
        {filteredMemes.length > 0 ? (
          filteredMemes.map((meme) => (
            <MemeCard
              key={meme.id}
              type={meme.type}
              title={meme.title}
              url={meme.url}
            />
          ))
        ) : (
          <div className="col-span-2 text-center py-20 text-foreground/40 font-bold">
            No hay memes en esta categoría
          </div>
        )}
      </section>
    </main>
  );
}
