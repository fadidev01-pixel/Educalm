
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export type Route = '/' | '/editor' | '/player' | '/library' | '/import-pdf' | '/import-link' | '/ocr-scan' | '/onboarding' | '/settings' | '/splash' | '/login' | '/create-audio-methods' | '/profile';

interface PlayerParams {
  audioBase64: string;
  text: string;
}

interface EditorParams {
  initialText?: string;
}

interface NavigationContextType {
  currentRoute: Route;
  playerParams: PlayerParams | null;
  editorParams: EditorParams | null;
  push: (route: Route, params?: any) => void;
  replace: (route: Route, params?: any) => void;
  pop: () => void;
  snackbarMessage: string | null;
  showSnackBar: (message: string) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const IS_FIRST_LAUNCH_KEY = 'educalm_is_first_launch';

export const NavigationProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [history, setHistory] = useState<Route[]>(['/splash']);
  const [playerParams, setPlayerParams] = useState<PlayerParams | null>(null);
  const [editorParams, setEditorParams] = useState<EditorParams | null>(null);
  const [snackbarMessage, setSnackbarMessage] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    setIsInitialized(true);
  }, []);

  const currentRoute = history[history.length - 1] || '/';

  const push = (route: Route, params?: any) => {
    if (route === '/player') setPlayerParams(params);
    if (route === '/editor') setEditorParams(params || null);
    setHistory((prev) => [...prev, route]);
  };

  const replace = (route: Route, params?: any) => {
    if (route === '/player') setPlayerParams(params);
    if (route === '/editor') setEditorParams(params || null);
    setHistory([route]);
  };

  const pop = () => {
    if (history.length > 1) {
      setHistory((prev) => prev.slice(0, -1));
    }
  };

  const showSnackBar = (message: string) => {
    setSnackbarMessage(message);
    setTimeout(() => setSnackbarMessage(null), 3000);
  };

  if (!isInitialized) return null;

  return (
    <NavigationContext.Provider value={{ currentRoute, playerParams, editorParams, push, replace, pop, snackbarMessage, showSnackBar }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) throw new Error('useNavigation must be used within a NavigationProvider');
  return context;
};
