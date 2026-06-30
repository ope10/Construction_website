import React from 'react';
import { cn } from '../../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = 'primary',
  size = 'md',
  children,
  ...props
}) => {
  return (
    <button
      className={cn(
        'inline-flex items-center justify-center font-display font-medium uppercase tracking-wider transition-all duration-300 rounded-sm cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
        // Variants
        {
          // Primary: Gold gradient button with black text
          'bg-gradient-to-r from-gold-500 to-gold-600 hover:from-gold-600 hover:to-gold-700 text-obsidian-950 shadow-lg shadow-gold-500/10 hover:shadow-gold-500/20 active:scale-[0.98]':
            variant === 'primary',
          // Secondary: Glassmorphic panel with gold borders on hover
          'glass-panel text-gold-300 hover:text-gold-200 border border-white/10 hover:border-gold-500/30 hover:bg-obsidian-800/60':
            variant === 'secondary',
          // Outline: Gold outline
          'border border-gold-600 text-gold-300 hover:bg-gold-500/10':
            variant === 'outline',
          // Ghost: Transparent hover effect
          'text-obsidian-300 hover:text-white hover:bg-white/5':
            variant === 'ghost',
        },
        // Sizes
        {
          'text-xs px-4 py-2': size === 'sm',
          'text-sm px-6 py-3': size === 'md',
          'text-base px-8 py-4': size === 'lg',
        },
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
};
