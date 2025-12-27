import { supabase } from "@/lib/supabase";
import { FILTER_CATEGORIES, MemeType } from "@/types/memes.types";

// get all
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

// get by id
export const fetchMemeById = async (id: number) => {
  const { data, error } = await supabase
    .from("memes")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
};

// post
export const createMeme = async (meme: {
  title: string;
  type: MemeType;
  url: string;
}) => {
  const { data, error } = await supabase.from("memes").insert([meme]).select();

  if (error) throw new Error(error.message);
  return data;
};

// update needed?

// delete
export const deleteMeme = async (id: number) => {
  const { data, error } = await supabase.from("memes").delete().eq("id", id);

  if (error) throw new Error(error.message);
  return data;
};
