
export type Language = 'en' | 'ar' | 'fr' | 'es' | 'tr' | 'de';

export interface Translations {
  welcomeBack: string;
  appName: string;
  searchPlaceholder: string;
  listenAnywhere: string;
  listenAnywhereSub: string;
  createAudio: string;
  viewAll: string;
  writeText: string;
  writeTextSub: string;
  uploadPDF: string;
  uploadPDFSub: string;
  pasteLink: string;
  pasteLinkSub: string;
  scanText: string;
  scanTextSub: string;
  activity: string;
  savedAudios: string;
  readingTime: string;
  mins: string;
  home: string;
  library: string;
  settings: string;
  profile: string;
  logout: string;
  language: string;
  darkMode: string;
  autoSave: string;
  delete: string;
  play: string;
  convertToAudio: string;
  about: string;
  account: string;
  signUp: string;
  signIn: string;
  google: string;
  autoDetect: string;
  autoDetectSub: string;
  highlighting: string;
  highlightingSub: string;
  clearCache: string;
  continueReading: string;
  jumpBackIn: string;
  total: string;
  read: string;
  version: string;
  emailPlaceholder: string;
  passwordPlaceholder: string;
  fullNamePlaceholder: string;
  alreadyHaveAccount: string;
  dontHaveAccount: string;
  welcomeBackLogin: string;
  startJourney: string;
  signInSaved: string;
  createAccount: string;
  quickActions: string;
  scanResults: string;
  openCamera: string;
  chooseGallery: string;
  edit: string;
  retake: string;
  nowPlaying: string;
  save: string;
  saved: string;
  speed: string;
  gender: string;
  male: string;
  female: string;
  voiceSettings: string;
  appearance: string;
  storageSupport: string;
  skip: string;
}

const en: Translations = {
  welcomeBack: 'Welcome Back!',
  appName: 'Educalm',
  searchPlaceholder: 'Search Library',
  listenAnywhere: 'Listen to anything, anywhere.',
  listenAnywhereSub: 'Turn any document or web link into clear AI speech.',
  createAudio: 'Create Audio',
  viewAll: 'View All',
  writeText: 'Write Text',
  writeTextSub: 'Type or paste text directly',
  uploadPDF: 'Upload PDF',
  uploadPDFSub: 'Extract text from files',
  pasteLink: 'Paste Link',
  pasteLinkSub: 'Convert web articles',
  scanText: 'Scan Text',
  scanTextSub: 'Extract text using your camera',
  activity: 'Activity',
  savedAudios: 'Saved Audios',
  readingTime: 'Reading Time',
  mins: 'Mins',
  home: 'Home',
  library: 'Library',
  settings: 'Settings',
  profile: 'Profile',
  logout: 'Logout',
  language: 'Language',
  darkMode: 'Dark Mode',
  autoSave: 'Auto-Save Audio',
  delete: 'Delete',
  play: 'Play',
  convertToAudio: 'Generate Audio',
  about: 'About Educalm',
  account: 'Account',
  signUp: 'Sign Up',
  signIn: 'Sign In',
  google: 'Google',
  autoDetect: 'Auto Language Detection',
  autoDetectSub: 'Identifies language automatically',
  highlighting: 'Word Highlighting',
  highlightingSub: 'Highlight words during playback',
  clearCache: 'Clear Cached Files',
  continueReading: 'Continue Reading',
  jumpBackIn: 'Jump Back In',
  total: 'Total',
  read: 'Read',
  version: 'Version 1.0.0',
  emailPlaceholder: 'Email Address',
  passwordPlaceholder: 'Password',
  fullNamePlaceholder: 'Full Name',
  alreadyHaveAccount: 'Already have an account? Sign In',
  dontHaveAccount: "Don't have an account? Sign Up",
  welcomeBackLogin: 'Welcome Back',
  startJourney: 'Start your journey with Educalm',
  signInSaved: 'Sign in to access your saved library',
  createAccount: 'Create Account',
  quickActions: 'Quick Actions',
  scanResults: 'Scan Results',
  openCamera: 'Open Camera',
  chooseGallery: 'Choose from Gallery',
  edit: 'Edit',
  retake: 'Retake',
  nowPlaying: 'Now Playing',
  save: 'Save',
  saved: 'Saved',
  speed: 'Speed',
  gender: 'Gender',
  male: 'Male',
  female: 'Female',
  voiceSettings: 'Voice Settings',
  appearance: 'Appearance',
  storageSupport: 'Storage & Support',
  skip: 'Skip'
};

