
import { Language, I18nService } from './i18n_service';

export type ThemeMode = 'light' | 'dark' | 'system';

export interface AppSettings {
  themeMode: ThemeMode;
  language: Language;
  autoLanguageDetect: boolean;
  highlightTracking: boolean;
  autoSaveAudio: boolean;
  defaultSpeed: number;
}

const SETTINGS_KEY = 'educalm_app_settings';

const DEFAULT_SETTINGS: AppSettings = {
  themeMode: 'light',
  language: 'en',
  autoLanguageDetect: true,
  highlightTracking: true,
  autoSaveAudio: false,
  defaultSpeed: 1.0,
};

export const SettingsService = {
  getSettings: (): AppSettings => {
    const stored = localStorage.getItem(SETTINGS_KEY);
    if (!stored) return DEFAULT_SETTINGS;
    try {
      const parsed = JSON.parse(stored);
      return { ...DEFAULT_SETTINGS, ...parsed };
    } catch (e) {
      return DEFAULT_SETTINGS;
    }
  },

  updateSetting: <K extends keyof AppSettings>(key: K, value: AppSettings[K]): void => {
    const settings = SettingsService.getSettings();
    settings[key] = value;
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    
    if (key === 'themeMode') {
      SettingsService.applyTheme(value as ThemeMode);
    }
    if (key === 'language') {
      SettingsService.applyLanguage(value as Language);
    }
  },

  applyTheme: (mode: ThemeMode) => {
    const isDark = mode === 'dark' || (mode === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches);
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  },

  applyLanguage: (lang: Language) => {
    const dir = I18nService.getDirection(lang);
    document.documentElement.dir = dir;
    document.documentElement.lang = lang;
  }
};
