import React, { useState } from "react";
import { Clock, CheckCircle2 } from "lucide-react";
import { Card, CardContent, CardHeader } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { Progress as ProgressBar } from "../../components/ui/progress";

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

  const toggleExpand = () => setIsExpanded((prev) => !prev);

  return (
    <Card
      className="w-full max-w-md cursor-pointer transition-all duration-300 
        hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-white to-gray-50
        border border-gray-100 rounded-xl overflow-hidden"
      onClick={toggleExpand}
    >
      <CardHeader className="space-y-3 p-6">
        <div className="flex justify-between items-center">
          <Badge
            variant="secondary"
            className={`${
              progress === 100
                ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
                : "bg-indigo-100 text-indigo-700 hover:bg-indigo-200"
            } transition-colors duration-200 font-medium px-3 py-1 rounded-full`}
          >
            {progress === 100 ? "Completed" : "In Progress"}
          </Badge>
          <div className="text-sm font-medium text-gray-500">
            {progress}% Complete
          </div>
        </div>
        <h3 className="text-2xl font-bold text-gray-800 tracking-tight">
          {title}
        </h3>
      </CardHeader>

      <CardContent className="p-6 pt-0">
        <div className="space-y-6">
          <div className="space-y-3">
            <ProgressBar 
              value={progress} 
              className={"h-2 bg-gray-100 [&>div]:bg-emerald-500 [&>div]:transition-all [&>div]:duration-500"}
            />
            <div className="flex justify-between text-xs text-gray-500 font-medium">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
          </div>

          <div
            className={`transition-all duration-500 ease-in-out overflow-hidden ${
              isExpanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="space-y-6 pt-4">
              <div className="flex items-center text-sm text-gray-600 bg-gray-50 p-3 rounded-lg">
                <Clock className="h-4 w-4 mr-2 text-indigo-500" />
                <span className="font-medium">Due: {dueDate}</span>
              </div>

              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-gray-800 flex items-center">
                  <CheckCircle2 className="h-4 w-4 mr-2 text-indigo-500" />
                  Key Achievements
                </h4>
                <div className="space-y-2">
                  {tasks.map((task, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between text-sm 
                        p-2 rounded-md hover:bg-gray-50 transition-colors duration-200"
                    >
                      <span className={task.completed ? "text-gray-800" : "text-gray-600"}>
                        {task.title}
                      </span>
                      {task.completed && (
                        <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}