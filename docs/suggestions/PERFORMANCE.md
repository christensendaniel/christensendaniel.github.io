# Performance Audit Report

**Site:** https://christensendaniel.com  
**Audit Date:** February 17, 2026  
**Focus:** Core Web Vitals & Load Performance

## Executive Summary

The site demonstrates excellent foundational performance practices including code splitting, lazy loading, and a modern build setup with Vite. However, there are **11 optimization opportunities** that could further improve Core Web Vitals metrics and overall user experience, particularly around font loading, bundle analysis, and image optimization for future content.

---

## Core Web Vitals Targets

| Metric | Target | Current Status | Assessment |
|--------|---------|----------------|------------|
| LCP (Largest Contentful Paint) | < 2.5s | Unknown (needs measurement) | Likely good due to minimal above-fold content |
| FID (First Input Delay) | < 100ms | Likely excellent | React with minimal JS execution |
| CLS (Cumulative Layout Shift) | < 0.1 | Needs verification | Fonts may cause shift |
| TTFB (Time to First Byte) | < 800ms | Depends on GitHub Pages | Static hosting should be fast |

---

## High Impact Issues

### 1. Web Fonts Blocking Render
**Impact:** High  
**Metric Affected:** LCP, TTFB  
**Current State:** Loading Google Fonts (Inter and JetBrains Mono) from external CDN in `index.html` lines 12-15.
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

**Suggested Fix:**
Option 1 - Use system fonts (fastest):
```css
/* In src/index.css or tailwind.config.js */
font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, 
             "Helvetica Neue", Arial, sans-serif;
```

Option 2 - Self-host fonts (recommended):
1. Download fonts from Google Fonts
2. Add to `/public/fonts/` directory
3. Update `src/index.css`:
```css
/* Self-hosted fonts */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 300 700;
  font-display: swap;
  src: url('/fonts/inter-var.woff2') format('woff2');
}

@font-face {
  font-family: 'JetBrains Mono';
  font-style: normal;
  font-weight: 400 500;
  font-display: swap;
  src: url('/fonts/jetbrains-mono-var.woff2') format('woff2');
}
```

4. Remove Google Fonts links from `index.html`

**Expected Improvement:** 
- Reduce TTFB by ~200-300ms
- Eliminate render-blocking external resource
- Reduce CLS by using `font-display: swap`

### 2. No Bundle Size Analysis
**Impact:** High  
**Metric Affected:** LCP, Bundle Size  
**Current State:** No visibility into what's included in the production bundle or opportunities for tree-shaking.

**Suggested Fix:**
Add bundle analysis to `package.json`:
```json
{
  "scripts": {
    "analyze": "vite build --mode analyze",
    "build:analyze": "npm run build && npx vite-bundle-visualizer"
  },
  "devDependencies": {
    "rollup-plugin-visualizer": "^5.12.0"
  }
}
```

Update `vite.config.js`:
```javascript
import { visualizer } from 'rollup-plugin-visualizer'

export default defineConfig({
  plugins: [
    react(),
    deploymentMetaPlugin(),
    // Add bundle analyzer
    process.env.ANALYZE && visualizer({
      open: true,
      filename: 'dist/stats.html',
      gzipSize: true,
      brotliSize: true,
    })
  ],
  build: {
    outDir: 'dist',
    sourcemap: false, // Disable for production
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui-components': [
            '@radix-ui/react-dialog',
            'lucide-react',
          ],
        },
      },
    },
  },
})
```

**Expected Improvement:** 
- Identify bloat and optimize bundle size
- Potential 20-30% reduction in total bundle size
- Better code splitting strategy

### 3. Unused CSS in Public Assets
**Impact:** Medium  
**Metric Affected:** Bundle Size, LCP  
**Current State:** Public folder contains old CSS files that may not be used:
- `public/assets/css/portfolio.css`
- `public/assets/css/style.css`
- `public/assets/css/skills.css`
- `public/assets/css/blog.css`
- `public/assets/js/main.js`

**Suggested Fix:**
Verify these files are not referenced in the build, then delete them:
```bash
# Check if referenced
grep -r "assets/css" dist/
grep -r "assets/js/main.js" dist/

# If not found, remove from repo
rm -rf public/assets/css/
rm -rf public/assets/js/
```

