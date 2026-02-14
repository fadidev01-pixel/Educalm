
import React from 'react';

interface LoadingDialogProps {
  isOpen: boolean;
  message: string;
}

export const LoadingDialog: React.FC<LoadingDialogProps> = ({ isOpen, message }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-sm animate-in fade-in duration-300 px-6">
      <div className="bg-white rounded-[28px] p-8 flex flex-col items-center max-w-xs w-full shadow-2xl">
        <div className="relative w-16 h-16 mb-6">
          <div className="absolute inset-0 border-4 border-primary/20 rounded-full" />
          <div className="absolute inset-0 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
        <h4 className="text-xl font-bold text-textDark text-center">{message}</h4>
        <p className="text-sm text-textLight mt-2 text-center">Processing your request...</p>
      </div>
    </div>
  );
};
