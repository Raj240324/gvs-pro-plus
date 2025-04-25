
import { ButtonHTMLAttributes, ReactNode, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { cva } from 'class-variance-authority';

export const buttonVariants = cva(
  'inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
        primary: 'bg-gradient-to-r from-gvs-green to-gvs-blue text-white shadow-md hover:shadow-lg transition-transform hover:scale-105',
        gradient: 'bg-gradient-to-r from-gvs-green to-gvs-blue text-white shadow-md hover:shadow-lg transition-transform hover:scale-105 hover:shadow-gvs-yellow/20',
        glass: 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all hover:border-gvs-yellow/50',
        accent: 'bg-gradient-to-r from-gvs-red to-gvs-yellow text-white shadow-md hover:shadow-lg transition-transform hover:scale-105',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
        md: 'h-10 px-4 py-2',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'default' | 'gradient' | 'glass' | 'accent'; 
  size?: 'sm' | 'md' | 'lg' | 'icon' | 'default';
  fullWidth?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  className,
  ...props
}, ref) => {
  const variantClasses = {
    primary: 'bg-gradient-to-r from-gvs-green to-gvs-blue text-white shadow-md hover:shadow-lg transition-transform hover:scale-105 active:scale-95',
    secondary: 'bg-gradient-to-r from-gvs-red to-gvs-yellow text-white shadow-md hover:shadow-lg transition-transform hover:scale-105 active:scale-95',
    outline: 'border-2 border-gvs-dark-gray text-gvs-dark-gray bg-transparent hover:bg-gvs-dark-gray hover:text-white hover:border-transparent active:scale-95',
    ghost: 'text-gvs-dark-gray bg-transparent hover:bg-gvs-dark-gray/10 active:scale-95',
    default: 'bg-gradient-to-r from-gvs-green to-gvs-blue text-white shadow-md hover:shadow-lg transition-transform hover:scale-105 active:scale-95',
    gradient: 'bg-gradient-to-r from-gvs-green to-gvs-blue text-white shadow-md hover:shadow-lg transition-transform hover:scale-105 hover:shadow-gvs-yellow/20 active:scale-95 after:content-[""] after:absolute after:inset-0 after:opacity-0 after:transition-opacity after:rounded-md after:border-2 after:border-gvs-yellow after:hover:opacity-100',
    glass: 'bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 transition-all hover:border-gvs-yellow/50 active:scale-95',
    accent: 'bg-gradient-to-r from-gvs-red to-gvs-yellow text-white shadow-md hover:shadow-lg transition-transform hover:scale-105 active:scale-95',
  };

  const sizeClasses = {
    sm: 'py-1.5 px-3 text-sm',
    md: 'py-2 px-5 text-base',
    lg: 'py-3 px-8 text-lg',
    icon: 'p-2 aspect-square',
    default: 'py-2 px-4 text-base',
  };

  return (
    <button
      ref={ref}
      className={cn(
        'relative overflow-hidden rounded-md font-medium transition-all duration-300',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className
      )}
      {...props}
    >
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </button>
  );
});

Button.displayName = 'Button';

export { Button };
export default Button;
