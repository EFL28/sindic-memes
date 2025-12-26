"use client";

import { MEMES_CATEGORIES } from "@/utils/memes.utils";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

export const FilterBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category")?.toLowerCase() || "todos";

  const handleFilterClick = (category: string) => {
    const params = new URLSearchParams(searchParams.toString());
    const lowerCategory = category.toLowerCase();

    if (lowerCategory === "todos") {
      params.delete("category");
    } else {
      params.set("category", lowerCategory);
    }

    router.push(`/?${params.toString()}`);
  };

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="overflow-hidden"
    >
      <div className="flex gap-2 py-4 overflow-x-auto no-scrollbar">
        {MEMES_CATEGORIES.map((category) => {
          const lowerCaseCategory = category.toLowerCase();
          const isActive = activeCategory === lowerCaseCategory;

          return (
            <button
              key={category}
              onClick={() => handleFilterClick(category)}
              className={`whitespace-nowrap px-5 py-1.5 rounded-full border text-xs font-bold transition-all active:scale-95 ${
                isActive
                  ? "bg-brand text-white border-brand shadow-md"
                  : "bg-input-bg border-card-border text-foreground/70 hover:border-brand/50"
              }`}
            >
              {category}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};
