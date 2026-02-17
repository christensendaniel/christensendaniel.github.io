# Architecture

This document describes the architecture, design decisions, and project structure of the portfolio website.

## Overview

A modern, performant portfolio website built with React and deployed on GitHub Pages. The architecture emphasizes simplicity, maintainability, and developer experience.

## Technology Stack

### Frontend Framework
- **React 18.3.x** - Modern React with hooks and concurrent features
- **Vite 6.x** - Fast build tool with excellent DX and HMR
- **React Router 6.x** - Client-side routing with BrowserRouter and 404.html fallback

### UI & Styling
- **Tailwind CSS 3.4.x** - Utility-first CSS framework
- **shadcn/ui** - High-quality, accessible component library
- **Lucide React** - Icon library
- **CSS Variables** - Theme customization

### Testing
- **Jest 29.x** - JavaScript testing framework
- **React Testing Library** - React component testing
- **Playwright** - End-to-end and deployment testing

### Build & Deployment
- **GitHub Actions** - CI/CD pipeline
- **GitHub Pages** - Static site hosting
- **Custom Domain** - christensendaniel.com

## Project Structure

```
christensendaniel.github.io/
├── .github/
│   └── workflows/
│       └── ci-cd.yml          # CI/CD pipeline
├── docs/                       # 📚 Documentation
│   ├── README.md
│   ├── DEVELOPMENT.md
│   ├── DEPLOYMENT.md
│   ├── TESTING.md
│   ├── ARCHITECTURE.md        # This file
│   └── TROUBLESHOOTING.md
├── public/                     # Static assets
│   ├── blog/
│   │   └── posts/            # Blog post markdown files
│   ├── CNAME                 # Custom domain config
│   └── favicon.svg
├── scripts/                    # Build and deployment scripts
│   ├── verify-build.js
│   ├── verify-deployment.js
│   ├── generate-version.js
│   └── vite-plugin-deployment-meta.js
├── src/
│   ├── __tests__/            # Test files
│   │   ├── Blog.test.jsx
│   │   ├── Footer.test.jsx
│   │   ├── Home.test.jsx
│   │   ├── Navigation.test.jsx
│   │   ├── Portfolio.test.jsx
│   │   └── Skills.test.jsx
│   ├── components/           # React components
│   │   ├── ui/              # shadcn/ui components
│   │   │   ├── button.jsx
│   │   │   ├── card.jsx
│   │   │   └── ... (other UI components)
│   │   ├── Footer.jsx
│   │   ├── Layout.jsx
│   │   └── Navigation.jsx
│   ├── constants/            # App constants
│   ├── lib/                  # Utility functions
│   │   └── utils.js
│   ├── pages/                # Page components
│   │   ├── Blog.jsx
│   │   ├── BlogPost.jsx
│   │   ├── Home.jsx
│   │   ├── Portfolio.jsx
│   │   └── Skills.jsx
│   ├── App.jsx              # Main app component with routing
│   ├── index.css            # Global styles and theme
│   ├── main.jsx             # Application entry point
│   ├── setupTests.js        # Jest test configuration
│   └── test-utils.jsx       # Testing utilities
├── index.html               # HTML entry point
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
├── postcss.config.js        # PostCSS configuration
├── jest.config.js           # Jest configuration
├── playwright.config.js     # Playwright configuration
└── package.json             # Dependencies and scripts
```

## Design Decisions

### Why BrowserRouter?

Using `BrowserRouter` instead of `HashRouter` for:
- ✅ Clean, professional URLs without hash fragments (`/skills` not `/#/skills`)
- ✅ Better SEO - search engines prefer clean URLs
- ✅ Improved user experience - shareable, bookmarkable links
- ✅ Modern SPA routing standard
- ✅ GitHub Pages compatibility via `public/404.html` redirect hack

**GitHub Pages SPA Routing:**
The `public/404.html` file redirects all unknown routes back to `index.html` with the path preserved as a query parameter, which is then restored by JavaScript in the main HTML file. This enables BrowserRouter to work on GitHub Pages without server-side configuration.

### Why Vite?

Chosen over Create React App because:
- ⚡ Lightning-fast HMR (Hot Module Replacement)
- 📦 Smaller bundle sizes
- 🎯 Modern, actively maintained
- 🔧 Simple, flexible configuration
- 🚀 Excellent developer experience

### Why shadcn/ui?

