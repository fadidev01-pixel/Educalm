
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { AppTheme } from '../../core/theme/app_theme';
import { useNavigation } from '../../core/navigation/NavigationContext';
import { decode, decodeAudioData, detectLanguage } from '../../core/services/tts_service';
import { LibraryService } from '../../core/services/library_service';
import { SettingsService } from '../../core/services/settings_service';
import { useI18n } from '../../core/services/i18n_service';

interface PlayerScreenProps {
  onBack: () => void;
}

export const PlayerScreen: React.FC<PlayerScreenProps> = ({ onBack }) => {
  const { playerParams, showSnackBar } = useNavigation();
  const settings = useMemo(() => SettingsService.getSettings(), []);
  const { t } = useI18n(settings.language);
  
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [isSaved, setIsSaved] = useState(false);

  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const bufferRef = useRef<AudioBuffer | null>(null);
  const startTimeRef = useRef<number>(0);
  const offsetRef = useRef<number>(0);

  const currentLang = useMemo(() => detectLanguage(playerParams?.text || ''), [playerParams?.text]);
  const isRtl = currentLang === 'ar';

  const words = useMemo(() => {
    return playerParams?.text?.split(/\s+/) || [];
  }, [playerParams?.text]);

  const currentWordIndex = useMemo(() => {
    if (!settings.highlightTracking) return -1;
    if (duration <= 0 || words.length === 0) return -1;
    const index = Math.floor((currentTime / duration) * words.length);
    return Math.min(index, words.length - 1);
  }, [currentTime, duration, words.length, settings.highlightTracking]);

  useEffect(() => {
    if (playerParams) {
      setIsSaved(LibraryService.isItemSaved(playerParams.audioBase64));
      LibraryService.setLastPlayed({
        id: Date.now().toString(),
        text: playerParams.text,
        audioBase64: playerParams.audioBase64,
        date: new Date().toISOString()
      });
      
      if (settings.autoSaveAudio && !LibraryService.isItemSaved(playerParams.audioBase64)) {
        LibraryService.saveItem({
          id: Date.now().toString(),
          text: playerParams.text,
          audioBase64: playerParams.audioBase64,
          date: new Date().toISOString()
        });
        setIsSaved(true);
      }
    }
  }, [playerParams, settings.autoSaveAudio]);

  const waveformHeights = [20, 40, 60, 30, 80, 50, 90, 40, 70, 30, 85, 45, 60, 25, 55, 75, 40, 65, 30, 50, 20, 45, 70, 35, 90, 60, 80, 40, 75, 30, 60, 25, 40, 20];

  useEffect(() => {
    const initAudio = async () => {
      if (playerParams?.audioBase64) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)({ sampleRate: 24000 });
        let buffer: AudioBuffer;
        if (playerParams.audioBase64.startsWith('blob:')) {
          const response = await fetch(playerParams.audioBase64);
          const arrayBuffer = await response.arrayBuffer();
          buffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
        } else {
          const bytes = decode(playerParams.audioBase64);
          buffer = await decodeAudioData(bytes, audioContextRef.current, 24000, 1);
        }
        bufferRef.current = buffer;
        setDuration(buffer.duration);
        handlePlay(); 
      }
    };
    initAudio();
    return () => stopAudio();
  }, [playerParams]);

  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        if (!audioContextRef.current) return;
        const playedTime = (audioContextRef.current.currentTime - startTimeRef.current) * settings.defaultSpeed + offsetRef.current;
        setCurrentTime(Math.min(playedTime, duration));
        setProgress((playedTime / duration) * 100);
        if (playedTime >= duration) {
          setIsPlaying(false);
          offsetRef.current = 0;
          clearInterval(interval);
        }
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying, duration, settings.defaultSpeed]);

  const stopAudio = () => {
    if (sourceNodeRef.current) {
      sourceNodeRef.current.stop();
      sourceNodeRef.current = null;
    }
  };

  const handlePlay = () => {
    if (!audioContextRef.current || !bufferRef.current) return;
    stopAudio();
    const source = audioContextRef.current.createBufferSource();
    source.buffer = bufferRef.current;
    source.playbackRate.value = settings.defaultSpeed;
    source.connect(audioContextRef.current.destination);
    startTimeRef.current = audioContextRef.current.currentTime;
    source.start(0, offsetRef.current / settings.defaultSpeed);
    sourceNodeRef.current = source;
    setIsPlaying(true);
  };

  const handleTogglePlay = () => {
    if (isPlaying) {
      offsetRef.current += (audioContextRef.current!.currentTime - startTimeRef.current) * settings.defaultSpeed;
      stopAudio();
      setIsPlaying(false);
    } else {
      if (offsetRef.current >= duration) offsetRef.current = 0;
      handlePlay();
    }
  };

  const handleSave = () => {
    if (playerParams) {
      const saved = LibraryService.saveItem({
        id: Date.now().toString(),
        text: playerParams.text,
        audioBase64: playerParams.audioBase64,
        date: new Date().toISOString()
      });
      if (saved) {
        setIsSaved(true);
        showSnackBar(t.saved);
      } else {
        showSnackBar('Already saved');
      }
    }
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex flex-col min-h-screen bg-background dark:bg-darkBg transition-colors duration-300">
      
      <div className="flex-1 overflow-y-auto scroll-smooth pb-40 px-6">
        
        <header className="py-8 flex items-center justify-between transition-colors">
          <div className="flex items-center">
            <button onClick={onBack} className="p-2 -ml-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors text-textDark dark:text-darkTextPrimary">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="rtl-flip"><path d="m15 18-6-6 6-6"/></svg>
            </button>
            <h1 className="ml-4 rtl:mr-4 rtl:ml-0 text-xl font-bold text-textDark dark:text-darkTextPrimary">{t.nowPlaying}</h1>
          </div>
          <button onClick={handleSave} disabled={isSaved} className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-sm transition-all ${isSaved ? 'bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400' : 'bg-primary dark:bg-darkPrimary text-white active:scale-95'}`}>
            {isSaved ? <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>}
            {isSaved ? t.saved : t.save}
          </button>
        </header>

        <div className="max-w-md mx-auto space-y-8">
          <div dir={isRtl ? 'rtl' : 'ltr'} className={`${AppTheme.cardTheme} p-6 border border-gray-100 dark:border-white/5 min-h-[200px] flex flex-wrap gap-x-1.5 gap-y-1 content-start transition-colors`}>
            {words.length > 0 ? words.map((word, index) => (
              <span key={index} className={`text-lg transition-all duration-200 ${index === currentWordIndex ? 'text-primary dark:text-darkPrimary font-bold scale-110 underline decoration-primary/30 dark:decoration-darkPrimary/30' : 'text-textDark dark:text-darkTextPrimary font-medium'}`}>{word}</span>
            )) : <p className="text-textLight dark:text-darkTextSecondary italic">No text available</p>}
          </div>

          <div className="h-24 flex items-center justify-center gap-1.5 px-2">
            {waveformHeights.map((height, index) => (
              <div key={index} className={`w-1 rounded-full transition-all duration-300 ${index / waveformHeights.length < progress / 100 ? 'bg-primary dark:bg-darkPrimary' : 'bg-primary/10 dark:bg-darkPrimary/10'}`} style={{ height: isPlaying ? `${Math.max(20, Math.random() * 100)}%` : `${height}%`, opacity: index / waveformHeights.length < progress / 100 ? 1 : 0.4 }} />
            ))}
          </div>

          <div className="space-y-2">
            <div className="relative h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
              <div className={`absolute top-0 h-full bg-primary dark:bg-darkPrimary rounded-full transition-all duration-100 ${isRtl ? 'right-0' : 'left-0'}`} style={{ width: `${progress}%` }} />
            </div>
            <div className="flex justify-between text-xs font-bold text-textLight dark:text-darkTextSecondary uppercase tracking-widest">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="flex items-center justify-around py-4">
            <button className="p-4 text-primary dark:text-darkPrimary bg-primary/5 dark:bg-darkPrimary/5 rounded-full transition-all active:scale-90" onClick={() => { offsetRef.current = Math.max(0, offsetRef.current - 10); handlePlay(); }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="rtl-flip"><path d="M9 14 4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5v0a5.5 5.5 0 0 1-5.5 5.5H11"/></svg>
            </button>
            <button onClick={handleTogglePlay} className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-secondary dark:from-darkPrimary dark:to-secondary flex items-center justify-center text-white shadow-2xl shadow-primary/40 dark:shadow-darkPrimary/40 hover:scale-105 active:scale-95 transition-transform">
              {isPlaying ? <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>}
            </button>
            <button className="p-4 text-primary dark:text-darkPrimary bg-primary/5 dark:bg-darkPrimary/5 rounded-full transition-all active:scale-90" onClick={() => { offsetRef.current = Math.min(duration, offsetRef.current + 10); handlePlay(); }}>
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="rtl-flip"><path d="m15 14 5-5-5-5"/><path d="M20 9H9.5A5.5 5.5 0 0 0 4 14.5v0A5.5 5.5 0 0 0 9.5 20H13"/></svg>
            </button>
          </div>
          <div className="text-center">
            <span className="px-3 py-1 rounded-full bg-background dark:bg-gray-800 text-[10px] font-black uppercase tracking-widest text-textLight dark:text-darkTextSecondary">
              {t.speed}: {settings.defaultSpeed}x
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