const ar: Translations = {
  welcomeBack: 'مرحباً بك مجدداً!',
  appName: 'إديوكالم',
  searchPlaceholder: 'البحث في المكتبة',
  listenAnywhere: 'استمع لأي شيء في أي مكان.',
  listenAnywhereSub: 'حول أي مستند أو رابط ويب إلى صوت ذكاء اصطناعي واضح.',
  createAudio: 'إنشاء ملف صوتي',
  viewAll: 'عرض الكل',
  writeText: 'كتابة نص',
  writeTextSub: 'اكتب أو الصق النص مباشرة',
  uploadPDF: 'رفع ملف PDF',
  uploadPDFSub: 'استخراج النص من الملفات',
  pasteLink: 'لصق رابط',
  pasteLinkSub: 'تحويل مقالات الويب',
  scanText: 'مسح ضوئي',
  scanTextSub: 'استخراج النص باستخدام الكاميرا',
  activity: 'النشاط',
  savedAudios: 'الملفات المحفوظة',
  readingTime: 'وقت القراءة',
  mins: 'دقيقة',
  home: 'الرئيسية',
  library: 'المكتبة',
  settings: 'الإعدادات',
  profile: 'الملف الشخصي',
  logout: 'تسجيل الخروج',
  language: 'اللغة',
  darkMode: 'الوضع الداكن',
  autoSave: 'حفظ تلقائي',
  delete: 'حذف',
  play: 'تشغيل',
  convertToAudio: 'إنشاء الصوت',
  about: 'عن إديوكالم',
  account: 'الحساب',
  signUp: 'إنشاء حساب',
  signIn: 'تسجيل الدخول',
  google: 'جوجل',
  autoDetect: 'التعرف التلقائي على اللغة',
  autoDetectSub: 'يتعرف على اللغة تلقائياً',
  highlighting: 'تحديد الكلمات',
  highlightingSub: 'تحديد الكلمات أثناء التشغيل',
  clearCache: 'مسح الملفات المؤقتة',
  continueReading: 'متابعة القراءة',
  jumpBackIn: 'عد للاستماع',
  total: 'المجموع',
  read: 'قرأت',
  version: 'الإصدار 1.0.0',
  emailPlaceholder: 'البريد الإلكتروني',
  passwordPlaceholder: 'كلمة المرور',
  fullNamePlaceholder: 'الاسم الكامل',
  alreadyHaveAccount: 'لديك حساب بالفعل؟ سجل دخولك',
  dontHaveAccount: 'ليس لديك حساب؟ أنشئ حساباً',
  welcomeBackLogin: 'مرحباً بك',
  startJourney: 'ابدأ رحلتك مع إديوكالم',
  signInSaved: 'سجل دخولك للوصول إلى مكتبتك',
  createAccount: 'إنشاء حساب',
  quickActions: 'إجراءات سريعة',
  scanResults: 'نتائج المسح',
  openCamera: 'فتح الكاميرا',
  chooseGallery: 'اختر من المعرض',
  edit: 'تعديل',
  retake: 'إعادة المحاولة',
  nowPlaying: 'يعمل الآن',
  save: 'حفظ',
  saved: 'تم الحفظ',
  speed: 'السرعة',
  gender: 'الجنس',
  male: 'ذكر',
  female: 'أنثى',
  voiceSettings: 'إعدادات الصوت',
  appearance: 'المظهر',
  storageSupport: 'التخزين والدعم',
  skip: 'تخطي'
};

