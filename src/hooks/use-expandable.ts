import { useState } from "react";
import { useSpring } from "framer-motion";

export const useExpandable = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const animatedHeight = useSpring(0, { stiffness: 300, damping: 30 });

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  return { isExpanded, toggleExpand, animatedHeight };
};