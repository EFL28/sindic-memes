import * as z from "zod";

export const uploadMemeFormSchema = z.object({
  title: z
    .string()
    .min(3, "El título debe tener al menos 3 caracteres")
    .max(50, "Título demasiado largo"),

  url: z.string().url("Introduce una URL válida").optional().or(z.literal("")),
});

export type MemeFormValues = z.infer<typeof uploadMemeFormSchema>;
