"use client";
import { TypewriterEffectSmooth } from "../../components/ui/typewriter-effect";

export default function TypewriterEffectSmoothDemo() {
  const words = [
    {
      text: "OUR",
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
      text: "SOLUTION",
      className: "text-[#ffbf00] dark:text-[#ffbf00]",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center">
      <TypewriterEffectSmooth
        words={words}
        className="text-2xl lg:text-3xl font-semibold mb-4 italic"
        cursorClassName="bg-[#ffbf00]"
      />
    </div>
  );
}