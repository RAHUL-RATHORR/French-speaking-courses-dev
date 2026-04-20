import NextLink, { LinkProps as NextLinkProps } from 'next/link';
import { ReactNode } from 'react';

interface CustomLinkProps extends NextLinkProps {
  children: ReactNode;
  variant?: 'default' | 'nav' | 'footer' | 'underline';
  className?: string;
  external?: boolean;
}

export default function Link({
  children,
  variant = 'default',
  className = '',
  external = false,
  ...props
}: CustomLinkProps) {
  // Base styles for all links
  const baseStyles = 'transition-all duration-300';
  
  // Style variants
  const variantStyles = {
    default: 'text-french-blue hover:text-accent-blue',
    nav: 'relative group text-gray-700 hover:text-french-blue px-4 py-2 font-medium',
    footer: 'text-gray-400 hover:text-white',
    underline: 'text-french-blue hover:text-accent-blue border-b border-transparent hover:border-accent-blue',
  };
  
  // Combine styles
  const linkStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;
  
  // Additional props for external links
  const externalProps = external ? { target: '_blank', rel: 'noopener noreferrer' } : {};
  
  // Navigation link underline animation
  const navUnderline = variant === 'nav' ? (
    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-french-blue group-hover:w-full transition-all duration-300"></div>
  ) : null;
  
  return (
    <NextLink className={linkStyles} {...externalProps} {...props}>
      {children}
      {navUnderline}
    </NextLink>
  );
}
