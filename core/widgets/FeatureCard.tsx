
import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className="bg-white dark:bg-darkCard rounded-[22px] shadow-soft dark:shadow-dark-soft p-[18px] flex items-center gap-4 cursor-pointer transition-all duration-300 active:scale-[0.97] hover:shadow-modern group border border-gray-100 dark:border-white/5"
    >
      {/* Icon Container - Design matched to spec */}
      <div className="w-12 h-12 rounded-[14px] bg-[#EDE9FF] dark:bg-darkPrimary/10 flex items-center justify-center text-[#6C63FF] dark:text-darkPrimary transition-all duration-300 group-hover:bg-[#6C63FF] group-hover:text-white shrink-0 rtl-flip">
        {icon}
      </div>
      
      {/* Text Area - No hard truncation to prevent cutting off text incorrectly */}
      <div className="flex-1 min-w-0 flex flex-col items-start ltr:text-left rtl:text-right">
        <h3 className="font-semibold text-textDark dark:text-darkTextPrimary text-base leading-tight tracking-tight">
          {title}
        </h3>
        <p className="text-textLight dark:text-darkTextSecondary text-[13px] mt-1 font-medium leading-relaxed opacity-70">
          {description}
        </p>
      </div>

      {/* Arrow - Auto flips in RTL context via rtl-flip class */}
      <div className="text-gray-400 dark:text-darkTextSecondary/40 group-hover:text-primary dark:group-hover:text-darkPrimary transition-all duration-300 rtl-flip">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6"/>
        </svg>
      </div>
    </div>
  );
};