Update `.gitignore` to prevent accidental re-addition:
```
# Old static assets
public/assets/css/
public/assets/js/
```

**Expected Improvement:** 
- Cleaner repository
- Faster git operations
- No impact if unused, but prevents confusion

### 4. No Resource Preloading
**Impact:** Medium  
**Metric Affected:** LCP  
**Current State:** Critical resources not preloaded in `index.html`.

**Suggested Fix:**
Add to `index.html` `<head>`:
```html
<!-- Preload critical fonts -->
<link rel="preload" href="/fonts/inter-var.woff2" as="font" type="font/woff2" crossorigin>

<!-- Preload critical CSS -->
<link rel="preload" href="/src/index.css" as="style">

<!-- DNS prefetch for external resources if needed -->
<link rel="dns-prefetch" href="https://www.google-analytics.com">
```

**Expected Improvement:** 
- Faster font loading
- Reduced font-swap flash
- 50-100ms improvement in LCP

---

## Medium Impact Issues

### 5. React.lazy Could Be Extended
**Impact:** Medium  
**Metric Affected:** FID, Bundle Size  
**Current State:** App.jsx uses lazy loading for most pages but not for utility components.

**Suggested Fix:**
Consider lazy loading heavy components within pages:
```jsx
// In pages with large components
const HeavyChart = lazy(() => import('../components/HeavyChart'))
const DataVisualization = lazy(() => import('../components/DataVisualization'))

// Use with Suspense
<Suspense fallback={<div>Loading chart...</div>}>
  <HeavyChart data={data} />
</Suspense>
```

Currently the site doesn't have heavy components, but prepare for future additions.

**Expected Improvement:** 
- Keep initial bundle small as site grows
- Faster TTI (Time to Interactive)

### 6. No Image Optimization Strategy
**Impact:** Medium  
**Metric Affected:** LCP, Bundle Size  
**Current State:** Site uses emojis instead of images (clever!), but when images are added, there's no optimization strategy.

**Suggested Fix:**
Create image optimization guidelines and helper:

1. Add image optimization package:
```bash
npm install --save-dev @squoosh/lib
```

2. Create image component `src/components/OptimizedImage.jsx`:
```jsx
import React from 'react'

export function OptimizedImage({ 
  src, 
  alt, 
  width, 
  height, 
  className,
  priority = false 
}) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      // Prevent layout shift
      style={{ aspectRatio: `${width} / ${height}` }}
    />
  )
}
```

3. Guidelines for adding images:
- Use WebP format with JPEG fallback
- Serve multiple sizes with srcset
- Always include width/height to prevent CLS
- Compress images with quality 80-85%
- Use lazy loading for below-fold images

**Expected Improvement:** 
- Prevents future performance regressions
- Reduces CLS risk from images

### 7. Potential Dependency Optimization
**Impact:** Medium  
**Metric Affected:** Bundle Size  
**Current State:** Some dependencies could be evaluated for lighter alternatives.

**Current Dependencies:**
```json
"react-helmet-async": "^2.0.5",        // ~15kb
"@radix-ui/react-dialog": "^1.1.15",   // ~20kb (for Sheet component)
"lucide-react": "^0.564.0",            // ~500kb (entire icon library)
```

**Suggested Fix:**

For lucide-react, use tree-shaking or import only needed icons:
```javascript
// Instead of importing from main package
import { Menu, Sun, Moon } from 'lucide-react'

// Create an icons.js file to import only what's needed
// vite.config.js
export default defineConfig({
  optimizeDeps: {
    include: ['lucide-react'],
  },
})
```

Or consider creating an icons sprite:
```bash
npm install @lucide/icons
```

**Expected Improvement:** 
- Reduce bundle size by 50-100kb
- Faster initial page load

### 8. Vite Build Configuration Could Be Optimized
**Impact:** Medium  
**Metric Affected:** Bundle Size, Build Time  
**Current State:** Basic Vite configuration in `vite.config.js`.

