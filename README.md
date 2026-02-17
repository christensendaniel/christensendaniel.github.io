# Daniel Christensen - Portfolio & Blog

Professional portfolio showcasing data engineering expertise, projects, and technical insights.

🔗 **Live Site:** https://christensendaniel.com/

## About

This is the portfolio website for Daniel B. Christensen, a Senior Data Engineer with 7+ years of experience building scalable data pipelines, real-time streaming architectures, and cloud-native solutions. The site features a comprehensive overview of professional experience, technical skills, featured projects, and a technical blog sharing insights on data engineering best practices.

## Features

- **Professional Profile** - Detailed overview of experience and expertise
- **Project Portfolio** - Showcase of real-world data engineering projects including Disney streaming data pipelines
- **Technical Skills** - Comprehensive list of technologies and competencies with card-based layout
- **Blog** - Technical articles on data engineering, performance optimization, and cloud architecture
- **Dark Mode Default** - Professional dark theme with light mode toggle
- **Responsive Design** - Optimized for all device sizes with mobile hamburger navigation
- **WCAG 2.1 AA Accessibility** - Skip navigation, proper ARIA labels, keyboard navigation, screen reader support
- **SEO Optimized** - Structured data, internal linking, and auto-generated sitemaps
- **Fast Performance** - Built with Vite for lightning-fast builds and optimal load times

## Tech Stack

- **Framework:** React 18.3.x + Vite 6.x
- **Routing:** React Router v6 (BrowserRouter with GitHub Pages compatibility)
- **UI Components:** shadcn/ui (Radix UI primitives)
- **Icons:** Lucide React
- **Styling:** Tailwind CSS 3.4.x (utility-first, no inline styles)
- **SEO:** React Helmet Async for meta tags and structured data
- **Deployment:** GitHub Pages with automated CI/CD via GitHub Actions
- **Testing:** Jest 29.x + React Testing Library + Playwright for E2E

## Quick Start

### Prerequisites
- **Node.js:** 20.x or higher
- **npm:** Comes with Node.js

### Setup

```bash
# Clone the repository
git clone https://github.com/christensendaniel/christensendaniel.github.io.git
cd christensendaniel.github.io

# Install dependencies
npm install

# Run development server with hot reload
npm run dev

# Open http://localhost:5173 in your browser
```

### Build for Production

```bash
# Create optimized production build in dist/ folder
# Automatically runs sitemap generation before build
npm run build

# Preview production build locally
npm run preview  # Opens on http://localhost:4173
```

## Scripts

All available npm scripts from package.json:

### Development
- **`npm run dev`** - Start Vite development server with hot module replacement (HMR) at http://localhost:5173
- **`npm run preview`** - Preview production build locally at http://localhost:4173

### Build & Deploy
- **`npm run prebuild`** - Generate sitemap.xml from current routes (runs automatically before build)
- **`npm run build`** - Create optimized production bundle in dist/ folder with deployment metadata
- **`npm run verify-build`** - Verify build output is valid (no source files in dist, proper bundle references)

### Testing
- **`npm test`** - Run all Jest unit tests once
- **`npm run test:watch`** - Run Jest tests in watch mode (re-runs on file changes)
- **`npm run test:coverage`** - Generate test coverage report (must meet 50% threshold)
- **`npm run test:deployment`** - Run Playwright end-to-end deployment verification tests
- **`npm run test:deployed-site`** - Test the live deployed site at christensendaniel.com

### Verification & Diagnostics
- **`npm run quick-check`** - Quick deployment health check of live site
- **`npm run verify-deployment`** - Comprehensive deployment verification (checks all URLs)

## Project Structure

