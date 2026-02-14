
import React, { useState, useEffect, useMemo } from 'react';
import { FeatureCard } from '../../core/widgets/FeatureCard';
import { useNavigation } from '../../core/navigation/NavigationContext';
import { LibraryService } from '../../core/services/library_service';
import { AudioItem } from '../../core/models/audio_item';
import { AuthService } from '../../core/services/auth_service';
import { SettingsService } from '../../core/services/settings_service';
import { useI18n } from '../../core/services/i18n_service';

interface HomeScreenProps {
  onNavigateToEditor: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({ onNavigateToEditor }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [lastPlayed, setLastPlayed] = useState<AudioItem | null>(null);
  const [libraryCount, setLibraryCount] = useState(0);
  const [searchResults, setSearchResults] = useState<AudioItem[]>([]);
  const [user, setUser] = useState<any>(null);
  const { push } = useNavigation();
  
  const settings = useMemo(() => SettingsService.getSettings(), []);
  const { t } = useI18n(settings.language);

  useEffect(() => {
    setLastPlayed(LibraryService.getLastPlayed());
    const items = LibraryService.getAllItems();
    setLibraryCount(items.length);
    setUser(AuthService.getCurrentUser());
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      setSearchResults(LibraryService.searchItems(searchQuery));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handlePlayItem = (item: AudioItem) => {
    push('/player', { audioBase64: item.audioBase64, text: item.text });
  };

  const handleSeeAll = () => {
    push('/create-audio-methods');
  };

  const handleProfileClick = () => {
    push('/profile');
  };

  const quickActions = useMemo(() => [
    {
      title: t.scanText,
      description: "Use camera to scan books & papers",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>,
      gradient: "from-[#7B6CF6] to-[#9D8CFF]",
      onClick: () => push('/ocr-scan')
    },
    {
      title: "Import File",
      description: "PDF, DOC, TXT supported",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/></svg>,
      gradient: "from-[#FF8C8C] to-[#FFA0A0]",
      onClick: () => push('/import-pdf')
    },
    {
      title: t.pasteLink,
      description: "Convert articles instantly",
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/></svg>,
      gradient: "from-[#4CAF50] to-[#81C784]",
      onClick: () => push('/import-link')
    }
  ], [push, t]);

  const featureCards = useMemo(() => [
    {
      title: t.writeText,
      description: t.writeTextSub,
      icon: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="rtl-flip"><path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.375 2.625a2.121 2.121 0 1 1 3 3L12 15l-4 1 1-4Z"/></svg>,
      onClick: onNavigateToEditor
    }
  ], [onNavigateToEditor, t]);

  return (
    <div className="flex flex-col h-full bg-[#F8F9FE] dark:bg-darkBg relative transition-colors duration-300">
      <div className="flex-1 overflow-y-auto scroll-smooth pb-[100px]">
        
        {/* Header Section */}
        <section className="px-[7%] pt-16 pb-6 animate-in fade-in slide-in-from-top-4 duration-500">
          <div className="max-w-4xl mx-auto">
            <div className="flex justify-between items-center mb-10">
              <div className="space-y-1">
                <p className="text-textLight dark:text-darkTextSecondary font-bold text-sm tracking-tight opacity-70">{t.welcomeBack}</p>
                <h1 className="text-4xl font-black text-textDark dark:text-darkTextPrimary tracking-tight leading-none">{t.appName}</h1>
              </div>
              <button 
                onClick={handleProfileClick}
                className="w-12 h-12 bg-white dark:bg-darkCard rounded-2xl shadow-soft dark:shadow-dark-soft flex items-center justify-center p-0.5 border border-gray-100 dark:border-white/5 active:scale-90 transition-all overflow-hidden"
              >
                {user?.photoURL ? (
                  <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover rounded-xl" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-primary/10 text-primary">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                  </div>
                )}
              </button>
            </div>

            <div className="relative group animate-in zoom-in-95 duration-500">
              <div className="absolute ltr:left-5 rtl:right-5 top-1/2 -translate-y-1/2 text-textLight/60 dark:text-darkTextSecondary/60">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </div>
              <input 
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full bg-white dark:bg-darkCard h-14 ltr:pl-14 rtl:pr-14 px-5 rounded-3xl shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-transparent focus:border-primary/20 outline-none font-medium text-textDark dark:text-darkTextPrimary placeholder:text-textLight/40 transition-all"
              />
            </div>
          </div>
        </section>

        {/* Quick Actions Horizontal Section */}
        {!searchQuery && (
          <section className="mt-4 mb-8">
            <h2 className="text-sm font-black text-textLight dark:text-darkTextSecondary uppercase tracking-widest px-[7%] mb-4 opacity-60">{t.quickActions}</h2>
            <div className="flex overflow-x-auto gap-4 px-[7%] scrollbar-hide pb-4">
              {quickActions.map((action, idx) => (
                <div 
                  key={idx}
                  onClick={action.onClick}
                  className={`flex-shrink-0 w-64 p-6 rounded-[35px] bg-gradient-to-br ${action.gradient} text-white shadow-modern active:scale-95 transition-all cursor-pointer relative overflow-hidden group`}
                >
                  <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700" />
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mb-4 backdrop-blur-sm">
                    {action.icon}
                  </div>
                  <h3 className="font-bold text-lg leading-tight">{action.title}</h3>
                  <p className="text-white/70 text-xs mt-1 font-medium">{action.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        <main className="px-[7%] py-6 space-y-10 animate-in fade-in slide-in-from-bottom-5 duration-700 max-w-4xl mx-auto w-full">
          
          {searchQuery && (
            <section className="animate-in fade-in slide-in-from-top-2 duration-300">
              <h2 className="text-xl font-bold text-textDark dark:text-darkTextPrimary mb-4 px-1 flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded-full" />
                {t.searchPlaceholder}
              </h2>
              {searchResults.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {searchResults.map((item) => (
                    <div 
                      key={item.id}
                      onClick={() => handlePlayItem(item)}
                      className="bg-white dark:bg-darkCard rounded-3xl p-5 flex items-center gap-4 shadow-soft dark:shadow-dark-soft border border-gray-100 dark:border-white/5 active:scale-[0.98] transition-all cursor-pointer"
                    >
                      <div className="w-11 h-11 rounded-2xl bg-primary/10 dark:bg-darkPrimary/10 flex items-center justify-center text-primary dark:text-darkPrimary shrink-0 rtl-flip">
                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-bold text-textDark dark:text-darkTextPrimary truncate text-sm">{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-textLight dark:text-darkTextSecondary text-center py-10 bg-white dark:bg-darkCard rounded-4xl border border-dashed border-gray-200 dark:border-white/10 font-medium">No results.</p>
              )}
            </section>
          )}

          {!searchQuery && lastPlayed && (
            <section className="animate-in slide-in-from-left-4 duration-500">
              <h2 className="text-xl font-bold text-textDark dark:text-darkTextPrimary mb-5 px-1 flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded-full" />
                {t.jumpBackIn}
              </h2>
              <div 
                onClick={() => handlePlayItem(lastPlayed)}
                className="bg-white dark:bg-darkCard rounded-[35px] p-6 shadow-soft dark:shadow-dark-soft border border-gray-100 dark:border-white/5 cursor-pointer active:scale-[0.98] transition-all flex items-center gap-6"
              >
                <div className="w-16 h-16 bg-primary/10 dark:bg-darkPrimary/10 rounded-[22px] flex items-center justify-center text-primary dark:text-darkPrimary rtl-flip animate-pulse">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-textDark dark:text-darkTextPrimary text-xl truncate">{lastPlayed.text}</p>
                  <p className="text-xs text-textLight dark:text-darkTextSecondary mt-1 font-bold uppercase tracking-widest opacity-60">{t.continueReading}</p>
                </div>
              </div>
            </section>
          )}

          {!searchQuery && (
            <section className="animate-in slide-in-from-right-4 duration-500">
              <div className="flex items-center justify-between mb-5 px-1">
                <h2 className="text-xl font-bold text-textDark dark:text-darkTextPrimary flex items-center gap-2">
                  <div className="w-1 h-6 bg-primary rounded-full" />
                  {t.createAudio}
                </h2>
                <button 
                  onClick={handleSeeAll} 
                  className="text-primary text-sm font-black uppercase tracking-widest flex items-center gap-1 hover:opacity-70 transition-opacity"
                >
                  {t.viewAll}
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="rtl-flip"><path d="m9 18 6-6-6-6"/></svg>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {featureCards.map((card, idx) => (
                  <FeatureCard 
                    key={idx}
                    title={card.title}
                    description={card.description}
                    icon={card.icon}
                    onClick={card.onClick}
                  />
                ))}
              </div>
            </section>
          )}

          {!searchQuery && (
            <section className="animate-in slide-in-from-bottom-4 duration-500">
              <h2 className="text-xl font-bold text-textDark dark:text-darkTextPrimary mb-5 px-1 flex items-center gap-2">
                <div className="w-1 h-6 bg-primary rounded-full" />
                {t.activity}
              </h2>
              <div className="grid grid-cols-2 gap-5">
                <div className="bg-white dark:bg-darkCard rounded-[30px] p-6 border border-gray-100 dark:border-white/5 shadow-soft dark:shadow-dark-soft transition-all hover:shadow-modern">
                  <p className="text-textLight dark:text-darkTextSecondary text-[11px] font-black uppercase tracking-[0.2em] mb-3 opacity-60">{t.savedAudios}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-textDark dark:text-darkTextPrimary">{libraryCount}</span>
                  </div>
                </div>
                <div className="bg-white dark:bg-darkCard rounded-[30px] p-6 border border-gray-100 dark:border-white/5 shadow-soft dark:shadow-dark-soft transition-all hover:shadow-modern">
                  <p className="text-textLight dark:text-darkTextSecondary text-[11px] font-black uppercase tracking-[0.2em] mb-3 opacity-60">{t.readingTime}</p>
                  <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-textDark dark:text-darkTextPrimary">42</span>
                    <span className="text-[10px] text-textLight dark:text-darkTextSecondary font-bold">{t.mins}</span>
                  </div>
                </div>
              </div>
            </section>
          )}
        </main>
      </div>
    </div>
  );
};
