# GitHub Copilot Instructions for christensendaniel.com Portfolio

This file provides context and guidelines for GitHub Copilot when working on this codebase. Always refer to this document before making changes to ensure consistency with project standards.

## Project Overview

Professional portfolio website for Daniel B. Christensen, a Senior Data Engineer. Built with modern React tooling and deployed to GitHub Pages with custom domain.

**Live Site**: https://christensendaniel.com  
**Repository**: https://github.com/christensendaniel/christensendaniel.github.io

---

## Tech Stack

### Core Framework
- **React 18.3.x** - Modern React with hooks, no class components
- **Vite 6.x** - Build tool and dev server (NOT Create React App)
- **React Router 6.28.0** - Using **BrowserRouter** (NOT HashRouter)
  
### UI & Styling
- **shadcn/ui** - ONLY UI component library allowed
  - Never add Material-UI, Ant Design, Bootstrap, or other UI libraries
  - All new components must use shadcn/ui primitives
- **Tailwind CSS 3.4.x** - ONLY styling approach allowed
  - Never use inline `style` attributes
  - Never use CSS Modules or styled-components
  - Use Tailwind utility classes exclusively
- **Lucide React** - Icon library (consistent with shadcn/ui)

### Testing & Quality
- **Jest 29.x + React Testing Library** - Unit/integration tests
- **Playwright** - E2E and deployment verification tests
  - Playwright tests live in `/playwright` directory (NOT `/e2e`)
  - Jest ignores `/playwright` via `testPathIgnorePatterns`
- **Coverage Thresholds**: 50% minimum for branches, functions, lines, statements

---

## Critical Project Rules

### 1. Routing Configuration (IMPORTANT!)
- **Current Router**: `BrowserRouter` (NOT HashRouter)
- **Location**: `src/App.jsx` line 2
- **GitHub Pages Compatibility**: Uses `public/404.html` redirect hack for SPA routing
- **Never switch back to HashRouter** without team approval - this was a deliberate migration
- When adding new routes:
  1. Add route in `src/App.jsx`
  2. Update `src/pages/Sitemap.jsx` 
  3. Run `npm run prebuild` to regenerate `public/sitemap.xml`

### 2. Theme Configuration
- **Default Theme**: Dark mode (`localStorage.getItem('theme') || 'dark'`)
- **Location**: `src/components/Layout.jsx` lines 7-11
- Theme persists to localStorage on toggle
- Document root gets `dark` class when dark mode active
- **Never change default to light mode** - brand identity is dark-first

### 3. Component Architecture
- **Layout Component Required**: All pages MUST use `<Layout>` component
  - Provides header navigation and footer
  - Handles theme state and persistence
  - Location: `src/components/Layout.jsx`
- **SEO Component Required**: All pages MUST include `<SEO>` component
  - Unique `title` and `description` for each page
  - Set `canonical` prop for proper URL
  - Add `keywords` for better discoverability
  - Location: `src/components/SEO.jsx`
  - Example:
    ```jsx
    <SEO 
      title="Page Title - Daniel Christensen"
      description="Specific page description"
      canonical="/page-url/"
      keywords="relevant, keywords, here"
    />
    ```

### 4. Navigation
- **Mobile Navigation**: Uses shadcn/ui `Sheet` component (hamburger menu)
- **Location**: `src/components/Navigation.jsx` lines 68-91
- **Active Link Highlighting**: Automatically handled via `isActive()` function
- When adding new pages to navigation:
  1. Add to `navLinks` array (line 19)
  2. Use `indent: true` for sub-pages
  3. Ensure mobile nav updates automatically

### 5. Blog System (IMPORTANT!)
- **Blog posts are HARDCODED** in JavaScript, NOT markdown files
- **Locations**:
  - Post list: `src/pages/Blog.jsx` lines 20-28
  - Post content: `src/pages/BlogPost.jsx` lines 13-72
- **To add a new blog post**:
  1. Add post metadata to `blogPosts` array in `Blog.jsx`
  2. Add full content to `blogPosts` object in `BlogPost.jsx`
  3. Update `src/pages/Sitemap.jsx` to include new post
  4. Run `npm run prebuild` to regenerate sitemap.xml
- **NOTE**: `build-blog.py` and markdown-based system are DEPRECATED (do not use)

