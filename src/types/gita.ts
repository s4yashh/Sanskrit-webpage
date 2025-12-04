/**
 * Type definitions for Bhagavad Gita API responses and data models
 */

export interface Chapter {
  id: number;
  title: string;
  description: string;
}

export interface Verse {
  geeta_id: string;
  chapter: number;
  verse: number;
  shlok: string;
  text?: string;
  transliteration?: string;
  meaning?: string;
  lyrics?: string;
  [key: string]: any;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface FetchState {
  isLoading: boolean;
  error: string | null;
  data: Verse[];
}
