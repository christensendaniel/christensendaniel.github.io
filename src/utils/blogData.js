/**
 * Blog Data Utilities
 * 
 * This module provides utilities for loading and managing blog post data.
 * Blog posts are stored as individual JSON files in src/data/blog/ directory.
 * 
 * Each blog post JSON file should have the following structure:
 * {
 *   "id": "YYYY-MM-DD-slug",
 *   "title": "Post Title",
 *   "author": "Author Name",
 *   "date": "Month DD, YYYY",
 *   "dateISO": "YYYY-MM-DD",
 *   "description": "Brief description for listings",
 *   "tags": ["tag1", "tag2"],
 *   "excerpt": "Longer excerpt for SEO",
 *   "content": "Full HTML content of the post"
 * }
 */

// Import all blog post files dynamically
const blogPostModules = import.meta.glob('/src/data/blog/*.json', { eager: true })

/**
 * Get all blog posts sorted by date (newest first)
 * @returns {Array} Array of blog post metadata (without full content)
 */
export function getAllPosts() {
  const posts = Object.values(blogPostModules).map(module => module.default)
  
  // Sort by date (newest first)
  return posts.sort((a, b) => {
    const dateA = new Date(a.dateISO)
    const dateB = new Date(b.dateISO)
    return dateB - dateA
  })
}

/**
 * Get metadata for all posts (id, title, date, description, tags)
 * Excludes heavy content and excerpt fields for listing pages
 * @returns {Array} Array of blog post metadata objects
 */
export function getPostMetadata() {
  return getAllPosts().map(post => ({
    id: post.id,
    title: post.title,
    date: post.date,
    description: post.description,
    tags: post.tags
  }))
}

/**
 * Get a single blog post by ID
 * @param {string} postId - The post ID (e.g., "2025-08-31-hello-world")
 * @returns {Object|null} The full blog post object or null if not found
 */
export function getPostById(postId) {
  const posts = getAllPosts()
  return posts.find(post => post.id === postId) || null
}

/**
 * Get posts filtered by tag
 * @param {string} tag - The tag to filter by
 * @returns {Array} Array of posts with the specified tag
 */
export function getPostsByTag(tag) {
  return getAllPosts().filter(post => 
    post.tags && post.tags.includes(tag)
  )
}

/**
 * Get all unique tags from all posts
 * @returns {Array} Array of unique tag strings
 */
export function getAllTags() {
  const posts = getAllPosts()
  const tagSet = new Set()
  
  posts.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => tagSet.add(tag))
    }
  })
  
  return Array.from(tagSet).sort()
}
