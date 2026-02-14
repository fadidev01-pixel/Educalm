
import React, { useState } from 'react';
import { useNavigation } from '../../core/navigation/NavigationContext';
import { PrimaryButton } from '../../core/widgets/PrimaryButton';
import { LoadingDialog } from '../../core/widgets/LoadingDialog';

export const PdfImportScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { push, showSnackBar } = useNavigation();
  const [isExtracting, setIsExtracting] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === 'application/pdf') {
      setSelectedFile(file);
    } else {
      showSnackBar('Please select a valid PDF file');
    }
  };

  const handleExtract = async () => {
    if (!selectedFile) return;
    setIsExtracting(true);
    
    await new Promise(r => setTimeout(r, 2000));
    
    setIsExtracting(false);
    push('/editor', { initialText: `Extracted content from: ${selectedFile.name}\n\nEducation is the most powerful weapon which you can use to change the world. This PDF contained essential notes on the future of AI in learning environments and the importance of accessible education tools like Educalm.` });
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FE] dark:bg-darkBg transition-colors duration-300">
      <LoadingDialog isOpen={isExtracting} message="Extracting text from PDF..." />
      
      {/* Primary Scroll View */}
      <div className="flex-1 overflow-y-auto scroll-smooth px-6 pt-10 pb-40">
        <header className="flex items-center gap-4 mb-10">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-textDark dark:text-darkTextPrimary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <h2 className="text-2xl font-black text-textDark dark:text-darkTextPrimary">Upload PDF</h2>
        </header>

        <main className="flex flex-col gap-8 items-center text-center">
          <div className="w-32 h-32 bg-primary/10 dark:bg-darkPrimary/10 rounded-full flex items-center justify-center text-primary dark:text-darkPrimary">
            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/><path d="M12 18v-6"/><path d="m9 15 3 3 3-3"/></svg>
          </div>
          
          <div className="max-w-xs">
            <h3 className="text-xl font-bold text-textDark dark:text-darkTextPrimary">Select a PDF</h3>
            <p className="text-textLight dark:text-darkTextSecondary mt-2">We will extract the text from your documents automatically.</p>
          </div>

          <label className="w-full cursor-pointer">
            <input type="file" accept=".pdf" className="hidden" onChange={handleFileSelect} />
            <div className="w-full p-8 border-2 border-dashed border-primary/30 dark:border-darkPrimary/30 rounded-3xl bg-white dark:bg-darkCard hover:bg-primary/5 dark:hover:bg-darkPrimary/5 transition-colors">
              {selectedFile ? (
                <span className="font-bold text-primary dark:text-darkPrimary">{selectedFile.name}</span>
              ) : (
                <span className="text-textLight dark:text-darkTextSecondary">Click to browse files</span>
              )}
            </div>
          </label>

          {selectedFile && (
            <PrimaryButton text="Start Extraction" onClick={handleExtract} />
          )}
        </main>
      </div>
    </div>
  );
};
