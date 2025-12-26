import { SlidersHorizontal } from "lucide-react";

interface FilterButtonProps {
  onToggleFilter: () => void;
  isFilterActive: boolean;
}

export const FilterButton = ({
  onToggleFilter,
  isFilterActive,
}: FilterButtonProps) => {
  return (
    <button
      onClick={onToggleFilter}
      className={`p-2 rounded-full border transition-all active:scale-90 ${
        isFilterActive
          ? "bg-brand text-white border-brand shadow-lg shadow-brand/20"
          : "bg-input-bg text-zinc-500 border-card-border hover:border-brand/50"
      }`}
    >
      <SlidersHorizontal size={20} />
    </button>
  );
};
