/**
 * Mock for blogData.js - Used during Jest testing
 * Jest doesn't understand Vite's import.meta.glob, so we provide static mock data
 */

// Mock blog post data for testing
const mockPosts = [
  {
    id: '2026-02-17-building-portfolio-site-ai-github-pages',
    title: 'Building a Modern Portfolio Site with AI: From Static HTML to React',
    author: 'Daniel Christensen',
    date: 'February 17, 2026',
    dateISO: '2026-02-17',
    description: 'How I used GitHub Pages, automated deployments, and AI-assisted development to transform a static HTML site into a modern React portfolio without writing every line myself.',
    tags: ['AI', 'GitHub Pages', 'React', 'GitHub Actions', 'Copilot'],
    excerpt: 'How I used GitHub Pages, automated deployments, and AI-assisted development to transform a static HTML site into a modern React portfolio without writing every line myself.',
    content: '<p>Mock content for testing</p>'
  },
  {
    id: '2025-10-04-training-llm-part-5-evaluation-deployment-conclusions',
    title: 'Training My Own LLM Part 5: Evaluation, Deployment, and Honest Conclusions',
    author: 'Daniel Christensen',
    date: 'October 4, 2025',
    dateISO: '2025-10-04',
    description: 'How the model actually performed, what a local deployment looked like, why I stopped before fine-tuning, and the honest verdict on whether training your own LLM from scratch is worth it.',
    tags: ['LLM', 'Machine Learning', 'Deployment', 'AI', 'Lessons Learned'],
    excerpt: 'How the model actually performed, what a local deployment looked like, why I stopped before fine-tuning, and the honest verdict on whether training your own LLM from scratch is worth it.',
    content: '<p>Mock content for testing</p>'
  },
  {
    id: '2025-09-06-training-llm-part-1-motivation-and-architecture',
    title: 'Training My Own LLM Part 1: Why I Did It and What I Was Getting Into',
    author: 'Daniel Christensen',
    date: 'September 6, 2025',
    dateISO: '2025-09-06',
    description: 'The motivation behind training a custom large language model from scratch, the architectural decisions that shaped the project, and the honest reality of working within consumer hardware constraints.',
    tags: ['LLM', 'Machine Learning', 'GPT-2', 'Deep Learning', 'AI'],
    excerpt: 'The motivation behind training a custom large language model from scratch, the architectural decisions that shaped the project, and the honest reality of working within consumer hardware constraints.',
    content: '<p>Mock content for testing</p>'
  },
  {
    id: '2025-08-31-hello-world',
    title: 'Hello World: Building Scalable Data Pipelines',
    author: 'Daniel B. Christensen',
    date: 'August 31, 2025',
    dateISO: '2025-08-31',
    description: 'An introduction to my blog and insights on building enterprise-scale data pipelines at Disney and beyond.',
    tags: ['data-engineering', 'pipelines', 'snowflake', 'apache-flink'],
    excerpt: 'An introduction to my blog and insights on building enterprise-scale data pipelines at Disney and beyond.',
    content: '<p>Mock content for testing</p>'
  }
];

export function getAllPosts() {
  return [...mockPosts];
}

export function getPostMetadata() {
  return mockPosts.map(post => ({
    id: post.id,
    title: post.title,
    date: post.date,
    description: post.description,
    tags: post.tags
  }));
}

export function getPostById(postId) {
  return mockPosts.find(post => post.id === postId) || null;
}

export function getPostsByTag(tag) {
  return mockPosts.filter(post => 
    post.tags && post.tags.includes(tag)
  );
}

export function getAllTags() {
  const tagSet = new Set();
  mockPosts.forEach(post => {
    if (post.tags) {
      post.tags.forEach(tag => tagSet.add(tag));
    }
  });
  return Array.from(tagSet).sort();
}
