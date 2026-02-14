
import React, { useState, useMemo, useRef } from 'react';
import { useNavigation } from '../../core/navigation/NavigationContext';
import { PrimaryButton } from '../../core/widgets/PrimaryButton';
import { LoadingDialog } from '../../core/widgets/LoadingDialog';
import { GoogleGenAI } from "@google/genai";
import { generateGeminiSpeech, detectLanguage } from '../../core/services/tts_service';
import { SettingsService } from '../../core/services/settings_service';
import { useI18n } from '../../core/services/i18n_service';

export const OcrScanScreen: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { push, showSnackBar } = useNavigation();
  const [isProcessing, setIsProcessing] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const settings = useMemo(() => SettingsService.getSettings(), []);
  const { t } = useI18n(settings.language);

  const blobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = (reader.result as string).split(',')[1];
        resolve(base64String);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  };

  const handleCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setIsProcessing(true);

    try {
      const base64Data = await blobToBase64(file);
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          {
            parts: [
              { inlineData: { data: base64Data, mimeType: file.type } },
              { text: "Extract all visible text from this image. Output only the text. Preserve the original paragraph structure. Be highly accurate." }
            ]
          }
        ]
      });

      const text = response.text || '';
      if (text.trim()) {
        setExtractedText(text);
      } else {
        showSnackBar('No text found in image. Please try again.');
        setPreview(null);
      }
    } catch (error: any) {
      console.error(error);
      if (error?.message?.includes('429')) {
        showSnackBar('Daily limit reached. Please try again in a few minutes.');
      } else {
        showSnackBar('Scan failed. Please check your connection.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const handleConvertToAudio = async () => {
    if (!extractedText) return;
    
    setIsGenerating(true);
    try {
      const lang = detectLanguage(extractedText);
      const audioBase64 = await generateGeminiSpeech({
        text: extractedText,
        gender: 'female',
        language: lang,
        type: 'scan'
      });

      if (audioBase64) {
        showSnackBar(settings.language === 'ar' ? 'تم الحفظ بنجاح' : 'Saved to Library');
        push('/player', { audioBase64, text: extractedText });
      }
    } catch (error: any) {
      console.error(error);
      if (error?.message?.includes('429')) {
        showSnackBar('Voice limit reached. Please wait a moment before trying again.');
      } else {
        showSnackBar('Voice generation failed.');
      }
    } finally {
      setIsGenerating(false);
    }
  };

  const resetScan = () => {
    setPreview(null);
    setExtractedText(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FE] dark:bg-darkBg transition-colors duration-300">
      <LoadingDialog isOpen={isProcessing} message={settings.language === 'ar' ? 'جاري المسح...' : 'Scanning Image...'} />
      <LoadingDialog isOpen={isGenerating} message={t.convertToAudio + "..."} />
      
      <div className="flex-1 overflow-y-auto scroll-smooth px-6 pt-10 pb-40">
        <header className="flex items-center gap-4 mb-10">
          <button onClick={extractedText ? resetScan : onBack} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-textDark dark:text-darkTextPrimary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="rtl-flip"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <h2 className="text-2xl font-black text-textDark dark:text-darkTextPrimary">
            {extractedText ? t.scanResults : t.scanText}
          </h2>
        </header>

        <main className="flex flex-col items-center gap-8 max-w-lg mx-auto w-full">
          {!extractedText ? (
            <div className="w-full flex flex-col items-center gap-10">
              <div className="relative w-72 h-72">
                {preview ? (
                  <div className="w-full h-full rounded-[48px] overflow-hidden bg-black shadow-2xl relative border-4 border-white dark:border-white/10 transition-colors">
                    <img src={preview} alt="Scan preview" className="w-full h-full object-cover" />
                    {isProcessing && (
                      <div className="absolute inset-0 bg-primary/10 backdrop-blur-[2px]">
                        <div className="absolute top-0 left-0 w-full h-1 bg-white shadow-[0_0_20px_#fff] animate-[bounce_3s_infinite]" />
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="w-full h-full bg-primary/5 dark:bg-darkPrimary/5 rounded-[48px] border-4 border-dashed border-primary/20 flex flex-col items-center justify-center text-primary dark:text-darkPrimary animate-in zoom-in-95 duration-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="mb-4"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] opacity-40">Ready to Scan</span>
                  </div>
                )}
              </div>

              <div className="text-center max-w-xs px-4">
                <h3 className="text-xl font-bold text-textDark dark:text-darkTextPrimary">AI Scanner</h3>
                <p className="text-textLight dark:text-darkTextSecondary mt-2 font-medium">{t.scanTextSub}</p>
              </div>

              <div className="w-full flex flex-col gap-4">
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full h-18 bg-primary dark:bg-darkPrimary rounded-[28px] flex items-center justify-center text-white font-bold text-lg shadow-glow active:scale-95 transition-all"
                >
                  {t.openCamera}
                </button>
                <input 
                  ref={fileInputRef}
                  type="file" 
                  accept="image/*" 
                  capture="environment" 
                  className="hidden" 
                  onChange={handleCapture} 
                />
                
                <button 
                  onClick={() => {
                    const gallery = document.createElement('input');
                    gallery.type = 'file';
                    gallery.accept = 'image/*';
                    gallery.onchange = (e: any) => handleCapture(e);
                    gallery.click();
                  }}
                  className="text-primary dark:text-darkPrimary font-black text-xs uppercase tracking-widest text-center py-4 cursor-pointer hover:underline"
                >
                  {t.chooseGallery}
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full space-y-6 animate-in slide-in-from-bottom-10 duration-500">
              <div 
                dir={detectLanguage(extractedText) === 'ar' ? 'rtl' : 'ltr'}
                className="bg-white dark:bg-darkCard rounded-[40px] p-8 border border-gray-100 dark:border-white/5 shadow-soft dark:shadow-dark-soft transition-colors max-h-[50vh] overflow-y-auto scrollbar-hide"
              >
                <p className="text-textDark dark:text-darkTextPrimary font-medium text-lg leading-relaxed whitespace-pre-wrap">
                  {extractedText}
                </p>
              </div>

              <div className="flex flex-col gap-4">
                <PrimaryButton text={t.convertToAudio} onClick={handleConvertToAudio} className="shadow-glow" />
                
                <div className="flex gap-4">
                  <button 
                    onClick={() => push('/editor', { initialText: extractedText })}
                    className="flex-1 h-14 bg-white dark:bg-darkCard border border-gray-200 dark:border-white/10 rounded-2xl font-bold text-textDark dark:text-white active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"/></svg>
                    {t.edit}
                  </button>
                  <button 
                    onClick={resetScan}
                    className="flex-1 h-14 bg-white dark:bg-darkCard border border-gray-200 dark:border-white/10 rounded-2xl font-bold text-textLight dark:text-darkTextSecondary active:scale-95 transition-all flex items-center justify-center gap-2"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
                    {t.retake}
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
