import { motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";

interface ThemeToggleProps {
  isDark: boolean;
  setTheme: (theme: string) => void;
}

export const ThemeToggle = ({ isDark, setTheme }: ThemeToggleProps) => {
  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-3">
        {isDark ? (
          <Moon size={20} className="text-brand" />
        ) : (
          <Sun size={20} className="text-yellow-500" />
        )}
        <span className="text-foreground">Modo Oscuro</span>
      </div>
      <button
        onClick={() => setTheme(isDark ? "light" : "dark")}
        className={`w-12 h-6 rounded-full relative transition-colors ${
          isDark ? "bg-brand" : "bg-zinc-300"
        }`}
      >
        <motion.div
          animate={{ x: isDark ? 24 : 4 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
        />
      </button>
    </div>
  );
};
