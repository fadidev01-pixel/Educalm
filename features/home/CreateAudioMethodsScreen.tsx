
import React from 'react';
import { useNavigation } from '../../core/navigation/NavigationContext';
import { FeatureCard } from '../../core/widgets/FeatureCard';
import { useI18n } from '../../core/services/i18n_service';
import { SettingsService } from '../../core/services/settings_service';

export const CreateAudioMethodsScreen: React.FC = () => {
  const { push, pop } = useNavigation();
  const settings = React.useMemo(() => SettingsService.getSettings(), []);
  const { t } = useI18n(settings.language);

  const methods = [
    {
      title: t.writeText,
      description: t.writeTextSub,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"/></svg>,
      route: '/editor'
    },
    {
      title: t.uploadPDF,
      description: t.uploadPDFSub,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>,
      route: '/import-pdf'
    },
    {
      title: t.pasteLink,
      description: t.pasteLinkSub,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
      route: '/import-link'
    },
    {
      title: t.scanText,
      description: t.scanTextSub,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>,
      route: '/ocr-scan'
    }
  ];

  return (
    <div className="flex flex-col h-full bg-[#F8F9FE] dark:bg-darkBg overflow-x-hidden transition-colors duration-300">
      <div className="flex-1 overflow-y-auto scroll-smooth pb-[160px]">
        <header className="px-[5%] py-12 bg-white dark:bg-darkCard rounded-b-[40px] shadow-sm dark:shadow-dark-soft flex items-center gap-4 transition-colors">
          <div className="max-w-4xl mx-auto w-full flex items-center gap-4">
            <button onClick={pop} className="p-3 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-2xl transition-all active:scale-90 bg-background dark:bg-darkBg md:bg-transparent">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="rtl-flip">
                <path d="m15 18-6-6 6-6"/>
              </svg>
            </button>
            <h1 className="text-2xl font-black text-textDark dark:text-darkTextPrimary tracking-tight">
              {t.createAudio}
            </h1>
          </div>
        </header>

        <main className="px-[5%] py-8 max-w-4xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {methods.map((method, idx) => (
              <FeatureCard 
                key={idx}
                title={method.title}
                description={method.description}
                icon={method.icon}
                onClick={() => push(method.route as any)}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
};
