import React from 'react';
import { cn } from '../../lib/utils';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type = 'text', label, error, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-display font-medium uppercase tracking-wider text-obsidian-300">
            {label}
          </label>
        )}
        <input
          type={type}
          className={cn(
            'glass-input w-full px-4 py-3 text-sm rounded-sm placeholder:text-obsidian-500 focus:outline-none transition-all duration-200',
            error ? 'border-red-500/50 focus:border-red-500 focus:shadow-red-500/10' : '',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <span className="text-xs text-red-400 font-sans mt-0.5">{error}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-display font-medium uppercase tracking-wider text-obsidian-300">
            {label}
          </label>
        )}
        <textarea
          className={cn(
            'glass-input w-full px-4 py-3 text-sm rounded-sm placeholder:text-obsidian-500 focus:outline-none min-h-[100px] resize-y transition-all duration-200',
            error ? 'border-red-500/50 focus:border-red-500 focus:shadow-red-500/10' : '',
            className
          )}
          ref={ref}
          {...props}
        />
        {error && <span className="text-xs text-red-400 font-sans mt-0.5">{error}</span>}
      </div>
    );
  }
);
Textarea.displayName = 'Textarea';

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, ...props }, ref) => {
    return (
      <div className="w-full flex flex-col gap-1.5">
        {label && (
          <label className="text-xs font-display font-medium uppercase tracking-wider text-obsidian-300">
            {label}
          </label>
        )}
        <div className="relative">
          <select
            className={cn(
              'glass-input w-full px-4 py-3 text-sm rounded-sm placeholder:text-obsidian-500 focus:outline-none appearance-none cursor-pointer transition-all duration-200',
              error ? 'border-red-500/50 focus:border-red-500 focus:shadow-red-500/10' : '',
              className
            )}
            ref={ref}
            {...props}
          >
            {options.map((opt) => (
              <option key={opt.value} value={opt.value} className="bg-obsidian-950 text-foreground">
                {opt.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gold-500">
            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        {error && <span className="text-xs text-red-400 font-sans mt-0.5">{error}</span>}
      </div>
    );
  }
);
Select.displayName = 'Select';
