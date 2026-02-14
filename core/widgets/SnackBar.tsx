
import React from 'react';

interface SnackBarProps {
  message: string | null;
}

export const SnackBar: React.FC<SnackBarProps> = ({ message }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-[100] animate-in slide-in-from-bottom-4 duration-300">
      <div className="bg-textDark text-white px-6 py-3 rounded-full shadow-xl text-sm font-medium flex items-center gap-2">
        <span>{message}</span>
      </div>
    </div>
  );
};
