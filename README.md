# Daniel Christensen - Portfolio Website

Professional portfolio showcasing data engineering expertise, projects, and technical insights.

🔗 **Live Site:** https://christensendaniel.com/

## About

This is the portfolio website for Daniel B. Christensen, a Senior Data Engineer with 7+ years of experience building scalable data pipelines, real-time streaming architectures, and cloud-native solutions. The site features a comprehensive overview of professional experience, technical skills, featured projects, and a technical blog sharing insights on data engineering best practices.

## Features

- **Professional Profile** - Detailed overview of experience and expertise
- **Project Portfolio** - Showcase of real-world data engineering projects
- **Technical Skills** - Comprehensive list of technologies and competencies
- **Blog** - Technical articles on data engineering, performance optimization, and cloud cost reduction
- **Responsive Design** - Optimized for all device sizes
- **Fast Performance** - Built with modern tooling for optimal load times

## Tech Stack

- **Framework:** React 18 + Vite
- **Routing:** React Router v6 (HashRouter for GitHub Pages)
- **UI Components:** shadcn/ui
- **Styling:** Tailwind CSS
- **Deployment:** GitHub Pages with automated CI/CD
- **Testing:** Jest + React Testing Library + Playwright

## Local Development

### Prerequisites
- Node.js 20.x or higher
- npm

### Setup

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Open http://localhost:5173
```

### Build

```bash
# Create production build
npm run build

# Preview production build
npm run preview
```

### Testing

```bash
# Run unit tests
npm test

# Run with coverage
npm test -- --coverage

# Run deployment verification
npm run quick-check
```

## Deployment

This site automatically deploys to GitHub Pages via GitHub Actions when changes are pushed to the main branch.

The workflow:
1. Runs all tests
2. Builds the production bundle
3. Deploys to GitHub Pages
4. Verifies deployment success

For more details, see [docs/DEPLOYMENT.md](./docs/DEPLOYMENT.md).

## Project Structure

```
├── src/
│   ├── components/     # React components
│   ├── pages/          # Page components
│   ├── lib/            # Utilities
│   └── __tests__/      # Test files
├── public/             # Static assets
├── docs/               # 📚 Project documentation
│   ├── DEVELOPMENT.md
│   ├── DEPLOYMENT.md
│   ├── TESTING.md
│   ├── ARCHITECTURE.md
│   └── TROUBLESHOOTING.md
└── .github/workflows/  # CI/CD configuration
```

## Documentation

- [Development Guide](./docs/DEVELOPMENT.md) - Local setup and development workflow
- [Deployment Guide](./docs/DEPLOYMENT.md) - Deployment process and CI/CD details
- [Testing Guide](./docs/TESTING.md) - Testing strategy and how to run tests
- [Architecture](./docs/ARCHITECTURE.md) - Project structure and design decisions
- [Troubleshooting](./docs/TROUBLESHOOTING.md) - Common issues and solutions

## License

© 2024 Daniel B. Christensen

## Contact

Connect with me on [LinkedIn](https://linkedin.com/in/dbchristensen) for professional inquiries and opportunities.
