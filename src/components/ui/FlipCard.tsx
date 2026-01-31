import React from 'react';
import styles from './FlipCard.module.css';
import { cn } from '@/lib/utils';

interface FlipCardProps {
  frontContent: React.ReactNode;
  backContent: React.ReactNode;
  className?: string;
  cardClassName?: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ frontContent, backContent, className, cardClassName }) => {
  return (
    <div className={cn(styles.container, className)}>
      <div className={cn(styles.card, cardClassName)}>
        <div className={cn(styles.front, "bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700")}>
          <div className={styles.content}>
            {frontContent}
          </div>
        </div>
        <div className={cn(styles.back, "bg-gradient-to-br from-teal-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900 border border-teal-100 dark:border-slate-700")}>
          <div className={styles.content}>
            {backContent}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FlipCard;
