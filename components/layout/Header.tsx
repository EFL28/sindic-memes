"use client";

import { FilterBar } from "@/components/ui/FilterBar";
import QuinisindicLogo from "@/components/ui/QuinisindicLogo";
import { SearchBar } from "@/components/ui/SearchBar";
import { AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

export default function Header() {
  const [showFilters, setShowFilters] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md p-4 border-b border-card-border transition-colors">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between gap-4">
          <div className="shrink-0">
            <Link href="/" aria-label="Inicio">
              <QuinisindicLogo />
            </Link>
          </div>

          <SearchBar
            onToggleFilter={() => setShowFilters(!showFilters)}
            isFilterActive={showFilters}
          />
        </div>

        <AnimatePresence>{showFilters && <FilterBar />}</AnimatePresence>
      </div>
    </header>
  );
}
