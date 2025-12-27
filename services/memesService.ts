import { supabase } from "@/lib/supabase";
import { FILTER_CATEGORIES } from "@/types/memes.types";

export const fetchMemes = async (categoryId: string, search: string) => {
  let query = supabase
    .from("memes")
    .select("*")
    .order("created_at", { ascending: false });

  const category = FILTER_CATEGORIES.find((c) => c.id === categoryId);

  if (category && category.type) {
    query = query.eq("type", category.type);
  }

  if (search) {
    query = query.ilike("title", `%${search}%`);
  }
  const { data, error } = await query;

  if (error) {
    throw new Error(error.message);
  }

  const filtered = data || [];

  return filtered;
};
