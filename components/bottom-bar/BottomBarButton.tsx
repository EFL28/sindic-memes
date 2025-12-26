import { LucideIcon } from "lucide-react";

interface BottomBarButtonProps {
  icon: LucideIcon;
  onClick?: () => void;
}

export const BottomBarButton = ({
  icon: Icon,
  onClick,
}: BottomBarButtonProps) => {
  const baseClassName =
    "text-foreground/60 hover:text-brand p-2 transition-colors";

  return (
    <button className={baseClassName} onClick={onClick}>
      <Icon size={24} />
    </button>
  );
};
