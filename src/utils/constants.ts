/**
 * API configuration and constants
 * Centralized configuration for API endpoints and settings
 */

export const API_CONFIG = {
  // Endpoints
  ENDPOINTS: {
    GITA: '/gita',
  },
  
  // Timeout in milliseconds
  TIMEOUT: 10000,
  
  // Retry configuration
  RETRY: {
    MAX_ATTEMPTS: 3,
    DELAY_MS: 1000,
  },
  
  // Cache configuration
  CACHE: {
    ENABLED: true,
    DURATION_MS: 5 * 60 * 1000, // 5 minutes
  },
};

/**
 * Chapter metadata for reference
 */
export const CHAPTERS = [
  { id: 1, title: 'Chapter 1', description: 'Arjuna Vishada Yoga' },
  { id: 2, title: 'Chapter 2', description: 'Sankhya Yoga' },
  { id: 3, title: 'Chapter 3', description: 'Karma Yoga' },
  { id: 4, title: 'Chapter 4', description: 'Jnana Yoga' },
  { id: 5, title: 'Chapter 5', description: 'Sannyasa Yoga' },
  { id: 6, title: 'Chapter 6', description: 'Dhyana Yoga' },
  { id: 7, title: 'Chapter 7', description: 'Jnana Vijnana Yoga' },
  { id: 8, title: 'Chapter 8', description: 'Aksara Brahma Yoga' },
  { id: 9, title: 'Chapter 9', description: 'Raja Vidya Yoga' },
  { id: 10, title: 'Chapter 10', description: 'Vibhuti Yoga' },
  { id: 11, title: 'Chapter 11', description: 'Visvarupa Darsana Yoga' },
  { id: 12, title: 'Chapter 12', description: 'Bhakti Yoga' },
  { id: 13, title: 'Chapter 13', description: 'Kshetra Kshetrajna Yoga' },
  { id: 14, title: 'Chapter 14', description: 'Gunatraya Vibhaga Yoga' },
  { id: 15, title: 'Chapter 15', description: 'Purushottama Yoga' },
  { id: 16, title: 'Chapter 16', description: 'Daivasura Sampad Yoga' },
  { id: 17, title: 'Chapter 17', description: 'Shraddhatraya Vibhaga Yoga' },
  { id: 18, title: 'Chapter 18', description: 'Moksha Sannyasa Yoga' },
];
