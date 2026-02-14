
import React, { useEffect, useState, useMemo } from 'react';
import { useNavigation } from '../../core/navigation/NavigationContext';
import { LibraryService } from '../../core/services/library_service';
import { AudioItem } from '../../core/models/audio_item';
import { SettingsService } from '../../core/services/settings_service';
import { useI18n } from '../../core/services/i18n_service';

export const LibraryScreen: React.FC = () => {
  const [items, setItems] = useState<AudioItem[]>([]);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const { push, showSnackBar } = useNavigation();

  const settings = useMemo(() => SettingsService.getSettings(), []);
  const { t } = useI18n(settings.language);

  useEffect(() => {
    setItems(LibraryService.getAllItems());
  }, []);

  const handlePlay = (item: AudioItem) => {
    if (deletingId === item.id) return;
    push('/player', { audioBase64: item.audioBase64, text: item.text });
  };

  const handleDelete = async (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    
    const confirmationMsg = settings.language === 'ar' 
      ? 'هل أنت متأكد من حذف هذا التسجيل؟ سيتم إزالته نهائياً من حسابك.' 
      : 'Delete this recording? It will be permanently removed from your cloud library.';

    if (!window.confirm(confirmationMsg)) return;

    setDeletingId(id);
    try {
      await LibraryService.deleteItem(id);
      setItems(LibraryService.getAllItems());
      showSnackBar(settings.language === 'ar' ? 'تم الحذف بنجاح' : 'Recording deleted');
    } catch (error: any) {
      showSnackBar(error.message || 'Failed to delete item');
    } finally {
      setDeletingId(null);
    }
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString(settings.language, { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    });
  };

  return (
    <div className="flex flex-col h-full bg-[#F8F9FE] dark:bg-darkBg transition-colors duration-300">
      <div className="flex-1 overflow-y-auto scroll-smooth pb-[120px] px-6">
        <header className="pt-20 pb-10 animate-in fade-in slide-in-from-top-4 duration-500">
          <h1 className="text-4xl font-black text-textDark dark:text-darkTextPrimary tracking-tight">
            {t.library}
          </h1>
          <p className="text-textLight dark:text-darkTextSecondary mt-2 text-lg font-medium opacity-60">
            {settings.language === 'ar' ? 'مكتبتك الصوتية السحابية' : 'Your cloud audio library'}
          </p>
        </header>

        <div className="flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center opacity-40 text-textDark dark:text-darkTextPrimary animate-in zoom-in-95 duration-500">
              <div className="w-24 h-24 bg-primary/5 dark:bg-darkPrimary/5 rounded-[40px] flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z"/>
                  <circle cx="12" cy="12" r="3"/>
                </svg>
              </div>
              <p className="text-lg font-bold">{settings.language === 'ar' ? 'لا توجد تسجيلات بعد' : 'No recordings found'}</p>
              <p className="text-sm mt-1">{settings.language === 'ar' ? 'ابدأ بإنشاء صوتك الأول' : 'Start by creating your first audio'}</p>
            </div>
          ) : (
            items.map((item, index) => (
              <div 
                key={item.id}
                onClick={() => handlePlay(item)}
                style={{ animationDelay: `${index * 50}ms` }}
                className={`bg-white dark:bg-darkCard rounded-[30px] p-5 shadow-soft dark:shadow-dark-soft flex items-center gap-5 cursor-pointer transition-all border border-gray-100 dark:border-white/5 animate-in slide-in-from-bottom-2 duration-400 fill-mode-both hover:shadow-modern hover:scale-[1.01] ${
                  deletingId === item.id ? 'opacity-50 scale-[0.98]' : 'active:scale-[0.98]'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors ${
                  deletingId === item.id ? 'bg-gray-100 text-gray-400' : 'bg-primary/10 text-primary dark:bg-darkPrimary/10 dark:text-darkPrimary'
                }`}>
                  {deletingId === item.id ? (
                    <div className="w-6 h-6 border-3 border-current border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="rtl-flip">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-textDark dark:text-darkTextPrimary truncate text-base">
                    {item.text}
                  </h3>
                  <p className="text-textLight dark:text-darkTextSecondary text-[10px] font-black uppercase tracking-[0.2em] mt-1 opacity-50">
                    {formatDate(item.date)}
                  </p>
                </div>

                <button 
                  onClick={(e) => handleDelete(e, item.id)}
                  disabled={deletingId !== null}
                  className="w-10 h-10 flex items-center justify-center text-gray-300 dark:text-darkTextSecondary/30 hover:text-red-500 dark:hover:text-red-400 transition-colors rounded-xl active:scale-90"
                  aria-label="delete"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 6h18"/>
                    <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/>
                    <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/>
                  </svg>
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
