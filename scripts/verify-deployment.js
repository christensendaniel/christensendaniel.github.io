#!/usr/bin/env node

/**
 * Post-deployment verification script
 * This script verifies that the deployed site is working correctly
 */

import https from 'https';
import http from 'http';

const DEPLOYMENT_URLS = [
  'https://christensendaniel.com',
  'https://christensendaniel.github.io'
];

const EXPECTED_CONTENT = [
  'root',           // The div id="root" should be present
  '<script',        // JavaScript should be loaded
  'Daniel'          // Some expected content from the site
];

console.log('🔍 Starting post-deployment verification...\n');

async function checkUrl(url) {
  return new Promise((resolve, reject) => {
    const client = url.startsWith('https') ? https : http;
    
    console.log(`Checking: ${url}`);
    
    const req = client.get(url, (res) => {
      let data = '';
      
      console.log(`  Status: ${res.statusCode}`);
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        if (res.statusCode === 200) {
          console.log('  ✅ Status code: 200 OK');
          
          // Check for expected content
          let contentChecks = true;
          EXPECTED_CONTENT.forEach(content => {
            if (data.includes(content)) {
              console.log(`  ✅ Found expected content: "${content}"`);
            } else {
              console.log(`  ❌ Missing expected content: "${content}"`);
              contentChecks = false;
            }
          });
          
          // Check for 404 indicators
          if (data.toLowerCase().includes('404') || 
              data.toLowerCase().includes('not found') ||
              data.toLowerCase().includes('page not found')) {
            console.log('  ❌ WARNING: Page appears to be a 404 error page');
            contentChecks = false;
          }
          
          resolve({ url, success: contentChecks, statusCode: res.statusCode, dataLength: data.length });
        } else {
          console.log(`  ❌ Unexpected status code: ${res.statusCode}`);
          resolve({ url, success: false, statusCode: res.statusCode });
        }
      });
    });
    
    req.on('error', (error) => {
      console.log(`  ❌ Error: ${error.message}`);
      resolve({ url, success: false, error: error.message });
    });
    
    req.setTimeout(10000, () => {
      req.destroy();
      console.log('  ❌ Request timeout');
      resolve({ url, success: false, error: 'timeout' });
    });
  });
}

async function main() {
  const results = [];
  
  for (const url of DEPLOYMENT_URLS) {
    const result = await checkUrl(url);
    results.push(result);
    console.log('');
  }
  
  // Summary
  console.log('='.repeat(60));
  console.log('DEPLOYMENT VERIFICATION SUMMARY:');
  console.log('='.repeat(60));
  
  const allSuccessful = results.every(r => r.success);
  
  results.forEach(result => {
    const status = result.success ? '✅ PASSED' : '❌ FAILED';
    console.log(`${status} - ${result.url}`);
    if (result.statusCode) {
      console.log(`         Status: ${result.statusCode}`);
    }
    if (result.dataLength) {
      console.log(`         Content size: ${result.dataLength} bytes`);
    }
    if (result.error) {
      console.log(`         Error: ${result.error}`);
    }
  });
  
  console.log('='.repeat(60));
  
  if (allSuccessful) {
    console.log('✅ ALL DEPLOYMENT CHECKS PASSED!');
    process.exit(0);
  } else {
    console.log('❌ SOME DEPLOYMENT CHECKS FAILED!');
    console.log('   The site may not be accessible or displaying correctly.');
    process.exit(1);
  }
}

main().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
