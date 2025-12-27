import { MemeType } from "@/types/memes.types";
import { Upload } from "lucide-react";
import Image from "next/image";

interface SubmitMemeDropzoneProps {
  type: MemeType;
  preview: string | null;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const SubmitMemeDropzone = ({
  type,
  preview,
  onFileChange,
}: SubmitMemeDropzoneProps) => (
  <label className="relative flex flex-col items-center justify-center w-full h-64 border-2 border-dashed border-card-border rounded-3xl bg-input-bg hover:bg-card transition-colors cursor-pointer overflow-hidden group">
    {preview && type === "image" && (
      <Image src={preview} fill alt="Preview" className="object-cover" />
    )}

    {preview && type === "video" && (
      <video
        src={preview}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
      />
    )}

    {!preview && (
      <div className="flex flex-col items-center gap-2">
        <Upload
          className="text-brand group-hover:scale-110 transition-transform"
          size={32}
        />
        <span className="text-xs font-medium text-foreground/40 text-center px-4">
          Haz clic para subir {type === "image" ? "una imagen" : "un video"}
        </span>
      </div>
    )}

    <input
      type="file"
      accept={type === "image" ? "image/*" : "video/*"}
      className="hidden"
      onChange={onFileChange}
    />
  </label>
);
