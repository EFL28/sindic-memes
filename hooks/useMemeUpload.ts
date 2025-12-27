"use client";

import {
  MemeFormValues,
  uploadMemeFormSchema,
} from "@/lib/validations/meme.schema";
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

  const onSubmit = async (data: MemeFormValues) => {
    try {
      console.log(`Guardando ${type}:`, data);

      // TODO: redo with supabase
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success("¡Meme guardado con éxito!");
      form.reset();
      router.push("/");
    } catch (error) {
      toast.error("Hubo un fallo a la hora de guardar el meme: " + error);
    }
  };

  return {
    register: form.register,
    onSubmit: form.handleSubmit(onSubmit),
    isSubmitting: form.formState.isSubmitting,
    isValid: form.formState.isValid,
    errors: form.formState.errors,
    control: form.control,
    reset: form.reset,
  };
};
