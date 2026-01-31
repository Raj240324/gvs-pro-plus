import React from 'react';
import styles from './SendButton.module.css';
import { cn } from '@/lib/utils';
import { Send, Check, Loader2 } from 'lucide-react';

interface SendButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  isSubmitting?: boolean;
  isSubmitted?: boolean;
}

const SendButton = React.forwardRef<HTMLButtonElement, SendButtonProps>(
  ({ className, text = "Send Message", isSubmitting = false, isSubmitted = false, ...props }, ref) => {
    return (
      <button 
        ref={ref} 
        className={cn(
          styles.button, 
          isSubmitted && styles.success, 
          isSubmitting && styles.loading,
          className
        )} 
        disabled={isSubmitting || isSubmitted || props.disabled}
        {...props}
      >
        <span className={styles.textContainer}>
          {isSubmitting ? "Sending..." : isSubmitted ? "Sent!" : text}
        </span>
        
        <div className={styles.iconWrapper}>
          {isSubmitting ? (
             <Loader2 className="animate-spin w-6 h-6" />
          ) : (
             <Send className="w-6 h-6" />
          )}
        </div>

        <div className={styles.successIconWrapper}>
          <Check className="w-8 h-8" strokeWidth={3} />
        </div>
      </button>
    );
  }
);

SendButton.displayName = "SendButton";

export default SendButton;
