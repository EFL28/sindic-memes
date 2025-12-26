import { useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";

export function useScrollDirection() {
  const { scrollY } = useScroll();
  const [isVisible, setIsVisible] = useState(true);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() ?? 0;

    // scroll pabajo se oculta
    if (current > previous && current > 50) {
      setIsVisible(false);
    }
    // scroll parriba se muestra
    else if (current < previous) {
      setIsVisible(true);
    }
  });

  return isVisible;
}
