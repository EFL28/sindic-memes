export const MEMES_CATEGORIES = ["All", "Videos", "Photos", "Links", "Tweets"];

export type Meme = {
  id: number;
  type: MemeType;
  title: string;
  url: string;
};

export type MemeUploadOptionType = {
  id: MemeType;
  title: string;
  description: string;
};

export type MemeType = "image" | "video" | "tweet" | "link";

export const UploadTypeLabel: Partial<Record<MemeType, string>> = {
  image: "Imagen",
  video: "Video",
  link: "Enlace",
};

export const FILTER_CATEGORIES = [
  { id: "all", label: "Todos", type: null },
  { id: "videos", label: "Videos", type: "video" },
  { id: "photos", label: "Fotos", type: "image" },
  { id: "links", label: "Links", type: "link" },
  { id: "tweets", label: "Tweets", type: "tweet" },
] as const;

export type CategoryFilterId = (typeof FILTER_CATEGORIES)[number]["id"];
