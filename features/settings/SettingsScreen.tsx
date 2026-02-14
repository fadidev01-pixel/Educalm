
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigation } from '../../core/navigation/NavigationContext';
import { AuthService } from '../../core/services/auth_service';
import { SettingsService, AppSettings, ThemeMode } from '../../core/services/settings_service';
import { useI18n, Language } from '../../core/services/i18n_service';

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <h3 className="text-[10px] font-black text-textLight dark:text-darkTextSecondary uppercase tracking-[0.3em] mb-4 ml-4 rtl:ml-0 rtl:mr-4">{children}</h3>
);

interface ToggleItemProps {
  title: string;
  subtitle?: string;
  active: boolean;
  onToggle: () => void;
  icon: React.ReactNode;
}

const ToggleItem: React.FC<ToggleItemProps> = ({ title, subtitle, active, onToggle, icon }) => (
  <div className="w-full bg-white dark:bg-darkCard rounded-3xl p-5 flex items-center gap-4 border border-gray-100 dark:border-white/5 mb-3 shadow-soft dark:shadow-dark-soft transition-colors">
    <div className="w-11 h-11 rounded-2xl bg-primary/10 dark:bg-darkPrimary/10 flex items-center justify-center text-primary dark:text-darkPrimary shrink-0 rtl-flip">
      {icon}
    </div>
    <div className="flex-1 min-w-0">
      <h4 className="font-bold text-sm md:text-base text-textDark dark:text-darkTextPrimary">{title}</h4>
      {subtitle && <p className="text-xs text-textLight dark:text-darkTextSecondary font-medium mt-0.5">{subtitle}</p>}
    </div>
    <button 
      onClick={onToggle}
      className={`w-12 h-6 rounded-full transition-colors relative ${active ? 'bg-primary dark:bg-darkPrimary' : 'bg-gray-200 dark:bg-gray-800'}`}
    >
      <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${active ? 'ltr:left-7 rtl:right-7' : 'ltr:left-1 rtl:right-1'}`} />
    </button>
  </div>
);

export const SettingsScreen: React.FC = () => {
  const { push, showSnackBar, replace } = useNavigation();
  const [showAbout, setShowAbout] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [settings, setSettings] = useState<AppSettings>(SettingsService.getSettings());
  
  const { t } = useI18n(settings.language);

  useEffect(() => {
    setUser(AuthService.getCurrentUser());
  }, []);

  const handleAuthAction = async () => {
    if (user) {
      if (confirm('Are you sure you want to sign out?')) {
        await AuthService.signOut();
        setUser(null);
        showSnackBar('Signed out successfully');
        replace('/login');
      }
    } else {
      replace('/login');
    }
  };

  const handleToggle = (key: keyof AppSettings) => {
    const newValue = !settings[key];
    SettingsService.updateSetting(key, newValue as any);
    setSettings({ ...settings, [key]: newValue });
  };

  const handleLanguageChange = (lang: Language) => {
    SettingsService.updateSetting('language', lang);
    setSettings({ ...settings, language: lang });
  };

  const handleThemeChange = (mode: ThemeMode) => {
    SettingsService.updateSetting('themeMode', mode);
    setSettings({ ...settings, themeMode: mode });
  };

  const handleClearCache = () => {
    if (confirm('Are you sure you want to clear your local library and cache? This action is permanent.')) {
      localStorage.removeItem('educalm_library');
      localStorage.removeItem('educalm_last_played');
      showSnackBar('Cache cleared successfully');
    }
  };

  const languageOptions: { id: Language; name: string; flag: string }[] = [
    { id: 'en', name: 'English', flag: '🇺🇸' },
    { id: 'ar', name: 'العربية', flag: '🇸🇦' },
    { id: 'fr', name: 'Français', flag: '🇫🇷' },
    { id: 'es', name: 'Español', flag: '🇪🇸' },
    { id: 'tr', name: 'Türkçe', flag: '🇹🇷' },
    { id: 'de', name: 'Deutsch', flag: '🇩🇪' },
  ];

  return (
    <div className="flex flex-col h-full bg-[#F8F9FE] dark:bg-darkBg overflow-x-hidden transition-colors duration-300">
      <div className="flex-1 overflow-y-auto scroll-smooth pb-[120px]">
        {showAbout && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/40 backdrop-blur-sm p-6" onClick={() => setShowAbout(false)}>
            <div className="bg-white dark:bg-darkCard rounded-[40px] p-8 max-w-xs w-full shadow-2xl dark:shadow-dark-soft animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
              <div className="w-16 h-16 bg-primary/10 dark:bg-darkPrimary/10 rounded-2xl flex items-center justify-center text-primary dark:text-darkPrimary mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              </div>
              <h3 className="text-2xl font-black text-textDark dark:text-darkTextPrimary mb-2">{t.appName}</h3>
              <p className="text-textLight dark:text-darkTextSecondary leading-relaxed mb-6 font-medium text-sm">An AI-powered reading assistant designed to help people focus and learn. Version 1.0.0 (Graduation Project)</p>
              <button onClick={() => setShowAbout(false)} className="w-full py-4 bg-primary dark:bg-darkPrimary text-white rounded-2xl font-bold shadow-lg shadow-primary/20 dark:shadow-darkPrimary/20 transition-colors">Close</button>
            </div>
          </div>
        )}

        <header className="px-[5%] pt-20 pb-10 flex flex-col items-center text-center bg-white dark:bg-darkCard rounded-b-[40px] shadow-sm dark:shadow-dark-soft mb-6 transition-colors">
          <div className="max-w-4xl w-full flex flex-col items-center">
            <h1 className="text-2xl md:text-3xl font-black text-textDark dark:text-darkTextPrimary tracking-tight">{t.settings}</h1>
            <p className="text-textLight dark:text-darkTextSecondary font-bold text-[10px] md:text-xs tracking-[0.2em] uppercase mt-2 opacity-60">{t.appName} App v1.0.0</p>
          </div>
        </header>

        <div className="px-[5%] space-y-8 max-w-4xl mx-auto w-full">
          <section>
            <SectionTitle>{t.language}</SectionTitle>
            <div className="bg-white dark:bg-darkCard rounded-3xl p-3 border border-gray-100 dark:border-white/5 shadow-soft dark:shadow-dark-soft transition-colors">
              <div className="grid grid-cols-2 gap-2">
                {languageOptions.map((lang) => (
                  <button 
                    key={lang.id}
                    onClick={() => handleLanguageChange(lang.id)} 
                    className={`flex items-center gap-3 px-4 py-3 rounded-2xl transition-all ${settings.language === lang.id ? 'bg-primary text-white shadow-glow' : 'bg-background dark:bg-darkBg text-textLight dark:text-darkTextSecondary'}`}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <span className={`text-sm font-bold ${settings.language === lang.id ? 'text-white' : 'text-textDark dark:text-darkTextPrimary'}`}>{lang.name}</span>
                    {settings.language === lang.id && (
                      <div className="ml-auto rtl:mr-auto rtl:ml-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      </div>
                    )}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section>
            <SectionTitle>App Settings</SectionTitle>
            <ToggleItem 
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m5 8 6 6"/><path d="m4 14 6-6 2-3"/><path d="M2 5h12"/><path d="M7 2h1"/><path d="m22 22-5-10-5 10"/><path d="M14 18h6"/></svg>}
              title={t.autoDetect}
              subtitle={t.autoDetectSub}
              active={settings.autoLanguageDetect}
              onToggle={() => handleToggle('autoLanguageDetect')}
            />
            <ToggleItem 
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>}
              title={t.highlighting}
              subtitle={t.highlightingSub}
              active={settings.highlightTracking}
              onToggle={() => handleToggle('highlightTracking')}
            />
            <ToggleItem 
              icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>}
              title={t.autoSave}
              subtitle="Save generations to library"
              active={settings.autoSaveAudio}
              onToggle={() => handleToggle('autoSaveAudio')}
            />
          </section>

          <section>
            <SectionTitle>{t.appearance}</SectionTitle>
            <div className="bg-white dark:bg-darkCard rounded-3xl p-5 border border-gray-100 dark:border-white/5 shadow-soft dark:shadow-dark-soft transition-colors">
              <div className="grid grid-cols-3 gap-3">
                {(['light', 'dark', 'system'] as ThemeMode[]).map((mode) => (
                  <button 
                    key={mode} 
                    onClick={() => handleThemeChange(mode)}
                    className={`py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${settings.themeMode === mode ? 'bg-primary dark:bg-darkPrimary text-white shadow-lg shadow-primary/20 dark:shadow-darkPrimary/20' : 'bg-background dark:bg-darkBg text-textLight dark:text-darkTextSecondary hover:bg-gray-200 dark:hover:bg-gray-800'}`}
                  >
                    {mode === 'light' ? 'Light' : mode === 'dark' ? 'Dark' : 'System'}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section>
            <SectionTitle>{t.storageSupport}</SectionTitle>
            <button onClick={handleClearCache} className="w-full bg-white dark:bg-darkCard rounded-3xl p-5 flex items-center gap-4 border border-gray-100 dark:border-white/5 mb-3 text-left shadow-soft dark:shadow-dark-soft text-red-500 dark:text-red-400 font-bold active:bg-red-50 dark:active:bg-red-900/10 transition-colors">
              <div className="w-11 h-11 rounded-2xl bg-red-50 dark:bg-red-900/20 flex items-center justify-center shrink-0 rtl-flip">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
              </div>
              {t.clearCache}
            </button>
            <button onClick={() => setShowAbout(true)} className="w-full bg-white dark:bg-darkCard rounded-3xl p-5 flex items-center gap-4 border border-gray-100 dark:border-white/5 shadow-soft dark:shadow-dark-soft text-textDark dark:text-darkTextPrimary font-bold active:bg-gray-50 dark:active:bg-gray-800 transition-colors">
              <div className="w-11 h-11 rounded-2xl bg-primary/10 dark:bg-darkPrimary/10 flex items-center justify-center text-primary dark:text-darkPrimary shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>
              </div>
              {t.about}
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};
