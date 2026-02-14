
import React, { useState } from 'react';
import { useNavigation } from '../../core/navigation/NavigationContext';
import { PrimaryButton } from '../../core/widgets/PrimaryButton';

const pages = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2"/>
        <line x1="12" x2="12" y1="19" y2="22"/>
      </svg>
    ),
    title: "Turn Text Into Speech",
    description: "Convert any text into natural AI voice. Just type, paste, or scan."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
        <polyline points="14 2 14 8 20 8"/>
      </svg>
    ),
    title: "Import From Anywhere",
    description: "PDFs, Web articles, or even photos. We extract the text for you."
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 18v-6a9 9 0 0 1 18 0v6"/>
        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"/>
      </svg>
    ),
    title: "Listen & Stay Focused",
    description: "Follow highlighted text while listening. Perfect for learning and focus."
  }
];

export const OnboardingScreen: React.FC = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const { replace } = useNavigation();

  const handleNext = () => {
    if (currentPage < pages.length - 1) {
      setCurrentPage(prev => prev + 1);
    } else {
      replace('/login');
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-b from-[#F5F6FA] to-[#ECEBFF] p-8">
      <div className="flex-1 flex flex-col items-center justify-center text-center animate-in fade-in duration-700">
        <div className="w-48 h-48 bg-white rounded-full flex items-center justify-center text-primary shadow-2xl mb-12 shadow-primary/10">
          {pages[currentPage].icon}
        </div>
        
        <h2 className="text-3xl font-black text-textDark mb-4 tracking-tight">
          {pages[currentPage].title}
        </h2>
        
        <p className="text-lg text-textLight leading-relaxed max-w-xs">
          {pages[currentPage].description}
        </p>
      </div>

      <div className="flex flex-col gap-8 pb-10">
        <div className="flex justify-center gap-2">
          {pages.map((_, i) => (
            <div 
              key={i} 
              className={`h-2 rounded-full transition-all duration-300 ${i === currentPage ? 'w-8 bg-primary' : 'w-2 bg-primary/20'}`}
            />
          ))}
        </div>

        <PrimaryButton 
          text={currentPage === pages.length - 1 ? "Continue" : "Next"} 
          onClick={handleNext} 
        />
      </div>
    </div>
  );
};
