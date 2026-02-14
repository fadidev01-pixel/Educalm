
import React from 'react';

interface ConfirmationDialogProps {
  isOpen: boolean;
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
  isDestructive?: boolean;
}

export const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isOpen,
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  isDestructive = true,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-300 px-6">
      <div className="bg-white dark:bg-darkCard rounded-[40px] p-8 max-w-sm w-full shadow-2xl animate-in zoom-in-95 duration-200">
        <div className={`w-16 h-16 rounded-3xl flex items-center justify-center mb-6 ${isDestructive ? 'bg-red-50 dark:bg-red-900/20 text-red-500' : 'bg-primary/10 text-primary'}`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
          </svg>
        </div>
        
        <h3 className="text-2xl font-black text-textDark dark:text-darkTextPrimary mb-2 leading-tight">
          {title}
        </h3>
        <p className="text-textLight dark:text-darkTextSecondary font-medium leading-relaxed mb-8">
          {message}
        </p>

        <div className="flex flex-col gap-3">
          <button 
            onClick={onConfirm}
            className={`w-full py-4 rounded-2xl font-bold transition-all active:scale-95 shadow-lg ${isDestructive ? 'bg-red-500 text-white shadow-red-500/20 hover:bg-red-600' : 'bg-primary text-white shadow-primary/20 hover:opacity-90'}`}
          >
            {confirmText}
          </button>
          <button 
            onClick={onCancel}
            className="w-full py-4 bg-gray-100 dark:bg-gray-800 text-textDark dark:text-darkTextPrimary rounded-2xl font-bold transition-all active:scale-95 hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
};
