
import React, { useState, useEffect, useMemo } from 'react';
import { useNavigation } from '../../core/navigation/NavigationContext';
import { AuthService } from '../../core/services/auth_service';
import { SettingsService } from '../../core/services/settings_service';
import { useI18n } from '../../core/services/i18n_service';

export const ProfileScreen: React.FC = () => {
  const { replace, showSnackBar } = useNavigation();
  const [user, setUser] = useState<any>(null);
  const settings = useMemo(() => SettingsService.getSettings(), []);
  const { t } = useI18n(settings.language);

  useEffect(() => {
    setUser(AuthService.getCurrentUser());
  }, []);

  const handleLogout = async () => {
    const isGuest = !user;
    if (isGuest) {
        replace('/login');
        return;
    }

    if (confirm(settings.language === 'ar' ? 'هل أنت متأكد من تسجيل الخروج؟' : 'Are you sure you want to sign out?')) {
      await AuthService.signOut();
      showSnackBar(settings.language === 'ar' ? 'تم تسجيل الخروج بنجاح' : 'Signed out successfully');
      replace('/login');
    }
  };

  const ProfileItem = ({ icon, title, onClick, value }: any) => (
    <div 
      onClick={onClick}
      className={`w-full bg-white dark:bg-darkCard rounded-[28px] p-6 flex items-center gap-5 border border-gray-100 dark:border-white/5 mb-4 shadow-soft dark:shadow-dark-soft transition-all ${onClick ? 'active:scale-95 cursor-pointer' : ''}`}
    >
      <div className="w-12 h-12 rounded-2xl bg-primary/10 dark:bg-darkPrimary/10 flex items-center justify-center text-primary dark:text-darkPrimary shrink-0">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-[10px] font-black text-textLight dark:text-darkTextSecondary uppercase tracking-widest opacity-60 mb-1">{title}</h4>
        <p className="font-bold text-textDark dark:text-darkTextPrimary truncate">{value || 'N/A'}</p>
      </div>
      {onClick && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="text-gray-300 dark:text-darkTextSecondary rtl-flip"><path d="m9 18 6-6-6-6"/></svg>}
    </div>
  );

  return (
    <div className="flex flex-col h-full bg-[#F8F9FE] dark:bg-darkBg overflow-x-hidden transition-colors duration-300">
      <div className="flex-1 overflow-y-auto scroll-smooth pb-[100px]">
        <header className="px-[7%] pt-20 pb-12 flex flex-col items-center text-center bg-white dark:bg-darkCard rounded-b-[50px] shadow-soft dark:shadow-dark-soft transition-colors mb-10">
          <div className="w-28 h-28 rounded-[40px] bg-background dark:bg-darkBg shadow-xl flex items-center justify-center text-primary dark:text-darkPrimary mb-6 border-4 border-white dark:border-white/10 overflow-hidden relative group">
            {user?.photoURL ? (
              <img src={user.photoURL} alt="Profile" className="w-full h-full object-cover transition-transform group-hover:scale-110 duration-500" />
            ) : (
              <div className="flex flex-col items-center justify-center opacity-40">
                <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
                <span className="text-[10px] font-black uppercase mt-1">Guest</span>
              </div>
            )}
          </div>
          <h1 className="text-3xl font-black text-textDark dark:text-darkTextPrimary tracking-tight">
            {user?.displayName || (settings.language === 'ar' ? 'مستخدم زائر' : 'Guest User')}
          </h1>
          <p className="text-primary dark:text-darkPrimary font-bold text-xs tracking-[0.2em] uppercase mt-1 opacity-70">
            {user ? (settings.language === 'ar' ? 'حساب قوقل' : 'Google Account') : (settings.language === 'ar' ? 'وضع الضيف' : 'Guest Mode')}
          </p>
        </header>

        <main className="px-[7%] max-w-4xl mx-auto w-full">
          <ProfileItem 
            title={t.emailPlaceholder}
            value={user?.email || (settings.language === 'ar' ? 'غير مسجل' : 'Not signed in')}
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="16" x="2" y="4" rx="2"/><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/></svg>}
          />
          
          <ProfileItem 
            title="Subscription"
            value="Coming Soon (Premium)"
            icon={<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>}
            onClick={() => showSnackBar(settings.language === 'ar' ? 'ميزات الاشتراك قادمة قريباً!' : 'Subscription features coming soon!')}
          />

          <button 
            onClick={handleLogout}
            className={`w-full mt-6 bg-white dark:bg-darkCard rounded-[28px] p-6 flex items-center gap-5 border border-gray-100 dark:border-white/5 shadow-soft dark:shadow-dark-soft transition-all active:scale-95 font-bold ${user ? 'text-red-500' : 'text-primary'}`}
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${user ? 'bg-red-50 dark:bg-red-900/10' : 'bg-primary/10 dark:bg-darkPrimary/10'}`}>
              {user ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="rtl-flip"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" x2="9" y1="12" y2="12"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" x2="3" y1="12" y2="12"/></svg>
              )}
            </div>
            {user ? t.logout : t.signIn}
          </button>
        </main>
      </div>
    </div>
  );
};
