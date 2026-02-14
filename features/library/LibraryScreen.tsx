
import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useNavigation } from '../../core/navigation/NavigationContext';
import { LibraryService } from '../../core/services/library_service';
import { AudioItem } from '../../core/models/audio_item';
import { SettingsService } from '../../core/services/settings_service';
import { useI18n } from '../../core/services/i18n_service';
import { ConfirmationDialog } from '../../core/widgets/ConfirmationDialog';
import { LoadingDialog } from '../../core/widgets/LoadingDialog';

export const LibraryScreen: React.FC = () => {
  const [items, setItems] = useState<AudioItem[]>([]);
  const [isBulkDeleting, setIsBulkDeleting] = useState(false);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isSelectionMode, setIsSelectionMode] = useState(false);
  const [showBulkConfirm, setShowBulkConfirm] = useState(false);

  const { push, showSnackBar } = useNavigation();
  const settings = useMemo(() => SettingsService.getSettings(), []);
  const { t } = useI18n(settings.language);

  // Fix: Replaced NodeJS.Timeout with ReturnType<typeof setTimeout> to resolve "Cannot find namespace 'NodeJS'" error in browser environment
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    setItems(LibraryService.getAllItems());
  }, []);

  const triggerVibration = (type: 'light' | 'heavy' = 'light') => {
    if ('vibrate' in navigator) {
      navigator.vibrate(type === 'heavy' ? 100 : 40);
    }
  };

  const toggleSelectionMode = (initialId?: string) => {
    if (!isSelectionMode) {
      setIsSelectionMode(true);
      if (initialId) {
        setSelectedIds(new Set([initialId]));
      }
      triggerVibration('heavy');
    } else {
      setIsSelectionMode(false);
      setSelectedIds(new Set());
    }
  };

  const handleToggleSelect = (id: string) => {
    triggerVibration();
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        if (next.size === 0) setIsSelectionMode(false);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const handleSelectAll = () => {
    if (selectedIds.size === items.length) {
      setSelectedIds(new Set());
      setIsSelectionMode(false);
    } else {
      setSelectedIds(new Set(items.map(i => i.id)));
    }
    triggerVibration();
  };

  const handleItemPressDown = (id: string) => {
    longPressTimer.current = setTimeout(() => {
      if (!isSelectionMode) {
        toggleSelectionMode(id);
      }
    }, 600);
  };

  const handleItemPressUp = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
    }
  };

  const handleItemClick = (item: AudioItem) => {
    if (isSelectionMode) {
      handleToggleSelect(item.id);
    } else {
      push('/player', { audioBase64: item.audioBase64, text: item.text });
    }
  };

  const confirmBulkDelete = async () => {
    setShowBulkConfirm(false);
    setIsBulkDeleting(true);
    
    // Fix: Explicitly cast Array.from result to string[] to resolve "Argument of type 'unknown[]' is not assignable to parameter of type 'string[]'" error
    const idsToDelete = Array.from(selectedIds) as string[];
    try {
      await LibraryService.deleteItems(idsToDelete);
      setItems(LibraryService.getAllItems());
      const msg = settings.language === 'ar' 
        ? `تم حذف ${idsToDelete.length} تسجيلات بنجاح` 
        : `${idsToDelete.length} recordings deleted successfully`;
      showSnackBar(msg);
      setIsSelectionMode(false);
      setSelectedIds(new Set());
    } catch (error: any) {
      showSnackBar(error.message || 'Bulk delete failed');
    } finally {
      setIsBulkDeleting(false);
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

  const isAllSelected = selectedIds.size === items.length && items.length > 0;

  return (
    <div className="flex flex-col h-full bg-[#F8F9FE] dark:bg-darkBg transition-colors duration-300 relative overflow-hidden">
      <LoadingDialog isOpen={isBulkDeleting} message={settings.language === 'ar' ? 'جاري الحذف المتعدد...' : 'Bulk Deleting...'} />
      
      <ConfirmationDialog 
        isOpen={showBulkConfirm}
        title={settings.language === 'ar' ? 'حذف التسجيلات المختارة؟' : 'Delete selected recordings?'}
        message={settings.language === 'ar' 
          ? `أنت على وشك حذف ${selectedIds.size} تسجيلات. لا يمكن التراجع عن هذا الإجراء.` 
          : `You are about to delete ${selectedIds.size} recordings. This action cannot be undone.`}
        confirmText={settings.language === 'ar' ? 'حذف الكل' : 'Delete All'}
        cancelText={settings.language === 'ar' ? 'إلغاء' : 'Cancel'}
        onConfirm={confirmBulkDelete}
        onCancel={() => setShowBulkConfirm(false)}
      />

      {/* Selection AppBar (Fixed at top) */}
      <div className={`fixed top-0 left-0 right-0 z-50 bg-white dark:bg-darkCard h-20 shadow-modern flex items-center px-6 gap-4 transition-transform duration-300 ${isSelectionMode ? 'translate-y-0' : '-translate-y-full'}`}>
        <button onClick={() => toggleSelectionMode()} className="p-2 text-textDark dark:text-darkTextPrimary active:scale-90 transition-transform">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
        <span className="flex-1 text-lg font-black text-textDark dark:text-darkTextPrimary">
          {selectedIds.size} {settings.language === 'ar' ? 'تم اختيارهم' : 'selected'}
        </span>
        <div className="flex items-center gap-2">
          <button 
            onClick={handleSelectAll}
            className={`p-2 rounded-xl transition-all ${isAllSelected ? 'text-primary' : 'text-textLight dark:text-darkTextSecondary'}`}
            title="Select All"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="m9 12 2 2 4-4"/></svg>
          </button>
          <button 
            onClick={() => selectedIds.size > 0 && setShowBulkConfirm(true)}
            disabled={selectedIds.size === 0}
            className={`p-2 rounded-xl transition-all ${selectedIds.size > 0 ? 'text-red-500 bg-red-50 dark:bg-red-900/10' : 'text-gray-300 opacity-50'}`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/></svg>
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scroll-smooth pb-[120px] px-6">
        <header className={`pt-20 pb-10 transition-opacity duration-300 ${isSelectionMode ? 'opacity-0' : 'opacity-100'}`}>
          <h1 className="text-4xl font-black text-textDark dark:text-darkTextPrimary tracking-tight">
            {t.library}
          </h1>
          <p className="text-textLight dark:text-darkTextSecondary mt-2 text-lg font-medium opacity-60">
            {settings.language === 'ar' ? 'مكتبتك الصوتية السحابية' : 'Your cloud audio library'}
          </p>
        </header>

        <div className="flex flex-col gap-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center opacity-40 text-textDark dark:text-darkTextPrimary">
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
            items.map((item, index) => {
              const isSelected = selectedIds.has(item.id);
              return (
                <div 
                  key={item.id}
                  onMouseDown={() => handleItemPressDown(item.id)}
                  onMouseUp={handleItemPressUp}
                  onTouchStart={() => handleItemPressDown(item.id)}
                  onTouchEnd={handleItemPressUp}
                  onClick={() => handleItemClick(item)}
                  style={{ animationDelay: `${index * 50}ms` }}
                  className={`bg-white dark:bg-darkCard rounded-[30px] p-5 shadow-soft dark:shadow-dark-soft flex items-center gap-5 cursor-pointer transition-all border border-gray-100 dark:border-white/5 animate-in slide-in-from-bottom-2 duration-400 fill-mode-both hover:shadow-modern ${
                    isSelected ? 'ring-2 ring-primary bg-primary/5 scale-[1.02]' : 'active:scale-[0.98]'
                  }`}
                >
                  {/* Selection Indicator / Checkbox */}
                  {isSelectionMode && (
                    <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${isSelected ? 'bg-primary border-primary text-white' : 'border-gray-300 dark:border-gray-600'}`}>
                      {isSelected && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      )}
                    </div>
                  )}

                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-colors bg-primary/10 text-primary dark:bg-darkPrimary/10 dark:text-darkPrimary`}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="rtl-flip">
                      <path d="M8 5v14l11-7z"/>
                    </svg>
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-textDark dark:text-darkTextPrimary truncate text-base">
                      {item.text}
                    </h3>
                    <p className="text-textLight dark:text-darkTextSecondary text-[10px] font-black uppercase tracking-[0.2em] mt-1 opacity-50">
                      {formatDate(item.date)}
                    </p>
                  </div>

                  {!isSelectionMode && (
                    <div className="w-10 h-10 flex items-center justify-center text-gray-300 dark:text-darkTextSecondary/30 opacity-40">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="rtl-flip"><path d="m9 18 6-6-6-6"/></svg>
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
};
