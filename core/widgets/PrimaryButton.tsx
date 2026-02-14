
import React from 'react';

interface PrimaryButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({ text, onClick, className = '' }) => {
  return (
    <button
      onClick={onClick}
      className={`w-full h-[56px] bg-gradient-to-r from-[#7B6CF6] to-[#9D8CFF] text-white font-bold text-lg rounded-[22px] shadow-lg shadow-primary/20 transition-all hover:opacity-95 active:scale-[0.98] ${className}`}
    >
      {text}
    </button>
  );
};
