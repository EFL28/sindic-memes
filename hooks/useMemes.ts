import { fetchMemes } from "@/services/memesService";
import { Meme } from "@/types/memes.types";
import type { UseQueryResult } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";

export function useGetMemes(
  category: string,
  search: string
): UseQueryResult<Meme[], Error> {
  return useQuery<Meme[], Error>({
    queryKey: ["memes", category, search], // Se cachea por categoría y búsqueda
    queryFn: () => fetchMemes(category, search),
    staleTime: 1000 * 60 * 5, // Los memes se consideran "frescos" por 5 minutos
  });
}
