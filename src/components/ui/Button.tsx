import React from 'react';
import { motion } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  fullWidth?: boolean;
}

const buttonVariants: Record<ButtonVariant, string> = {
  primary: 'bg-primary-500 hover:bg-primary-600 text-white shadow-sm',
  secondary: 'bg-secondary-500 hover:bg-secondary-600 text-white shadow-sm',
  outline: 'border border-primary-500 text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20',
  ghost: 'text-primary-500 hover:bg-primary-50 dark:hover:bg-primary-900/20',
  danger: 'bg-red-500 hover:bg-red-600 text-white shadow-sm',
};

const buttonSizes: Record<ButtonSize, string> = {
  sm: 'py-1 px-3 text-sm',
  md: 'py-2 px-4 text-base',
  lg: 'py-3 px-6 text-lg',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  return (
    <motion.button
      className={`
        ${buttonVariants[variant]}
        ${buttonSizes[size]}
        ${fullWidth ? 'w-full' : ''}
        rounded-md font-medium transition-all duration-200 
        flex items-center justify-center
        ${disabled || isLoading ? 'opacity-70 cursor-not-allowed' : ''}
        ${className}
      `}
      disabled={disabled || isLoading}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
      {...props}
    >
      {isLoading && (
        <span className="mr-2">
          <svg className="animate-spin h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
        </span>
      )}
      
      {leftIcon && !isLoading && <span className="mr-2">{leftIcon}</span>}
      {children}
      {rightIcon && <span className="ml-2">{rightIcon}</span>}
    </motion.button>
  );
};