### 6. Styling Standards
- **Card-based Layouts**: Standard pattern for portfolio, skills, and blog sections
- **Consistent Spacing**: Use Tailwind spacing scale (p-4, py-8, gap-6, etc.)
- **Responsive Design**: Mobile-first, use md: and lg: breakpoints
- **Color Scheme**: 
  - Primary: blue (`primary` Tailwind variable)
  - Uses CSS variables defined in `src/index.css`
  - Never hardcode colors - use Tailwind semantic variables

### 7. Testing Requirements
- **All new components require tests**
- **Test file location**: `src/__tests__/ComponentName.test.jsx`
- **Use test utilities**: Import from `src/test-utils.jsx` (not directly from RTL)
- **Playwright tests**: Only for deployment verification, not unit tests
- **Before committing**: 
  - Run `npm test` - must pass
  - Run `npm run test:coverage` - must meet 50% threshold
  
### 8. Internal Linking (SEO Critical)
- **Always link related pages** for better SEO
- Examples:
  - Portfolio page should link to Skills page
  - Blog posts should link to Portfolio/Home
  - Home page should link to all major sections
- Use React Router `<Link>` component (never `<a>` for internal links)
- Include "Back to Home" button on all secondary pages

---

## Build & Deployment

### Build Process
1. **Pre-build**: `node scripts/generate-sitemap.js` - Auto-generates sitemap
2. **Build**: `vite build` - Creates production bundle in `/dist`
3. **Post-build**: `node scripts/generate-version.js` - Adds deployment metadata
4. **Output**: `/dist` folder ONLY (never commit source files to dist)

### Deployment Pipeline (GitHub Actions)
- **Workflow**: `.github/workflows/ci-cd.yml`
- **Triggers**: Push to `main` branch or pull requests
- **Steps**:
  1. Run Jest tests with coverage
  2. Build project with deployment metadata
  3. Verify build output (no source files in dist)
  4. Deploy to GitHub Pages from `/dist` folder
  5. Run Playwright deployment verification tests
  6. Capture screenshots and generate reports
  
### Important Build Rules
- **Never deploy source files** - verified in CI/CD pipeline
- **Never commit `/dist` folder** - generated in CI/CD only
- **Sitemap auto-generated** - don't manually edit `public/sitemap.xml`
- **Version metadata injected** - `dist/version.json` and meta tags added during build

---

## File Structure Reference

```
christensendaniel.github.io/
├── .github/
│   ├── workflows/
│   │   └── ci-cd.yml           # CI/CD pipeline
│   └── copilot-instructions.md # This file
├── docs/                        # Detailed documentation
│   ├── ARCHITECTURE.md
│   ├── DEPLOYMENT.md
│   ├── DEVELOPMENT.md
│   ├── TESTING.md
│   └── TROUBLESHOOTING.md
├── playwright/                  # E2E tests (NOT src/__tests__)
│   └── deployment-verification.spec.js
├── public/                      # Static assets served as-is
│   ├── 404.html                # SPA routing fallback for GitHub Pages
│   ├── CNAME                   # Custom domain config
│   ├── sitemap.xml             # Auto-generated, don't edit manually
│   └── robots.txt
├── scripts/                     # Build and verification scripts
│   ├── generate-sitemap.js     # Auto-generates sitemap.xml
│   ├── generate-version.js     # Adds deployment metadata
│   ├── verify-build.js         # Validates build output
│   └── verify-deployment.js    # Checks live deployment
├── src/
│   ├── __tests__/              # Jest unit tests
│   ├── components/
│   │   ├── ui/                 # shadcn/ui components only
│   │   ├── Layout.jsx          # Main layout wrapper (header + footer)
│   │   ├── Navigation.jsx      # Top nav with mobile hamburger menu
│   │   ├── Footer.jsx          # Site footer
│   │   ├── SEO.jsx             # SEO meta tags component
│   │   └── ThemeToggle.jsx     # Dark/light theme toggle
│   ├── pages/                  # Page components
│   │   ├── Home.jsx
│   │   ├── Skills.jsx
│   │   ├── Portfolio.jsx
│   │   ├── DataEngineeringPortfolio.jsx
│   │   ├── Blog.jsx            # Blog post list
│   │   ├── BlogPost.jsx        # Blog post content (hardcoded)
│   │   └── Sitemap.jsx         # HTML sitemap page
│   ├── constants/              # Configuration constants
│   │   └── router.js           # Router future flags
│   ├── lib/
│   │   └── utils.js            # Utility functions (cn helper)
│   ├── App.jsx                 # Main app with routes (BrowserRouter)
│   ├── main.jsx                # Entry point
│   ├── index.css               # Tailwind imports + CSS variables
│   ├── setupTests.js           # Jest setup
│   └── test-utils.jsx          # Testing utilities
├── .gitignore
├── jest.config.js              # Jest configuration
├── package.json                # Dependencies and scripts
├── playwright.config.js        # Playwright configuration
├── tailwind.config.js          # Tailwind configuration
└── vite.config.js              # Vite build configuration
```

