
import React, { useState, useMemo } from 'react';
import { useNavigation, IS_FIRST_LAUNCH_KEY } from '../../core/navigation/NavigationContext';
import { AuthService } from '../../core/services/auth_service';
import { LoadingDialog } from '../../core/widgets/LoadingDialog';
import { SettingsService } from '../../core/services/settings_service';
import { useI18n } from '../../core/services/i18n_service';

export const LoginScreen: React.FC = () => {
  const { replace, showSnackBar } = useNavigation();
  const [isLoading, setIsLoading] = useState(false);
  
  const settings = useMemo(() => SettingsService.getSettings(), []);
  const { t } = useI18n(settings.language);

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    try {
      const user = await AuthService.signInWithGoogle();
      if (user) {
        localStorage.setItem(IS_FIRST_LAUNCH_KEY, 'false');
        replace('/');
        showSnackBar(settings.language === 'ar' ? 'تم تسجيل الدخول بواسطة جوجل' : 'Logged in with Google');
      }
    } catch (error) {
      showSnackBar(settings.language === 'ar' ? 'فشل تسجيل الدخول' : 'Google Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSkip = () => {
    AuthService.skipLogin();
    localStorage.setItem(IS_FIRST_LAUNCH_KEY, 'false');
    replace('/');
    showSnackBar(settings.language === 'ar' ? 'تم الدخول كضيف' : 'Entering as Guest');
  };

  return (
    <div className="flex flex-col min-h-screen bg-white dark:bg-darkBg p-8 overflow-y-auto relative transition-colors duration-300">
      <LoadingDialog isOpen={isLoading} message={settings.language === 'ar' ? "جاري تسجيل الدخول..." : "Signing in..."} />
      
      <div className="flex-1 flex flex-col items-center justify-center text-center max-w-sm mx-auto w-full py-10">
        {/* App Icon / Logo */}
        <div className="w-24 h-24 bg-primary/10 rounded-[32px] flex items-center justify-center text-primary mb-10 shadow-soft animate-in zoom-in duration-500">
           <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
        </div>
        
        <h1 className="text-4xl font-black text-textDark dark:text-darkTextPrimary mb-4 tracking-tight">
          {t.welcomeBackLogin}
        </h1>
        <p className="text-textLight dark:text-darkTextSecondary font-medium mb-12 text-base leading-relaxed">
          {t.startJourney}
        </p>

        {/* Quick Google Login */}
        <div className="w-full space-y-4 animate-in slide-in-from-bottom-4 duration-700">
          <button 
            onClick={handleGoogleLogin}
            className="w-full h-[64px] bg-white dark:bg-darkCard border border-gray-200 dark:border-white/10 rounded-[22px] flex items-center justify-center gap-4 font-bold text-textDark dark:text-white shadow-soft active:scale-[0.98] transition-all"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 48 48">
              <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8c-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C12.955 4 4 12.955 4 24s8.955 20 20 20s20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
              <path fill="#FF3D00" d="m6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4C16.318 4 9.656 8.337 6.306 14.691z"/>
              <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238A11.91 11.91 0 0 1 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z"/>
              <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303a12.04 12.04 0 0 1-4.087 5.571l.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z"/>
            </svg>
            <span className="text-lg">{t.google}</span>
          </button>
        </div>

        {/* Skip Button - Appears only if not already logged in */}
        <button 
          onClick={handleSkip}
          className="mt-12 text-primary dark:text-darkPrimary font-black text-sm uppercase tracking-[0.2em] hover:opacity-70 transition-opacity active:scale-95"
        >
          {t.skip}
        </button>
      </div>

      <div className="text-center pb-6 text-[10px] text-textLight dark:text-darkTextSecondary opacity-40 uppercase font-black tracking-widest">
        Educalm v1.0.0 • AI Reading Assistant
      </div>
    </div>
  );
};
