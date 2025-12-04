/**
 * Bhagavad Gita API Service
 * Handles all API communication with the Sanskrit.ie API
 * Uses local Vite proxy to bypass CORS restrictions
 */

import type { Verse, ApiResponse } from '../types/gita';

// Use Vercel API proxy for all environments (local dev and production)
const API_ENDPOINT = '/api/gita';

/**
 * Fetch verses for a specific chapter
 * @param chapterNumber - Chapter number (1-18)
 * @returns Promise resolving to array of verses
 * @throws Error if API request fails
 */
export async function fetchVersesByChapter(chapterNumber: number): Promise<Verse[]> {
  try {
    const response = await fetch(`${API_ENDPOINT}?q=${chapterNumber}`);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    // API returns HTML content-type with JSON body, so parse as text first
    const text = await response.text();
    const json = JSON.parse(text);

    // Extract verses array from response
    const verses: Verse[] = Array.isArray(json) ? json : json.data || [];

    if (verses.length === 0) {
      throw new Error(`No verses found for chapter ${chapterNumber}`);
    }

    return verses;
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    console.error(`Failed to fetch verses for chapter ${chapterNumber}:`, errorMessage);
    throw error;
  }
}

/**
 * Fetch a single verse by geeta_id
 * @param gitaId - Unique verse identifier
 * @returns Promise resolving to verse object
 */
export async function fetchVerseById(gitaId: string): Promise<Verse | null> {
  try {
    // This would require an endpoint that supports filtering by ID
    // For now, this is a placeholder for future enhancement
    console.warn('fetchVerseById not yet implemented - requires API endpoint enhancement');
    return null;
  } catch (error) {
    console.error('Error fetching verse by ID:', error);
    return null;
  }
}

/**
 * Validate API response structure
 * @param data - Data to validate
 * @returns true if data is valid verse array
 */
export function isValidVerseArray(data: unknown): data is Verse[] {
  return (
    Array.isArray(data) &&
    data.length > 0 &&
    data.every((item) => 'geeta_id' in item && 'chapter' in item && 'verse' in item)
  );
}