---

## Common Development Workflows

### Adding a New Page
1. Create page component in `src/pages/PageName.jsx`
2. Import and use `<Layout>` component
3. Add `<SEO>` component with unique title/description
4. Add route in `src/App.jsx`
5. Add to navigation in `src/components/Navigation.jsx` (if needed)
6. Update `src/pages/Sitemap.jsx`
7. Run `npm run prebuild` to regenerate sitemap.xml
8. Create test file in `src/__tests__/PageName.test.jsx`
9. Run `npm test` to verify tests pass

### Adding a shadcn/ui Component
```bash
# Don't manually create - use shadcn CLI
npx shadcn-ui@latest add component-name
```
This ensures proper component structure and imports.

### Adding a New Blog Post
1. Edit `src/pages/Blog.jsx` - add post to `blogPosts` array (lines 20-28)
2. Edit `src/pages/BlogPost.jsx` - add full content to `blogPosts` object (lines 13-72)
3. Edit `src/pages/Sitemap.jsx` - add post to sitemap links
4. Run `npm run prebuild` to regenerate sitemap.xml
5. Test locally: `npm run dev` and navigate to new post
6. Run `npm test` to ensure no regressions

### Updating Styles/Theme
1. **For component styles**: Use Tailwind utilities in JSX
2. **For theme colors**: Edit CSS variables in `src/index.css`
3. **Never use inline styles**: Use className with Tailwind
4. **Test dark/light modes**: Toggle theme and verify appearance

---

## Anti-Patterns to Avoid

