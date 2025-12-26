"use client";

import { useScrollDirection } from "@/hooks/useScrollDirection";
import { AnimatePresence, motion } from "framer-motion";
import { Menu as MenuIcon, Plus, Users } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import Menu from "../menu/Menu";
import { BottomBarButton } from "./BottomBarButton";

const MotionLink = motion(Link);

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
            <BottomBarButton
              icon={MenuIcon}
              onClick={() => setIsMenuOpen(true)}
            />

            <MotionLink
              href="/upload"
              aria-label="Añadir meme"
              whileTap={{ scale: 0.9, rotate: -5 }}
              whileHover={{ scale: 1.1 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
              className="relative bg-brand p-4 rounded-full -mt-10 shadow-lg shadow-brand/40 group overflow-hidden transition-shadow hover:shadow-brand/60"
            >
              <div className="absolute inset-0 bg-linear-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />

              <Plus
                size={28}
                className="text-white relative z-10 transition-transform group-hover:rotate-90 duration-300"
              />
            </MotionLink>

            <BottomBarButton icon={Users} />
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
