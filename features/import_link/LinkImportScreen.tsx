
import React, { useState } from 'react';
import { useNavigation } from '../../core/navigation/NavigationContext';
import { PrimaryButton } from '../../core/widgets/PrimaryButton';
import { LoadingDialog } from '../../core/widgets/LoadingDialog';
import { GoogleGenAI } from "@google/genai";

export const LinkImportScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { push, showSnackBar } = useNavigation();
  const [isExtracting, setIsExtracting] = useState(false);
  const [url, setUrl] = useState('');

  const handleExtract = async () => {
    if (!url.trim()) return;
    setIsExtracting(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `Extract the main text content from this article link: ${url}. Provide only the article text, no metadata or sidebars.`,
        config: { tools: [{ googleSearch: {} }] }
      });

      const extractedText = response.text || 'Could not extract content.';
      push('/editor', { initialText: extractedText });
    } catch (error: any) {
      console.error(error);
      if (error?.message?.includes('429')) {
        showSnackBar('Extraction limit reached. Please wait a moment and try again.');
      } else {
        showSnackBar('Failed to extract article text. Try copying the text manually.');
      }
    } finally {
      setIsExtracting(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FE] dark:bg-darkBg transition-colors duration-300">
      <LoadingDialog isOpen={isExtracting} message="Fetching article content..." />
      
      {/* Primary Scroll View */}
      <div className="flex-1 overflow-y-auto scroll-smooth px-6 pt-10 pb-40">
        <header className="flex items-center gap-4 mb-10">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-textDark dark:text-darkTextPrimary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <h2 className="text-2xl font-black text-textDark dark:text-darkTextPrimary">Import Link</h2>
        </header>

        <main className="flex flex-col gap-6">
          <div className="bg-primary/10 dark:bg-darkPrimary/10 p-8 rounded-[40px] flex flex-col items-center text-center gap-4 transition-colors">
            <div className="w-20 h-20 bg-white dark:bg-darkCard rounded-3xl flex items-center justify-center text-primary dark:text-darkPrimary shadow-sm transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>
            </div>
            <h3 className="text-xl font-bold text-textDark dark:text-darkTextPrimary">Paste URL</h3>
            <p className="text-textLight dark:text-darkTextSecondary font-medium">We'll clean up the webpage and keep just the article text for you.</p>
          </div>

          <input 
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://example.com/article"
            className="w-full p-6 rounded-[28px] bg-white dark:bg-darkCard border-2 border-transparent focus:border-primary dark:focus:border-darkPrimary outline-none text-textDark dark:text-darkTextPrimary shadow-soft transition-all"
          />

          <PrimaryButton text="Extract Text" onClick={handleExtract} />
        </main>
      </div>
    </div>
  );
};
