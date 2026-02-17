# Troubleshooting Guide

Common issues and solutions for the portfolio website.

## Build Issues

### Build Fails with Dependency Errors

**Problem**: `npm run build` fails with module not found errors.

**Solution**:
```bash
# Remove node_modules and lock file
rm -rf node_modules package-lock.json

# Reinstall dependencies
npm install

# Try build again
npm run build
```

### Build Succeeds but Site is Blank

**Problem**: Build completes but the site shows a blank screen.

**Diagnosis**:
```bash
# Verify build output
npm run verify-build

# Check for index.html
ls -la dist/index.html

# Check for compiled assets
ls -la dist/assets/
```

**Solution**: Ensure `dist/index.html` references compiled bundles, not source files:
- ✅ Should have: `<script src="/assets/index-[hash].js">`
- ❌ Should NOT have: `<script src="/src/main.jsx">`

## Deployment Issues

### Site Shows Blank Screen After Deployment

**Problem**: Site deploys successfully but shows blank white screen.

**Common Causes**:
1. Browser cache showing old version
2. GitHub Pages propagation delay
3. Serving source files instead of compiled build
4. JavaScript errors preventing render

**Solutions**:

1. **Clear Browser Cache**:
   - Hard refresh: `Ctrl+Shift+R` (Windows/Linux) or `Cmd+Shift+R` (Mac)
   - Or use Incognito/Private browsing mode

2. **Wait for Propagation**:
   - GitHub Pages can take 2-5 minutes to update
   - Check deployment status in GitHub Actions

3. **Verify Compiled Assets Are Being Served**:
   ```bash
   # Check what's being served
   curl -s https://christensendaniel.com | grep -o 'src="[^"]*"' | head -5
   
   # Should show compiled bundle:
   # src="/assets/index-[hash].js"
   ```

4. **Check Browser Console**:
   - Open DevTools (F12)
   - Look for JavaScript errors
   - Check Network tab for 404s or failed requests

### GitHub Pages Configuration Issues

**Problem**: Deployment succeeds but site not accessible.

**Solution**:
1. Go to: `https://github.com/[username]/[repo]/settings/pages`
2. Verify **Source** is set to "GitHub Actions"
3. Check **Custom domain** field if using one
4. Ensure **Enforce HTTPS** is checked

### Custom Domain Not Working

**Problem**: GitHub Pages URL works but custom domain doesn't.

**Checklist**:
- ✅ CNAME file exists in `public/CNAME` with domain name
- ✅ DNS CNAME record points to `username.github.io`
- ✅ GitHub Pages custom domain setting configured
- ✅ Wait 24-48 hours for DNS propagation

**Verify DNS**:
```bash
# Check DNS resolution
dig christensendaniel.com CNAME

# Should point to christensendaniel.github.io
```

### Deployment Hash Mismatch

**Problem**: Deployment verification shows hash mismatch.

**Diagnosis**:
```bash
# Check version.json on live site
curl https://christensendaniel.com/version.json

# Compare with latest commit
git log -1 --format=%H
```

**Solutions**:
- Wait for GitHub Pages to fully propagate (60 seconds)
- Check if deployment workflow completed successfully
- Clear CDN cache if using one

## Test Issues

### Tests Failing Locally

**Problem**: `npm test` fails with errors.

**Common Issues**:

1. **Missing Dependencies**:
   ```bash
   npm install
   ```

2. **Stale Snapshots**:
   ```bash
   npm test -- -u  # Update snapshots
   ```

3. **Environment Issues**:
   ```bash
   # Check Node version
   node --version  # Should be 20.x or higher
   
   # Clear Jest cache
   npx jest --clearCache
   ```

### Playwright Tests Timeout

**Problem**: Deployment verification tests timeout.

**Solutions**:
```bash
# Install Playwright browsers
npx playwright install

# Run with more time
npm run test:deployment -- --timeout=60000

# Run in headed mode to see what's happening
npx playwright test --headed
```

## Development Issues

### Vite Dev Server Won't Start

**Problem**: `npm run dev` fails or port in use.

**Solutions**:

1. **Port Already in Use**:
   ```bash
   # Kill process on port 5173
   lsof -ti:5173 | xargs kill -9
   
   # Or use different port
   npm run dev -- --port 3000
   ```

2. **Permission Issues**:
   ```bash
   # Check file permissions
   ls -la node_modules/.vite/
   
   # Remove cache
   rm -rf node_modules/.vite
   ```

### Hot Module Replacement Not Working

**Problem**: Changes don't reflect in browser automatically.

**Solutions**:
- Refresh browser manually (F5)
- Check browser console for HMR errors
- Restart dev server
- Clear Vite cache: `rm -rf node_modules/.vite`

### Import Errors in Development

