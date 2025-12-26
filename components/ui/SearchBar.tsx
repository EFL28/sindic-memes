"use client";

import { Search } from "lucide-react";
import { FilterButton } from "./FilterButton";

interface SearchBarProps {
  onToggleFilter: () => void;
  isFilterActive: boolean;
}

export const SearchBar = ({
  onToggleFilter,
  isFilterActive,
}: SearchBarProps) => {
  return (
    <div className="relative flex items-center gap-2 flex-1 max-w-xl group">
      <div className="relative flex-1">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500 group-focus-within:text-brand transition-colors"
          size={18}
        />
        <input
          type="text"
          placeholder="Buscar memes..."
          className="w-full bg-input-bg border border-card-border rounded-full py-2 pl-10 pr-4 text-sm text-foreground focus:ring-2 focus:ring-brand focus:border-transparent outline-none transition-all shadow-sm"
        />
      </div>

      <FilterButton
        onToggleFilter={onToggleFilter}
        isFilterActive={isFilterActive}
      />
    </div>
  );
};
