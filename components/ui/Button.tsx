import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  className = '', 
  children, 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-lg font-bold transition-all focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98]";
  
  const variants = {
    primary: "bg-slate-900 text-white hover:bg-slate-800 shadow-lg dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-500",
    secondary: "bg-slate-100 text-slate-900 hover:bg-slate-200 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700",
    outline: "border-2 border-slate-900 text-slate-900 bg-transparent hover:bg-slate-900 hover:text-white dark:border-blue-400 dark:text-blue-100 dark:hover:bg-blue-600 dark:hover:border-blue-600 dark:hover:text-white",
    ghost: "hover:bg-slate-100 text-slate-900 dark:text-slate-300 dark:hover:text-white dark:hover:bg-slate-800",
  };

  const sizes = {
    sm: "h-9 px-4 text-xs tracking-wider uppercase",
    md: "h-11 px-8 text-sm tracking-widest uppercase",
    lg: "h-14 px-10 text-base tracking-widest uppercase",
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
