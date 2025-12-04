# Bhagavad Gita - Svelte Web Application

A modern, interactive web application for exploring the Bhagavad Gita with dynamic verse loading and responsive design.

## Project Overview

This project is a Svelte-based web application that displays chapters and verses from the Bhagavad Gita. It fetches data from the Sanskrit.ie API and provides an intuitive interface for reading and exploring ancient Hindu wisdom. The application implements a professional-grade API architecture with serverless proxy handling for production deployment.

## Core Features

- Chapter Selection: Interactive grid display of all 18 Gita chapters with hover effects
- Dynamic Verse Loading: On-demand fetching of verses from external API
- Responsive Design: Optimized layouts for desktop, tablet, and mobile devices
- Loading States: Real-time feedback with spinner animations during API calls
- Error Handling: Comprehensive error management with user-friendly messages and retry functionality
- Professional Typography: Noto Sans font for verses, Lato for headers, Edensor for special text
- Responsive Grid System: 6-column layout for desktop, adaptive for smaller screens

## Technology Stack

- Framework: Svelte 5.43.8
- Build Tool: Vite 7.2.4 with TypeScript support
- Language: TypeScript 5.0+
- Data Source: Sanskrit.ie Bhagavad Gita API
- Deployment: Vercel with serverless functions
- Package Manager: npm

## 📁 Project Structure

```
project-root/
├── api/
│   └── gita.js              # Vercel serverless API proxy
├── src/
│   ├── lib/                 # Svelte components
│   │   ├── GitaChapters.svelte    # Main chapter display component
│   │   ├── Header.svelte
│   │   ├── Footer.svelte
│   │   ├── HeroBanner.svelte
│   │   └── ...
│   ├── services/
│   │   └── gitaApi.ts       # API service layer
│   ├── types/
│   │   └── gita.ts          # TypeScript type definitions
│   ├── utils/
│   │   ├── apiErrors.ts     # Error handling utilities
│   │   └── constants.ts     # Configuration constants
│   ├── assets/              # Images and fonts
│   ├── app.css              # Global styles
│   └── main.ts              # Entry point
├── public/                  # Static public assets
├── index.html               # HTML entry point
├── vite.config.ts           # Vite configuration
├── tsconfig.json            # TypeScript configuration
└── package.json             # Dependencies
```

## API Integration

### Endpoint

- **Local Development**: `/api/gita?q={chapter}` (Vite proxy)
- **Production (Vercel)**: `/api/gita?q={chapter}` (Serverless function)

### Request Format

```javascript
fetch("/api/gita?q=1")
  .then((res) => res.text())
  .then((data) => JSON.parse(data))
  .then((verses) => console.log(verses));
```

### Response Format

```json
[
  {
    "geeta_id": "1",
    "chapter": 1,
    "verse": 1,
    "shlok": "1.1",
    "lyrics": "<p>Sanskrit text...</p>",
    ...
  }
]
```

## Responsive Breakpoints

- **Desktop**: Full 6-column chapter grid
- **Tablet** (max-width: 768px): Adjusted spacing and padding
- **Mobile**: Single column layout with touch-friendly elements

## CORS Handling

The application uses a **Vercel serverless API proxy** to bypass CORS restrictions:

1. **Development**: Vite dev server proxy (`vite.config.ts`)
2. **Production**: Vercel serverless function (`/api/gita.js`)

Both use the same endpoint for seamless development-to-production transition.

## 🧪 Testing Locally

### Test API Endpoint

```bash
# Start dev server
npm run dev

# In another terminal, test the endpoint
curl 'http://localhost:5173/api/gita?q=1'
```

### Test in Browser

```javascript
// Open browser console (F12)
fetch("/api/gita?q=1")
  .then((r) => r.text())
  .then((d) => console.log(JSON.parse(d)));
```

### What Happens on Vercel

1. `/api/gita.js` is automatically detected as a serverless function
2. `vite.config.ts` is ignored (dev-only)
3. API requests to `/api/gita` route to the serverless function
4. Everything works without any additional configuration

## 📊 Performance Metrics

- **Bundle Size**: ~150KB (gzipped)
- **First Contentful Paint**: <1s (local), ~1.5s (production)
- **Interaction to Next Paint**: <100ms
- **API Response Time**: ~200-500ms (Sanskrit.ie)

## 🐛 Debugging

### Common Issues

**Issue**: "Failed to load verses" error

- **Cause**: API endpoint not accessible
- **Solution**: Check network tab in DevTools, verify proxy settings in `vite.config.ts`

**Issue**: Verses not displaying

- **Cause**: JSON parsing error
- **Solution**: Check API response format, ensure `geeta_id` field is present

**Issue**: CORS error on production

- **Cause**: Direct API calls instead of serverless function
- **Solution**: Ensure fetch URL is `/api/gita`, not external URL

- GitHub: [@s4yashh](https://github.com/s4yashh)
- WebPage: [Sanskrit-webpage](https://github.com/s4yashh/Sanskrit-webpage)

#
