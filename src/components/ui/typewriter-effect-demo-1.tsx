"use client";
import { TypewriterEffectSmooth } from "../../components/ui/typewriter-effect";

export default function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "(OUR",
      className: "text-[#ffbf00] dark:text-[#ffbf00]",
    },
    {
      text: "VISION",
      className: "text-[#ffbf00] dark:text-[#ffbf00]",
    },
    {
      text: "TO",
      className: "text-[#ffbf00] dark:text-[#ffbf00]",
    },
    {
      text: "YOUR",
      className: "text-[#ffbf00] dark:text-[#ffbf00]",
    },
    {
      text: "SOLUTION)",
      className: "text-[#ffbf00] dark:text-[#ffbf00]",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center max-w-full">
      <TypewriterEffectSmooth
        words={words}
        className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold italic mb-2 sm:mb-4 leading-tight"
        cursorClassName="bg-[#ffbf00] w-1.5 sm:w-2 h-full"
      />
    </div>
  );
}