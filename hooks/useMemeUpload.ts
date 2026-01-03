"use client";

import { supabase } from "@/lib/supabase";
import {
  MemeFormValues,
  uploadMemeFormSchema,
} from "@/lib/validations/meme.schema";
import { createMeme } from "@/services/memesService";
import { MemeType } from "@/types/memes.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useMemeUpload = (type: MemeType) => {
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<MemeFormValues>({
    resolver: zodResolver(uploadMemeFormSchema),
    mode: "onChange",
    defaultValues: {
      title: "",
      url: "",
    },
  });

  const onSubmit = async (data: MemeFormValues, file?: File | null) => {
    try {
      let finalUrl = data.url;
      let aiKeywords: string[] = [];

      if ((type === "image" || type === "video") && file) {
        const fileExt = file.name.split(".").pop();
        const fileName = `${crypto.randomUUID()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from("meme-uploads")
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const {
          data: { publicUrl },
        } = supabase.storage.from("meme-uploads").getPublicUrl(filePath);

        finalUrl = publicUrl;

        const aiRes = await fetch("/api/generate-keywords", {
          method: "POST",
          body: JSON.stringify({ imageUrl: finalUrl, type }),
        });
        const { keywords } = await aiRes.json();
        aiKeywords = keywords;
      }

      let newType = type;
      if (finalUrl && type === "link") {
        if (finalUrl.includes("https://x.com")) {
          newType = "tweet";
        }
      }

      await createMeme({
        id: crypto.randomUUID(),
        title: data.title,
        url: finalUrl as string,
        type: newType,
        keywords: aiKeywords,
      });

      queryClient.invalidateQueries({ queryKey: ["memes"] });

      toast.success("¡Meme guardado con éxito!");
      form.reset();
      router.push("/");
    } catch (error) {
      toast.error("Hubo un fallo a la hora de guardar el meme: " + error);
    }
  };

  return {
    register: form.register,
    handleSubmit: (file?: File | null) =>
      form.handleSubmit((data) => onSubmit(data, file)),
    isSubmitting: form.formState.isSubmitting,
    isValid: form.formState.isValid,
    errors: form.formState.errors,
    control: form.control,
    reset: form.reset,
  };
};
