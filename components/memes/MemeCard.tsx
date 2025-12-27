"use client";

import { MemeType } from "@/types/memes.types";
import { motion } from "framer-motion";
import { Link as LinkIcon, Play } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Tweet } from "react-tweet";

interface MemeProps {
  type: MemeType;
  title: string;
  url: string;
}

export default function MemeCard({ type, title, url }: MemeProps) {
  const [hasWindow, setHasWindow] = useState(false);

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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      className="break-inside-avoid mb-4 rounded-2xl overflow-hidden bg-card border border-card-border shadow-sm hover:shadow-md transition-all"
    >
      <div className="relative">
        {type === "image" && (
          <Image
            src={url}
            width={500}
            height={300}
            alt={title}
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
        <h3 className="text-sm font-bold text-foreground leading-tight tracking-tight">
          {title}
        </h3>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-[10px] bg-brand/10 text-brand px-2.5 py-1 rounded-full uppercase tracking-widest font-black">
            {type}
          </span>
          <span className="text-[10px] text-foreground/40 font-medium">
            Añadido hoy
          </span>
        </div>
      </div>
    </motion.div>
  );
}
