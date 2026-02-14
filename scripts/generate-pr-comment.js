#!/usr/bin/env node

/**
 * PR Comment script for deployment status
 * This script posts deployment status and screenshot links to the PR
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const screenshotsDir = path.join(__dirname, '..', 'screenshots');
const summaryPath = path.join(screenshotsDir, 'summary.json');

console.log('💬 Generating PR comment...\n');

// Read summary
let summary;
try {
  summary = JSON.parse(fs.readFileSync(summaryPath, 'utf8'));
} catch (error) {
  console.error('❌ Could not read summary.json');
  process.exit(1);
}

// Generate markdown comment
const timestamp = new Date(summary.timestamp).toLocaleString();
const status = summary.failedPages === 0 ? '✅ SUCCESS' : '⚠️ WARNING';

let comment = `## ${status} - Deployment Verification Report\n\n`;
comment += `**Deployment Time:** ${timestamp}\n`;
comment += `**Base URL:** ${summary.baseUrl}\n\n`;
comment += `### Summary\n`;
comment += `- Total Pages: ${summary.totalPages}\n`;
comment += `- ✅ Successful: ${summary.successfulPages}\n`;
comment += `- ❌ Failed: ${summary.failedPages}\n\n`;

comment += `### Page Details\n\n`;
comment += `| Page | Status | HTTP Status | Console Errors |\n`;
comment += `|------|--------|-------------|----------------|\n`;

summary.results.forEach(result => {
  const statusIcon = result.success ? '✅' : '❌';
  const httpStatus = result.status || 'N/A';
  const errors = result.consoleErrors !== undefined ? result.consoleErrors : 'N/A';
  const errorInfo = result.error ? `<br>${result.error}` : '';
  comment += `| ${result.page} | ${statusIcon} | ${httpStatus} | ${errors}${errorInfo} |\n`;
});

comment += `\n### Screenshots\n\n`;
comment += `Screenshots have been captured and attached as artifacts to this workflow run.\n`;
comment += `You can download them from the Actions tab.\n\n`;

comment += `### Deployment URLs\n`;
comment += `- [Primary Site](https://christensendaniel.com)\n`;
comment += `- [GitHub Pages](https://christensendaniel.github.io)\n\n`;

if (summary.failedPages > 0) {
  comment += `### ⚠️ Action Required\n`;
  comment += `Some pages failed verification. Please check the screenshots and logs for details.\n`;
}

// Output comment to file for GitHub Actions
const commentPath = path.join(screenshotsDir, 'pr-comment.md');
fs.writeFileSync(commentPath, comment);

console.log('Comment generated:');
console.log('='.repeat(60));
console.log(comment);
console.log('='.repeat(60));
console.log(`\n✅ Comment saved to: ${commentPath}`);

// Also output to stdout for GitHub Actions
if (process.env.GITHUB_STEP_SUMMARY) {
  fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, comment);
  console.log('✅ Added to GitHub Step Summary');
}

process.exit(0);
