//TODO: Implement
export const fetchMemes = async (category: string, search: string) => {
  let url = `https://api.sindicmemes.com/memes?category=${category}`;
  if (search) {
    url += `&search=${encodeURIComponent(search)}`;
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Error fetching memes");
  }

  return response.json();
};
