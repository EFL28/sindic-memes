"use client";

import { LucideIcon } from "lucide-react";
import Link from "next/link";

interface MenuOptionProps {
  icon: LucideIcon;
  label: string;
  href?: string;
  onClick?: () => void;
  iconColor?: string;
}

export const MenuOption = ({
  icon: Icon,
  label,
  href,
  onClick,
  iconColor = "text-brand",
}: MenuOptionProps) => {
  const content = (
    <>
      <Icon size={28} className={iconColor} />
      <span className="text-sm font-bold text-foreground">{label}</span>
    </>
  );

  const baseClassName =
    "flex flex-col items-center justify-center gap-3 p-6 rounded-2xl bg-input-bg border border-card-border hover:border-brand transition-all active:scale-95 group";

  if (href) {
    return (
      <Link href={href} onClick={onClick} className={baseClassName}>
        {content}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={baseClassName}>
      {content}
    </button>
  );
};
