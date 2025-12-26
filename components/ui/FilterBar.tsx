"use client";

import { motion } from "framer-motion";

const categories = ["Todos", "Videos", "Fotos", "Links", "Tweets"];

export const FilterBar = () => {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      className="overflow-hidden"
    >
      <div className="flex gap-2 py-4 overflow-x-auto no-scrollbar">
        {categories.map((category) => (
          <button
            key={category}
            className="whitespace-nowrap px-5 py-1.5 rounded-full bg-input-bg border border-card-border text-xs font-bold text-foreground/70 hover:border-brand hover:text-brand transition-all active:scale-95"
          >
            {category}
          </button>
        ))}
      </div>
    </motion.div>
  );
};
