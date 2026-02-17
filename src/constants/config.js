/**
 * Site Configuration
 * 
 * Centralized configuration for URLs, social links, and site metadata.
 * This prevents hardcoded values scattered throughout the codebase.
 */

export const SITE_CONFIG = {
  // Base site URL
  baseUrl: 'https://christensendaniel.com',
  
  // Site metadata
  siteName: 'Daniel Christensen',
  siteTitle: 'Daniel Christensen | Full Stack Data Engineer',
  author: 'Daniel B. Christensen',
  
  // Social and external links
  social: {
    github: 'https://github.com/christensendaniel',
    githubRepo: 'https://github.com/christensendaniel/christensendaniel.github.io',
    linkedin: 'https://linkedin.com/in/dbchristensen',
    pypi: 'https://pypi.org/project/paged-list/',
  },
  
  // Schema.org context for structured data
  schemaContext: 'https://schema.org',
}

/**
 * Generate canonical URL for a given path
 * @param {string} path - The path (e.g., '/blog' or '/skills')
 * @returns {string} Full canonical URL
 */
export function getCanonicalUrl(path) {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`
  // Remove trailing slash unless it's the root path
  const cleanPath = normalizedPath === '/' ? normalizedPath : normalizedPath.replace(/\/$/, '')
  return `${SITE_CONFIG.baseUrl}${cleanPath}`
}

/**
 * Generate structured data breadcrumb schema
 * @param {Array<{name: string, path: string}>} breadcrumbs - Array of breadcrumb items
 * @returns {Object} Schema.org BreadcrumbList
 */
export function getBreadcrumbSchema(breadcrumbs) {
  return {
    '@context': SITE_CONFIG.schemaContext,
    '@type': 'BreadcrumbList',
    itemListElement: breadcrumbs.map((crumb, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: crumb.name,
      item: getCanonicalUrl(crumb.path),
    })),
  }
}
