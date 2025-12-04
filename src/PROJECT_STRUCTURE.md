# Project Structure

## Overview
This project follows professional-level folder organization patterns for scalability and maintainability.

## Directory Structure

```
src/
├── components/          # Reusable UI components
├── lib/                 # Svelte components (pages and features)
├── services/            # API and external service integrations
│   └── gitaApi.ts       # Bhagavad Gita API service layer
├── types/               # TypeScript type definitions
│   └── gita.ts          # Gita-related types and interfaces
├── utils/               # Utility functions and helpers
│   ├── apiErrors.ts     # Error handling utilities
│   └── constants.ts     # Application constants and configuration
├── assets/              # Static assets (fonts, images)
├── app.css              # Global styles
├── main.ts              # Application entry point
├── App.svelte           # Root component
└── routes/              # Route definitions
```

## Folder Responsibilities

### `/src/services`
- **Purpose**: API communication and external service integration
- **Contains**: API functions, HTTP requests, data fetching logic
- **Example**: `gitaApi.ts` - All Bhagavad Gita API calls
- **Best Practice**: Services should be framework-agnostic and testable

### `/src/types`
- **Purpose**: TypeScript type definitions and interfaces
- **Contains**: Data models, API response types, component prop types
- **Example**: `gita.ts` - Verse, Chapter, and ApiResponse types
- **Best Practice**: Centralize types for consistency across the app

### `/src/utils`
- **Purpose**: Shared utility functions and configuration
- **Contains**: Error handling, constants, helpers, formatters
- **Examples**: 
  - `apiErrors.ts` - Error classes and handling
  - `constants.ts` - API config, chapter data
- **Best Practice**: Keep utilities pure and reusable

### `/src/lib`
- **Purpose**: Svelte components specific to this application
- **Contains**: Page components, feature components
- **Examples**: GitaChapters.svelte, Header.svelte, Footer.svelte
- **Best Practice**: Each component should be focused and self-contained

### `/src/assets`
- **Purpose**: Static resources used by the application
- **Contains**: Fonts, images, icons
- **Best Practice**: Organize by type (fonts/, images/, icons/)

## Professional Standards Met

✅ **Separation of Concerns**
- API logic separated from UI components
- Types isolated for reusability
- Utilities kept pure and independent

✅ **Scalability**
- Easy to add new services in `/services`
- New types can be added to `/types`
- Utilities can be shared across the app

✅ **Maintainability**
- Clear folder purpose and naming
- Related files grouped together
- Easy to locate and modify code

✅ **Testing**
- Services can be unit tested independently
- Types ensure type safety
- Utilities are pure functions

✅ **Documentation**
- Self-documenting folder structure
- Comments and JSDoc in code files
- This README explains the organization

## Usage Example

### Before (Monolithic)
```typescript
// Everything mixed in component
async function fetchAndDisplay() {
  const response = await fetch('/gita?q=1');
  // ... parsing, error handling, type coercion all in component
}
```

### After (Professional)
```typescript
// Clean separation of concerns
import { fetchVersesByChapter } from '$services/gitaApi';
import type { Verse } from '$types/gita';

const verses: Verse[] = await fetchVersesByChapter(1);
```

## Future Enhancements

- Add request caching layer in services
- Implement API rate limiting
- Add request/response logging middleware
- Create custom hooks for common API patterns
- Add API integration tests
