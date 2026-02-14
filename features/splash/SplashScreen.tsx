
import React, { useEffect, useState } from 'react';
import { useNavigation, IS_FIRST_LAUNCH_KEY } from '../../core/navigation/NavigationContext';
import { AuthService } from '../../core/services/auth_service';
import { SettingsService } from '../../core/services/settings_service';

export const SplashScreen: React.FC = () => {
  const { replace } = useNavigation();
  const [startAnim, setStartAnim] = useState(false);

  useEffect(() => {
    // Apply theme and language on load
    const settings = SettingsService.getSettings();
    SettingsService.applyTheme(settings.themeMode);
    SettingsService.applyLanguage(settings.language);

    const animTimer = setTimeout(() => setStartAnim(true), 100);

    const timer = setTimeout(() => {
      const isFirstLaunch = localStorage.getItem(IS_FIRST_LAUNCH_KEY) !== 'false';
      const isLoggedIn = AuthService.isLoggedIn();
      const hasSkipped = AuthService.hasSkipped();

      if (isFirstLaunch) {
        replace('/onboarding');
      } else if (isLoggedIn || hasSkipped) {
        // If user is logged in OR has clicked "Skip" before, go straight home
        replace('/');
      } else {
        // Only show login if it's not the first launch and they haven't logged in or skipped
        replace('/login');
      }
    }, 2500);

    return () => {
      clearTimeout(animTimer);
      clearTimeout(timer);
    };
  }, [replace]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-white overflow-hidden relative transition-colors duration-500">
      <div className={`absolute w-64 h-64 bg-primary/10 rounded-full blur-3xl transition-opacity duration-[2000ms] ${startAnim ? 'opacity-100 scale-125' : 'opacity-0 scale-75'}`} />

      <div 
        className={`flex flex-col items-center transition-all duration-[2500ms] ease-out transform z-10
          ${startAnim ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-10'}`}
      >
        <div className="w-24 h-24 bg-primary/10 rounded-[32px] flex items-center justify-center mb-8 shadow-xl shadow-primary/5">
           <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#7B6CF6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z"/><path d="M19 10v2a7 7 0 0 1-14 0v-2"/><line x1="12" x2="12" y1="19" y2="22"/></svg>
        </div>
        <h1 className="text-6xl font-black text-primary tracking-tighter mb-4 drop-shadow-sm">EduCalm</h1>
        <p className={`text-textLight font-semibold tracking-widest uppercase text-xs transition-all duration-[2000ms] delay-500 transform
          ${startAnim ? 'opacity-60 translate-y-0' : 'opacity-0 translate-y-5'}`}>
          Listen. Learn. Stay Calm.
        </p>
      </div>

      <div className={`absolute border border-primary/5 rounded-full w-[400px] h-[400px] transition-all duration-[3000ms] ${startAnim ? 'scale-150 opacity-0' : 'scale-50 opacity-100'}`} />
    </div>
  );
};
