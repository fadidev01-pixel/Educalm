
import React, { useMemo } from 'react';
import { NavigationProvider, useNavigation } from './core/navigation/NavigationContext';
import { HomeScreen } from './features/home/HomeScreen';
import { EditorScreen } from './features/editor/EditorScreen';
import { PlayerScreen } from './features/player/PlayerScreen';
import { LibraryScreen } from './features/library/LibraryScreen';
import { PdfImportScreen } from './features/import_pdf/PdfImportScreen';
import { LinkImportScreen } from './features/import_link/LinkImportScreen';
import { OcrScanScreen } from './features/ocr_scan/OcrScanScreen';
import { OnboardingScreen } from './features/onboarding/OnboardingScreen';
import { SettingsScreen } from './features/settings/SettingsScreen';
import { SplashScreen } from './features/splash/SplashScreen';
import { LoginScreen } from './features/login/LoginScreen';
import { ProfileScreen } from './features/profile/ProfileScreen';
import { CreateAudioMethodsScreen } from './features/home/CreateAudioMethodsScreen';
import { BottomNavigation } from './core/widgets/BottomNavigation';
import { SnackBar } from './core/widgets/SnackBar';

const AppContent: React.FC = () => {
  const { currentRoute, push, pop, snackbarMessage, editorParams } = useNavigation();

  const renderedScreen = useMemo(() => {
    switch (currentRoute) {
      case '/splash':
        return <SplashScreen />;
      case '/login':
        return <LoginScreen />;
      case '/':
        return <HomeScreen onNavigateToEditor={() => push('/editor')} />;
      case '/editor':
        return <EditorScreen onBack={pop} initialText={editorParams?.initialText} />;
      case '/player':
        return <PlayerScreen onBack={pop} />;
      case '/library':
        return <LibraryScreen />;
      case '/profile':
        return <ProfileScreen />;
      case '/settings':
        return <SettingsScreen />;
      case '/import-pdf':
        return <PdfImportScreen onBack={pop} />;
      case '/import-link':
        return <LinkImportScreen onBack={pop} />;
      case '/ocr-scan':
        return <OcrScanScreen onBack={pop} />;
      case '/onboarding':
        return <OnboardingScreen />;
      case '/create-audio-methods':
        return <CreateAudioMethodsScreen />;
      default:
        return <HomeScreen onNavigateToEditor={() => push('/editor')} />;
    }
  }, [currentRoute, push, pop, editorParams]);

  // Main navigation screens
  const showMainTabs = ['/', '/library', '/profile', '/settings'].includes(currentRoute);

  return (
    <div className="min-h-screen bg-background dark:bg-darkBg relative overflow-hidden transition-colors duration-300 flex flex-col">
      {/* Screen Area */}
      <div className="flex-1 relative overflow-hidden">
        <div key={currentRoute} className="animate-in fade-in slide-in-from-bottom-2 duration-400 ease-out fill-mode-forwards h-full">
          {renderedScreen}
        </div>
      </div>

      {/* Global Bottom Navigation (Fixed Solid Style) */}
      {showMainTabs && <BottomNavigation />}

      <SnackBar message={snackbarMessage} />
    </div>
  );
};

const App: React.FC = () => {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
};

export default App;
