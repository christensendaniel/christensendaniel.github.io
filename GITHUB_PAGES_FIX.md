# GitHub Pages Deployment Fix

## Problem
The website at https://christensendaniel.com was serving **source files** instead of **compiled build files**, resulting in a blank screen. The site was referencing `/src/main.jsx` (raw source code) instead of the compiled `/assets/index-*.js` bundle.

## Root Cause
GitHub Pages was configured to deploy from the **wrong source**. It was likely set to deploy from the `main` branch root directory instead of from the `gh-pages` branch where the compiled build artifacts are pushed.

## Solution

### 1. Workflow Configuration (COMPLETED ✅)

The `.github/workflows/ci-cd.yml` workflow has been updated to:

```yaml
- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v4
  with:
    github_token: ${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./dist          # ✅ Deploys ONLY the dist/ build folder
    cname: christensendaniel.com # ✅ Maintains custom domain
    force_orphan: true           # ✅ NEW: Ensures clean gh-pages branch
```

The `force_orphan: true` option ensures that each deployment creates a clean gh-pages branch without commit history, preventing any conflicts or stale files.

### 2. GitHub Pages Settings (MANUAL STEP REQUIRED ⚠️)

**CRITICAL:** You must configure GitHub Pages to deploy from the correct source:

1. Go to: https://github.com/christensendaniel/christensendaniel.github.io/settings/pages

2. Under "Build and deployment" > "Source":
   - **Select:** "Deploy from a branch"
   
3. Under "Branch":
   - **Branch:** `gh-pages`
   - **Folder:** `/ (root)`
   - Click "Save"

**DO NOT** set it to:
- ❌ `main` branch
- ❌ `main` branch `/docs` folder
- ❌ Any other configuration

### 3. How It Works

```
┌─────────────────────────────────────────────────────────────┐
│                      Deployment Flow                         │
└─────────────────────────────────────────────────────────────┘

1. Push to main branch
   ↓
2. CI/CD Workflow runs:
   - npm ci (install dependencies)
   - npm run build (compile React app)
   - Builds to dist/ directory
   ↓
3. Generated files in dist/:
   - index.html (with compiled bundle refs)
   - assets/index-[hash].js (compiled React)
   - assets/index-[hash].css (compiled styles)
   - CNAME (custom domain)
   - version.json (deployment metadata)
   ↓
4. peaceiris/actions-gh-pages action:
   - Pushes ONLY dist/ contents to gh-pages branch
   - Creates .nojekyll file
   - force_orphan: true (clean branch)
   ↓
5. GitHub Pages:
   - Deploys from gh-pages branch
   - Serves compiled files at christensendaniel.com
```

### 4. Verification

After the workflow runs and deploys:

```bash
# Quick check (from local machine)
npm run quick-check

# Expected output:
# ✅ Has compiled JS bundle (/assets/index-*.js)
# ✅ Has compiled CSS bundle  
# ✅ Does NOT reference /src/main.jsx
```

Visit https://christensendaniel.com and check browser console:
- ✅ Should see: `/assets/index-[hash].js` loading
- ❌ Should NOT see: `/src/main.jsx` errors
- ✅ Page should render content (not blank)

### 5. What Changed

| Before | After |
|--------|-------|
| ❌ GitHub Pages source: `main` branch root | ✅ GitHub Pages source: `gh-pages` branch |
| ❌ Serving: `index.html` with `/src/main.jsx` | ✅ Serving: compiled `index.html` with `/assets/index-*.js` |
| ❌ Result: Blank screen (JSX can't run in browser) | ✅ Result: Working site with compiled React |
| ❌ Missing: `force_orphan` in workflow | ✅ Added: `force_orphan: true` for clean deploys |

## Troubleshooting

### If site still shows blank screen after fix:

1. **Verify GitHub Pages source settings** (see step 2 above)
2. **Clear browser cache**: Ctrl+Shift+R (hard refresh)
3. **Wait 2-5 minutes** for GitHub Pages to propagate changes
4. **Check workflow ran successfully**:
   - Go to: https://github.com/christensendaniel/christensendaniel.github.io/actions
   - Latest "CI/CD Pipeline" run should be ✅ green
5. **Inspect gh-pages branch**:
   ```bash
   git fetch origin gh-pages
   git checkout gh-pages
   ls -la
   # Should see: index.html, assets/, CNAME, .nojekyll
   # Should NOT see: src/, package.json, vite.config.js
   cat index.html | grep "assets/index"
   # Should show: <script type="module" crossorigin src="/assets/index-[hash].js">
   ```

### If quick-check still fails:

```bash
# View the actual HTML being served
curl -s https://christensendaniel.com | grep -o 'src="[^"]*"' | head -5

# Should show:
# src="/assets/index-[hash].js"

# Should NOT show:  
# src="/src/main.jsx"
```

## Summary

The deployment was fixed by:
1. ✅ Ensuring workflow builds (`npm run build`) before deploy
2. ✅ Ensuring workflow deploys from `./dist` directory  
3. ✅ Adding `force_orphan: true` for clean deployments
4. ⚠️ **REQUIRES MANUAL**: Configuring GitHub Pages to deploy from `gh-pages` branch

Once GitHub Pages settings are updated to use the `gh-pages` branch, the site will serve the compiled build files and render correctly.
