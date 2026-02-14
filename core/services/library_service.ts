
import { AudioItem } from '../models/audio_item';
import { AuthService } from './auth_service';

const STORAGE_PREFIX = 'educalm_cloud_storage_';

export const LibraryService = {
  /**
   * Gets storage key for current user or guest
   */
  getStoreKey: () => {
    const user = AuthService.getCurrentUser();
    return user ? `${STORAGE_PREFIX}${user.uid}` : 'educalm_guest_library';
  },

  saveItem: async (item: AudioItem): Promise<boolean> => {
    // Simulate network latency for cloud sync
    await new Promise(r => setTimeout(r, 600));
    
    const key = LibraryService.getStoreKey();
    const items = LibraryService.getAllItems();
    
    // Check for duplicates
    if (items.some(i => i.audioBase64 === item.audioBase64)) return false;
    
    const updatedItems = [item, ...items];
    localStorage.setItem(key, JSON.stringify(updatedItems));
    return true;
  },

  getAllItems: (): AudioItem[] => {
    const key = LibraryService.getStoreKey();
    const stored = localStorage.getItem(key);
    if (!stored) return [];
    try {
      return JSON.parse(stored);
    } catch (e) {
      return [];
    }
  },

  searchItems: (query: string): AudioItem[] => {
    const items = LibraryService.getAllItems();
    if (!query.trim()) return items;
    const lowerQuery = query.toLowerCase();
    return items.filter(item => 
      item.text.toLowerCase().includes(lowerQuery)
    );
  },

  isItemSaved: (audioBase64: string): boolean => {
    const items = LibraryService.getAllItems();
    return items.some(item => item.audioBase64 === audioBase64);
  },

  /**
   * Deletes an item from the library.
   */
  deleteItem: async (id: string): Promise<void> => {
    return LibraryService.deleteItems([id]);
  },

  /**
   * Deletes multiple items from the library.
   * Simulates bulk removing from Supabase Storage and Database.
   */
  deleteItems: async (ids: string[]): Promise<void> => {
    console.log(`[Supabase Simulation] Deleting ${ids.length} records from database...`);
    
    // 1. Simulate API delay for Database bulk deletion
    await new Promise((resolve, reject) => {
      setTimeout(() => {
        // Simulated failure for testing
        if (Math.random() < 0.02) reject(new Error("Database connection interrupted during bulk delete."));
        else resolve(null);
      }, 600);
    });

    console.log(`[Supabase Simulation] Removing ${ids.length} files from storage bucket...`);
    
    // 2. Simulate API delay for Storage bulk removal
    await new Promise(resolve => setTimeout(resolve, 600));

    const key = LibraryService.getStoreKey();
    const items = LibraryService.getAllItems();
    const updatedItems = items.filter(item => !ids.includes(item.id));
    localStorage.setItem(key, JSON.stringify(updatedItems));

    // Cleanup Last Played metadata if it matches any deleted item
    const lastPlayed = LibraryService.getLastPlayed();
    if (lastPlayed && ids.includes(lastPlayed.id)) {
      localStorage.removeItem('educalm_last_played');
    }
    
    console.log(`[Supabase Simulation] Bulk delete complete.`);
  },

  setLastPlayed: (item: AudioItem): void => {
    localStorage.setItem('educalm_last_played', JSON.stringify(item));
  },

  getLastPlayed: (): AudioItem | null => {
    const stored = localStorage.getItem('educalm_last_played');
    if (!stored) return null;
    try {
      return JSON.parse(stored);
    } catch (e) {
      return null;
    }
  }
};
