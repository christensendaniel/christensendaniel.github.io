# Blog Architecture Documentation

## Overview

The blog system uses a data-driven architecture where blog posts are stored as individual JSON files, loaded dynamically by the application. This approach provides excellent scalability and maintainability.

## Architecture

### File Structure

```
src/
├── data/
│   └── blog/                    # Blog post data directory
│       ├── 2025-08-31-hello-world.json
│       ├── 2025-09-06-training-llm-part-1-motivation-and-architecture.json
│       └── ...                  # One JSON file per blog post
├── utils/
│   ├── blogData.js             # Blog data utilities
│   └── __mocks__/
│       └── blogData.js         # Jest mock for testing
└── pages/
    ├── Blog.jsx                # Blog listing page
    └── BlogPost.jsx            # Individual blog post page
```

### Components

#### 1. Blog Data Files (`src/data/blog/*.json`)

Each blog post is a separate JSON file with this structure:

```json
{
  "id": "YYYY-MM-DD-slug-title",
  "title": "Post Title",
  "author": "Author Name",
  "date": "Month DD, YYYY",
  "dateISO": "YYYY-MM-DD",
  "description": "Brief description for blog listing",
  "tags": ["tag1", "tag2", "tag3"],
  "excerpt": "Longer excerpt used for SEO meta description",
  "content": "<p>Full HTML content of the blog post</p>"
}
```

**Field Descriptions:**

- `id`: Unique identifier, used in URL (format: `YYYY-MM-DD-slug`)
- `title`: Post title shown in headings and listings
- `author`: Author name for byline
- `date`: Human-readable date (e.g., "February 17, 2026")
- `dateISO`: ISO 8601 date for sorting and structured data (e.g., "2026-02-17")
- `description`: Brief summary for blog listing page
- `tags`: Array of tags for categorization
- `excerpt`: Longer description for SEO purposes
- `content`: Full HTML content (can include headings, paragraphs, lists, code blocks, etc.)

#### 2. Blog Data Utilities (`src/utils/blogData.js`)

Provides functions to load and manage blog post data:

```javascript
import { getAllPosts, getPostMetadata, getPostById, getPostsByTag, getAllTags } from '../utils/blogData'

// Get all posts sorted by date (newest first)
const posts = getAllPosts()

// Get just metadata for listing page (excludes content and excerpt)
const postList = getPostMetadata()

// Get a specific post by ID
const post = getPostById('2025-08-31-hello-world')

// Filter posts by tag
const llmPosts = getPostsByTag('LLM')

// Get all unique tags across all posts
const tags = getAllTags()
```

**Implementation Details:**

- Uses Vite's `import.meta.glob()` to import all JSON files in `src/data/blog/`
- Automatically sorts posts by `dateISO` in descending order (newest first)
- Posts are eagerly loaded at build time for optimal performance
- For Jest tests, a mock implementation is provided in `__mocks__/blogData.js`

#### 3. Blog Listing Page (`src/pages/Blog.jsx`)

Displays all blog posts in a card-based layout:

```javascript
import { getPostMetadata } from '../utils/blogData'

function Blog() {
  const blogPosts = getPostMetadata()
  
  return (
    // Renders cards for each post with title, date, description, tags
  )
}
```

#### 4. Blog Post Page (`src/pages/BlogPost.jsx`)

Displays individual blog post with full content:

```javascript
import { getPostById } from '../utils/blogData'

function BlogPost() {
  const { postId } = useParams()
  const post = getPostById(postId)
  
  if (!post) {
    return <NotFoundPage />
  }
  
  return (
    // Renders full post with SEO metadata, structured data
  )
}
```

## Adding a New Blog Post

### Step 1: Create JSON File

Create a new file in `src/data/blog/` with the naming pattern `YYYY-MM-DD-slug.json`:

```json
{
  "id": "2026-03-15-my-awesome-post",
  "title": "My Awesome Post",
  "author": "Daniel Christensen",
  "date": "March 15, 2026",
  "dateISO": "2026-03-15",
  "description": "A brief summary of what this post is about.",
  "tags": ["Data Engineering", "Python", "Tutorial"],
  "excerpt": "A longer description that provides more context about the post content for search engines and social media.",
  "content": "<p>Your post content here with HTML formatting.</p><h2>Section Heading</h2><p>More content...</p>"
}
```

### Step 2: Build and Deploy

```bash
npm run build
```

That's it! The new post will automatically:
- Appear in the blog listing
- Be accessible at `/blog/2026-03-15-my-awesome-post`
- Be included in the sitemap
- Have proper SEO metadata

