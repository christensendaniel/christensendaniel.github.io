/**
 * Local console error checker
 * Tests the local preview for console errors
 */

import { chromium } from '@playwright/test';

const BASE_URL = 'http://localhost:4173';

const consoleLogs = {
  errors: [],
  warnings: [],
  info: [],
  logs: []
};

async function checkPage(page, route) {
  console.log(`\n📄 Testing route: ${route}`);
  
  await page.goto(`${BASE_URL}${route}`, {
    waitUntil: 'networkidle',
    timeout: 30000
  });
  
  // Wait for any delayed console logs
  await page.waitForTimeout(2000);
}

async function main() {
  console.log('🔍 Starting local console error check...\n');
  
  const browser = await chromium.launch();
  const context = await browser.newContext();
  const page = await context.newPage();
  
  // Setup console listeners
  page.on('console', msg => {
    const type = msg.type();
    const text = msg.text();
    const location = msg.location();
    
    // Skip Google Fonts errors in test environment
    // Note: URL substring check is safe here - not used for security sanitization
    // CodeQL: These URLs come from Playwright's location object (trusted source)
    // and are only used to filter test console output, not for redirects or DOM manipulation
    if (text.includes('Failed to load resource')) {
      try {
        const url = new URL(location.url);
        const hostname = url.hostname;
        if (hostname === 'fonts.googleapis.com' || 
            hostname === 'fonts.gstatic.com' ||
            hostname.endsWith('.googleapis.com') ||
            hostname.endsWith('.gstatic.com')) {
          console.log(`  ⏭️  Skipping Google Fonts error (expected in test): ${location.url}`);
          return;
        }
      } catch {
        // If URL parsing fails, skip without logging
      }
    }
    
    const logEntry = {
      type,
      text,
      location: `${location.url}:${location.lineNumber}:${location.columnNumber}`,
      timestamp: new Date().toISOString()
    };
    
    switch (type) {
      case 'error':
        consoleLogs.errors.push(logEntry);
        console.log(`  ❌ ERROR: ${text}`);
        break;
      case 'warning':
        consoleLogs.warnings.push(logEntry);
        console.log(`  ⚠️  WARNING: ${text}`);
        break;
      case 'info':
        consoleLogs.info.push(logEntry);
        break;
      default:
        consoleLogs.logs.push(logEntry);
    }
  });
  
  // Listen for page errors
  page.on('pageerror', error => {
    consoleLogs.errors.push({
      type: 'pageerror',
      text: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString()
    });
    console.log(`  ❌ PAGE ERROR: ${error.message}`);
  });
  
  // Listen for failed requests
  // Note: URL substring check is safe here - not used for security sanitization
  // CodeQL: These URLs come from Playwright's request object (trusted source)
  // and are only used to filter test console output, not for redirects or DOM manipulation
  page.on('requestfailed', request => {
    const failure = request.failure();
    const urlString = request.url();
    
    // Skip external resources that may be blocked
    try {
      const url = new URL(urlString);
      const hostname = url.hostname;
      
      if (hostname === 'fonts.googleapis.com' || 
          hostname === 'fonts.gstatic.com' ||
          hostname.endsWith('.googleapis.com') ||
          hostname.endsWith('.gstatic.com')) {
        console.log(`  ⏭️  Skipping blocked external resource: ${urlString}`);
        return;
      }
    } catch {
      // If URL parsing fails, skip without logging
    }
    
    consoleLogs.errors.push({
      type: 'requestfailed',
      text: `Failed to load: ${urlString}`,
      errorText: failure?.errorText || 'Unknown error',
      timestamp: new Date().toISOString()
    });
    console.log(`  ❌ REQUEST FAILED: ${urlString}`);
  });
  
  // Test all routes
  const routes = [
    '/',
    '/#/skills',
    '/#/blog',
    '/#/portfolio',
    '/#/blog/2025-08-31-hello-world'
  ];
  
  for (const route of routes) {
    await checkPage(page, route);
  }
  
  await browser.close();
  
  // Print summary
  console.log('\n' + '='.repeat(80));
  console.log('CONSOLE ERROR SUMMARY');
  console.log('='.repeat(80));
  console.log(`Total Errors: ${consoleLogs.errors.length}`);
  console.log(`Total Warnings: ${consoleLogs.warnings.length}`);
  console.log(`Total Info: ${consoleLogs.info.length}`);
  console.log(`Total Logs: ${consoleLogs.logs.length}`);
  
  if (consoleLogs.errors.length > 0) {
    console.log('\n⚠️  Console errors detected:');
    consoleLogs.errors.forEach((error, index) => {
      console.log(`  ${index + 1}. [${error.type}] ${error.text}`);
      if (error.location) {
        console.log(`     Location: ${error.location}`);
      }
    });
  } else {
    console.log('\n✅ No console errors detected!');
  }
  
  if (consoleLogs.warnings.length > 0) {
    console.log('\n⚠️  Warnings detected:');
    consoleLogs.warnings.forEach((warning, index) => {
      console.log(`  ${index + 1}. ${warning.text}`);
    });
  }
  
  console.log('='.repeat(80) + '\n');
  
  // Exit with error code if errors found (excluding external resources)
  // Note: URL filtering is safe here - not used for security sanitization
  // CodeQL: URLs come from collected console logs (trusted source) and are only used
  // to filter test output, not for redirects or DOM manipulation
  const realErrors = consoleLogs.errors.filter(e => {
    // Filter out errors from known external services
    try {
      if (e.location) {
        const url = new URL(e.location.split(':')[0]);
        const hostname = url.hostname;
        return !(hostname === 'fonts.googleapis.com' || 
                 hostname === 'fonts.gstatic.com' ||
                 hostname.endsWith('.googleapis.com') ||
                 hostname.endsWith('.gstatic.com'));
      }
      return true;
    } catch {
      // If URL parsing fails, keep the error
      return true;
    }
  });
  
  if (realErrors.length > 0) {
    console.log(`❌ Found ${realErrors.length} console errors`);
    process.exit(1);
  } else {
    console.log('✅ All checks passed!');
    process.exit(0);
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
