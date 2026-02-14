#!/usr/bin/env node

/**
 * Generate version.json file with deployment metadata
 * This file is created during the build process and includes:
 * - Git commit hash
 * - Branch name
 * - Build timestamp
 * - Deployment URL
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function getGitInfo() {
  try {
    const hash = execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
    const shortHash = execSync('git rev-parse --short HEAD', { encoding: 'utf8' }).trim();
    const branch = execSync('git rev-parse --abbrev-ref HEAD', { encoding: 'utf8' }).trim();
    
    return {
      hash,
      shortHash,
      branch
    };
  } catch (error) {
    console.warn('Warning: Could not retrieve git information:', error.message);
    const fallbackHash = process.env.GIT_COMMIT_HASH || 'unknown';
    return {
      hash: fallbackHash,
      shortHash: fallbackHash !== 'unknown' ? fallbackHash.substring(0, 7) : 'unknown',
      branch: process.env.GIT_BRANCH || 'unknown'
    };
  }
}

function generateVersion() {
  const gitInfo = getGitInfo();
  const timestamp = new Date().toISOString();
  
  const version = {
    commitHash: gitInfo.hash,
    commitHashShort: gitInfo.shortHash,
    branch: gitInfo.branch,
    buildTimestamp: timestamp,
    deploymentUrl: process.env.DEPLOYMENT_URL || 'https://christensendaniel.com',
    buildDate: new Date().toISOString().split('T')[0],
    buildTime: new Date().toISOString().split('T')[1].split('.')[0]
  };
  
  console.log('📦 Generated version metadata:');
  console.log(`   Commit: ${version.commitHashShort} (${version.commitHash})`);
  console.log(`   Branch: ${version.branch}`);
  console.log(`   Build time: ${version.buildTimestamp}`);
  console.log(`   Deployment URL: ${version.deploymentUrl}`);
  
  return version;
}

// Write version.json to dist directory
function writeVersionFile(distDir = 'dist') {
  const version = generateVersion();
  const versionPath = path.join(process.cwd(), distDir, 'version.json');
  
  // Ensure dist directory exists
  const distPath = path.join(process.cwd(), distDir);
  if (!fs.existsSync(distPath)) {
    console.error(`❌ Error: dist directory does not exist at ${distPath}`);
    console.error('   Please run "npm run build" first');
    process.exit(1);
  }
  
  fs.writeFileSync(versionPath, JSON.stringify(version, null, 2));
  console.log(`✅ Version file written to ${versionPath}`);
  
  return version;
}

// If run directly
if (import.meta.url === `file://${process.argv[1]}`) {
  writeVersionFile();
}

export { generateVersion, writeVersionFile };
