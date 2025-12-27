"use client";

import { supabase } from "@/lib/supabase";
import {
  MemeFormValues,
  uploadMemeFormSchema,
} from "@/lib/validations/meme.schema";
import { createMeme } from "@/services/memesService";
import { MemeType } from "@/types/memes.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export const useMemeUpload = (type: MemeType) => {
  const router = useRouter();

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
      }

      await createMeme({
        title: data.title,
        type: type,
        url: finalUrl || "",
      });

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
