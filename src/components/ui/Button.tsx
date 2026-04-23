import { ReactNode, ButtonHTMLAttributes } from 'react';
import Link from 'next/link';
// import { theme } from '@/lib/theme';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  href?: string;
  className?: string;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  href,
  className = '',
  ...props
}: ButtonProps) {
  // Base styles for all buttons
  const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-300 relative overflow-hidden';
  
  // Style variants
  const variantStyles = {
    primary: 'btn-french-primary text-white',
    secondary: 'bg-white text-french-blue border-2 border-french-blue hover:bg-french-blue hover:text-white',
    outline: 'bg-transparent text-french-blue border border-french-blue hover:bg-french-blue hover:text-white',
  };
  
  // Size variants
  const sizeStyles = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg',
  };
  
  // Full width style
  const widthStyle = fullWidth ? 'w-full' : '';
  
  // Combine styles
  const buttonStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyle} ${className}`;
  
  // Return Link if href is provided, otherwise return button
  if (href) {
    return (
      <Link href={href} className={buttonStyles}>
        <span className="relative z-10 flex items-center justify-center">{children}</span>
      </Link>
    );
  }
  
  return (
    <button className={buttonStyles} {...props}>
      <span className="relative z-10 flex items-center justify-center">{children}</span>
    </button>
  );
}