**Suggested Fix:**
Enhance `vite.config.js`:
```javascript
export default defineConfig({
  plugins: [react(), deploymentMetaPlugin()],
  base: '/',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    emptyOutDir: true,
    // Add these optimizations
    minify: 'esbuild', // Faster than terser
    target: 'es2015', // Modern browsers only
    cssCodeSplit: true,
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('react') || id.includes('react-dom')) {
              return 'react-vendor'
            }
            if (id.includes('@radix-ui') || id.includes('lucide-react')) {
              return 'ui-vendor'
            }
            return 'vendor'
          }
        },
      },
    },
  },
})
```

**Expected Improvement:** 
- Better code splitting
- Smaller individual chunks
- More efficient caching strategy

---

## Low Impact Issues

### 9. No Service Worker / PWA Support
**Impact:** Low  
**Metric Affected:** Repeat Visit Performance  
**Current State:** No service worker, site is not a PWA.

**Suggested Fix:**
Add PWA support with Vite PWA plugin:
```bash
npm install vite-plugin-pwa --save-dev
```

```javascript
// vite.config.js
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    deploymentMetaPlugin(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['favicon.svg', 'robots.txt'],
      manifest: {
        name: 'Daniel Christensen - Data Engineer',
        short_name: 'Daniel Christensen',
        description: 'Portfolio of Daniel Christensen, Senior Data Engineer',
        theme_color: '#000000',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/icon-192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icon-512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
    }),
  ],
})
```

**Expected Improvement:** 
- Instant load on repeat visits
- Offline capability
- Install as app on mobile devices

### 10. GitHub Pages Caching Headers
**Impact:** Low  
**Metric Affected:** Repeat Visit Performance  
**Current State:** GitHub Pages sets its own caching headers, limited control.

**Suggested Fix:**
While GitHub Pages controls caching headers, ensure static assets have cache-busting through Vite's content hashing (already configured). Consider adding a CDN like Cloudflare if more control is needed.

**Expected Improvement:** 
- Better control over caching strategy
- Faster repeat visits

### 11. No Performance Monitoring
**Impact:** Low  
**Metric Affected:** All (monitoring only)  
**Current State:** No real-user monitoring (RUM) of performance metrics.

**Suggested Fix:**
Add Web Vitals reporting:
```bash
npm install web-vitals
```

```javascript
// src/reportWebVitals.js
import { getCLS, getFID, getFCP, getLCP, getTTFB } from 'web-vitals'

function sendToAnalytics(metric) {
  // Send to your analytics endpoint
  console.log(metric)
  
  // Or send to Google Analytics
  if (window.gtag) {
    window.gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    })
  }
}

export function reportWebVitals() {
  getCLS(sendToAnalytics)
  getFID(sendToAnalytics)
  getFCP(sendToAnalytics)
  getLCP(sendToAnalytics)
  getTTFB(sendToAnalytics)
}
```

```javascript
// src/main.jsx
import { reportWebVitals } from './reportWebVitals'

// ... after render
reportWebVitals()
```

**Expected Improvement:** 
- Visibility into real-world performance
- Identify performance regressions

---

## Build Analysis

### Current Build Output (Estimated)
```
dist/
├── index.html                  ~3kb
├── assets/
│   ├── index-[hash].js        ~150-200kb (gzipped: ~50-60kb)
│   ├── index-[hash].css       ~5-10kb (gzipped: ~2-3kb)
│   └── [page]-[hash].js       ~20-30kb each (lazy chunks)
├── favicon.svg                ~1kb
├── robots.txt                 ~1kb
└── sitemap.xml                ~1kb
```

### Target Build Sizes
- Main bundle: < 50kb gzipped
- Lazy chunks: < 20kb gzipped each
- Total CSS: < 3kb gzipped
- First Load: < 100kb gzipped total

### Recommendations
1. Run `npm run build` and analyze actual sizes
2. Set up bundle size tracking in CI
3. Add budget warnings:

```javascript
// vite.config.js
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        // Warn on large chunks
        manualChunks: { /* ... */ },
      },
    },
    // Set size warning limit
    chunkSizeWarningLimit: 500, // 500kb
  },
})
```

---

## GitHub Pages Specific Optimizations

### Current Setup
- Static hosting on GitHub Pages
- Custom domain: christensendaniel.com
- HTTPS enabled
- 404.html redirect hack for SPA routing

