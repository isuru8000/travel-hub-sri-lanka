import { createClient } from '@supabase/supabase-js';

/**
 * Robust environment variable lookup.
 */
const getEnv = (key: string): string => {
  try {
    // Check global process (Node/Polyfilled)
    if (typeof process !== 'undefined' && process.env && process.env[key]) {
      return process.env[key] as string;
    }
    // Check ESM import.meta.env (Vite/Browser)
    if (typeof import.meta !== 'undefined' && (import.meta as any).env && (import.meta as any).env[key]) {
      return (import.meta as any).env[key] as string;
    }
  } catch (e) {
    // Silent catch for environment access errors
  }
  return '';
};

const VITE_SUPABASE_URL = getEnv('VITE_SUPABASE_URL') || 'https://placeholder.supabase.co';
const VITE_SUPABASE_ANON_KEY = getEnv('VITE_SUPABASE_ANON_KEY') || 'placeholder.key';

/**
 * Google Auth Client ID
 */
export const GOOGLE_CLIENT_ID = '637465030520-cenid5mus4qn2ugngfv7d56haca6ti9m.apps.googleusercontent.com';

/**
 * Initialize Supabase client with safety guard.
 */
const createSafeClient = () => {
  try {
    // Ensure URL is at least a valid string format for the constructor
    const safeUrl = VITE_SUPABASE_URL.startsWith('http') ? VITE_SUPABASE_URL : 'https://placeholder.supabase.co';
    return createClient(safeUrl, VITE_SUPABASE_ANON_KEY, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
      }
    });
  } catch (err) {
    console.warn('Supabase failed to initialize. Using mock auth provider.', err);
    // Return a mock object to prevent top-level reference errors in App.tsx
    return {
      auth: {
        getSession: () => Promise.resolve({ data: { session: null }, error: null }),
        onAuthStateChange: () => ({ data: { subscription: { unsubscribe: () => {} } } }),
        signInWithOAuth: () => Promise.resolve({ error: new Error("Supabase offline") }),
        signOut: () => Promise.resolve({ error: null }),
      }
    } as any;
  }
};

export const supabase = createSafeClient();