```
christensendaniel.github.io/
├── .github/
│   ├── workflows/
│   │   └── ci-cd.yml              # GitHub Actions CI/CD pipeline
│   └── copilot-instructions.md    # GitHub Copilot context and guidelines
├── docs/                           # 📚 Detailed project documentation
│   ├── ARCHITECTURE.md            # Design decisions and technical architecture
│   ├── DEPLOYMENT.md              # Deployment process and CI/CD details
│   ├── DEVELOPMENT.md             # Local development setup and workflows
│   ├── TESTING.md                 # Testing strategy and test execution
│   └── TROUBLESHOOTING.md         # Common issues and solutions
├── playwright/                     # Playwright E2E and deployment tests
│   └── deployment-verification.spec.js
├── public/                         # Static assets (served as-is by Vite)
│   ├── 404.html                   # SPA routing fallback for GitHub Pages
│   ├── CNAME                      # Custom domain configuration
│   ├── sitemap.xml                # Auto-generated XML sitemap (do not edit manually)
│   ├── robots.txt                 # Search engine crawler instructions
│   ├── favicon.svg                # Site favicon
│   └── assets/                    # Images and static files
├── scripts/                        # Build and verification automation scripts
│   ├── generate-sitemap.js        # Auto-generates public/sitemap.xml from routes
│   ├── generate-version.js        # Injects deployment metadata into build
│   ├── verify-build.js            # Validates dist/ output (no source files)
│   ├── verify-deployment.js       # Checks deployment URL accessibility
│   ├── test-deployed-site.js      # Tests live deployed site
│   └── quick-deployment-check.js  # Quick health check script
├── src/
│   ├── __tests__/                 # Jest unit and integration tests
│   │   ├── Blog.test.jsx
│   │   ├── Components.test.jsx
│   │   ├── Layout.test.jsx
│   │   └── ...
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components (button, card, sheet, etc.)
│   │   ├── Layout.jsx             # Main layout wrapper with header and footer
│   │   ├── Navigation.jsx         # Top navigation with mobile hamburger menu
│   │   ├── Footer.jsx             # Site footer with social links
│   │   ├── SEO.jsx                # SEO meta tags and structured data component
│   │   └── ThemeToggle.jsx        # Dark/light theme toggle button
│   ├── pages/                     # Page components (one per route)
│   │   ├── Home.jsx               # Landing page
│   │   ├── Skills.jsx             # Skills showcase with card layout
│   │   ├── Portfolio.jsx          # Project portfolio overview
│   │   ├── DataEngineeringPortfolio.jsx  # Detailed data engineering projects
│   │   ├── Blog.jsx               # Blog post listing page
│   │   ├── BlogPost.jsx           # Individual blog post content (hardcoded posts)
│   │   └── Sitemap.jsx            # HTML sitemap page for users
│   ├── constants/
│   │   └── router.js              # React Router future flags configuration
│   ├── lib/
│   │   └── utils.js               # Utility functions (cn class merger for Tailwind)
│   ├── App.jsx                    # Main app component with React Router routes
│   ├── main.jsx                   # Application entry point (ReactDOM render)
│   ├── index.css                  # Tailwind imports and CSS variable definitions
│   ├── setupTests.js              # Jest testing environment setup
│   └── test-utils.jsx             # Custom React Testing Library wrapper
├── .gitignore                      # Git ignore patterns
├── jest.config.js                  # Jest unit test configuration
├── package.json                    # Dependencies and npm scripts
├── playwright.config.js            # Playwright E2E test configuration
├── tailwind.config.js              # Tailwind CSS configuration
├── vite.config.js                  # Vite build tool configuration
└── README.md                       # This file
```

## Deployment

This site automatically deploys to GitHub Pages when changes are pushed to the main branch.

### Deployment Pipeline (GitHub Actions)

**Workflow File:** `.github/workflows/ci-cd.yml`

**Automated Steps:**
1. **Test** - Run Jest unit tests with coverage (must meet 50% threshold)
2. **Build** - Create production bundle in `dist/` folder
   - Pre-build: Generate sitemap.xml from routes
   - Build: Vite production optimization and bundling
   - Post-build: Inject deployment metadata (version.json, commit hash)
3. **Verify** - Validate build output
   - Ensure no source files in dist/
   - Verify proper bundle references in index.html
   - Check deployment metadata exists
4. **Deploy** - Upload to GitHub Pages from `dist/` folder only
5. **Verify Deployment** - Run Playwright tests against live site
   - Check all pages load correctly
   - Verify console has no errors
   - Capture screenshots for visual verification

### GitHub Pages Configuration

- **Custom Domain:** https://christensendaniel.com (configured via `public/CNAME`)
- **Source:** `gh-pages` branch (auto-created by GitHub Actions)
- **Router Compatibility:** Uses `public/404.html` redirect for SPA routing with BrowserRouter
- **Build Output:** Only `dist/` folder is deployed (source code never deployed)

### Manual Deployment

If you need to manually deploy:

```bash
# Build the project locally
npm run build

# Verify build is correct
npm run verify-build

# Deploy manually (not recommended - use CI/CD instead)
# Push to main branch and let GitHub Actions handle deployment
```

For troubleshooting deployment issues, see [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md).

## Documentation

Detailed guides are available in the `docs/` folder:

- **[Development Guide](./docs/DEVELOPMENT.md)** - Local setup, available scripts, and development workflows
- **[Deployment Guide](./docs/DEPLOYMENT.md)** - CI/CD pipeline details and deployment process
- **[Testing Guide](./docs/TESTING.md)** - Testing strategy, running tests, and coverage requirements
- **[Architecture](./docs/ARCHITECTURE.md)** - Project structure, design decisions, and technology choices
- **[Troubleshooting](./docs/TROUBLESHOOTING.md)** - Common issues and their solutions

### GitHub Copilot Instructions

For AI-assisted development, see [`.github/copilot-instructions.md`](./.github/copilot-instructions.md) which provides comprehensive context about:
- Tech stack and configuration
- Project standards and conventions
- Common workflows and anti-patterns
- Historical context and lessons learned

## Contributing

This is a personal portfolio website. If you notice any issues or have suggestions, feel free to open an issue on GitHub.

### Development Guidelines

- **UI Components:** Use shadcn/ui only (no other UI libraries)
- **Styling:** Tailwind CSS only (no inline styles or CSS modules)
- **Router:** BrowserRouter is used (not HashRouter)
- **Accessibility:** WCAG 2.1 AA compliant (skip nav, ARIA labels, keyboard navigation)
- **Testing:** All new components require unit tests
- **Coverage:** Minimum 50% code coverage for branches, functions, lines, and statements
- **Documentation:** See `docs/suggestions/` for improvement roadmap and audit results

## License

© 2024-2026 Daniel B. Christensen. All rights reserved.

## Contact

- **Email:** contact@christensendaniel.com
- **LinkedIn:** [linkedin.com/in/dbchristensen](https://linkedin.com/in/dbchristensen)

For professional inquiries and opportunities, feel free to reach out!
