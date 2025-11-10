import { FloatingButton, FloatingButtonItem } from "@/components/ui/floating-button";
import { cn } from "@/lib/utils";
import { LinkedinIcon, PlusIcon } from "lucide-react";

function FloatingButtonExample() {
  const items = [
    {
      icon: <LinkedinIcon />,
      bgColor: 'bg-[#0a66c2]'
    }
  ];

  return (
    <FloatingButton
      triggerContent={
        <button className="flex items-center justify-center h-12 w-12 rounded-full bg-black dark:bg-slate-800 text-white/80 z-10">
          <PlusIcon />
        </button>
      }>
      {items.map((item, key) => (
        <FloatingButtonItem key={key}>
          <button
            className={cn(
              'h-12 w-12 rounded-full flex items-center justify-center text-white/80',
              item.bgColor
            )}>
            {item.icon}
          </button>
        </FloatingButtonItem>
      ))}
    </FloatingButton>
  );
}

export { FloatingButtonExample }; 