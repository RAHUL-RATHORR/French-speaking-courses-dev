import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  variant?: 'default' | 'hover' | 'border' | 'flat';
  className?: string;
}

export default function Card({ 
  children, 
  variant = 'default',
  className = '' 
}: CardProps) {
  // Base styles for all cards
  const baseStyles = 'bg-white rounded-2xl overflow-hidden';
  
  // Style variants
  const variantStyles = {
    default: 'shadow-french-md',
    hover: 'shadow-french-md course-card-hover group border border-gray-100 cursor-pointer',
    border: 'border border-gray-200',
    flat: '',
  };
  
  // Combine styles
  const cardStyles = `${baseStyles} ${variantStyles[variant]} ${className}`;
  
  return (
    <div className={cardStyles}>
      {children}
    </div>
  );
}
