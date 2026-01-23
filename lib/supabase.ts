import { createClient } from '@supabase/supabase-js';

/**
 * Robust environment variable lookup.
 * We prioritize process.env for this specific execution environment.
 */
const VITE_SUPABASE_URL = process.env.VITE_SUPABASE_URL || (import.meta as any).env?.VITE_SUPABASE_URL || '';
const VITE_SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

/**
 * Google Auth Client ID: 
 * 637465030520-cenid5mus4qn2ugngfv7d56haca6ti9m.apps.googleusercontent.com
 */
export const GOOGLE_CLIENT_ID = '637465030520-cenid5mus4qn2ugngfv7d56haca6ti9m.apps.googleusercontent.com';

// Ensure we have non-empty strings before initializing.
// If missing, we use a placeholder that matches the expected URL format to prevent the SDK from throwing.
const safeUrl = VITE_SUPABASE_URL.startsWith('http') ? VITE_SUPABASE_URL : 'https://placeholder.supabase.co';
const safeKey = VITE_SUPABASE_ANON_KEY || 'placeholder-key';

if (!VITE_SUPABASE_URL || !VITE_SUPABASE_ANON_KEY) {
  console.warn(
    'Supabase configuration missing. Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set.'
  );
}

export const supabase = createClient(safeUrl, safeKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  }
});
