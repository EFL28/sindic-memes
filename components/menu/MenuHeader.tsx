import { X } from "lucide-react";

interface MenuHeaderProps {
  onClose: () => void;
}
export const MenuHeader = ({ onClose }: MenuHeaderProps) => {
  return (
    <div className="flex justify-between items-center mb-10">
      <h2 className="text-2xl font-black text-brand tracking-tighter italic">
        Menú
      </h2>
      <button
        onClick={onClose}
        className="p-3 bg-card-border rounded-full text-foreground active:scale-90 transition-transform"
      >
        <X size={24} />
      </button>
    </div>
  );
};
