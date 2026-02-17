# Deployment Workflow Documentation

This document describes the comprehensive CI/CD workflow for deploying the React site to GitHub Pages.

## Overview

The deployment workflow consists of four main stages:
1. **Test** - Run all Jest tests
2. **Build and Verify** - Build the project and verify build artifacts
3. **Deploy** - Deploy to GitHub Pages
4. **Verify Deployment** - Verify the deployed site is working correctly

## Pre-Deployment Checks

### Build Verification (`scripts/verify-build.js`)

Before deployment, the build verification script checks:

1. ✅ **dist directory exists** - Ensures the build output directory is created
2. ✅ **index.html present** - Verifies the main HTML file exists
3. ✅ **Root div exists** - Checks for `<div id="root">` in index.html
4. ✅ **Script tags present** - Ensures JavaScript is bundled
5. ✅ **Assets directory** - Verifies assets are bundled correctly
6. ✅ **JavaScript files** - Confirms JS bundles exist
7. ✅ **CSS files** - Confirms CSS bundles exist
8. ✅ **package.json configuration** - Validates build script exists
9. ✅ **vite.config.js base path** - Ensures base path is '/' for username.github.io repos
10. ✅ **CNAME file** - Verifies CNAME is copied to dist for custom domain

**Run locally:**
```bash
npm run build
npm run verify-build
```

## Configuration

### Base Path (vite.config.js)

For `username.github.io` repositories (like this one), the base path should be `'/'`:

```javascript
export default defineConfig({
  base: '/',  // Correct for username.github.io repos
  // ...
})
```

For project repositories (e.g., `username.github.io/project`), use:
```javascript
base: '/project/',  // For project repos
```

### Router Configuration

The app uses `BrowserRouter` from React Router for clean URLs:

```javascript
import { BrowserRouter as Router } from 'react-router-dom'
```

**Why BrowserRouter?**
- ✅ Clean, SEO-friendly URLs (e.g., `/skills` not `/#/skills`)
- ✅ Better user experience - professional, shareable links
- ✅ Modern SPA routing standard
- ✅ Works with GitHub Pages via `404.html` redirect hack

**GitHub Pages SPA Routing Compatibility:**

Since GitHub Pages is a static host without server-side routing, we use a `public/404.html` file that redirects to `index.html` with the original path preserved. The main HTML file then restores the correct route. This allows BrowserRouter to function properly on GitHub Pages.

Key files:
- `public/404.html` - Redirects unknown routes to index.html
- `index.html` - Contains JavaScript to restore the original path from query params

### Custom Domain

The custom domain `christensendaniel.com` is configured via:
1. CNAME file in `/public/CNAME` (automatically copied to dist)
2. DNS CNAME record pointing to `christensendaniel.github.io`
3. GitHub Pages custom domain setting

## Deployment Workflow

### Job 1: Test
- Installs dependencies
- Runs Jest tests with React Testing Library
- Must pass before deployment proceeds

### Job 2: Build and Verify
- Builds the project with Vite
- Runs build verification script
- Lists build artifacts for debugging
- Uploads build artifacts to GitHub Actions

### Job 3: Deploy
- Downloads build artifacts
- Deploys to gh-pages branch using peaceiris/actions-gh-pages
- Configures CNAME for custom domain
- Waits 30 seconds for GitHub Pages to update

### Job 4: Verify Deployment
- Checks deployment URLs (both custom domain and github.io)
- Captures screenshots with Playwright
- Detects console errors
- Uploads screenshots as artifacts
- Generates deployment report
- Adds summary to GitHub Actions

## Post-Deployment Verification

### URL Check (`scripts/verify-deployment.js`)

Verifies both deployment URLs:
- https://christensendaniel.com (custom domain)
- https://christensendaniel.github.io (GitHub Pages URL)

Checks for:
- ✅ HTTP 200 status code
- ✅ Expected content (root div, script tags)
- ✅ No 404 error indicators

**Run locally:**
```bash
npm run verify-deployment
```

### Screenshot Capture (`scripts/capture-screenshots.js`)

Uses Playwright to:
- Capture full-page screenshots of all major pages
- Detect console errors in browser
- Generate summary report
- Save screenshots for visual verification

Pages captured:
- Home (/)
- Skills (/#/skills)
- Blog (/#/blog)
- Portfolio (/#/portfolio)

**Run locally:**
```bash
# After deploying
node scripts/capture-screenshots.js
```

### PR Comments (`scripts/generate-pr-comment.js`)

Automatically comments on PRs with:
- Deployment status
- HTTP status codes
- Console error counts
- Links to screenshot artifacts
- Deployment URLs

## Debugging

### Common Issues

#### Issue: Site shows blank page
**Check:**
1. Browser console for errors
2. Base path in vite.config.js
3. Router configuration (should use HashRouter)
4. Build artifacts include all necessary files

#### Issue: 404 on navigation
**Solution:**
- Ensure using HashRouter (not BrowserRouter)
- HashRouter works without server configuration

#### Issue: Assets not loading
**Check:**
1. Asset paths in index.html (should be relative or use correct base)
2. vite.config.js `assetsDir` configuration
3. Public folder files are copied to dist

#### Issue: Custom domain not working
**Check:**
1. CNAME file exists in dist
2. DNS CNAME record configured
3. GitHub Pages custom domain setting
4. Wait time after DNS changes (can take 24-48 hours)

### Logs and Artifacts

The workflow provides detailed logging:
- ✅ Step-by-step progress with emojis
- ✅ Build artifact listing
- ✅ Verification results
- ✅ Screenshot summaries

Artifacts available for download:
- `build-artifacts` - The built site (7 days retention)
- `deployment-screenshots` - Screenshots from all pages (30 days retention)

### Manual Verification

After deployment, manually verify:
1. Visit https://christensendaniel.com
2. Check browser console for errors
3. Navigate to all pages (/, /#/skills, /#/blog, /#/portfolio)
4. Verify custom domain works
5. Test on different browsers/devices

## Scripts Reference

| Script | Description |
|--------|-------------|
| `npm run build` | Build the project |
| `npm run verify-build` | Verify build output |
| `npm run verify-deployment` | Check deployment URLs |
| `node scripts/capture-screenshots.js` | Capture screenshots |
| `node scripts/generate-pr-comment.js` | Generate PR comment |

## Workflow Triggers

The workflow runs on:
- Push to `main` branch - Full test, build, deploy, verify
- Pull requests to `main` - Test only (no deployment)

## Security

- Uses `GITHUB_TOKEN` for deployment (no manual token needed)
- Playwright runs in isolated browser context
- No sensitive data exposed in logs
- Screenshots stored as artifacts (not committed)

## Troubleshooting Workflow Failures

1. **Test failures**: Check Jest test output in workflow logs
2. **Build failures**: Review Vite build output, check for dependency issues
3. **Verification failures**: Check verify-build.js output for specific errors
4. **Deployment failures**: Review peaceiris/actions-gh-pages logs
5. **Screenshot failures**: Check Playwright logs, may be timeout or URL issues

For any issues, check the detailed logs in GitHub Actions or run the scripts locally for debugging.
