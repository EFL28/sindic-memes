"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Languages, Settings } from "lucide-react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Footer } from "../layout/Footer";
import { ThemeToggle } from "../ui/ThemeToggle";
import { MenuHeader } from "./MenuHeader";
import { MenuOption } from "./MenuOption";

export default function Menu({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* blur background */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-60 bg-background/80 backdrop-blur-xl"
          />

          {/* menu content */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-x-0 bottom-0 z-70 bg-card border-t border-card-border rounded-t-4xl p-8 pb-8 shadow-2xl max-h-[85vh] overflow-y-auto"
          >
            {/* drag indicator */}
            <div className="w-12 h-1.5 bg-card-border rounded-full mx-auto mb-8" />

            <MenuHeader onClose={onClose} />

            <nav className="flex flex-col gap-4">
              <ThemeToggle isDark={isDark} setTheme={setTheme} />

              <div className="grid grid-cols-2 gap-4 mt-4">
                <MenuOption
                  icon={Languages}
                  label="Español"
                  onClick={() => {
                    // TODO
                    console.log("Change language");
                  }}
                />

                <MenuOption
                  icon={Settings}
                  label="Ajustes"
                  href="/settings"
                  onClick={onClose}
                />
              </div>

              <Footer />
            </nav>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
