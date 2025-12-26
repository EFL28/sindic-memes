export const MEMES_DATA: {
  id: number;
  type: MemeType;
  title: string;
  url: string;
}[] = [
  {
    id: 1,
    type: "image",
    title: "Cuando el código compila a la primera",
    url: "https://picsum.photos/400/600",
  },
  {
    id: 2,
    type: "video",
    title: "ILL PEKEÑO - REFLEJOS",
    url: "https://www.youtube.com/watch?v=_LLa8va3bgs",
  },
  {
    id: 3,
    type: "tweet",
    title: "Meme Twitter 1",
    url: "https://x.com/abrokensouI/status/2003866713008599431",
  },
  {
    id: 4,
    type: "image",
    title: "Expectativa vs Realidad",
    url: "https://picsum.photos/400/300",
  },
];

export const MEMES_CATEGORIES = ["Todos", "Videos", "Fotos", "Links", "Tweets"];

export type MemeType = "image" | "video" | "tweet" | "link";

export const MemeTypeMap: Record<string, string> = {
  fotos: "image",
  videos: "video",
  tweets: "tweet",
  links: "link",
};
