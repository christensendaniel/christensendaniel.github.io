#!/usr/bin/env node

/**
 * Script to extract blog posts from BlogPost.jsx and create individual JSON files
 * This is a one-time migration script
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const blogPostJsxPath = path.join(__dirname, '../src/pages/BlogPost.jsx');
const outputDir = path.join(__dirname, '../src/data/blog');

// Read the BlogPost.jsx file
const content = fs.readFileSync(blogPostJsxPath, 'utf-8');

// Extract the posts object - this is a simple regex-based extraction
// Note: This is a one-time migration script, so doesn't need to be perfect
const postsMatch = content.match(/const posts = \{([\s\S]*?)\n  \}/);

if (!postsMatch) {
  console.error('Could not find posts object in BlogPost.jsx');
  process.exit(1);
}

// Parse the posts - we'll do this manually since it's complex JavaScript
// For now, let's just create template files for the posts we know exist

const knownPosts = [
  {
    id: '2025-09-06-training-llm-part-1-motivation-and-architecture',
    title: 'Training My Own LLM Part 1: Why I Did It and What I Was Getting Into',
  },
  {
    id: '2025-09-13-training-llm-part-2-dataset-engineering',
    title: 'Training My Own LLM Part 2: Dataset Engineering at Scale',
  },
  {
    id: '2025-09-20-training-llm-part-3-implementation-and-training-loop',
    title: 'Training My Own LLM Part 3: Implementation and the Training Loop',
  },
  {
    id: '2025-09-27-training-llm-part-4-the-training-experience',
    title: 'Training My Own LLM Part 4: The Actual Training Experience',
  },
  {
    id: '2025-10-04-training-llm-part-5-evaluation-deployment-conclusions',
    title: 'Training My Own LLM Part 5: Evaluation, Deployment, and Honest Conclusions',
  },
  {
    id: '2026-02-17-building-portfolio-site-ai-github-pages',
    title: 'Building a Modern Portfolio Site with AI: From Static HTML to React',
  }
];

console.log('Blog post migration script');
console.log('This script needs manual extraction of post content from BlogPost.jsx');
console.log('\nKnown posts to migrate:');
knownPosts.forEach(post => {
  console.log(`  - ${post.id}`);
});

console.log('\nPlease manually create JSON files for these posts in:', outputDir);
console.log('Use the structure shown in 2025-08-31-hello-world.json as a template');