const fr: Translations = {
  welcomeBack: 'Bon retour !',
  appName: 'Educalm',
  searchPlaceholder: 'Rechercher dans la bibliothèque',
  listenAnywhere: 'Écoutez n\'importe quoi, n\'importe où.',
  listenAnywhereSub: 'Transformez n\'importe quel document ou lien web en voix IA claire.',
  createAudio: 'Créer un audio',
  viewAll: 'Voir tout',
  writeText: 'Écrire du texte',
  writeTextSub: 'Tapez ou collez du texte directement',
  uploadPDF: 'Télécharger un PDF',
  uploadPDFSub: 'Extraire le texte des fichiers',
  pasteLink: 'Coller un lien',
  pasteLinkSub: 'Convertir des articles web',
  scanText: 'Scanner du texte',
  scanTextSub: 'Extraire du texte avec l\'appareil photo',
  activity: 'Activité',
  savedAudios: 'Audios enregistrés',
  readingTime: 'Temps de lecture',
  mins: 'Mins',
  home: 'Accueil',
  library: 'Bibliothèque',
  settings: 'Paramètres',
  profile: 'Profil',
  logout: 'Déconnexion',
  language: 'Langue',
  darkMode: 'Mode sombre',
  autoSave: 'Enregistrement auto',
  delete: 'Supprimer',
  play: 'Lire',
  convertToAudio: 'Générer l\'audio',
  about: 'À propos d\'Educalm',
  account: 'Compte',
  signUp: 'S\'inscrire',
  signIn: 'Se connecter',
  google: 'Google',
  autoDetect: 'Détection auto de la langue',
  autoDetectSub: 'Identifie la langue automatiquement',
  highlighting: 'Surlignage des mots',
  highlightingSub: 'Surligne les mots pendant la lecture',
  clearCache: 'Effacer le cache',
  continueReading: 'Continuer la lecture',
  jumpBackIn: 'Reprendre l\'écoute',
  total: 'Total',
  read: 'Lu',
  version: 'Version 1.0.0',
  emailPlaceholder: 'Adresse e-mail',
  passwordPlaceholder: 'Mot de passe',
  fullNamePlaceholder: 'Nom complet',
  alreadyHaveAccount: 'Déjà un compte ? Se connecter',
  dontHaveAccount: "Pas de compte ? S'inscrire",
  welcomeBackLogin: 'Bienvenue',
  startJourney: 'Commencez votre voyage avec Educalm',
  signInSaved: 'Connectez-vous pour accéder à votre bibliothèque',
  createAccount: 'Créer un compte',
  quickActions: 'Actions rapides',
  scanResults: 'Résultats du scan',
  openCamera: 'Ouvrir la caméra',
  chooseGallery: 'Choisir dans la galerie',
  edit: 'Modifier',
  retake: 'Reprendre',
  nowPlaying: 'Lecture en cours',
  save: 'Sauvegarder',
  saved: 'Enregistré',
  speed: 'Vitesse',
  gender: 'Genre',
  male: 'Masculin',
  female: 'Féminin',
  voiceSettings: 'Paramètres vocaux',
  appearance: 'Apparence',
  storageSupport: 'Stockage et assistance',
  skip: 'Passer'
};

const es: Translations = {
  welcomeBack: '¡Bienvenido de nuevo!',
  appName: 'Educalm',
  searchPlaceholder: 'Buscar en la biblioteca',
  listenAnywhere: 'Escucha lo que quieras, donde quieras.',
  listenAnywhereSub: 'Convierte cualquier documento o enlace web en voz de IA clara.',
  createAudio: 'Crear audio',
  viewAll: 'Ver todo',
  writeText: 'Escribir texto',
  writeTextSub: 'Escribe o pega texto directamente',
  uploadPDF: 'Subir PDF',
  uploadPDFSub: 'Extraer texto de archivos',
  pasteLink: 'Pegar enlace',
  pasteLinkSub: 'Convertir artículos web',
  scanText: 'Escanear texto',
  scanTextSub: 'Extraer texto con tu cámara',
  activity: 'Actividad',
  savedAudios: 'Audios guardados',
  readingTime: 'Tiempo de lectura',
  mins: 'Mins',
  home: 'Inicio',
  library: 'Biblioteca',
  settings: 'Ajustes',
  profile: 'Perfil',
  logout: 'Cerrar sesión',
  language: 'Idioma',
  darkMode: 'Modo oscuro',
  autoSave: 'Autoguardado de audio',
  delete: 'Eliminar',
  play: 'Reproducir',
  convertToAudio: 'Generar audio',
  about: 'Acerca de Educalm',
  account: 'Cuenta',
  signUp: 'Registrarse',
  signIn: 'Iniciar sesión',
  google: 'Google',
  autoDetect: 'Detección automática de idioma',
  autoDetectSub: 'Identifica el idioma automáticamente',
  highlighting: 'Resaltado de palabras',
  highlightingSub: 'Resalta palabras durante la reproducción',
  clearCache: 'Borrar caché',
  continueReading: 'Continuar leyendo',
  jumpBackIn: 'Volver a escuchar',
  total: 'Total',
  read: 'Leído',
  version: 'Versión 1.0.0',
  emailPlaceholder: 'Correo electrónico',
  passwordPlaceholder: 'Contraseña',
  fullNamePlaceholder: 'Nombre completo',
  alreadyHaveAccount: '¿Ya tienes cuenta? Inicia sesión',
  dontHaveAccount: '¿No tienes cuenta? Regístrate',
  welcomeBackLogin: 'Bienvenido',
  startJourney: 'Comienza tu viaje con Educalm',
  signInSaved: 'Inicia sesión para acceder a tu biblioteca',
  createAccount: 'Crear cuenta',
  quickActions: 'Acciones rápidas',
  scanResults: 'Resultados del escaneo',
  openCamera: 'Abrir cámara',
  chooseGallery: 'Elegir de la galería',
  edit: 'Editar',
  retake: 'Reintentar',
  nowPlaying: 'Reproduciendo ahora',
  save: 'Guardar',
  saved: 'Guardado',
  speed: 'Velocidad',
  gender: 'Género',
  male: 'Masculino',
  female: 'Femenino',
  voiceSettings: 'Ajustes de voz',
  appearance: 'Apariencia',
  storageSupport: 'Almacenamiento y soporte',
  skip: 'Omitir'
};

