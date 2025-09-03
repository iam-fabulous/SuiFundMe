import React from 'react';

type ButtonProps = {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
};

export const Button = ({ children, onClick, className = '' }: ButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`
        flex items-center justify-center gap-2 min-w-[84px] max-w-[480px] cursor-pointer 
        rounded-full h-12 px-8 bg-sui-primary text-sui-dark-background text-base 
        font-bold tracking-wide transition-all transform hover:scale-105 hover:bg-opacity-90 
        ${className}
      `}
    >
      {children}
    </button>
  );
};