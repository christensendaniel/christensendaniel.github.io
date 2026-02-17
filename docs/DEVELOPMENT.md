# Development Guide

This guide covers local development setup and workflows for the portfolio website.

## Prerequisites

- **Node.js**: 20.x or higher
- **npm**: Comes with Node.js

## Initial Setup

1. **Clone the repository**
   ```bash
   git clone https://github.com/christensendaniel/christensendaniel.github.io.git
   cd christensendaniel.github.io
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - Visit the URL shown in terminal (typically `http://localhost:5173`)
   - The site will hot-reload as you make changes

## Available Scripts

### Development

- `npm run dev` - Start Vite development server with hot reload
- `npm run preview` - Preview production build locally

### Building

- `npm run build` - Create production build in `dist/` directory
- `npm run verify-build` - Verify build output is correct

### Testing

- `npm test` - Run all Jest tests
- `npm run test:watch` - Run tests in watch mode
- `npm run test:coverage` - Generate coverage report
- `npm run test:deployment` - Run Playwright deployment tests
- `npm run quick-check` - Quick deployment verification

### Verification

- `npm run test:deployed-site` - Test the live deployed site
- `npm run verify-deployment` - Verify deployment URLs

## Project Structure

```
christensendaniel.github.io/
├── src/
│   ├── components/        # Reusable React components
│   │   ├── ui/           # shadcn/ui components
│   │   ├── Layout.jsx    # Main layout wrapper
│   │   ├── Navigation.jsx
│   │   └── Footer.jsx
│   ├── pages/            # Page components
│   │   ├── Home.jsx
│   │   ├── Portfolio.jsx
│   │   ├── Skills.jsx
│   │   ├── Blog.jsx
│   │   └── BlogPost.jsx
│   ├── lib/              # Utility functions
│   ├── constants/        # Constants and configuration
│   ├── __tests__/        # Test files
│   ├── App.jsx           # Main app component
│   └── main.jsx          # Entry point
├── public/               # Static assets
│   ├── blog/            # Blog posts (markdown)
│   └── CNAME            # Custom domain configuration
├── docs/                 # 📚 Project documentation
├── scripts/              # Build and deployment scripts
├── .github/workflows/    # GitHub Actions CI/CD
├── index.html           # HTML entry point
├── vite.config.js       # Vite configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── jest.config.js       # Jest test configuration
└── package.json         # Dependencies and scripts
```

## Code Organization

### Components

- **UI Components** (`src/components/ui/`) - shadcn/ui component library
- **Layout Components** (`src/components/`) - Page structure (Layout, Navigation, Footer)
- **Page Components** (`src/pages/`) - Full page views

### Styling

- **Framework**: Tailwind CSS for utility-first styling
- **Components**: shadcn/ui for pre-built accessible components
- **Theme**: CSS variables for theming in `src/index.css`
- **Responsive**: Mobile-first approach with Tailwind breakpoints

### Routing

- Uses React Router v6 with `BrowserRouter` for clean URLs
- Routes defined in `src/App.jsx`
- Clean URLs (e.g., `/skills`) with GitHub Pages compatibility via `404.html` redirect

## Adding New Features

### Creating a New Page

1. **Create page component** in `src/pages/YourPage.jsx`:
   ```jsx
   import React from 'react'
   import Layout from '../components/Layout'

   function YourPage() {
     return (
       <Layout>
         <div className="container mx-auto px-4 py-8">
           <h1 className="text-4xl font-bold">Your Page</h1>
           {/* Your content */}
         </div>
       </Layout>
     )
   }

   export default YourPage
   ```

2. **Add route** in `src/App.jsx`:
   ```jsx
   import YourPage from './pages/YourPage'
   
   // In the Routes component
   <Route path="/your-page" element={<YourPage />} />
   ```

3. **Add navigation link** in `src/components/Navigation.jsx`

4. **Create tests** in `src/__tests__/YourPage.test.jsx`

### Adding a shadcn/ui Component

The project uses shadcn/ui components. To add a new component:

1. Browse available components at https://ui.shadcn.com/
2. Components are already configured and can be imported from `src/components/ui/`
3. Example usage:
   ```jsx
   import { Button } from '../components/ui/button'
   import { Card, CardContent } from '../components/ui/card'
   ```

### Styling Guidelines

- Use Tailwind utility classes for styling
- Follow mobile-first responsive design
- Use semantic HTML elements
- Maintain accessibility with proper ARIA labels
- Keep consistent spacing using Tailwind's spacing scale

### State Management

- Use React hooks (`useState`, `useEffect`) for local state
- Use context for theme management (if needed)
- No external state management library currently

## Development Workflow

1. **Create a new branch** for your changes
   ```bash
   git checkout -b feature/your-feature
   ```

2. **Make your changes** and test locally

3. **Run tests** to ensure nothing breaks
   ```bash
   npm test
   ```

4. **Build and verify**
   ```bash
   npm run build
   npm run verify-build
   ```

5. **Commit your changes**
   ```bash
   git add .
   git commit -m "Description of changes"
   ```

6. **Push and create PR**
   ```bash
   git push origin feature/your-feature
   ```

## Common Development Tasks

### Updating Dependencies

```bash
# Check for outdated packages
npm outdated

# Update a specific package
npm update package-name

# Update all packages (use with caution)
npm update
```

### Debugging

- **Browser DevTools**: Use React DevTools extension
- **Console Logs**: Check browser console for errors
- **Vite Logs**: Check terminal for build/server errors
- **Test Output**: Use `npm test -- --verbose` for detailed test output

### Performance

- Vite provides fast HMR (Hot Module Replacement)
- Production builds are optimized automatically
- Use Lighthouse for performance audits

## Environment Variables

Currently, no environment variables are needed for local development. The site uses:

- `GIT_COMMIT_HASH` - Set by CI/CD for deployment tracking
- `GIT_BRANCH` - Set by CI/CD for deployment tracking

## Troubleshooting

See [TROUBLESHOOTING.md](./TROUBLESHOOTING.md) for common issues and solutions.
