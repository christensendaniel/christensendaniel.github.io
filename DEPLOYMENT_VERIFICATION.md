# Deployment Verification & Console Error Monitoring

This document describes the comprehensive deployment verification system that tracks deployments and monitors console errors.

## Overview

The deployment verification system consists of three main components:

1. **Deployment Metadata Injection** - Embeds git commit hash and build info into the build
2. **Playwright Deployment Tests** - Verifies the deployed site and captures console errors
3. **GitHub Actions Integration** - Automates verification on every deployment

## Deployment Metadata

### How It Works

During the build process:

1. **Git Information Capture**: The system captures the current git commit hash and branch
2. **Meta Tag Injection**: A Vite plugin injects a `<meta name="deployment-hash">` tag into index.html
3. **Version.json Generation**: A script creates a `version.json` file with complete deployment metadata
4. **Runtime Access**: The deployment hash is also available via `window.__DEPLOYMENT_HASH__`

### Files Created During Build

#### `dist/version.json`
```json
{
  "commitHash": "abc123...",
  "commitHashShort": "abc123",
  "branch": "main",
  "buildTimestamp": "2024-01-01T12:00:00.000Z",
  "deploymentUrl": "https://christensendaniel.com",
  "buildDate": "2024-01-01",
  "buildTime": "12:00:00"
}
```

#### `dist/index.html` (additions)
```html
<meta name="deployment-hash" content="abc123...">
<script>window.__DEPLOYMENT_HASH__ = "abc123...";</script>
```

### Environment Variables

The build process uses these environment variables:

