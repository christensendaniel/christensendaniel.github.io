# Scripts Directory

This directory contains automation scripts for building, verifying, and deploying the website.

## Build Scripts

### `generate-version.js`
Generates deployment metadata for version tracking.

**Usage:**
```bash
node scripts/generate-version.js
```

**Output:** Creates `dist/version.json` with:
- Git commit hash (full and short)
- Branch name
- Build timestamp
- Deployment URL

**Auto-run:** This script runs automatically after `npm run build`

### `vite-plugin-deployment-meta.js`
Vite plugin that injects deployment metadata into the HTML build.

**Features:**
- Adds `<meta name="deployment-hash">` tag to index.html
- Injects `window.__DEPLOYMENT_HASH__` for runtime access
- Logs deployment hash during build

**Usage:** Automatically used by vite.config.js during build

## Verification Scripts

### `verify-build.js`
Verifies the build output is correct before deployment.

**Usage:**
```bash
npm run verify-build
```

**Checks:**
- dist directory exists
- index.html has root div and script tags
- Assets directory has JS and CSS files
- Configuration files are correct
- CNAME file is copied
- version.json exists

### `verify-deployment.js`
Verifies the deployed site is accessible.

**Usage:**
```bash
npm run verify-deployment
```

**Checks:**
- Site returns HTTP 200
- Expected content is present
- No 404 indicators

### `check-console-errors.js`
Tests the local preview for console errors using Playwright.

**Usage:**
```bash
# Start preview server first
npm run preview

# In another terminal
node scripts/check-console-errors.js
```

**Features:**
- Tests all major routes
- Captures console errors, warnings, and logs
- Filters out expected external resource failures
- Categorizes errors by type
- Exits with error code if issues found

## Deployment Scripts

### `capture-screenshots.js`
Captures screenshots of the deployed site using Playwright.

**Usage:**
```bash
DEPLOYMENT_URL=https://christensendaniel.com node scripts/capture-screenshots.js
```

**Output:** Screenshots saved to `screenshots/` directory

### `generate-pr-comment.js`
Generates a formatted comment for pull requests with deployment status.

**Usage:**
```bash
node scripts/generate-pr-comment.js
```

**Output:** Creates `screenshots/pr-comment.md` for GitHub Actions to post

## Quick Reference

| Script | When to Use | Auto-run |
|--------|-------------|----------|
| `generate-version.js` | After build | ✅ Yes (via npm run build) |
| `vite-plugin-deployment-meta.js` | During build | ✅ Yes (via Vite plugin) |
| `verify-build.js` | Before deployment | ✅ Yes (in CI/CD) |
| `verify-deployment.js` | After deployment | ✅ Yes (in CI/CD) |
| `check-console-errors.js` | During development | ❌ Manual |
| `capture-screenshots.js` | After deployment | ✅ Yes (in CI/CD) |
| `generate-pr-comment.js` | For pull requests | ✅ Yes (in CI/CD) |

## Environment Variables

Scripts may use these environment variables:

- `GIT_COMMIT_HASH` - Full git commit hash
- `GIT_BRANCH` - Current git branch
- `DEPLOYMENT_URL` - Target deployment URL (default: https://christensendaniel.com)

## Error Handling

All scripts:
- Exit with code 0 on success
- Exit with code 1 on failure
- Log progress with emoji indicators (🔍, ✅, ❌, ⚠️, etc.)
- Provide detailed error messages

## Adding New Scripts

When adding new scripts:
1. Follow the existing naming convention (kebab-case)
2. Add a shebang line: `#!/usr/bin/env node`
3. Use ES modules (import/export)
4. Include error handling
5. Add logging with emoji indicators
6. Update this README
7. Add to package.json scripts if appropriate

## Troubleshooting

### Script fails with "command not found"
Make sure dependencies are installed:
```bash
npm ci
```

### Permission denied
Scripts are designed to be run with Node.js:
```bash
node scripts/script-name.js
```

Not as executable files:
```bash
# Don't do this
./scripts/script-name.js
```

### Playwright errors
Install Playwright browsers:
```bash
npx playwright install chromium
```
