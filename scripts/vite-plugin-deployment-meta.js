/**
 * Vite plugin to inject deployment metadata into HTML
 * Adds meta tag with deployment hash to index.html
 */

import { execSync } from 'child_process';

function getGitHash() {
  try {
    return execSync('git rev-parse HEAD', { encoding: 'utf8' }).trim();
  } catch (error) {
    console.warn('Warning: Could not get git hash:', error.message);
    return process.env.GIT_COMMIT_HASH || 'unknown';
  }
}

export function deploymentMetaPlugin() {
  let commitHash;
  
  return {
    name: 'deployment-meta',
    
    configResolved() {
      commitHash = getGitHash();
      console.log(`🔖 Deployment hash: ${commitHash.substring(0, 7)}`);
    },
    
    transformIndexHtml(html) {
      // Inject meta tag with deployment hash before closing </head>
      const metaTag = `<meta name="deployment-hash" content="${commitHash}">`;
      
      // Also inject as a global variable for runtime access
      const scriptTag = `<script>window.__DEPLOYMENT_HASH__ = "${commitHash}";</script>`;
      
      return html
        .replace('</head>', `  ${metaTag}\n  ${scriptTag}\n  </head>`);
    }
  };
}
