"use client";

import { useMemeUpload } from "@/hooks/useMemeUpload";
import { MemeType } from "@/types/memes.types";
import { useState } from "react";
import { MemeSubmitButton } from "./SubmitMemeButton";
import { SubmitMemeDropzone } from "./SubmitMemeDropzone";
import { SubmitMemeTitle } from "./SubmitMemeTitle";
import { SubmitMemeUrl } from "./SubmitMemeUrl";

interface SubmitMemeProps {
  type: MemeType;
}

export const SubmitMeme = ({ type }: SubmitMemeProps) => {
  const { register, handleSubmit, isSubmitting, isValid, errors } =
    useMemeUpload(type);

  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const isFileStep = type === "image" || type === "video";

  return (
    <form onSubmit={handleSubmit(selectedFile)} className="flex flex-col gap-6">
      <div className="space-y-4">
        <SubmitMemeTitle register={register} error={errors.title} />

        {/* Lógica de carga según tipo */}
        {isFileStep ? (
          <SubmitMemeDropzone
            type={type}
            preview={preview}
            onFileChange={handleFileChange}
          />
        ) : (
          <SubmitMemeUrl register={register} error={errors.url} />
        )}
      </div>

      <MemeSubmitButton
        type={type}
        isValid={isValid}
        isSubmitting={isSubmitting}
      />
    </form>
  );
};
