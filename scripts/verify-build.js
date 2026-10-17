#!/usr/bin/env node

/**
 * Pre-deployment build verification script
 * This script verifies that the build output is correct before deployment
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { staticPages, getBlogPostPages } from './lib/site-routes.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rootDir = path.join(__dirname, '..');
const distDir = path.join(rootDir, 'dist');
const packageJsonPath = path.join(rootDir, 'package.json');
const viteConfigPath = path.join(rootDir, 'vite.config.js');

console.log('🔍 Starting pre-deployment build verification...\n');

let hasErrors = false;

// Check 1: Verify dist directory exists
console.log('✓ Check 1: Verifying dist directory exists...');
if (!fs.existsSync(distDir)) {
  console.error('❌ ERROR: dist directory does not exist!');
  console.error('   The build may have failed or output to wrong directory.');
  hasErrors = true;
} else {
  console.log('✅ dist directory found');
}

// Check 2: Verify index.html exists in dist
console.log('\n✓ Check 2: Verifying index.html exists in dist...');
const indexHtmlPath = path.join(distDir, 'index.html');
if (!fs.existsSync(indexHtmlPath)) {
  console.error('❌ ERROR: index.html not found in dist directory!');
  console.error('   Path checked:', indexHtmlPath);
  hasErrors = true;
} else {
  console.log('✅ index.html found');
  
  // Read and verify index.html content
  const indexContent = fs.readFileSync(indexHtmlPath, 'utf8');
  
  // Check for root div
  if (!indexContent.includes('id="root"')) {
    console.error('❌ WARNING: index.html does not contain root div!');
    hasErrors = true;
  } else {
    console.log('   ✅ Root div found in index.html');
  }
  
  // Check for script tags (bundled JS)
  if (!indexContent.includes('<script') && !indexContent.includes('type="module"')) {
    console.error('❌ WARNING: index.html does not contain script tags!');
    console.error('   The page may not load JavaScript properly.');
    hasErrors = true;
  } else {
    console.log('   ✅ Script tags found in index.html');
  }
}

// Check 3: Verify assets directory exists
console.log('\n✓ Check 3: Verifying assets directory...');
const assetsDir = path.join(distDir, 'assets');
if (!fs.existsSync(assetsDir)) {
  console.error('❌ WARNING: assets directory not found!');
  console.error('   Static assets may not be bundled correctly.');
  hasErrors = true;
} else {
  const assetFiles = fs.readdirSync(assetsDir);
  console.log(`✅ assets directory found with ${assetFiles.length} files`);
  
  // Check for JS files
  const jsFiles = assetFiles.filter(f => f.endsWith('.js'));
  if (jsFiles.length === 0) {
    console.error('❌ ERROR: No JavaScript files found in assets!');
    hasErrors = true;
  } else {
    console.log(`   ✅ Found ${jsFiles.length} JavaScript file(s)`);
  }
  
  // Check for CSS files
  const cssFiles = assetFiles.filter(f => f.endsWith('.css'));
  if (cssFiles.length === 0) {
    console.error('❌ WARNING: No CSS files found in assets!');
  } else {
    console.log(`   ✅ Found ${cssFiles.length} CSS file(s)`);
  }
}

// Check 4: Verify package.json configuration
console.log('\n✓ Check 4: Verifying package.json configuration...');
if (fs.existsSync(packageJsonPath)) {
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
  
  // For username.github.io repos, homepage should be root or the custom domain
  if (packageJson.homepage) {
    console.log(`   ℹ️  homepage field found: ${packageJson.homepage}`);
  } else {
    console.log('   ℹ️  No homepage field (OK for username.github.io repos)');
  }
  
  // Verify build script exists
  if (!packageJson.scripts || !packageJson.scripts.build) {
    console.error('❌ ERROR: No build script found in package.json!');
    hasErrors = true;
  } else {
    console.log('   ✅ Build script configured');
  }
}

// Check 5: Verify vite.config.js base path
console.log('\n✓ Check 5: Verifying vite.config.js base path...');
if (fs.existsSync(viteConfigPath)) {
  const viteConfig = fs.readFileSync(viteConfigPath, 'utf8');
  
  if (viteConfig.includes("base: '/'")) {
    console.log("   ✅ Base path set to '/' (correct for username.github.io)");
  } else if (viteConfig.includes('base:')) {
    const baseMatch = viteConfig.match(/base:\s*['"]([^'"]+)['"]/);
    if (baseMatch) {
      console.log(`   ⚠️  Base path set to: ${baseMatch[1]}`);
      console.log('      For username.github.io repos, this should be "/"');
    }
  } else {
    console.log("   ℹ️  No base path specified (defaults to '/')");
  }
  
  // Check outDir configuration
  if (viteConfig.includes("outDir: 'dist'")) {
    console.log("   ✅ Output directory set to 'dist'");
  } else {
    console.log("   ⚠️  Output directory may not be 'dist'");
  }
}

// Check 6: List all files in dist for debugging
console.log('\n✓ Check 6: Listing dist directory contents...');
if (fs.existsSync(distDir)) {
  const listFiles = (dir, prefix = '') => {
    const files = fs.readdirSync(dir);
    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);
      if (stat.isDirectory()) {
        console.log(`${prefix}📁 ${file}/`);
        listFiles(filePath, prefix + '  ');
      } else {
        const size = (stat.size / 1024).toFixed(2);
        console.log(`${prefix}📄 ${file} (${size} KB)`);
      }
    });
  };
  
  listFiles(distDir);
}

// Check 7: Verify CNAME file if it exists
console.log('\n✓ Check 7: Checking for CNAME file...');
const cnameSourcePath = path.join(rootDir, 'CNAME');
const cnameDistPath = path.join(distDir, 'CNAME');

if (fs.existsSync(cnameSourcePath)) {
  const cnameContent = fs.readFileSync(cnameSourcePath, 'utf8').trim();
  console.log(`   ℹ️  CNAME file found in root: ${cnameContent}`);
  
  // Check if CNAME is copied to dist
  if (fs.existsSync(cnameDistPath)) {
    console.log('   ✅ CNAME file copied to dist');
  } else {
    console.log('   ⚠️  CNAME file NOT in dist (may need to copy manually or configure build)');
  }
}

// Check 8: Verify every route has its own page so direct loads return 200
console.log('\n✓ Check 8: Verifying per-route pages...');
const expectedRoutes = [
  ...staticPages,
  ...getBlogPostPages(path.join(rootDir, 'src/data/blog')),
].map(page => page.path).filter(routePath => routePath !== '/');

const missingRoutes = expectedRoutes.filter(routePath => {
  const routeIndex = path.join(distDir, ...routePath.split('/').filter(Boolean), 'index.html');
  return !fs.existsSync(routeIndex) || !fs.readFileSync(routeIndex, 'utf8').includes('id="root"');
});

if (missingRoutes.length > 0) {
  console.error('❌ ERROR: Missing route pages (direct loads would return 404):');
  missingRoutes.forEach(routePath => console.error(`   - ${routePath}`));
  hasErrors = true;
} else {
  console.log(`✅ All ${expectedRoutes.length} route pages found`);
}

// Final summary
console.log('\n' + '='.repeat(60));
if (hasErrors) {
  console.error('❌ BUILD VERIFICATION FAILED!');
  console.error('   Please fix the errors above before deploying.');
  process.exit(1);
} else {
  console.log('✅ BUILD VERIFICATION PASSED!');
  console.log('   All checks completed successfully.');
  console.log('   Build output is ready for deployment.');
  process.exit(0);
}