### ❌ DO NOT:
- Use HashRouter (we use BrowserRouter)
- Add Material-UI, Bootstrap, Ant Design, or other UI libraries
- Use inline styles or `style={}` attributes
- Use CSS Modules or styled-components
- Create markdown files for blog posts (blog is hardcoded)
- Manually edit `public/sitemap.xml` (it's auto-generated)
- Commit `/dist` folder or build artifacts
- Add routes without updating Sitemap.jsx
- Create tests in `/e2e` folder (use `/playwright` for E2E tests)
- Import from React Testing Library directly (use `src/test-utils.jsx`)

### ✅ DO:
- Use BrowserRouter for all routing
- Use shadcn/ui components exclusively
- Use Tailwind CSS classes for all styling
- Hardcode blog posts in BlogPost.jsx
- Run `npm run prebuild` when adding routes/blog posts
- Keep all source files out of `/dist`
- Update Sitemap.jsx when adding routes
- Place Playwright tests in `/playwright` folder
- Import test utilities from `src/test-utils.jsx`

---

## Code Quality Standards

### Component Structure
```jsx
// Good: Follows project conventions
import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import SEO from '../components/SEO'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'

function PageName() {
  return (
    <Layout>
      <SEO 
        title="Page Title - Daniel Christensen"
        description="Description here"
        canonical="/page-url/"
      />
      <div className="container mx-auto px-4 py-16">
        {/* Content using Tailwind classes */}
      </div>
    </Layout>
  )
}

export default PageName
```

### Test Structure
```jsx
// Good: Uses test-utils and follows conventions
import React from 'react'
import { render, screen } from '../test-utils'
import PageName from '../pages/PageName'

describe('PageName', () => {
  it('renders page title', () => {
    render(<PageName />)
    expect(screen.getByText(/expected text/i)).toBeInTheDocument()
  })
})
```

---

## Useful NPM Scripts

| Script | Purpose | When to Use |
|--------|---------|-------------|
| `npm run dev` | Start dev server | Local development with hot reload |
| `npm run build` | Production build | Before deployment (runs prebuild automatically) |
| `npm run prebuild` | Generate sitemap | When adding routes/blog posts |
| `npm run preview` | Preview prod build | Test production build locally |
| `npm test` | Run unit tests | Before committing changes |
| `npm run test:watch` | Run tests in watch mode | During active development |
| `npm run test:coverage` | Generate coverage report | Verify coverage thresholds met |
| `npm run test:deployment` | Run Playwright tests | Verify deployment works end-to-end |
| `npm run verify-build` | Verify build output | Ensure build is clean (no source files) |
| `npm run verify-deployment` | Check deployment URLs | Verify live site is accessible |

---

## Historical Context & Lessons Learned

### Router Migration (IMPORTANT!)
- **Previous**: HashRouter with URL fragments (`/#/page`)
- **Current**: BrowserRouter with clean URLs (`/page`)
- **Migration Date**: 2024 (early in project)
- **Why Changed**: Better SEO, cleaner URLs, more professional
- **Compatibility**: Uses `public/404.html` hack for GitHub Pages SPA routing
- **NEVER revert to HashRouter** - this would break bookmarks and SEO

### Blog System Evolution
- **Initially Planned**: Markdown-based blog with Python build script
- **Files**: `build-blog.py`, `requirements.txt`
- **Current**: Hardcoded blog posts in React components
- **Why Changed**: Simpler, faster builds, fewer dependencies
- **Those Python files are deprecated** - ignore or remove them

### Testing Strategy
- **Early Issue**: Playwright tests were mixed with Jest tests
- **Resolution**: Strict separation via `testPathIgnorePatterns`
- **Rule**: `/playwright` for E2E, `src/__tests__` for unit tests
- **Never mix test types** in same directory

---

## SEO Best Practices

### Meta Tags (Required on All Pages)
- Unique title (include "Daniel Christensen" or site name)
- Unique description (150-160 characters)
- Canonical URL (matching route path)
- Relevant keywords (5-10 keywords)
- Structured data for breadcrumbs (on blog/portfolio pages)

### Internal Linking Requirements
- Every page should link back to Home
- Related pages should cross-link (Portfolio ↔ Skills)
- Blog posts should link to relevant portfolio items
- Use descriptive anchor text (not "click here")

### Sitemap Management
- **Auto-generated** by `scripts/generate-sitemap.js`
- Runs automatically during build via `prebuild` script
- Includes all routes from `src/App.jsx`
- **Must manually update** `Sitemap.jsx` when adding routes

---

## Security & Performance

### Content Security
- No API keys in code (all static content)
- No user input or forms (static portfolio site)
- External links use `rel="noopener noreferrer"` when appropriate

### Performance Optimizations
- Lazy loading for non-critical pages (see `src/App.jsx` lines 7-12)
- Loading fallback component to prevent blank screens
- Image optimization (use appropriate formats and sizes)
- Vite code splitting (automatic)
- CSS purging via Tailwind (automatic)

### Accessibility
- Semantic HTML elements
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast meets WCAG AA standards
- Screen reader friendly navigation

---

## Getting Help

### Documentation
- **Development**: `docs/DEVELOPMENT.md` - Setup and workflows
- **Deployment**: `docs/DEPLOYMENT.md` - CI/CD and hosting
- **Testing**: `docs/TESTING.md` - Test strategy and execution
- **Architecture**: `docs/ARCHITECTURE.md` - Design decisions
- **Troubleshooting**: `docs/TROUBLESHOOTING.md` - Common issues

### External Resources
- [Vite Docs](https://vitejs.dev/)
- [React Router v6 Docs](https://reactrouter.com/)
- [shadcn/ui Docs](https://ui.shadcn.com/)
- [Tailwind CSS Docs](https://tailwindcss.com/)
- [Playwright Docs](https://playwright.dev/)

---

## Summary: Quick Reference for AI Copilot

When generating code for this project, remember:

1. ✅ **BrowserRouter** (NOT HashRouter) 
2. ✅ **shadcn/ui** only (NO other UI libraries)
3. ✅ **Tailwind CSS** only (NO inline styles)
4. ✅ **Dark mode default** (localStorage fallback)
5. ✅ **Layout + SEO components** required on all pages
6. ✅ **Blog posts hardcoded** (NOT markdown)
7. ✅ **Playwright in /playwright** (Jest in src/__tests__)
8. ✅ **Auto-generate sitemap** (run npm run prebuild)
9. ✅ **Test before committing** (npm test must pass)
10. ✅ **Internal linking** for SEO (cross-link related pages)

**When in doubt**: Check the docs/ folder or ask for clarification. Better to ask than to introduce inconsistencies.
