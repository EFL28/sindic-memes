import MemeCard from "@/components/MemeCard";

export default function Home() {
  return (
    <main className="min-h-screen pb-24">
      {/* MOCKED */}
      <section className="p-4 columns-2 gap-4">
        <MemeCard
          type="image"
          title="Cuando el código compila a la primera"
          url="https://picsum.photos/400/600"
        />
        <MemeCard
          type="video"
          title="ILL PEKEÑO - REFLEJOS"
          url="https://www.youtube.com/watch?v=_LLa8va3bgs"
        />
        <MemeCard
          type="link"
          title="Meme Twitter 1"
          url="https://x.com/abrokensouI/status/2003866713008599431?s=20"
        />
        <MemeCard
          type="image"
          title="Expectativa vs Realidad"
          url="https://picsum.photos/400/300"
        />
        <MemeCard
          type="image"
          title="Meme de oficina"
          url="https://picsum.photos/400/500"
        />
      </section>
    </main>
  );
}