Component library choice reasoning:
- 🎨 Copy-paste components (no npm package bloat)
- ♿ Built-in accessibility
- 🎭 Highly customizable with Tailwind
- 📝 Excellent documentation
- 🔧 Full control over component code

### Why Tailwind CSS?

Styling approach decision:
- 🚀 Rapid development with utility classes
- 📱 Mobile-first responsive design
- 🎨 Consistent design system
- 📦 Excellent tree-shaking (small bundle)
- 🔄 Easy to maintain and refactor

## Data Flow

### Page Rendering

1. User navigates to URL (e.g., `/#/skills`)
2. HashRouter matches route
3. Corresponding page component renders
4. Layout wrapper provides consistent structure
5. Component fetches any needed data
6. UI updates with content

### Blog Posts

1. Blog posts stored as markdown in `public/blog/posts/`
2. Blog page lists available posts
3. User clicks post link
4. BlogPost component fetches markdown file
5. Markdown parsed and rendered
6. Syntax highlighting applied (if code blocks)

### Theme System

1. CSS variables define theme colors
2. Tailwind configured to use CSS variables
3. Theme can be easily customized via `src/index.css`
4. Components use semantic color names (e.g., `bg-background`, `text-foreground`)

## Build Process

### Development Build

1. Vite dev server starts
2. Watches for file changes
3. HMR updates browser on save
4. Source maps enabled for debugging

### Production Build

1. `npm run build` triggered
2. Vite bundles and optimizes code
3. Git commit hash injected via plugin
4. `version.json` generated
5. Assets minified and hashed
6. Output to `dist/` directory
7. Build verification runs

### Deployment

1. GitHub Actions workflow triggered
2. Tests run (Jest + React Testing Library)
3. Build process executes
4. Build artifacts verified
5. Deploy to GitHub Pages
6. Post-deployment verification
7. Playwright screenshots captured

## Performance Considerations

### Code Splitting

- React.lazy() for route-based splitting
- Vite automatically splits vendor code
- Dynamic imports for large components

### Asset Optimization

- Vite optimizes images and assets
- CSS purging via Tailwind
- JavaScript minification
- Asset hashing for cache busting

### Loading Strategy

- Critical CSS inlined
- Fonts preloaded
- Images lazy-loaded (where applicable)
- Minimal JavaScript for initial render

## Security

### Deployment Metadata

- Git commit hash tracking for verification
- No sensitive data in environment variables
- HTTPS enforced via GitHub Pages
- Custom domain with SSL certificate

### Dependencies

- Regular dependency updates
- No known security vulnerabilities
- Minimal dependency tree
- Lock file committed for reproducibility

## Extensibility

### Adding New Pages

1. Create component in `src/pages/`
2. Add route in `src/App.jsx`
3. Add navigation link
4. Create tests
5. Deploy

### Adding New Components

1. Create component in `src/components/`
2. Add tests in `src/__tests__/`
3. Import and use in pages
4. Document if reusable

### Integrating APIs

Future considerations for API integration:
- Use React hooks for data fetching
- Consider React Query for caching
- Environment variables for API keys
- Error boundaries for handling failures

## Testing Strategy

### Unit Tests
- Components tested in isolation
- Focus on user interactions
- Accessibility checks
- Snapshot tests for UI consistency

### Integration Tests
- Page-level component testing
- Router integration
- Multiple component interactions

### End-to-End Tests
- Playwright for deployment verification
- Screenshot capture for visual testing
- Console error monitoring
- Full user workflows

## Future Considerations

### Potential Enhancements

- **Analytics**: Add privacy-friendly analytics
- **Search**: Client-side search for blog posts
- **RSS Feed**: Generate RSS for blog
- **Dark Mode**: Theme toggle
- **Contact Form**: Form submission handling
- **CMS**: Headless CMS for content management

### Scalability

Current architecture supports:
- ✅ Adding unlimited pages
- ✅ Expanding blog content
- ✅ Adding new UI components
- ✅ Integrating third-party services
- ✅ SEO optimization

## Maintenance

### Regular Tasks

- Update dependencies monthly
- Review and merge Dependabot PRs
- Monitor GitHub Actions for failures
- Check Lighthouse scores periodically
- Review and update content

### Monitoring

- GitHub Actions status
- Lighthouse CI scores
- Browser console errors (Playwright)
- Site availability
