
/**
 * AuthService: Handles authentication state and user profile.
 * Simplified to support Google login and Skip (Guest) mode as requested.
 */

interface EducalmUser {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
}

const USER_KEY = 'educalm_auth_user';
const SKIPPED_KEY = 'educalm_skipped_login';

export const AuthService = {
  /**
   * Mock Google Sign-In
   */
  signInWithGoogle: async (): Promise<EducalmUser | null> => {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const mockUser: EducalmUser = {
      uid: 'google-uid-' + Math.random().toString(36).substr(2, 9),
      displayName: 'Google User',
      email: 'user@gmail.com',
      photoURL: `https://api.dicebear.com/7.x/avataaars/svg?seed=${Date.now()}`
    };
    
    localStorage.setItem(USER_KEY, JSON.stringify(mockUser));
    localStorage.removeItem(SKIPPED_KEY); // Reset skip if they actually log in
    return mockUser;
  },

  /**
   * Sets the "Skipped" flag so the user enters the app as a guest
   */
  skipLogin: (): void => {
    localStorage.setItem(SKIPPED_KEY, 'true');
    localStorage.removeItem(USER_KEY);
  },

  /**
   * Clears all auth and skip state
   */
  signOut: async (): Promise<void> => {
    await new Promise(resolve => setTimeout(resolve, 500));
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(SKIPPED_KEY);
  },

  getCurrentUser: (): EducalmUser | null => {
    const stored = localStorage.getItem(USER_KEY);
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch (e) {
      return null;
    }
  },

  isLoggedIn: (): boolean => {
    return localStorage.getItem(USER_KEY) !== null;
  },

  hasSkipped: (): boolean => {
    return localStorage.getItem(SKIPPED_KEY) === 'true';
  }
};