- `GIT_COMMIT_HASH` - The full commit hash (set by GitHub Actions)
- `GIT_BRANCH` - The branch name (set by GitHub Actions)
- `DEPLOYMENT_URL` - The deployment URL (defaults to https://christensendaniel.com)

## Playwright Deployment Verification

### Test Suite: `playwright/deployment-verification.spec.js`

This comprehensive test suite runs after each deployment to verify:

1. **Site Accessibility**
   - Verifies the site returns HTTP 200
   - Confirms the React app root element is visible

2. **Deployment Hash Verification**
   - Extracts deployment hash from meta tag
   - Fetches and verifies version.json
   - Compares against expected hash (from GitHub Actions)
   - Logs: "Verified deployment of commit [hash] is live"

3. **Console Error Monitoring**
   - Captures all console events (errors, warnings, logs)
   - Categorizes errors by type (404s, React warnings, network errors, etc.)
   - Takes screenshots when errors occur
   - Saves detailed report to test-results/

### Running Locally

To test the deployment verification locally:

```bash
# Build the project
npm run build

# Start preview server
npm run preview

# In another terminal, run the deployment verification
DEPLOYMENT_URL=http://localhost:4173 npm run test:deployment
```

### Error Categories

The test categorizes console errors into:

1. **404 Errors** - Missing assets (images, fonts, CSS, JS files)
2. **React Warnings** - Missing keys, prop types, deprecated APIs
3. **Network Errors** - Failed API calls, resource loading failures
4. **JavaScript Errors** - Runtime errors, exceptions
5. **Other** - Uncategorized errors

### Filtering External Resources

The test automatically filters out expected failures from:
- Google Fonts (googleapis.com, gstatic.com)
- Google Analytics
- Other third-party CDNs

These are often blocked in test environments but work correctly in production.

## GitHub Actions Integration

### Workflow Updates

The CI/CD workflow (`ci-cd.yml`) has been enhanced with:

#### Build Job
- Captures git commit hash before build
- Sets environment variables during build
- Verifies deployment metadata exists
- Outputs commit hash for later jobs

#### Deploy Job
- Deploys build artifacts to GitHub Pages
- Waits 30 seconds for propagation

#### Verify Deployment Job
- Waits 60 seconds for GitHub Pages to fully update
- Runs Playwright deployment verification test
- Uploads console logs as artifacts
- Uploads error screenshots as artifacts

### Artifacts Generated

After each deployment, the following artifacts are available:

1. **console-logs** (`.txt` files)
   - Detailed console log reports
   - Categorized errors and warnings
   - Timestamps and locations

2. **error-screenshots** (`.png` files)
   - Full-page screenshots taken when errors occur
   - Named by route (e.g., `error--#-skills.png`)

3. **deployment-screenshots** (legacy)
   - Screenshots from the old verification script
   - Will be deprecated in favor of error-screenshots

### Workflow Example

```yaml
- name: Run deployment verification test
  env:
    DEPLOYMENT_URL: https://christensendaniel.com
    GIT_COMMIT_HASH: ${{ needs.build-and-verify.outputs.commit_hash }}
  run: |
    echo "🔍 Verifying deployment of commit ${{ needs.build-and-verify.outputs.commit_hash }}"
    npm run test:deployment

- name: Upload console logs
  if: always()
  uses: actions/upload-artifact@v4
  with:
    name: console-logs
    path: test-results/console-*.txt

- name: Upload error screenshots
  if: always()
  uses: actions/upload-artifact@v4
  with:
    name: error-screenshots
    path: test-results/screenshots/
```

## Console Error Fixes Applied

### Current Status: ✅ No Console Errors

After thorough testing, the following was verified:

1. **Favicon** ✅ - Exists at `/favicon.svg` and loads correctly
2. **Static Files** ✅ - All blog, portfolio, and skills HTML files are in `public/`
3. **React Keys** ✅ - All `.map()` operations have proper `key` props
4. **Asset Paths** ✅ - All assets use correct paths and are copied to dist
5. **Router** ✅ - HashRouter is used (correct for GitHub Pages)
6. **Google Fonts** ⏭️ - Blocked in test environment, works in production

### Verified Routes

All routes tested without errors:
- `/` - Home page
- `/#/skills` - Skills page
- `/#/blog` - Blog listing
- `/#/portfolio` - Portfolio page
- `/#/blog/2025-08-31-hello-world` - Blog post

## Scripts Reference

| Script | Description |
|--------|-------------|
| `npm run build` | Build with deployment metadata |
| `npm run test:deployment` | Run Playwright deployment verification |
| `node scripts/check-console-errors.js` | Check local preview for console errors |
| `node scripts/generate-version.js` | Generate version.json (auto-run during build) |

## Configuration Files

### `vite.config.js`
- Added `deploymentMetaPlugin()` to inject deployment hash
- Configured for GitHub Pages deployment

### `package.json`
- Updated build script to include version generation
- Added `test:deployment` script

### `playwright.config.js`
- Configured for deployment verification
- Sets base URL from environment variable

## Monitoring & Debugging

### Viewing Console Logs

After a deployment, download the `console-logs` artifact from GitHub Actions:

1. Go to the workflow run
2. Scroll to the bottom to "Artifacts"
3. Download `console-logs`
4. Open the `.txt` file to see detailed error reports

### Reading Error Reports

The console log report includes:

```
================================================================================
CONSOLE LOG REPORT
================================================================================

Deployment URL: https://christensendaniel.com
Test Date: 2024-01-01T12:00:00.000Z
Expected Hash: abc123...

SUMMARY:
--------------------------------------------------------------------------------
Total Errors: 0
Total Warnings: 0
Total Info: 0
Total Logs: 2

[Categorized errors follow...]
```

### Debugging Failed Deployments

If deployment verification fails:

1. Check the `console-logs` artifact for specific errors
2. Look at `error-screenshots` to see visual state when errors occurred
3. Verify the deployment hash matches in GitHub Actions logs
4. Check if GitHub Pages has fully propagated (may need longer wait time)

## Future Enhancements

Potential improvements:
- [ ] Performance monitoring (page load times, bundle sizes)
- [ ] Accessibility testing integration
- [ ] Visual regression testing
- [ ] Automated rollback on verification failure
- [ ] Slack/email notifications on deployment verification
- [ ] Comparison with previous deployment's console logs

## Troubleshooting

### Test Fails with "net::ERR_BLOCKED_BY_CLIENT"

This is expected in test environments. The test automatically filters out:
- Google Fonts
- Analytics scripts
- Other third-party CDNs

These work correctly in production.

### Deployment Hash Doesn't Match

If the deployment hash verification fails:

1. Check if the build included the metadata (verify `dist/version.json` exists)
2. Ensure GitHub Actions passed the correct `GIT_COMMIT_HASH`
3. Verify GitHub Pages has updated (may need to wait longer)
4. Check if CDN/cache is serving old version

### Screenshots Not Generated

Screenshots are only taken when errors occur. If there are no errors, no screenshots will be generated.

## Best Practices

1. **Always check console logs** after deployment, even if tests pass
2. **Review error categories** to identify patterns
3. **Address errors incrementally** rather than ignoring them
4. **Keep the error count at zero** to catch new issues quickly
5. **Update filters** if new third-party services are added

## Contact

For issues or questions about the deployment verification system, check the repository issues or documentation.