const tr: Translations = {
  welcomeBack: 'Tekrar Hoş Geldiniz!',
  appName: 'Educalm',
  searchPlaceholder: 'Kütüphanede Ara',
  listenAnywhere: 'Her şeyi, her yerde dinleyin.',
  listenAnywhereSub: 'Herhangi bir belgeyi veya bağlantıyı net yapay zeka sesine dönüştürün.',
  createAudio: 'Ses Oluştur',
  viewAll: 'Hepsini Gör',
  writeText: 'Metin Yaz',
  writeTextSub: 'Metni doğrudan yazın veya yapıştırın',
  uploadPDF: 'PDF Yükle',
  uploadPDFSub: 'Dosyalardan metin ayıkla',
  pasteLink: 'Bağlantı Yapıştır',
  pasteLinkSub: 'Web makalelerini dönüştür',
  scanText: 'Metni Tara',
  scanTextSub: 'Kameranızı kullanarak metin ayıklayın',
  activity: 'Etkinlik',
  savedAudios: 'Kaydedilen Sesler',
  readingTime: 'Okuma Süresi',
  mins: 'Dak',
  home: 'Ana Sayfa',
  library: 'Kütüphane',
  settings: 'Ayarlar',
  profile: 'Profil',
  logout: 'Çıkış Yap',
  language: 'Dil',
  darkMode: 'Karanlık Mod',
  autoSave: 'Sesi Otomatik Kaydet',
  delete: 'Sil',
  play: 'Oynat',
  convertToAudio: 'Ses Oluştur',
  about: 'Educalm Hakkında',
  account: 'Hesap',
  signUp: 'Kayıt Ol',
  signIn: 'Giriş Yap',
  google: 'Google',
  autoDetect: 'Otomatik Dil Algılama',
  autoDetectSub: 'Dili otomatik olarak tanımlar',
  highlighting: 'Kelime Vurgulama',
  highlightingSub: 'Oynatma sırasında kelimeleri vurgular',
  clearCache: 'Önbelleği Temizle',
  continueReading: 'Okumaya Devam Et',
  jumpBackIn: 'Dinlemeye Geri Dön',
  total: 'Toplam',
  read: 'Okundu',
  version: 'Sürüm 1.0.0',
  emailPlaceholder: 'E-posta Adresi',
  passwordPlaceholder: 'Şifre',
  fullNamePlaceholder: 'Ad Soyad',
  alreadyHaveAccount: 'Zaten hesabınız var mı? Giriş yapın',
  dontHaveAccount: 'Hesabınız yok mu? Kayıt olun',
  welcomeBackLogin: 'Hoş Geldiniz',
  startJourney: 'Educalm ile yolculuğunuza başlayın',
  signInSaved: 'Kütüphanenize erişmek için giriş yapın',
  createAccount: 'Hesap Oluştur',
  quickActions: 'Hızlı İşlemler',
  scanResults: 'Tarama Sonuçları',
  openCamera: 'Kamerayı Aç',
  chooseGallery: 'Galeriden Seç',
  edit: 'Düzenle',
  retake: 'Yeniden Dene',
  nowPlaying: 'Şu An Çalıyor',
  save: 'Kaydet',
  saved: 'Kaydedildi',
  speed: 'Hız',
  gender: 'Cinsiyet',
  male: 'Erkek',
  female: 'Kadın',
  voiceSettings: 'Ses Ayarları',
  appearance: 'Görünüm',
  storageSupport: 'Depolama ve Destek',
  skip: 'Atla'
};

