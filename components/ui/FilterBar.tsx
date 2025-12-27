"use client";

import { FILTER_CATEGORIES } from "@/types/memes.types";
import { motion } from "framer-motion";
import { useRouter, useSearchParams } from "next/navigation";

export const FilterBar = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategoryId = searchParams.get("category")?.toLowerCase() || "all";

  const handleFilterClick = (id: string) => {
    const params = new URLSearchParams(searchParams.toString());

    if (id === "all") {
      params.delete("category");
    } else {
      params.set("category", id);
    }

    router.push(`/?${params.toString()}`, { scroll: false });
  };

  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="overflow-hidden"
    >
      <div className="flex gap-2 py-4 overflow-x-auto no-scrollbar">
        {FILTER_CATEGORIES.map((category) => {
          return (
            <button
              key={category.id}
              onClick={() => handleFilterClick(category.id)}
              className={`whitespace-nowrap px-5 py-1.5 rounded-full border text-xs font-bold transition-all active:scale-95 ${
                activeCategoryId === category.id
                  ? "bg-brand text-white border-brand shadow-md"
                  : "bg-input-bg border-card-border text-foreground/70 hover:border-brand/50"
              }`}
            >
              {category.label}
            </button>
          );
        })}
      </div>
    </motion.div>
  );
};