### Recommendations

1. **Add Cloudflare (Free Tier)**
   - Put Cloudflare in front of GitHub Pages
   - Benefits:
     - Better caching control
     - Minification
     - Image optimization (Cloudflare Polish)
     - HTTP/2 and HTTP/3 support
     - Global CDN
     - DDoS protection

2. **Optimize Asset Delivery**
   - Already using content-hashed filenames ✓
   - Consider adding versioned API for future dynamic content

3. **Preconnect/DNS Prefetch**
   - Already has preconnect to Google Fonts
   - Add preconnect to any future external APIs

---

## Performance Testing Checklist

### Tools to Use
- [ ] Lighthouse CI in GitHub Actions
- [ ] WebPageTest from multiple locations
- [ ] Chrome DevTools Performance tab
- [ ] Chrome DevTools Coverage tab (find unused code)
- [ ] BundlePhobia for dependency size analysis
- [ ] Source Map Explorer for bundle analysis

### Test Scenarios
- [ ] Cold cache, fast 4G connection
- [ ] Repeat visit with cache
- [ ] Slow 3G connection
- [ ] CPU throttling (4x slowdown)
- [ ] Different geographic locations
- [ ] Mobile devices (real device testing)

---

## Positive Findings

### What's Working Well

1. ✅ **Code Splitting**: React.lazy() used for all page routes
2. ✅ **Modern Build Tool**: Vite provides fast builds and optimized output
3. ✅ **Minimal Dependencies**: Relatively small dependency footprint
4. ✅ **No jQuery or Legacy Libraries**: Modern React-only stack
5. ✅ **Static Hosting**: GitHub Pages is fast for static content
6. ✅ **Content Hashing**: Assets have content-based hashes for cache busting
7. ✅ **No Heavy Images**: Using emojis and SVG icons instead of images
8. ✅ **No Third-Party Analytics**: No blocking analytics scripts (privacy-first!)
9. ✅ **Efficient CSS**: Tailwind with PurgeCSS removes unused styles
10. ✅ **Loading States**: Suspense fallback for lazy-loaded pages

---

## Priority Implementation Order

### Phase 1: Critical (Week 1)
1. Self-host fonts or switch to system fonts
2. Run bundle analysis and document current sizes
3. Remove unused CSS/JS files from public/assets/

### Phase 2: High Value (Week 2-3)
4. Add resource preloading for critical assets
5. Optimize Vite build configuration
6. Set up bundle size monitoring in CI

### Phase 3: Future Enhancements (Month 2+)
7. Add image optimization when images are needed
8. Consider PWA support
9. Set up Web Vitals monitoring
10. Evaluate dependency alternatives
11. Consider Cloudflare for enhanced performance

---

## Continuous Performance Budget

Set up performance budgets in CI:

```yaml
# .github/workflows/performance.yml
name: Performance Budget

on: [push, pull_request]

jobs:
  performance:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
      - run: npm ci
      - run: npm run build
      
      - name: Check bundle size
        run: |
          # Fail if main bundle > 100kb gzipped
          SIZE=$(gzip -c dist/assets/index-*.js | wc -c)
          if [ $SIZE -gt 102400 ]; then
            echo "Main bundle too large: ${SIZE} bytes"
            exit 1
          fi
```

---

## Summary Statistics

| Category | Count | Total Potential Improvement |
|----------|-------|----------------------------|
| High Impact | 4 | ~300-500ms LCP, ~30% bundle size |
| Medium Impact | 4 | ~100-200ms various, ~20% bundle size |
| Low Impact | 3 | Better monitoring, offline support |
| **Total Issues** | **11** | **Significant performance gains possible** |

---

## Expected Core Web Vitals After Optimization

| Metric | Current (Estimated) | Target | Post-Optimization (Expected) |
|--------|---------------------|--------|------------------------------|
| LCP | ~1.5-2.0s | < 2.5s | < 1.0s |
| FID | < 100ms | < 100ms | < 50ms |
| CLS | ~0.05-0.15 | < 0.1 | < 0.05 |
| TTFB | ~300-500ms | < 800ms | < 200ms |

With these optimizations, the site should easily achieve "Good" ratings on all Core Web Vitals metrics.
