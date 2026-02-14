
/**
 * Theme utility classes to maintain consistency across components.
 * Mimics the Flutter AppTheme structure with Dark Mode support.
 */
export const AppTheme = {
  scaffoldBackgroundColor: 'bg-background dark:bg-darkBg',
  cardTheme: 'bg-cardWhite dark:bg-darkCard rounded-xl shadow-soft dark:shadow-dark-soft border border-transparent dark:border-white/5',
  buttonTheme: 'bg-primary dark:bg-darkPrimary text-white px-6 py-3 rounded-xl font-medium transition-all hover:opacity-90 active:scale-95',
  appBarTheme: 'bg-cardWhite dark:bg-darkCard border-b border-gray-100 dark:border-white/5 h-16 flex items-center px-6',
  textHeader: 'text-textDark dark:text-darkTextPrimary font-bold text-2xl',
  textBody: 'text-textLight dark:text-darkTextSecondary font-normal text-base',
};
