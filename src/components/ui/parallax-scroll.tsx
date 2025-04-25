
import { useRef } from "react";
import { cn } from "@/lib/utils";

export const ParallaxScroll = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  const gridRef = useRef<HTMLDivElement>(null);

  // Calculate which images go in which column
  const third = Math.ceil(images.length / 3);
  const firstPart = images.slice(0, third);
  const secondPart = images.slice(third, 2 * third);
  const thirdPart = images.slice(2 * third);

  // Custom hook for scroll animation
  const useScroll = () => {
    const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
      if (!gridRef.current) return;
      
      const scrollPos = e.currentTarget.scrollTop;
      const scrollHeight = e.currentTarget.scrollHeight;
      const scrollPercent = scrollPos / (scrollHeight - e.currentTarget.clientHeight);
      
      const firstTranslate = -200 * scrollPercent;
      const secondTranslate = 200 * scrollPercent;
      const thirdTranslate = -200 * scrollPercent;
      
      gridRef.current.querySelectorAll('.first-column').forEach(el => {
        (el as HTMLElement).style.transform = `translateY(${firstTranslate}px)`;
      });
      
      gridRef.current.querySelectorAll('.second-column').forEach(el => {
        (el as HTMLElement).style.transform = `translateY(${secondTranslate}px)`;
      });
      
      gridRef.current.querySelectorAll('.third-column').forEach(el => {
        (el as HTMLElement).style.transform = `translateY(${thirdTranslate}px)`;
      });
    };
    
    return handleScroll;
  };

  const handleScroll = useScroll();

  return (
    <div
      className={cn("h-[40rem] items-start overflow-y-auto w-full", className)}
      ref={gridRef}
      onScroll={handleScroll}
    >
      <div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start max-w-5xl mx-auto gap-10 py-40 px-10"
      >
        <div className="grid gap-10">
          {firstPart.map((el, idx) => (
            <div
              className="first-column transition-transform duration-300"
              key={"grid-1" + idx}
            >
              <img
                src={el}
                className="h-80 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                alt="gallery image"
              />
            </div>
          ))}
        </div>
        <div className="grid gap-10">
          {secondPart.map((el, idx) => (
            <div 
              className="second-column transition-transform duration-300" 
              key={"grid-2" + idx}
            >
              <img
                src={el}
                className="h-80 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                alt="gallery image"
              />
            </div>
          ))}
        </div>
        <div className="grid gap-10">
          {thirdPart.map((el, idx) => (
            <div 
              className="third-column transition-transform duration-300" 
              key={"grid-3" + idx}
            >
              <img
                src={el}
                className="h-80 w-full object-cover object-left-top rounded-lg gap-10 !m-0 !p-0"
                alt="gallery image"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
