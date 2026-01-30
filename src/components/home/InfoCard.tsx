import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface InfoCardProps {
  title: string;
  badge: string;
  subtitle: string;
  description: string | ReactNode;
  icon: ReactNode;
  color: 'blue' | 'green' | 'red' | 'yellow' | 'purple';
  delay?: number;
}

const colorMap = {
  blue: {
    bg: 'bg-white/10 dark:bg-gray-900/40',
    border: 'border-blue-500/30 group-hover:border-blue-400/60',
    iconBg: 'bg-gradient-to-br from-blue-400/20 to-blue-600/20',
    iconText: 'text-blue-400',
    badge: 'bg-blue-500/20 text-blue-200',
    title: 'text-blue-100 group-hover:text-blue-300',
  },
  green: {
    bg: 'bg-white/10 dark:bg-gray-900/40',
    border: 'border-green-500/30 group-hover:border-green-400/60',
    iconBg: 'bg-gradient-to-br from-green-400/20 to-green-600/20',
    iconText: 'text-green-400',
    badge: 'bg-green-500/20 text-green-200',
    title: 'text-green-100 group-hover:text-green-300',
  },
  red: {
    bg: 'bg-white/10 dark:bg-gray-900/40',
    border: 'border-red-500/30 group-hover:border-red-400/60',
    iconBg: 'bg-gradient-to-br from-red-400/20 to-red-600/20',
    iconText: 'text-red-400',
    badge: 'bg-red-500/20 text-red-200',
    title: 'text-red-100 group-hover:text-red-300',
  },
  yellow: {
    bg: 'bg-white/10 dark:bg-gray-900/40',
    border: 'border-yellow-500/30 group-hover:border-yellow-400/60',
    iconBg: 'bg-gradient-to-br from-yellow-400/20 to-yellow-600/20',
    iconText: 'text-yellow-400',
    badge: 'bg-yellow-500/20 text-yellow-200',
    title: 'text-yellow-100 group-hover:text-yellow-300',
  },
  purple: {
    bg: 'bg-white/10 dark:bg-gray-900/40',
    border: 'border-purple-500/30 group-hover:border-purple-400/60',
    iconBg: 'bg-gradient-to-br from-purple-400/20 to-purple-600/20',
    iconText: 'text-purple-400',
    badge: 'bg-purple-500/20 text-purple-200',
    title: 'text-purple-100 group-hover:text-purple-300',
  },
};

const InfoCard = ({ title, badge, subtitle, description, icon, color, delay = 0 }: InfoCardProps) => {
  const theme = colorMap[color];
  return (
    <motion.div
      className={`group relative h-full backdrop-blur-md rounded-2xl border ${theme.border} ${theme.bg} p-6 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl overflow-hidden`}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className={`p-3 rounded-xl ${theme.iconBg} ${theme.iconText} shadow-lg ring-1 ring-white/10`}>
            {icon}
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${theme.badge} border border-white/5`}>
            {badge}
          </span>
        </div>

        {/* Title & Subtitle */}
        <div className="mb-4">
          <h3 className={`text-xl font-bold mb-1 transition-colors ${theme.title}`}>
            {title}
          </h3>
          <p className="text-sm font-medium text-white/60">
            {subtitle}
          </p>
        </div>

        {/* Divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent mb-4" />

        {/* Description */}
        <div className="text-sm leading-relaxed text-white/80 font-normal">
          {description}
        </div>
      </div>
    </motion.div>
  );
};

export default InfoCard;
