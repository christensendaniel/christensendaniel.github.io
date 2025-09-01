#!/usr/bin/env python3
"""
Blog builder script that converts Markdown files to styled HTML pages.
Maintains the same professional styling as the main site.
"""

import os
import re
from datetime import datetime
from pathlib import Path
import markdown
from markdown.extensions import codehilite, fenced_code, tables, toc
import frontmatter

# Blog configuration
BLOG_DIR = Path("blog")
POSTS_DIR = BLOG_DIR / "posts"
TEMPLATE_FILE = BLOG_DIR / "template.html"
OUTPUT_DIR = BLOG_DIR

def read_template():
    """Read the HTML template file."""
    with open(TEMPLATE_FILE, 'r', encoding='utf-8') as f:
        return f.read()

def process_markdown_file(md_file):
    """Process a single markdown file and convert to HTML."""
    with open(md_file, 'r', encoding='utf-8') as f:
        post = frontmatter.load(f)
    
    # Extract metadata
    metadata = post.metadata
    title = metadata.get('title', 'Untitled Post')
    
    # Handle date - could be string or datetime object
    date_value = metadata.get('date', datetime.now())
    if isinstance(date_value, datetime):
        date = date_value.strftime('%Y-%m-%d')
    elif hasattr(date_value, 'strftime'):  # datetime.date object
        date = date_value.strftime('%Y-%m-%d')
    else:
        date = str(date_value)
    
    description = metadata.get('description', '')
    tags = metadata.get('tags', [])
    author = metadata.get('author', 'Daniel B. Christensen')
    
    # Convert markdown to HTML
    md = markdown.Markdown(extensions=[
        'fenced_code',
        'codehilite',
        'tables',
        'toc',
        'attr_list',
        'def_list',
        'footnotes',
        'meta',
        'sane_lists',
        'smarty'
    ])
    
    content_html = md.convert(post.content)
    
    # Generate output filename
    output_filename = md_file.stem + '.html'
    
    return {
        'title': title,
        'date': date,
        'description': description,
        'tags': tags,
        'author': author,
        'content': content_html,
        'filename': output_filename,
        'source': md_file.name
    }

def generate_blog_post(post_data, template):
    """Generate a complete HTML page for a blog post."""
    # Format the date nicely
    try:
        date_obj = datetime.strptime(post_data['date'], '%Y-%m-%d')
        formatted_date = date_obj.strftime('%B %d, %Y')
    except:
        formatted_date = post_data['date']
    
    # Format tags
    tags_html = ''
    if post_data['tags']:
        tags_html = ' '.join([f'<span class="tag">{tag}</span>' for tag in post_data['tags']])
    
    # Replace placeholders in template
    html = template.replace('{{title}}', post_data['title'])
    html = html.replace('{{description}}', post_data['description'])
    html = html.replace('{{author}}', post_data['author'])
    html = html.replace('{{date}}', formatted_date)
    html = html.replace('{{tags}}', tags_html)
    html = html.replace('{{content}}', post_data['content'])
    
    return html

def generate_blog_index(posts):
    """Generate an index page for all blog posts."""
    posts_sorted = sorted(posts, key=lambda x: x['date'], reverse=True)
    
    posts_html = []
    for post in posts_sorted:
        try:
            date_obj = datetime.strptime(post['date'], '%Y-%m-%d')
            formatted_date = date_obj.strftime('%B %d, %Y')
        except:
            formatted_date = post['date']
        
        tags_html = ''
        if post['tags']:
            tags_html = '<div class="post-tags">' + ' '.join([f'<span class="tag">{tag}</span>' for tag in post['tags']]) + '</div>'
        
        post_html = f'''
        <article class="blog-card">
            <h3><a href="{post['filename']}">{post['title']}</a></h3>
            <div class="post-meta">
                <span class="post-date">{formatted_date}</span>
            </div>
            <p class="post-description">{post['description']}</p>
            {tags_html}
            <a href="{post['filename']}" class="read-more">Read More →</a>
        </article>
        '''
        posts_html.append(post_html)
    
    return '\n'.join(posts_html)

def main():
    """Main function to build the blog."""
    # Create necessary directories
    POSTS_DIR.mkdir(parents=True, exist_ok=True)
    
    # Read template
    template = read_template()
    
    # Process all markdown files
    posts = []
    for md_file in POSTS_DIR.glob('*.md'):
        print(f"Processing: {md_file.name}")
        post_data = process_markdown_file(md_file)
        posts.append(post_data)
        
        # Generate HTML for this post
        post_html = generate_blog_post(post_data, template)
        
        # Write HTML file
        output_path = OUTPUT_DIR / post_data['filename']
        with open(output_path, 'w', encoding='utf-8') as f:
            f.write(post_html)
        print(f"  → Generated: {post_data['filename']}")
    
    # Generate index page
    print("\nGenerating blog index...")
    with open(BLOG_DIR / 'index-template.html', 'r', encoding='utf-8') as f:
        index_template = f.read()
    
    posts_list_html = generate_blog_index(posts)
    index_html = index_template.replace('{{posts}}', posts_list_html)
    
    with open(BLOG_DIR / 'index.html', 'w', encoding='utf-8') as f:
        f.write(index_html)
    print("  → Generated: index.html")
    
    print(f"\n✅ Successfully processed {len(posts)} blog posts!")

if __name__ == '__main__':
    main()
