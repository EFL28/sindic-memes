// TODO: redo wiht supabase
import { FILTER_CATEGORIES } from "@/types/memes.types";
import { MEMES_DATA } from "@/utils/memes.utils";

export const fetchMemes = async (categoryId: string, search: string) => {
  await new Promise((resolve) => setTimeout(resolve, 800)); // Simulación UX

  let filtered = [...MEMES_DATA];

  // Buscamos la categoría por ID (el que viene de la URL)
  const category = FILTER_CATEGORIES.find((c) => c.id === categoryId);

  // Si encontramos la categoría y tiene un tipo asociado, filtramos
  if (category && category.type) {
    filtered = filtered.filter((meme) => meme.type === category.type);
  }

  if (search) {
    const query = search.toLowerCase();
    filtered = filtered.filter((meme) =>
      meme.title.toLowerCase().includes(query)
    );
  }

  return filtered;
};
