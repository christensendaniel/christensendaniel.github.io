#!/usr/bin/env node

/**
 * Quick check if the deployed site has the correct HTML structure
 * This doesn't require a browser - just fetches the HTML
 * Includes retry logic to handle GitHub Pages propagation delays
 */

const DEPLOYMENT_URL = process.env.DEPLOYMENT_URL || 'https://christensendaniel.com';
const MAX_RETRIES = 3;
const RETRY_DELAY_MS = 5000; // 5 seconds

async function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function fetchDeployment(retryCount = 0) {
  try {
    const response = await fetch(DEPLOYMENT_URL, {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });
    const status = response.status;
    const html = await response.text();
    
    console.log(`HTTP Status: ${status}`);
    
    if (status !== 200) {
      console.log(`❌ ERROR: Expected 200, got ${status}`);
      if (retryCount < MAX_RETRIES) {
        console.log(`   Retrying in ${RETRY_DELAY_MS/1000} seconds... (${retryCount + 1}/${MAX_RETRIES})`);
        await sleep(RETRY_DELAY_MS);
        return fetchDeployment(retryCount + 1);
      }
      process.exit(1);
    }
    
    return html;
  } catch (error) {
    console.error(`❌ Error fetching deployment: ${error.message}`);
    if (retryCount < MAX_RETRIES) {
      console.log(`   Retrying in ${RETRY_DELAY_MS/1000} seconds... (${retryCount + 1}/${MAX_RETRIES})`);
      await sleep(RETRY_DELAY_MS);
      return fetchDeployment(retryCount + 1);
    }
    process.exit(1);
  }
}

async function checkDeployment() {
  console.log(`🔍 Checking deployment at: ${DEPLOYMENT_URL}\n`);
  
  const html = await fetchDeployment();
    
  // Check for critical elements
  const checks = {
    hasRootDiv: html.includes('<div id="root">'),
    hasScriptTag: html.includes('<script'),
    hasReactBundle: html.includes('/assets/index-') && html.includes('.js'),
    hasCSSBundle: html.includes('/assets/index-') && html.includes('.css'),
    hasTitle: html.includes('<title>'),
    hasDaniel: html.includes('Daniel'),
    
    // Bad signs of a broken build
    hasSourceScript: html.includes('src="/src/main.jsx"'),
    hasViteScript: html.includes('/vite.svg')
  };
  
  console.log('\nStructure Checks:');
  console.log(`${checks.hasRootDiv ? '✅' : '❌'} Has <div id="root">`);
  console.log(`${checks.hasScriptTag ? '✅' : '❌'} Has <script> tags`);
  console.log(`${checks.hasReactBundle ? '✅' : '❌'} Has compiled JS bundle (/assets/index-*.js)`);
  console.log(`${checks.hasCSSBundle ? '✅' : '❌'} Has compiled CSS bundle`);
  console.log(`${checks.hasTitle ? '✅' : '❌'} Has <title> tag`);
  
  console.log('\nContent Checks:');
  console.log(`${checks.hasDaniel ? '✅' : '❌'} Contains "Daniel" in HTML`);
  
  console.log('\nDevelopment File Checks (should be false):');
  console.log(`${!checks.hasSourceScript ? '✅' : '❌'} Does NOT reference /src/main.jsx (${checks.hasSourceScript ? 'FOUND - BAD!' : 'not found'})`);
  console.log(`${!checks.hasViteScript ? '✅' : '❌'} Does NOT reference /vite.svg (${checks.hasViteScript ? 'FOUND - BAD!' : 'not found'})`);
  
  // Extract script src
  const scriptMatch = html.match(/<script[^>]+src="([^"]+)"/);
  if (scriptMatch) {
    console.log(`\n📦 Main script: ${scriptMatch[1]}`);
  }
  
  // Extract CSS href
  const cssMatch = html.match(/<link[^>]+href="([^"]+\.css)"/);
  if (cssMatch) {
    console.log(`🎨 Main CSS: ${cssMatch[1]}`);
  }
  
  // Final verdict
  const allGood = checks.hasRootDiv && 
                  checks.hasReactBundle && 
                  checks.hasCSSBundle && 
                  !checks.hasSourceScript &&
                  !checks.hasViteScript;
  
  console.log('\n' + '='.repeat(60));
  if (allGood) {
    console.log('✅ PASS: HTML structure is correct');
    console.log('   The site should be rendering properly.');
    console.log('   If you see a blank screen, it may be a JavaScript');
    console.log('   runtime error or a caching issue.');
  } else {
    console.log('❌ FAIL: HTML structure has issues');
    if (checks.hasSourceScript) {
      console.log('   🔴 CRITICAL: Deploying SOURCE files instead of BUILD');
    }
    process.exit(1);
  }
  console.log('='.repeat(60));
}

checkDeployment();
