# Blog Management System

This directory contains the blog system for Daniel B. Christensen's portfolio website. The blog uses a static site generator approach for managing technical content.

## Quick Start

1. **Create a new blog post**:
   ```bash
   # Create new markdown file in posts/
   touch blog/posts/YYYY-MM-DD-title.md
   ```

2. **Build the blog**:
   ```bash
   pip install -r requirements.txt
   python build-blog.py
   ```

3. **Deploy**: Push changes to main branch (GitHub Pages auto-deploys)

## Writing Blog Posts

### 1. Create Markdown File

Create a new file in `posts/` with the format: `YYYY-MM-DD-title.md`

### 2. Add Frontmatter

Start your post with YAML frontmatter:

```yaml
---
title: "Your Post Title"
date: YYYY-MM-DD
description: "Brief description for SEO and previews"
tags: ["tag1", "tag2", "tag3"]
author: "Daniel B. Christensen"
---
```

### 3. Write Content

Use standard Markdown syntax. Supported features:

- **Headers**: `#`, `##`, `###`
- **Code blocks**: Fenced with syntax highlighting
- **Lists**: Ordered and unordered
- **Links**: `[text](url)`
- **Images**: `![alt](src)`
- **Tables**: GitHub-flavored markdown tables
- **Bold/Italic**: `**bold**` and `*italic*`

### Example Post Structure

```markdown
---
title: "Building Real-Time Data Pipelines with Apache Flink"
date: 2025-09-01
description: "A deep dive into stream processing architecture at enterprise scale"
tags: ["apache-flink", "streaming", "data-engineering", "real-time"]
author: "Daniel B. Christensen"
---

# Introduction

Your content here...

## Technical Details

More content...

## Conclusion

Wrap up...
```

## Build System

### Dependencies

Install required Python packages:

```bash
pip install -r requirements.txt
```

Required packages:
- `markdown` - Markdown to HTML conversion
- `python-frontmatter` - YAML frontmatter parsing
- `pygments` - Syntax highlighting

### Build Process

The `build-blog.py` script:

1. **Scans** `posts/` directory for `.md` files
2. **Parses** frontmatter and content
3. **Converts** Markdown to HTML
4. **Applies** styling template
5. **Generates** individual post pages
6. **Updates** blog index page

### Build Command

```bash
python build-blog.py
```

This will:
- Convert all `.md` files in `posts/` to HTML
- Generate timestamped HTML files (e.g., `2025-09-01-title.html`)
- Update `index.html` with latest posts
- Apply consistent styling matching main site

## File Structure

```
blog/
├── README.md              # This file (management docs)
├── posts/                 # Markdown source files
│   ├── 2025-08-31-hello-world.md
│   └── YYYY-MM-DD-title.md
├── template.html          # Individual post template
├── index-template.html    # Blog index template
├── index.html            # Generated blog index (auto-generated)
├── 2025-08-31-hello-world.html  # Generated posts (auto-generated)
└── *.html                # Other generated posts
```

### Generated vs Source Files

**Source Files** (edit these):
- `posts/*.md` - Blog post content
- `template.html` - Post page template
- `index-template.html` - Index page template

**Generated Files** (don't edit manually):
- `index.html` - Blog index page
- `YYYY-MM-DD-*.html` - Individual blog posts

## Styling

### Templates

Blog posts use two templates:

1. **`template.html`**: Individual post pages
   - Contains navigation, header, content area, footer
   - Uses placeholder `{{CONTENT}}` for post content
   - Includes meta tags for SEO

2. **`index-template.html`**: Blog index page
   - Lists all posts with previews
   - Includes pagination (if needed)
   - Uses placeholder `{{POSTS}}` for post list

### CSS

Blog styling is defined in:
- `../assets/css/style.css` - Main site styles
- `../assets/css/blog.css` - Blog-specific styles

## Content Guidelines

### Technical Focus

Posts should focus on:
- Data engineering best practices
- Performance optimization techniques
- Real-world implementation stories
- Tool comparisons and recommendations
- Architecture decisions and trade-offs

### Code Examples

- Use syntax highlighting with language specification
- Include complete, runnable examples when possible
- Explain complex code sections
- Link to full implementations when relevant

### SEO Optimization

- Use descriptive titles (50-60 characters)
- Write compelling descriptions (150-160 characters)
- Use relevant tags (3-5 per post)
- Include internal links to other posts/portfolio
- Optimize images with alt text

## Automation

### GitHub Actions (Future Enhancement)

Consider adding automated builds:

```yaml
# .github/workflows/blog-build.yml
name: Build Blog
on:
  push:
    paths: ['blog/posts/**']
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Python
        uses: actions/setup-python@v2
        with:
          python-version: '3.9'
      - name: Install dependencies
        run: pip install -r requirements.txt
      - name: Build blog
        run: python build-blog.py
      - name: Commit changes
        run: |
          git config --local user.email "action@github.com"
          git config --local user.name "GitHub Action"
          git add blog/*.html
          git commit -m "Auto-build blog" || exit 0
          git push
```

### Local Development

For local preview:

```bash
# Start local server
python -m http.server 8000

# Visit blog
open http://localhost:8000/blog/
```

## Maintenance

### Regular Tasks

- **Review posts** for accuracy and relevance
- **Update templates** to match main site styling
- **Optimize images** for web performance
- **Check links** for accuracy
- **Monitor analytics** for popular content

### Backup

Source files in `posts/` directory should be:
- Version controlled with Git
- Backed up separately if desired
- Considered the source of truth

Generated HTML files can be recreated from source at any time.

## Troubleshooting

### Common Issues

1. **Build fails**: Check frontmatter YAML syntax
2. **Missing posts**: Ensure `.md` extension and proper filename format
3. **Styling issues**: Verify template placeholders are correct
4. **Links broken**: Use relative paths for internal links

### Debug Mode

Run build script with verbose output:

```bash
python build-blog.py --verbose  # If implemented
```

---

*This blog system is designed to be simple, maintainable, and focused on content creation rather than complex tooling.*