**Problem**: Module not found errors with correct imports.

**Solutions**:
```bash
# Restart dev server
# Press Ctrl+C to stop
npm run dev

# If persistent, clear cache
rm -rf node_modules/.vite
npm run dev
```

## Console Errors

### Failed to Load Module Script

**Error**: `Failed to load module script: Expected JavaScript module but got MIME type "text/jsx"`

**Cause**: Browser trying to load source `.jsx` file instead of compiled `.js` bundle.

**Solution**: This should only happen if you're serving source files directly. Ensure:
- Using production build (`npm run build`)
- `dist/index.html` references compiled bundles
- Not using `vite preview` in production

### Font Loading Errors

**Warning**: `Failed to load resource: https://fonts.googleapis.com/...`

**Cause**: Google Fonts blocked (e.g., in test environment with no internet).

**Impact**: Visual only - site still functions, just uses fallback fonts.

**Solution**: This is expected in certain environments. In production with internet access, fonts should load fine.

### React Router Warnings

**Warning**: `You should not use <Link> outside a <Router>`

**Cause**: Component using routing features not wrapped in Router.

**Solution**: Ensure component is rendered within `<HashRouter>` or use `renderWithRouter` helper in tests:
```jsx
import { renderWithRouter } from '../test-utils'

renderWithRouter(<YourComponent />)
```

## Performance Issues

### Slow Build Times

**Problem**: `npm run build` takes too long.

**Solutions**:
- Clear `dist/` directory: `rm -rf dist`
- Update dependencies: `npm update`
- Check for large assets in `public/`

### Large Bundle Size

**Problem**: JavaScript bundle too large.

**Diagnosis**:
```bash
# Analyze bundle
npm run build
du -sh dist/assets/*.js
```

**Solutions**:
- Use code splitting with React.lazy()
- Remove unused dependencies
- Check for duplicate packages

## GitHub Actions Issues

### Workflow Fails at Test Step

**Problem**: CI/CD fails during test execution.

**Solutions**:
- Run tests locally first: `npm test`
- Check test logs in GitHub Actions
- Ensure tests pass before pushing
- Update snapshots if needed

### Workflow Fails at Build Step

**Problem**: Build succeeds locally but fails in CI.

**Common Causes**:
- Node version mismatch
- Missing environment variables
- Dependency issues

**Solutions**:
- Check Node version in workflow (should be 20.x)
- Review workflow logs for specific errors
- Ensure `package-lock.json` is committed

### Deployment Step Fails

**Problem**: Build succeeds but deployment fails.

**Check**:
- GitHub Pages is enabled in repository settings
- GITHUB_TOKEN has proper permissions
- No conflicting deployments in progress

## Browser-Specific Issues

### Site Works in Chrome but Not Safari

**Possible Causes**:
- Browser caching differences
- CSS/JS compatibility issues
- Font loading differences

**Solutions**:
- Clear Safari cache
- Test in Safari Private mode
- Check for CSS features unsupported in Safari

### Mobile Responsiveness Issues

**Problem**: Site doesn't look right on mobile.

**Debug**:
- Use browser DevTools mobile emulation
- Check Tailwind breakpoints
- Test on actual devices

**Solutions**:
- Review responsive utility classes
- Check viewport meta tag
- Test with different screen sizes

## Quick Diagnostic Commands

```bash
# Verify build is correct
npm run build && npm run verify-build

# Check deployed site
npm run quick-check

# Test locally before deploying
npm run build && npm run preview

# Run all tests
npm test

# Deployment verification
npm run test:deployment

# Check for outdated dependencies
npm outdated
```

## Getting Help

If you can't resolve an issue:

1. **Check Logs**: Review detailed error messages
2. **Search Issues**: Check GitHub Issues for similar problems
3. **Check Documentation**: Review [DEVELOPMENT.md](./DEVELOPMENT.md), [DEPLOYMENT.md](./DEPLOYMENT.md), [TESTING.md](./TESTING.md)
4. **Create Issue**: Open a GitHub issue with:
   - Steps to reproduce
   - Error messages
   - Environment details (Node version, OS)
   - Screenshots if applicable

## Common Error Messages Reference

| Error | Likely Cause | Quick Fix |
|-------|--------------|-----------|
| `Module not found` | Missing dependency | `npm install` |
| `port already in use` | Dev server conflict | Kill process or use different port |
| `ENOENT: no such file` | Missing file/directory | Check file path, run `npm install` |
| `Permission denied` | File permission issue | Check file permissions |
| `Failed to fetch` | Network/CORS issue | Check URL, wait for propagation |
| `Cannot find module` | Import path wrong | Check import statement |
| `Unexpected token` | Syntax error | Check for typos, missing brackets |
| `npm ERR!` | npm registry issue | Try `npm cache clean --force` |
