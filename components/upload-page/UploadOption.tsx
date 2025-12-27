import { MemeUploadOptionType } from "@/types/memes.types";
import Link from "next/link";

interface UploadOptionProps {
  uploadOption: MemeUploadOptionType;
}

export const UploadOption = ({ uploadOption }: UploadOptionProps) => {
  return (
    <Link
      key={uploadOption.id}
      href={`/upload/${uploadOption.id}`}
      className="group rounded-3xl border border-card-border bg-card/70 p-5 transition hover:-translate-y-1 hover:border-brand/60 hover:bg-card shadow-lg shadow-black/5"
    >
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold text-foreground">
            {uploadOption.title}
          </h2>
          <p className="mt-1 text-sm text-foreground/70">
            {uploadOption.description}
          </p>
        </div>
        <span className="text-sm font-semibold text-brand">Elegir</span>
      </div>
    </Link>
  );
};
