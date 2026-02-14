
import React, { useState, useEffect, useMemo } from 'react';
import { VoiceOption } from '../../core/widgets/VoiceOption';
import { PrimaryButton } from '../../core/widgets/PrimaryButton';
import { LoadingDialog } from '../../core/widgets/LoadingDialog';
import { generateGeminiSpeech, detectLanguage } from '../../core/services/tts_service';
import { useNavigation } from '../../core/navigation/NavigationContext';
import { SettingsService } from '../../core/services/settings_service';
import { useI18n } from '../../core/services/i18n_service';

const DRAFT_KEY = 'educalm_editor_draft';

interface EditorScreenProps {
  onBack: () => void;
  initialText?: string;
}

export const EditorScreen: React.FC<EditorScreenProps> = ({ onBack, initialText }) => {
  const [text, setText] = useState(initialText || '');
  const [gender, setGender] = useState<'male' | 'female'>('female');
  const [speed, setSpeed] = useState(1.0);
  const [isGenerating, setIsGenerating] = useState(false);
  
  const { push, showSnackBar } = useNavigation();
  const settings = useMemo(() => SettingsService.getSettings(), []);
  const { t } = useI18n(settings.language);

  const currentLang = detectLanguage(text);
  const isRtl = currentLang === 'ar';

  useEffect(() => {
    if (!initialText) {
      const savedDraft = localStorage.getItem(DRAFT_KEY);
      if (savedDraft) setText(savedDraft);
    } else {
      setText(initialText);
    }
  }, [initialText]);

  useEffect(() => {
    const timer = setTimeout(() => {
      localStorage.setItem(DRAFT_KEY, text);
    }, 1000);
    return () => clearTimeout(timer);
  }, [text]);

  const handleGenerate = async () => {
    if (!text.trim()) {
      showSnackBar(t.searchPlaceholder); // Fallback message if empty
      return;
    }

    setIsGenerating(true);
    try {
      const audioBase64 = await generateGeminiSpeech({ 
        text, 
        gender, 
        language: currentLang 
      });

      if (audioBase64) {
        push('/player', { audioBase64, text });
      }
    } catch (error) {
      console.error(error);
      showSnackBar('Generation failed. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F8F9FE] dark:bg-darkBg relative transition-colors duration-300">
      <LoadingDialog isOpen={isGenerating} message={t.convertToAudio + "..."} />

      <div className="flex-1 overflow-y-auto scroll-smooth px-6 pt-6 pb-40">
        
        <header className="mb-6 flex items-center gap-4 bg-white dark:bg-darkCard shadow-sm dark:shadow-dark-soft border border-gray-100 dark:border-white/5 p-4 rounded-3xl transition-colors">
          <button onClick={onBack} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-textDark dark:text-darkTextPrimary">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl-flip"><path d="m15 18-6-6 6-6"/></svg>
          </button>
          <h2 className="text-xl font-bold text-textDark dark:text-darkTextPrimary">{t.writeText}</h2>
        </header>

        <div className="flex flex-col gap-6 max-w-4xl mx-auto">
          <div className="bg-white dark:bg-darkCard rounded-3xl overflow-hidden border border-gray-100 dark:border-white/5 shadow-soft dark:shadow-dark-soft transition-colors">
            <textarea
              dir={isRtl ? 'rtl' : 'ltr'}
              className="w-full h-[300px] p-6 outline-none resize-none text-textDark dark:text-darkTextPrimary bg-transparent placeholder:text-textLight/40 dark:placeholder:text-darkTextSecondary/40 font-medium leading-relaxed"
              placeholder={t.writeTextSub}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>

          <section className="bg-white dark:bg-darkCard p-6 rounded-3xl border border-gray-100 dark:border-white/5 shadow-soft dark:shadow-dark-soft space-y-6 transition-colors">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-textDark dark:text-darkTextPrimary">{t.voiceSettings}</h3>
              <div className="px-3 py-1 rounded-full bg-primary/10 dark:bg-darkPrimary/10 text-primary dark:text-darkPrimary text-[10px] font-black uppercase tracking-widest">
                {currentLang === 'ar' ? 'AR Detected' : 'EN Detected'}
              </div>
            </div>
            
            <div className="space-y-3">
              <p className="text-sm font-bold text-textLight dark:text-darkTextSecondary uppercase tracking-widest">{t.gender}</p>
              <div className="flex gap-4 w-full">
                <button
                  onClick={() => setGender('male')}
                  className={`flex-1 py-3 rounded-xl border-2 transition-all font-bold ${
                    gender === 'male'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-gray-200 dark:border-white/10 text-textLight dark:text-darkTextSecondary'
                  }`}
                >
                  {t.male}
                </button>
                <button
                  onClick={() => setGender('female')}
                  className={`flex-1 py-3 rounded-xl border-2 transition-all font-bold ${
                    gender === 'female'
                      ? 'border-primary bg-primary/5 text-primary'
                      : 'border-gray-200 dark:border-white/10 text-textLight dark:text-darkTextSecondary'
                  }`}
                >
                  {t.female}
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <p className="text-sm font-bold text-textLight dark:text-darkTextSecondary uppercase tracking-widest">{t.speed}</p>
                <span className="text-primary dark:text-darkPrimary font-black text-lg">{speed.toFixed(1)}x</span>
              </div>
              <input
                type="range" min="0.5" max="1.5" step="0.1" value={speed}
                onChange={(e) => setSpeed(parseFloat(e.target.value))}
                className="w-full h-2 bg-background dark:bg-gray-800 rounded-lg appearance-none cursor-pointer accent-primary dark:accent-darkPrimary"
              />
            </div>
          </section>

          <PrimaryButton text={t.convertToAudio} onClick={handleGenerate} className="shadow-xl" />
        </div>
      </div>
    </div>
  );
};
