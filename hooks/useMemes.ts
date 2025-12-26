import { fetchMemes } from "@/services/memesService";
import { useQuery } from "@tanstack/react-query";

export function useMemes(category: string, search: string) {
  return useQuery({
    queryKey: ["memes", category, search], // Se cachea por categoría y búsqueda
    queryFn: () => fetchMemes(category, search),
    staleTime: 1000 * 60 * 5, // Los memes se consideran "frescos" por 5 minutos
  });
}
