import { UploadHeader } from "@/components/upload-page/UploadHeader";
import { UploadOption } from "@/components/upload-page/UploadOption";
import { MemeUploadOptionType } from "@/types/memes.types";

//TODO: indicar extensions por cada option
const memeUploadOptions: MemeUploadOptionType[] = [
  {
    id: "image",
    title: "Imagen",
    description: "Sube una imagen clásica para el feed.",
  },
  {
    id: "video",
    title: "Video",
    description: "Comparte un clip corto o editado.",
  },
  {
    id: "link",
    title: "Enlace",
    description: "Pega el link de un meme externo.",
  },
];

export default function UploadPage() {
  return (
    <main className="min-h-screen bg-background px-6 pb-24 pt-10">
      <UploadHeader />

      <section className="grid gap-4">
        {memeUploadOptions.map((memeType) => (
          <UploadOption key={memeType.id} uploadOption={memeType} />
        ))}
      </section>
    </main>
  );
}
