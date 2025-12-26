"use client";

import { useScrollDirection } from "@/hooks/useScrollDirection";
import { AnimatePresence, motion } from "framer-motion";
import { Menu as MenuIcon, Plus, Users } from "lucide-react";
import { useState } from "react";
import Menu from "../menu/Menu";

export default function BottomBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isVisible = useScrollDirection();

  return (
    <>
      <Menu isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />

      <AnimatePresence>
        {isVisible && (
          <motion.nav
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-0 left-0 right-0 bg-card/90 backdrop-blur-lg border-t border-card-border px-6 py-3 flex justify-between items-center z-50"
          >
            <button
              onClick={() => setIsMenuOpen(true)}
              className="text-foreground/60 hover:text-brand p-2 transition-colors"
            >
              <MenuIcon size={24} />
            </button>

            <button className="bg-brand p-4 rounded-full -mt-10 shadow-lg shadow-brand/30">
              <Plus size={28} className="text-white" />
            </button>

            <button className="text-foreground/60 hover:text-brand p-2 transition-colors">
              <Users size={24} />
            </button>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