const de: Translations = {
  welcomeBack: 'Willkommen zurück!',
  appName: 'Educalm',
  searchPlaceholder: 'Bibliothek durchsuchen',
  listenAnywhere: 'Hören Sie alles, überall.',
  listenAnywhereSub: 'Verwandeln Sie jedes Dokument oder jeden Link in klare KI-Sprache.',
  createAudio: 'Audio erstellen',
  viewAll: 'Alle ansehen',
  writeText: 'Text schreiben',
  writeTextSub: 'Text direkt eingeben oder einfügen',
  uploadPDF: 'PDF hochladen',
  uploadPDFSub: 'Text aus Dateien extrahieren',
  pasteLink: 'Link einfügen',
  pasteLinkSub: 'Webartikel umwandeln',
  scanText: 'Text scannen',
  scanTextSub: 'Text mit der Kamera extrahieren',
  activity: 'Aktivität',
  savedAudios: 'Gespeicherte Audios',
  readingTime: 'Lesezeit',
  mins: 'Min',
  home: 'Startseite',
  library: 'Bibliothek',
  settings: 'Einstellungen',
  profile: 'Profil',
  logout: 'Abmelden',
  language: 'Sprache',
  darkMode: 'Dunkelmodus',
  autoSave: 'Audio autom. speichern',
  delete: 'Löschen',
  play: 'Abspielen',
  convertToAudio: 'Audio generieren',
  about: 'Über Educalm',
  account: 'Konto',
  signUp: 'Registrieren',
  signIn: 'Anmelden',
  google: 'Google',
  autoDetect: 'Automatische Spracherkennung',
  autoDetectSub: 'Identifiziert die Sprache automatisch',
  highlighting: 'Worthervorhebung',
  highlightingSub: 'Wörter während der Wiedergabe hervorheben',
  clearCache: 'Cache leeren',
  continueReading: 'Weiterlesen',
  jumpBackIn: 'Wieder reinhören',
  total: 'Gesamt',
  read: 'Gelesen',
  version: 'Version 1.0.0',
  emailPlaceholder: 'E-Mail-Adresse',
  passwordPlaceholder: 'Passwort',
  fullNamePlaceholder: 'Vollständiger Name',
  alreadyHaveAccount: 'Haben Sie bereits ein Konto? Anmelden',
  dontHaveAccount: 'Haben Sie noch kein Konto? Registrieren',
  welcomeBackLogin: 'Willkommen zurück',
  startJourney: 'Starten Sie Ihre Reise mit Educalm',
  signInSaved: 'Melden Sie sich an, um auf Ihre Bibliothek zuzugreifen',
  createAccount: 'Konto erstellen',
  quickActions: 'Schnellzugriff',
  scanResults: 'Scan-Ergebnisse',
  openCamera: 'Kamera öffnen',
  chooseGallery: 'Aus Galerie wählen',
  edit: 'Bearbeiten',
  retake: 'Wiederholen',
  nowPlaying: 'Aktuelle Wiedergabe',
  save: 'Speichern',
  saved: 'Gespeichert',
  speed: 'Geschwindigkeit',
  gender: 'Geschlecht',
  male: 'Männlich',
  female: 'Weiblich',
  voiceSettings: 'Spracheinstellungen',
  appearance: 'Erscheinungsbild',
  storageSupport: 'Speicher & Support',
  skip: 'Überspringen'
};

const languages: Record<Language, Translations> = { en, ar, fr, es, tr, de };

export const I18nService = {
  getTranslations: (lang: Language): Translations => languages[lang] || languages.en,
  getDirection: (lang: Language): 'rtl' | 'ltr' => lang === 'ar' ? 'rtl' : 'ltr',
};

export const useI18n = (lang: Language) => {
  const t = I18nService.getTranslations(lang);
  const dir = I18nService.getDirection(lang);
  return { t, dir };
};
