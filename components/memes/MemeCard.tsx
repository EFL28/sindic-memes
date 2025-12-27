"use client";

import { deleteMeme, updateMeme } from "@/services/memesService";
import { Meme } from "@/types/memes.types";
import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Check,
  Link as LinkIcon,
  Loader2,
  Pencil,
  Play,
  Trash2,
  X,
} from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Tweet } from "react-tweet";
import { toast } from "sonner";

export default function MemeCard({
  id,
  type,
  title: initialTitle,
  url,
  created_at,
}: Meme) {
  const [hasWindow, setHasWindow] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [isOperating, setIsOperating] = useState(false);

  const queryClient = useQueryClient();

  useEffect(() => {
    if (typeof window !== "undefined") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setHasWindow(true);
    }
  }, []);

  const getTweetId = (tweetUrl: string) => {
    const match = tweetUrl.match(/status\/(\d+)/);
    return match ? match[1] : null;
  };

  const tweetId = getTweetId(url);

  const handleUpdate = async () => {
    if (!title.trim() || title === initialTitle) return setIsEditing(false);
    setIsOperating(true);
    try {
      await updateMeme(id, { title });

      setIsEditing(false);

      queryClient.invalidateQueries({ queryKey: ["memes"] }); // Refresca la home automáticamente

      toast.success("Título actualizado");
    } catch (error) {
      toast.error("Error al actualizar");
    } finally {
      setIsOperating(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm("¿Estás seguro de que quieres borrar este meme?")) return;

    setIsOperating(true);

    try {
      await deleteMeme(id, url, type);

      queryClient.invalidateQueries({ queryKey: ["memes"] });

      toast.success("Meme eliminado");
    } catch (error) {
      toast.error("Error al eliminar");
    } finally {
      setIsOperating(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className="relative group break-inside-avoid mb-4 rounded-2xl overflow-hidden bg-card border border-card-border shadow-sm hover:shadow-md transition-all"
    >
      <div className="absolute top-2 right-2 flex gap-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="p-2 bg-white/90 dark:bg-black/90 rounded-full shadow-sm text-zinc-600 hover:text-brand"
        >
          <Pencil size={14} />
        </button>

        <button
          onClick={handleDelete}
          className="p-2 bg-white/90 dark:bg-black/90 rounded-full shadow-sm text-zinc-600 hover:text-red-500"
        >
          {isOperating ? (
            <Loader2 size={14} className="animate-spin" />
          ) : (
            <Trash2 size={14} />
          )}
        </button>
      </div>

      <div className="relative">
        {type === "image" && (
          <Image
            src={url}
            width={500}
            height={300}
            alt={initialTitle}
            className="w-full h-auto block"
          />
        )}

        {type === "tweet" && (
          <div className="p-2 bg-input-bg flex justify-center border-b border-card-border overflow-hidden">
            {tweetId ? (
              <Tweet id={tweetId} />
            ) : (
              <div className="p-4 text-brand text-xs text-center font-bold">
                URL de tweet inválida
              </div>
            )}
          </div>
        )}

        {type === "video" && hasWindow && (
          <div className="aspect-video bg-black">
            <ReactPlayer
              src={url}
              width="100%"
              height="100%"
              controls={true}
              light={true}
              playIcon={
                <div className="bg-brand p-4 rounded-full shadow-lg shadow-brand/40 group">
                  <Play
                    fill="white"
                    className="text-white group-hover:scale-110 transition-transform"
                  />
                </div>
              }
            />
          </div>
        )}

        {type === "link" && (
          <div className="p-10 flex flex-col items-center justify-center bg-input-bg">
            <LinkIcon className="text-brand/50 mb-3" size={32} />
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-brand font-bold underline underline-offset-4 truncate w-full text-center hover:opacity-80 transition-opacity"
            >
              {url}
            </a>
          </div>
        )}
      </div>

      <div className="p-4">
        {isEditing ? (
          <div className="flex items-center gap-2">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-input-bg border border-brand/50 rounded-lg px-2 py-1 text-sm outline-none focus:ring-1 focus:ring-brand"
              autoFocus
              onKeyDown={(e) => e.key === "Enter" && handleUpdate()}
            />

            <button
              onClick={handleUpdate}
              className="text-green-500 hover:scale-110"
            >
              <Check size={18} />
            </button>
            <button
              onClick={() => {
                setIsEditing(false);
                setTitle(initialTitle);
              }}
              className="text-red-500 hover:scale-110"
            >
              <X size={18} />
            </button>
          </div>
        ) : (
          <>
            <h3 className="text-sm font-bold text-foreground leading-tight tracking-tight">
              {initialTitle}
            </h3>
          </>
        )}
        <div className="mt-4 flex items-center justify-between">
          <span className="text-[10px] bg-brand/10 text-brand px-2.5 py-1 rounded-full uppercase tracking-widest font-black">
            {type}
          </span>

          <span className="text-[10px] text-foreground/40 font-medium">
            Añadido {created_at?.split("T")[0]}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
