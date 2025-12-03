# Bhagavad Gita - Sanskrit Webpage Recreation

A complete recreation of the Bhagavad Gita Sanskrit website built with Svelte 5, TypeScript, and Vite. This project replicates the design, functionality, and user experience of the original website using modern web technologies.

**Original Website**: [sanskrit.ie](https://sanskrit.ie/)  
**Repository**: [GitHub - Sanskrit-webpage](https://github.com/s4yashh/Sanskrit-webpage)

## Project Overview

This is a pixel-perfect recreation of a Sanskrit educational website that showcases the teachings of the Bhagavad Gita. The website includes responsive navigation, hero imagery, chapter information, and comprehensive footer with social media integration.

### Key Features

The website includes the following main components:

- Header Navigation with multi-level dropdown menus for Ayurveda, Yoga Sutras, Bhagavad Gita, Upanishads, Sanskrit, and Contact
- Integrated search icon in the header for user convenience
- Hero section featuring Krishna-Arjuna battlefield imagery
- Bhagavad Gita overlay title with custom Edensor typography
- All 18 chapters of the Bhagavad Gita displayed in an interactive grid layout
- Footer with company branding, social media links, and copyright information
- Responsive design optimized for mobile, tablet, and desktop devices

## Design and Typography

### Font System

The website uses two primary typefaces that create visual hierarchy and maintain the Sanskrit aesthetic:

- Edensor Font (OpenType) - The main "BHAGAVAD GITA" heading and "WELLBEING~SVASTI" branding
- Lato Font (TrueType) - Navigation elements, chapter titles, and body text
- Georgia Serif - Fallback font for secondary text elements

### Color Scheme

The design uses a carefully selected palette that reflects traditional Sanskrit aesthetics:

- Primary green: #4a6b5a (header background), #3D4C36 (footer background)
- Accent red: #c41e3a (dividers and section highlights)
- Neutral tones: #E9DCB7, #F4F7F1 (content background areas)
- Text colors: #3E4939 (dark text on light backgrounds), #d4c4a0 (light text on dark backgrounds)

## Technology Stack

The project utilizes modern web development tools and frameworks:

| Technology   | Version | Purpose                                   |
| ------------ | ------- | ----------------------------------------- |
| Svelte       | 5.43.8  | Frontend framework for component-based UI |
| TypeScript   | Latest  | Type-safe JavaScript development          |
| Vite         | 7.2.4   | Fast build tool and development server    |
| Bootstrap    | 4.0.0   | CSS framework for responsive layout       |
| Font Awesome | 4.7.0   | Icon library for UI elements              |

## Project Structure

The codebase is organized into logical sections for maintainability:

```
src/
├── lib/
│   ├── Header.svelte          # Navigation bar with dropdown menus
│   ├── HeroBanner.svelte       # Krishna-Arjuna battle imagery section
│   ├── GitaIntro.svelte        # Bhagavad Gita title overlay
│   ├── GitaChapters.svelte     # Grid layout for 18 chapters
│   └── Footer.svelte           # Footer with social links and branding
├── assets/
│   ├── Edensor-FREE.otf        # Custom serif typeface
│   ├── Bangers,Inter,Lato.../ # Font family directory
│   ├── logo.png                # Header logo image
│   ├── footer.png              # Footer branding image
│   ├── footerimg.png           # Footer background texture
│   ├── search.png              # Search icon image
│   └── gita_book.jpg           # Book imagery for chapter cards
├── App.svelte                  # Root component
├── main.ts                     # Application entry point
└── app.css                     # Global stylesheet
```

## Getting Started

### Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js version 18 or higher
- npm, yarn, or pnpm package manager
- Git for version control and repository management

### Installation and Setup

Follow these steps to set up the project locally:

1. Clone the repository

   ```bash
   git clone https://github.com/s4yashh/Sanskrit-webpage.git
   cd Sanskrit-webpage
   ```

2. Install project dependencies

   ```bash
   npm install
   ```

3. Start the development server

   ```bash
   npm run dev
   ```

   The application will be accessible at `http://localhost:5174`

4. Create a production build

   ```bash
   npm run build
   ```

   This generates optimized files in the `dist` directory

5. Preview the production build locally
   ```bash
   npm run preview
   ```

## Available Commands

The project includes the following npm scripts for development and deployment:

| Command           | Purpose                                                  |
| ----------------- | -------------------------------------------------------- |
| `npm run dev`     | Start the development server with hot module reloading   |
| `npm run build`   | Generate production-ready optimized build                |
| `npm run preview` | View the production build in a local preview environment |

## Features Implemented

The following features have been successfully implemented and tested:

Navigation and Header

- Sticky navigation bar with responsive design
- Multi-level dropdown menus for content organization
- Integrated search icon for user convenience
- Mobile-responsive hamburger menu
- Proper logo positioning and branding

Content Sections

- Full-width hero banner with Krishna-Arjuna imagery
- Custom "BHAGAVAD GITA" text overlay with Edensor typography
- All 18 chapters of the Bhagavad Gita presented in a grid layout
- Rotated diamond-shaped card design for chapter presentation
- Hover interactions showing chapter titles and descriptions
- Dark background bars with chapter numbers and proper visual clipping

Footer and Social Integration

- Footer branding with logo and company name
- Social media integration with Font Awesome icons
- Links to Facebook, Twitter, YouTube, and external website
- Copyright information and developer credits
- Background imagery and custom styling
- Hover effects on social media icons

Design and Responsiveness

- Responsive layout working across device sizes
- Custom font integration throughout the site
- Gradient backgrounds for visual interest
- Proper spacing and typography hierarchy
- Smooth animations and transitions

## Deployment

### Deploying to Vercel

Vercel offers the simplest deployment path for Vite applications:

1. Push your code to a GitHub repository
2. Connect the repository to your Vercel account at [vercel.com](https://vercel.com/)
3. Vercel automatically detects the Vite configuration
4. Deploy happens automatically on each git push

Vercel Configuration:

- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

The application will be live with a custom domain or Vercel subdomain.

## Development Guidelines

### Creating New Components

When adding new features or pages:

1. Create a new `.svelte` file in the `src/lib/` directory
2. Import and register the component in `src/App.svelte`
3. Define component-specific styles within the `<style>` block
4. Use TypeScript for type safety in scripts

### Working with Fonts

Custom fonts are stored in `/src/assets/` and referenced through CSS:

1. Place font files in the assets directory
2. Define `@font-face` declarations in component styles
3. Reference fonts by name in CSS properties
4. Provide fallback fonts for compatibility

### Managing Images

Images should be organized and referenced consistently:

1. Store static images in `/public/images/`
2. Reference images using absolute paths: `/images/filename.ext`
3. Optimize images for web to improve performance
4. Use descriptive filenames for maintainability

### Styling Approach

The project uses a combination of styling techniques:

- Component-scoped styles within `<style>` blocks prevent global conflicts
- Global styles defined in `src/app.css` for site-wide standards
- Bootstrap CSS classes for responsive grid and layout
- CSS custom properties for theme colors and consistency

## Troubleshooting

If you encounter issues while developing or deploying, try these common solutions:

| Problem                                 | Solution                                                                     |
| --------------------------------------- | ---------------------------------------------------------------------------- |
| Fonts fail to load                      | Verify `@font-face` paths are correct and font files exist in `/src/assets/` |
| Social media icons not visible          | Check that Font Awesome CDN link is present in `index.html`                  |
| Images show as broken                   | Ensure absolute paths start with `/images/` and files exist in `/public/`    |
| Build process fails                     | Delete `node_modules/` and `package-lock.json`, then run `npm install` again |
| Port 5174 already in use                | Run `npm run dev -- --port 3000` to use a different port                     |
| Chapter numbers extending outside cards | Review overflow and rotation CSS properties in GitaChapters.svelte           |

## Component Architecture

### Header.svelte

The header component manages navigation and site branding. It includes dropdown menus for content categories, search functionality, and responsive design for mobile devices. The component handles user interactions through dropdown toggle handlers and maintains the visual hierarchy of the navigation structure.

### GitaChapters.svelte

This component displays all 18 chapters of the Bhagavad Gita in an interactive grid layout. Each chapter is presented as a rotated diamond-shaped card with an image background and chapter number. The implementation includes hover tooltips that display chapter titles and descriptions, creating an engaging user experience.

### Footer.svelte

The footer component provides site branding and social media integration. It includes the company logo, social media icons with proper Font Awesome integration, and copyright information. The component uses custom styling to create a cohesive footer experience that matches the overall site design.

### Additional Components

- HeroBanner.svelte - Displays the Krishna-Arjuna battlefield imagery
- GitaIntro.svelte - Presents the "BHAGAVAD GITA" title overlay with custom typography

## Learning Resources

These resources will help you understand the technologies used in this project:

- [Svelte Official Documentation](https://svelte.dev/)
- [SvelteKit Framework Guide](https://kit.svelte.dev/)
- [Vite Build Tool Documentation](https://vitejs.dev/)
- [Bootstrap CSS Framework](https://getbootstrap.com/)
- [Font Awesome Icon Library](https://fontawesome.com/icons)
- [TypeScript Language Documentation](https://www.typescriptlang.org/docs/)

## License and Attribution

This project is an educational recreation of the original website found at [sanskrit.ie](https://sanskrit.ie/). The design and concept are based on the original website created by Rutger Kortenhorst.

## Project Credits

The following individuals and resources contributed to this project:

- Project Development - Suyash Singh
- Original Website Design - Rutger Kortenhorst
- Typography - Edensor and Lato font families
- Icon Resources - Font Awesome 4.7.0
- Development Framework - Svelte 5 with TypeScript and Vite

## Support and Contributions

If you encounter issues or have suggestions for improvement:

- Open an issue on the [GitHub repository](https://github.com/s4yashh/Sanskrit-webpage/issues)
- Review existing issues to see if your problem has been addressed
- Visit the original website at [sanskrit.ie](https://sanskrit.ie/) for reference

## Future Development Roadmap

The following enhancements are planned for future versions:

- Individual chapter detail pages with full text content
- Functional search capability across chapters and content
- Multi-language support including Hindi and Sanskrit transliteration
- Accessibility improvements to meet WCAG 2.1 standards
- Performance optimization including lazy loading
- Backend integration for dynamic content management
- Dark mode theme option
- Mobile application version

---

Project Status: Production ready for deployment
Last Updated: December 3, 2025
Maintenance: Active development with ongoing improvements

Educational recreation of [sanskrit.ie](https://sanskrit.ie/)

## 👤 Credits

- **Developer**: Suyash Singh
- **Original Design**: Rutger Kortenhorst / sanskrit.ie
- **Fonts**: Edensor, Lato
- **Framework**: Svelte 5 + TypeScript + Vite

---

**Status**: ✅ Production Ready  
**Last Updated**: December 3, 2025
