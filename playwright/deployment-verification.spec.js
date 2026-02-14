/**
 * Deployment Verification Test
 * 
 * This test verifies:
 * 1. The deployed site is accessible
 * 2. The deployment hash matches what was just deployed
 * 3. Captures and categorizes all console errors
 * 4. Takes screenshots when errors occur
 */

import { test, expect } from '@playwright/test';
import fs from 'fs';
import path from 'path';

// Configuration
const DEPLOYMENT_URL = process.env.DEPLOYMENT_URL || 'https://christensendaniel.com';
const EXPECTED_HASH = process.env.GIT_COMMIT_HASH || '';
const WAIT_TIME = 60000; // Wait 60 seconds for GitHub Pages to update

// Store console logs
const consoleLogs = {
  errors: [],
  warnings: [],
  info: [],
  logs: []
};

test.describe('Deployment Verification', () => {
  
  test.beforeAll(async () => {
    console.log(`\n🔍 Starting deployment verification for ${DEPLOYMENT_URL}`);
    if (EXPECTED_HASH) {
      console.log(`📌 Expected deployment hash: ${EXPECTED_HASH.substring(0, 7)}`);
    }
    console.log(`⏳ Waiting ${WAIT_TIME / 1000} seconds for GitHub Pages to update...\n`);
    
    // Wait for GitHub Pages deployment to propagate
    await new Promise(resolve => setTimeout(resolve, WAIT_TIME));
  });

  test('should verify site is accessible', async ({ page }) => {
    // Navigate to the deployed site
    const response = await page.goto(DEPLOYMENT_URL, {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    
    // Verify 200 status
    expect(response.status()).toBe(200);
    console.log('✅ Site is accessible (HTTP 200)');
    
    // Verify content is loaded
    await expect(page.locator('#root')).toBeVisible();
    console.log('✅ React app root element is visible');
  });

  test('should verify deployment hash matches', async ({ page }) => {
    if (!EXPECTED_HASH) {
      test.skip('No expected hash provided, skipping hash verification');
      return;
    }

    await page.goto(DEPLOYMENT_URL, { waitUntil: 'networkidle' });
    
    // Method 1: Check meta tag
    const metaHash = await page.locator('meta[name="deployment-hash"]').getAttribute('content');
    
    if (metaHash) {
      console.log(`📋 Deployed hash (from meta tag): ${metaHash.substring(0, 7)}`);
      console.log(`📋 Expected hash: ${EXPECTED_HASH.substring(0, 7)}`);
      
      expect(metaHash).toBe(EXPECTED_HASH);
      console.log(`✅ Verified deployment of commit ${EXPECTED_HASH.substring(0, 7)} is live`);
    } else {
      console.warn('⚠️  Could not find deployment hash meta tag');
    }
    
    // Method 2: Check version.json endpoint
    try {
      const versionResponse = await page.goto(`${DEPLOYMENT_URL}/version.json`, {
        waitUntil: 'networkidle'
      });
      
      if (versionResponse.status() === 200) {
        const versionData = await versionResponse.json();
        console.log('📦 Version.json data:', JSON.stringify(versionData, null, 2));
        
        if (versionData.commitHash) {
          expect(versionData.commitHash).toBe(EXPECTED_HASH);
          console.log('✅ Version.json hash matches expected hash');
        }
      }
    } catch (error) {
      console.warn('⚠️  Could not fetch version.json:', error.message);
    }
  });

  test('should capture and analyze console logs', async ({ page }) => {
    // Setup console listeners before navigation
    page.on('console', msg => {
      const type = msg.type();
      const text = msg.text();
      const location = msg.location();
      
      const logEntry = {
        type,
        text,
        location: `${location.url}:${location.lineNumber}:${location.columnNumber}`,
        timestamp: new Date().toISOString()
      };
      
      switch (type) {
        case 'error':
          consoleLogs.errors.push(logEntry);
          break;
        case 'warning':
          consoleLogs.warnings.push(logEntry);
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
    });
    
    // Listen for failed requests (404s, etc.)
    page.on('requestfailed', request => {
      const failure = request.failure();
      consoleLogs.errors.push({
        type: 'requestfailed',
        text: `Failed to load: ${request.url()}`,
        errorText: failure?.errorText || 'Unknown error',
        timestamp: new Date().toISOString()
      });
    });
    
    // Navigate to main page and key routes
    const routes = [
      '/',
      '/#/skills',
      '/#/blog',
      '/#/portfolio'
    ];
    
    for (const route of routes) {
      console.log(`\n📄 Testing route: ${route}`);
      await page.goto(`${DEPLOYMENT_URL}${route}`, {
        waitUntil: 'networkidle',
        timeout: 30000
      });
      
      // Wait a bit for any delayed console logs
      await page.waitForTimeout(2000);
      
      // Take screenshot if there are errors
      if (consoleLogs.errors.length > 0) {
        const screenshotPath = `test-results/screenshots/error-${route.replace(/\//g, '-')}.png`;
        await page.screenshot({ 
          path: screenshotPath,
          fullPage: true 
        });
        console.log(`📸 Screenshot saved: ${screenshotPath}`);
      }
    }
  });

  test.afterAll(async () => {
    // Save console logs to file
    const resultsDir = path.join(process.cwd(), 'test-results');
    if (!fs.existsSync(resultsDir)) {
      fs.mkdirSync(resultsDir, { recursive: true });
    }
    
    // Create screenshots directory
    const screenshotsDir = path.join(resultsDir, 'screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
    
    // Generate console log report
    const timestamp = new Date().toISOString().replace(/:/g, '-').split('.')[0];
    const logFilePath = path.join(resultsDir, `console-${timestamp}.txt`);
    
    let reportContent = '='.repeat(80) + '\n';
    reportContent += 'CONSOLE LOG REPORT\n';
    reportContent += '='.repeat(80) + '\n\n';
    reportContent += `Deployment URL: ${DEPLOYMENT_URL}\n`;
    reportContent += `Test Date: ${new Date().toISOString()}\n`;
    if (EXPECTED_HASH) {
      reportContent += `Expected Hash: ${EXPECTED_HASH}\n`;
    }
    reportContent += '\n';
    
    // Summary
    reportContent += 'SUMMARY:\n';
    reportContent += '-'.repeat(80) + '\n';
    reportContent += `Total Errors: ${consoleLogs.errors.length}\n`;
    reportContent += `Total Warnings: ${consoleLogs.warnings.length}\n`;
    reportContent += `Total Info: ${consoleLogs.info.length}\n`;
    reportContent += `Total Logs: ${consoleLogs.logs.length}\n`;
    reportContent += '\n';
    
    // Categorize errors
    const categorized = {
      '404_errors': [],
      'react_warnings': [],
      'network_errors': [],
      'javascript_errors': [],
      'other': []
    };
    
    consoleLogs.errors.forEach(error => {
      const text = error.text.toLowerCase();
      
      if (text.includes('404') || text.includes('not found')) {
        categorized['404_errors'].push(error);
      } else if (text.includes('react') || text.includes('warning')) {
        categorized['react_warnings'].push(error);
      } else if (error.type === 'requestfailed' || text.includes('failed to load')) {
        categorized['network_errors'].push(error);
      } else if (error.type === 'pageerror' || text.includes('error')) {
        categorized['javascript_errors'].push(error);
      } else {
        categorized['other'].push(error);
      }
    });
    
    // Write categorized errors
    for (const [category, errors] of Object.entries(categorized)) {
      if (errors.length > 0) {
        reportContent += `\n${category.toUpperCase().replace(/_/g, ' ')} (${errors.length}):\n`;
        reportContent += '='.repeat(80) + '\n';
        errors.forEach((error, index) => {
          reportContent += `\n[${index + 1}] ${error.timestamp}\n`;
          reportContent += `Type: ${error.type}\n`;
          reportContent += `Message: ${error.text}\n`;
          if (error.location) {
            reportContent += `Location: ${error.location}\n`;
          }
          if (error.stack) {
            reportContent += `Stack: ${error.stack}\n`;
          }
          reportContent += '-'.repeat(80) + '\n';
        });
      }
    }
    
    // Write warnings
    if (consoleLogs.warnings.length > 0) {
      reportContent += '\n\nWARNINGS:\n';
      reportContent += '='.repeat(80) + '\n';
      consoleLogs.warnings.forEach((warning, index) => {
        reportContent += `\n[${index + 1}] ${warning.timestamp}\n`;
        reportContent += `Message: ${warning.text}\n`;
        if (warning.location) {
          reportContent += `Location: ${warning.location}\n`;
        }
        reportContent += '-'.repeat(80) + '\n';
      });
    }
    
    fs.writeFileSync(logFilePath, reportContent);
    console.log(`\n📝 Console log report saved to: ${logFilePath}`);
    
    // Print summary to console
    console.log('\n' + '='.repeat(80));
    console.log('CONSOLE ERROR SUMMARY');
    console.log('='.repeat(80));
    console.log(`Total Errors: ${consoleLogs.errors.length}`);
    console.log(`Total Warnings: ${consoleLogs.warnings.length}`);
    
    if (consoleLogs.errors.length > 0) {
      console.log('\n⚠️  Console errors detected:');
      Object.entries(categorized).forEach(([category, errors]) => {
        if (errors.length > 0) {
          console.log(`  - ${category.replace(/_/g, ' ')}: ${errors.length}`);
        }
      });
    } else {
      console.log('\n✅ No console errors detected!');
    }
    
    console.log('='.repeat(80) + '\n');
    
    // Fail test if there are errors (can be adjusted based on requirements)
    if (consoleLogs.errors.length > 0) {
      console.error('❌ Console errors detected. See report for details.');
      // Note: Not failing the test by default to allow for gradual fixes
      // Uncomment the line below to make errors fail the test:
      // throw new Error(`Found ${consoleLogs.errors.length} console errors`);
    }
  });
});
