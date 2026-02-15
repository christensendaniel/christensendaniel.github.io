#!/usr/bin/env node

/**
 * Test script to verify the deployed site is working correctly
 * This script checks if the site shows a blank white screen or actual content
 */

import { chromium } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DEPLOYMENT_URL = process.env.DEPLOYMENT_URL || 'https://christensendaniel.com';
const OUTPUT_DIR = path.join(__dirname, '..', 'test-results');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function testDeployedSite() {
  console.log('🔍 Testing deployed site for blank screen issue...\n');
  console.log(`URL: ${DEPLOYMENT_URL}\n`);
  
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: 1280, height: 720 }
  });
  
  const page = await context.newPage();
  
  // Collect console messages
  const consoleMessages = [];
  page.on('console', msg => {
    consoleMessages.push({
      type: msg.type(),
      text: msg.text()
    });
  });
  
  try {
    console.log('📡 Loading homepage...');
    const response = await page.goto(DEPLOYMENT_URL, {
      waitUntil: 'networkidle',
      timeout: 30000
    });
    
    const status = response.status();
    console.log(`✅ HTTP Status: ${status}`);
    
    if (status !== 200) {
      console.error(`❌ ERROR: Expected HTTP 200, got ${status}`);
      process.exit(1);
    }
    
    // Wait for React app to render
    await page.waitForTimeout(3000);
    
    // Check if root element exists
    const rootElement = await page.locator('#root');
    const isRootVisible = await rootElement.isVisible().catch(() => false);
    
    console.log(`${isRootVisible ? '✅' : '❌'} Root element (#root) visible: ${isRootVisible}`);
    
    // Check for expected content
    const hasHeading = await page.locator('h1').count() > 0;
    const hasNavigation = await page.locator('nav').count() > 0;
    const bodyText = await page.locator('body').textContent();
    const hasDanielName = bodyText.includes('Daniel');
    
    console.log(`${hasHeading ? '✅' : '❌'} Has h1 heading: ${hasHeading}`);
    console.log(`${hasNavigation ? '✅' : '❌'} Has navigation: ${hasNavigation}`);
    console.log(`${hasDanielName ? '✅' : '❌'} Contains "Daniel": ${hasDanielName}`);
    
    // Take screenshot
    const screenshotPath = path.join(OUTPUT_DIR, 'deployed-site-test.png');
    const screenshotBuffer = await page.screenshot({ 
      path: screenshotPath,
      fullPage: true 
    });
    
    console.log(`📸 Screenshot saved: ${screenshotPath}`);
    
    // Check screenshot size as a proxy for content
    const stats = fs.statSync(screenshotPath);
    const screenshotSizeKB = (stats.size / 1024).toFixed(2);
    console.log(`📊 Screenshot size: ${screenshotSizeKB} KB`);
    
    // A mostly blank white screen will be a very small PNG (usually < 5KB)
    // A page with content will typically be >10KB
    const isBlank = stats.size < 5000;
    console.log(`   ${isBlank ? '❌ BLANK SCREEN DETECTED (tiny file size)' : '✅ Content detected (reasonable file size)'}`);
    
    // Check console errors
    console.log('\n📋 Console Messages:');
    const errors = consoleMessages.filter(m => m.type === 'error');
    const warnings = consoleMessages.filter(m => m.type === 'warning');
    
    if (errors.length === 0) {
      console.log('   ✅ No console errors');
    } else {
      console.log(`   ❌ ${errors.length} console errors:`);
      errors.forEach((err, i) => {
        console.log(`      ${i + 1}. ${err.text}`);
      });
    }
    
    if (warnings.length > 0) {
      console.log(`   ⚠️  ${warnings.length} console warnings:`);
      warnings.slice(0, 5).forEach((warn, i) => {
        console.log(`      ${i + 1}. ${warn.text}`);
      });
    }
    
    // Save detailed report
    const report = {
      url: DEPLOYMENT_URL,
      timestamp: new Date().toISOString(),
      httpStatus: status,
      checks: {
        rootVisible: isRootVisible,
        hasHeading,
        hasNavigation,
        hasDanielName
      },
      screenshot: {
        path: screenshotPath,
        sizeBytes: stats.size,
        sizeKB: screenshotSizeKB,
        isBlank
      },
      console: {
        errors: errors.length,
        warnings: warnings.length,
        errorMessages: errors.map(e => e.text)
      }
    };
    
    const reportPath = path.join(OUTPUT_DIR, 'deployment-test-report.json');
    fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
    console.log(`\n📄 Report saved: ${reportPath}`);
    
    // Final verdict
    console.log('\n' + '='.repeat(80));
    console.log('FINAL VERDICT:');
    console.log('='.repeat(80));
    
    const allChecksPassed = isRootVisible && hasHeading && hasNavigation && hasDanielName;
    const noBlankScreen = !isBlank;
    
    if (allChecksPassed && noBlankScreen && errors.length === 0) {
      console.log('✅ PASS: Site is working correctly - NO blank screen');
      console.log('   - All content checks passed');
      console.log('   - Screenshot shows content (not blank)');
      console.log('   - No console errors');
    } else if (allChecksPassed && noBlankScreen) {
      console.log('⚠️  WARNING: Site renders but has console errors');
      console.log('   - Content is visible');
      console.log('   - But console errors should be investigated');
      process.exit(1);
    } else if (isBlank) {
      console.log('❌ FAIL: BLANK WHITE SCREEN DETECTED');
      console.log('   - Screenshot file is very small (< 5KB)');
      console.log('   - This indicates a critical rendering issue');
      process.exit(1);
    } else {
      console.log('❌ FAIL: Site has rendering issues');
      console.log('   - Some content checks failed');
      process.exit(1);
    }
    
  } catch (error) {
    console.error('\n❌ ERROR during testing:');
    console.error(error);
    process.exit(1);
  } finally {
    await browser.close();
  }
}

testDeployedSite().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
