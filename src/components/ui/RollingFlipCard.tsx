import React from 'react';
import styles from './RollingFlipCard.module.css';
import { cn } from '@/lib/utils';

interface RollingFlipCardProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  className?: string;
  frontClassName?: string;
  backClassName?: string;
}

const RollingFlipCard: React.FC<RollingFlipCardProps> = ({ frontContent, backContent, className, frontClassName, backClassName }) => {
  return (
    <div className={cn(styles.container, className)}>
      <div className={styles.card}>
        <div className={cn(styles.front, "bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-white/20 dark:border-white/10 shadow-2xl", frontClassName)}>
          {frontContent}
        </div>
        <div className={cn(styles.back, "bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white border border-indigo-500/20 shadow-2xl", backClassName)}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.15),transparent_70%)] pointer-events-none" />
          <div className="relative z-10 w-full h-full flex flex-col items-center justify-center p-6 gap-4">
            {backContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RollingFlipCard;
