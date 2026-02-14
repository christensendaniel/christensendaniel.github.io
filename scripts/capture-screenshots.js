#!/usr/bin/env node

/**
 * Playwright screenshot script for post-deployment verification
 * This script takes screenshots of the deployed site for visual verification
 */

import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const baseUrl = process.env.DEPLOYMENT_URL || 'https://christensendaniel.com';
const screenshotsDir = path.join(__dirname, '..', 'screenshots');

// Pages to capture
const pages = [
  { path: '/', name: 'home' },
  { path: '/#/skills', name: 'skills' },
  { path: '/#/blog', name: 'blog' },
  { path: '/#/portfolio', name: 'portfolio' },
];

console.log('📸 Starting screenshot capture...\n');
console.log(`Base URL: ${baseUrl}`);
console.log(`Screenshots directory: ${screenshotsDir}\n`);

// Ensure screenshots directory exists
if (!fs.existsSync(screenshotsDir)) {
  fs.mkdirSync(screenshotsDir, { recursive: true });
}

async function captureScreenshots() {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  
  const results = [];
  
  for (const page of pages) {
    try {
      console.log(`Capturing: ${page.name} (${page.path})`);
      
      const browserPage = await context.newPage();
      
      // Listen for console errors
      const consoleErrors = [];
      browserPage.on('console', msg => {
        if (msg.type() === 'error') {
          consoleErrors.push(msg.text());
        }
      });
      
      // Navigate to page
      const url = `${baseUrl}${page.path}`;
      const response = await browserPage.goto(url, { 
        waitUntil: 'networkidle',
        timeout: 30000 
      });
      
      // Check response status
      const status = response.status();
      console.log(`  Status: ${status}`);
      
      // Wait a bit for any animations or lazy loading
      await browserPage.waitForTimeout(2000);
      
      // Take screenshot
      const screenshotPath = path.join(screenshotsDir, `${page.name}.png`);
      await browserPage.screenshot({ 
        path: screenshotPath,
        fullPage: true 
      });
      
      console.log(`  ✅ Screenshot saved: ${screenshotPath}`);
      
      // Check for console errors
      if (consoleErrors.length > 0) {
        console.log(`  ⚠️  Console errors detected:`);
        consoleErrors.forEach(error => console.log(`     ${error}`));
      } else {
        console.log('  ✅ No console errors');
      }
      
      results.push({
        page: page.name,
        url,
        status,
        screenshot: screenshotPath,
        consoleErrors: consoleErrors.length,
        success: status === 200 && consoleErrors.length === 0
      });
      
      await browserPage.close();
      console.log('');
      
    } catch (error) {
      console.log(`  ❌ Error capturing ${page.name}: ${error.message}\n`);
      results.push({
        page: page.name,
        url: `${baseUrl}${page.path}`,
        success: false,
        error: error.message
      });
    }
  }
  
  await browser.close();
  
  // Print summary
  console.log('='.repeat(60));
  console.log('SCREENSHOT CAPTURE SUMMARY:');
  console.log('='.repeat(60));
  
  results.forEach(result => {
    const status = result.success ? '✅ SUCCESS' : '❌ FAILED';
    console.log(`${status} - ${result.page}`);
    if (result.status) {
      console.log(`         Status: ${result.status}`);
    }
    if (result.screenshot) {
      console.log(`         Screenshot: ${result.screenshot}`);
    }
    if (result.consoleErrors > 0) {
      console.log(`         Console errors: ${result.consoleErrors}`);
    }
    if (result.error) {
      console.log(`         Error: ${result.error}`);
    }
  });
  
  console.log('='.repeat(60));
  
  // Generate summary JSON for GitHub Actions
  const summary = {
    timestamp: new Date().toISOString(),
    baseUrl,
    results,
    totalPages: results.length,
    successfulPages: results.filter(r => r.success).length,
    failedPages: results.filter(r => !r.success).length
  };
  
  const summaryPath = path.join(screenshotsDir, 'summary.json');
  fs.writeFileSync(summaryPath, JSON.stringify(summary, null, 2));
  console.log(`\n📊 Summary saved: ${summaryPath}`);
  
  const allSuccessful = results.every(r => r.success);
  if (!allSuccessful) {
    console.log('\n❌ Some screenshots failed or had errors');
    process.exit(1);
  } else {
    console.log('\n✅ All screenshots captured successfully!');
    process.exit(0);
  }
}

captureScreenshots().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
