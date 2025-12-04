/**
 * API Error handling utilities
 * Provides standardized error handling and user-friendly messages
 */

export class ApiError extends Error {
  constructor(
    public code: string,
    public statusCode: number = 500,
    message: string = 'An API error occurred'
  ) {
    super(message);
    this.name = 'ApiError';
  }

  getUserMessage(): string {
    switch (this.code) {
      case 'NETWORK_ERROR':
        return 'Unable to connect to the server. Please check your internet connection.';
      case 'NOT_FOUND':
        return 'The requested chapter or verse was not found.';
      case 'SERVER_ERROR':
        return 'The server encountered an error. Please try again later.';
      case 'PARSE_ERROR':
        return 'Failed to process the response from the server.';
      case 'TIMEOUT':
        return 'The request took too long. Please try again.';
      default:
        return this.message || 'An unexpected error occurred.';
    }
  }
}

/**
 * Wrap API calls with error handling and logging
 * @param fn - Async function to execute
 * @returns Promise with error handling
 */
export async function withErrorHandling<T>(fn: () => Promise<T>): Promise<{ success: boolean; data?: T; error?: ApiError }> {
  try {
    const data = await fn();
    return { success: true, data };
  } catch (error) {
    let apiError: ApiError;

    if (error instanceof ApiError) {
      apiError = error;
    } else if (error instanceof TypeError) {
      apiError = new ApiError('NETWORK_ERROR', 0, 'Network request failed');
    } else if (error instanceof SyntaxError) {
      apiError = new ApiError('PARSE_ERROR', 500, 'Failed to parse response');
    } else {
      apiError = new ApiError('UNKNOWN_ERROR', 500, error instanceof Error ? error.message : 'Unknown error');
    }

    console.error(`[API Error] ${apiError.code}:`, apiError.message);
    return { success: false, error: apiError };
  }
}

/**
 * Format error message for display
 * @param error - Error object
 * @returns User-friendly error message
 */
export function formatErrorMessage(error: unknown): string {
  if (error instanceof ApiError) {
    return error.getUserMessage();
  }
  if (error instanceof Error) {
    return error.message;
  }
  return 'An unexpected error occurred';
}