## Scalability Considerations

### Current Design Benefits

1. **File Size**: Each blog post is a separate small file instead of one massive component
2. **Build Performance**: Vite only rebuilds changed files
3. **Git Diffs**: Changes to one post don't create noise in diffs
4. **Parallel Editing**: Multiple people can work on different posts simultaneously

### Performance Characteristics

- **Build Time**: All JSON files loaded eagerly at build time using `import.meta.glob({ eager: true })`
- **Bundle Size**: Blog data included in main bundle (fine for ~300 posts, ~1-2MB total)
- **Runtime Performance**: No network requests needed, instant page loads

### Future Optimizations (if needed at 300+ posts)

If the blog grows beyond 300 posts and bundle size becomes a concern, consider:

1. **Code Splitting**: Use dynamic imports to load post content on-demand
   ```javascript
   const blogPostModules = import.meta.glob('/src/data/blog/*.json')
   ```

2. **Pagination**: Show 10-20 posts per page in the listing

3. **Static Generation**: Pre-render all blog post pages at build time

4. **Search Index**: Build a search index at build time for fast client-side search

5. **RSS Feed**: Generate RSS/Atom feed from blog data

## Testing

### Unit Tests

The blog utilities are tested using Jest. A mock implementation is provided because Jest doesn't support Vite's `import.meta.glob`.

```javascript
// src/setupTests.js
jest.mock('./utils/blogData')

// Tests use the mock implementation from src/utils/__mocks__/blogData.js
```

### Manual Testing Checklist

When adding/modifying blog posts:

1. ✅ Run `npm run build` - should succeed without errors
2. ✅ Check blog listing page shows all posts
3. ✅ Verify individual post pages load correctly
4. ✅ Confirm SEO metadata is correct (title, description, canonical URL)
5. ✅ Test "Back to Blog" navigation
6. ✅ Verify tags are displayed correctly
7. ✅ Check responsive layout on mobile

## Troubleshooting

### Post not appearing in listing

1. Verify JSON file is in `src/data/blog/`
2. Check JSON syntax is valid (use a JSON validator)
3. Ensure `id` field matches filename pattern
4. Rebuild the application (`npm run build`)

### Build errors

1. Check all JSON files have valid syntax
2. Ensure all required fields are present (id, title, date, dateISO, etc.)
3. Verify content HTML is properly escaped for JSON (quotes must be escaped)

### Tests failing

1. Update mock data in `src/utils/__mocks__/blogData.js` if structure changed
2. Run `npm test -- -u` to update snapshots if UI changed intentionally

## Best Practices

### Content Guidelines

1. **HTML Content**: Keep content semantic (use `<h2>`, `<p>`, `<ul>`, `<code>`, etc.)
2. **IDs**: Always follow `YYYY-MM-DD-slug` pattern for consistency
3. **Dates**: Keep `date` and `dateISO` in sync
4. **Tags**: Use consistent tag names (check existing tags with `getAllTags()`)
5. **Descriptions**: Keep under 160 characters for SEO
6. **Excerpts**: Expand on description, can be 200-300 characters

### Git Workflow

1. Create branch for new post(s)
2. Add JSON file(s) to `src/data/blog/`
3. Test locally with `npm run dev`
4. Commit with clear message: "Add blog post: [title]"
5. Create PR and review

### SEO Optimization

Each post automatically gets:
- Proper `<title>` and `<meta description>` tags
- Open Graph metadata for social sharing
- JSON-LD structured data (Article schema)
- Canonical URLs
- Breadcrumb navigation schema

No additional configuration needed!

## Migration from Old System

The previous system had hardcoded posts in `BlogPost.jsx`. All posts have been migrated to the new JSON format. The old code has been removed.

**Changes:**
- `BlogPost.jsx`: 830 lines → 115 lines (86% reduction)
- `Blog.jsx`: Hardcoded array → Dynamic data loading
- All 7 existing posts migrated to JSON files
- All tests updated and passing
- Build and deployment verified working

## Future Enhancements

Potential features that the current architecture supports:

1. **Full-text search**: Build client-side search index from post data
2. **Tag filtering**: Add tag filter UI to blog listing
3. **Related posts**: Show related posts based on shared tags
4. **RSS feed**: Generate feed from post metadata
5. **Table of contents**: Auto-generate from content headings
6. **Reading time**: Calculate from content length
7. **Series support**: Link posts in a series (like the LLM series)
8. **Comments**: Add comment system integration
9. **Draft posts**: Support draft status in JSON
10. **Scheduled posts**: Filter by date to hide future posts
