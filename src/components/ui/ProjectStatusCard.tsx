import React, { useState } from "react";
import { PiClockFill, PiCheckCircleFill, PiCaretDownBold, PiTrophyFill } from "react-icons/pi";
import { Card } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Progress as ProgressBar } from "../../components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectStatusCardProps {
  title: string;
  progress: number;
  dueDate: string;
  tasks: Array<{ title: string; completed: boolean }>;
}

export function ProjectStatusCard({
  title,
  progress,
  dueDate,
  tasks,
}: ProjectStatusCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Modern "Tech" Design - Clean, Flat, Precise
  return (
    <div className="relative">
      <Card
        className={`group w-full cursor-pointer overflow-visible border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:shadow-lg hover:border-teal-500/30 rounded-xl ${isExpanded ? 'z-20 shadow-xl' : 'z-10'}`}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="space-y-1">
              <h3 className="text-xl font-bold text-gray-900 group-hover:text-teal-700 transition-colors">
                {title}
              </h3>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                 <span className="flex items-center">
                   <Badge variant="outline" className="font-normal text-xs bg-gray-50 text-gray-600 border-gray-200">
                     {progress === 100 ? "Achieved" : "In Progress"}
                   </Badge>
                 </span>
              </div>
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white transition-colors duration-300">
              {progress === 100 ? <PiTrophyFill size={20} /> : <PiClockFill size={20} />}
            </div>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex justify-between text-xs font-semibold text-gray-500 uppercase tracking-wider">
              <span>Completion</span>
              <span className="text-teal-600">{progress}%</span>
            </div>
            <ProgressBar
              value={progress}
              className="h-1.5 bg-gray-100 [&>div]:bg-teal-500"
            />
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-gray-50">
            <span className="text-xs font-medium text-gray-400">
               {tasks.length} Key Metrics
            </span>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <PiCaretDownBold className="w-4 h-4 text-gray-400" />
            </motion.div>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="overflow-hidden bg-gray-50/50 border-t border-gray-100 rounded-b-xl"
            >
              <div className="p-5 space-y-4">
                 <div className="flex items-center justify-center text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                   <PiCheckCircleFill className="w-4 h-4 mr-2 text-teal-500" />
                   Performance Indicators
                 </div>
                <div className="flex justify-center">
                  <ul className="space-y-3 inline-block">
                    {tasks.map((task, index) => (
                      <motion.li
                        key={index}
                        initial={{ x: -10, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ delay: index * 0.05 }}
                        className="flex items-center text-sm text-gray-700"
                      >
                        <div className="mr-3 flex-shrink-0 w-1.5 h-1.5 rounded-full bg-teal-400" />
                        <span className="leading-snug">{task.title}</span>
                      </motion.li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </div>
  );
}