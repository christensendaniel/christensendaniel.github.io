import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Layout from '../components/Layout'
import SEO, { StructuredData } from '../components/SEO'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { ArrowLeft } from 'lucide-react'

function BlogPost() {
  const { postId } = useParams()

  // Blog post content - hardcoded for simplicity and performance
  // To add new posts: add to this object and update Blog.jsx list
  const posts = {
    '2025-08-31-hello-world': {
      title: 'Hello World: Building Scalable Data Pipelines',
      author: 'Daniel B. Christensen',
      date: 'August 31, 2025',
      dateISO: '2025-08-31',
      tags: ['data-engineering', 'pipelines', 'snowflake', 'apache-flink'],
      excerpt: 'An introduction to my blog and insights on building enterprise-scale data pipelines at Disney and beyond.',
      content: `
        <p>Welcome to my technical blog! I'm Daniel B. Christensen, a Senior Data Engineer at The Walt Disney Company, and I'm excited to share insights from my journey building data infrastructure at scale.</p>
        
        <h2 id="why-this-blog">Why This Blog?</h2>
        <p>After 7+ years in data engineering, I've accumulated knowledge that I believe can help others navigate the complex world of data pipelines, real-time processing, and cloud infrastructure. This blog will serve as a platform to share:</p>
        <ul>
          <li><strong>Technical deep-dives</strong> into data engineering challenges and solutions</li>
          <li><strong>Best practices</strong> for building scalable, maintainable data systems</li>
          <li><strong>Performance optimization</strong> techniques that have saved companies millions</li>
          <li><strong>Real-world case studies</strong> from my work at Disney, SAVVBI, and VIVBI</li>
        </ul>
        
        <h2 id="what-ive-been-working-on">What I've Been Working On</h2>
        <h3 id="disney-enterprise-scale-real-time-analytics">Disney: Enterprise-Scale Real-Time Analytics</h3>
        <p>At Disney, I've been focused on building systems that can handle scale. Some highlights:</p>
        <ul>
          <li><strong>Performance Optimization</strong>: Improved event-based data query performance by 30% through advanced Snowflake optimization</li>
          <li><strong>Cost Management</strong>: Implemented comprehensive Snowflake cost reduction strategies</li>
          <li><strong>Real-Time Processing</strong>: Built Apache Flink pipelines for streaming analytics</li>
          <li><strong>Data Modeling</strong>: Created ML-ready data models with strict SLA adherence</li>
        </ul>
        
        <h3 id="key-technologies-in-my-stack">Key Technologies in My Stack</h3>
        <ul>
          <li><strong>Streaming</strong>: Apache Flink, Kafka, AWS Kinesis</li>
          <li><strong>Data Warehousing</strong>: Snowflake, BigQuery, PostgreSQL</li>
          <li><strong>Orchestration</strong>: Apache Airflow with custom monitoring</li>
          <li><strong>APIs</strong>: FastAPI for high-throughput data ingestion</li>
          <li><strong>Cloud</strong>: AWS, Azure with infrastructure-as-code</li>
        </ul>
        
        <h2 id="whats-coming">What's Coming</h2>
        <p>I'm planning to cover topics like:</p>
        <ol>
          <li><strong>Building Sub-2-Minute Data Pipelines</strong> - The architecture behind real-time analytics at scale</li>
          <li><strong>Snowflake Cost Optimization</strong> - How to reduced compute costs by 30% and increasing performance</li>
          <li><strong>Apache Flink for Data Engineers</strong> - Practical patterns for stream processing</li>
          <li><strong>API-First Data Platforms</strong> - Lessons from building systems that handle 2M+ requests/month</li>
          <li><strong>Data Quality at Scale</strong> - Monitoring and validation strategies for enterprise data</li>
        </ol>
        
        <h2 id="lets-connect">Let's Connect</h2>
        <p>I'm always interested in discussing data engineering challenges and solutions. Feel free to reach out on <a href="https://linkedin.com/in/dbchristensen">LinkedIn</a> or check out my other work:</p>
        <ul>
          <li><a href="https://christensendaniel.github.io">Portfolio</a></li>
          <li><a href="https://github.com/christensendaniel">GitHub</a></li>
          <li><a href="https://pypi.org/project/paged-list/">PyPI Package: paged-list</a></li>
        </ul>
        <p>Looking forward to sharing more insights of enterprise data engineering!</p>
      `
    },
    '2026-02-17-building-portfolio-site-ai-github-pages': {
      title: 'Building a Modern Portfolio Site with AI: From Static HTML to React',
      author: 'Daniel Christensen',
      date: 'February 17, 2026',
      dateISO: '2026-02-17',
      tags: ['AI', 'GitHub Pages', 'React', 'GitHub Actions', 'Copilot'],
      excerpt: 'How I used GitHub Pages, automated deployments, and AI-assisted development to transform a static HTML site into a modern React portfolio without writing every line myself.',
      content: `
        <p>Every good developer has a portfolio site that lingers in the back of their mind—the one that's been "good enough" for years, gathering dust as their career grows. I'm using mine as a blog to document my journey into learning about AI. Essentially, this is a journal where I am the primary audience.</p>
        
        <p>I started the site with static HTML, inline styles, and a dark mode toggle, all wired together with vanilla JavaScript and an iron will. It worked, but it didn't tell the right story for someone who builds production data systems for a living. It also exposed my front-end weaknesses, as most of my expertise lies in back-end performance.</p>
        
        <p>So, I rebuilt it—with a little help.</p>
        
        <h2 id="start-simple">Start Simple: GitHub Pages as the Foundation</h2>
        
        <p>The goal was zero infrastructure cost and zero maintenance. GitHub Pages checked both boxes. Previously, the site was hosted with a friend, but converting it to GitHub Pages allowed me to park it for free.</p>
        
        <p>The repository is public, hosting is free, and the only real expense is the domain itself—just a few dollars a year for the TLD. Everything else is handled by GitHub.</p>
        
        <p>Setting up a custom domain was straightforward. I added a <code>CNAME</code> file to the repository containing my domain name and updated my DNS provider with GitHub's nameserver records. Within a few minutes, <code>christensendaniel.com</code> was live and serving directly from the repository.</p>
        
        <p>No servers. No infrastructure to maintain. No hosting bills at the end of the month.</p>
        
        <h2 id="deployment-pipeline">The Upgraded Deployment Pipeline: Automate Everything</h2>
        
        <p>Static files work fine until you introduce a build process. The moment you add React, Tailwind, or any compilation step, complexity increases.</p>
        
        <p>GitHub Actions simplified this. I set up a workflow file in <code>.github/workflows/</code> to watch for pushes to <code>main</code>. It runs the build process and automatically deploys the compiled output:</p>
        
        <pre><code>- name: Install dependencies
  run: npm ci

- name: Build
  run: npm run build

- name: Deploy to GitHub Pages
  uses: peaceiris/actions-gh-pages@v3
  with:
    github_token: \${{ secrets.GITHUB_TOKEN }}
    publish_dir: ./dist</code></pre>
        
        <p>One critical detail most tutorials overlook: <strong>deploy <code>./dist</code>, not <code>./</code></strong>. Deploying the repository root means GitHub Pages serves your source files directly. Browsers cannot execute raw JSX. The site will appear blank, the error messages will be confusing, and the fix is not obvious until you know to look for it. Deploy only the build output and update the GitHub Actions settings accordingly. This was the key step I missed when prompting AI for the site upgrade.</p>
        
        <p>It wasn't a wasted opportunity, though. From my professional experience with AI, I've learned that frameworks for testing are invaluable for keeping AI on track. Tests were my guardrails here. A post-deployment verification step ensured the live HTML referenced compiled asset bundles, not raw source files. AI can be empowering, but tests enable AI debugging to happen in an automated and reliable way.</p>
        
        <h2 id="ai-conversion">The AI Conversion: From Static HTML to React</h2>
        
        <p>This is where the story gets interesting.</p>
        
        <p>Converting a hand-written static site to React is the kind of repetitive, pattern-heavy task that AI handles exceptionally well. The structure is predictable, the patterns repeat, and decisions are largely mechanical: isolate sections, extract components, integrate a router, repeat.</p>
        
        <p>Using GitHub Copilot with detailed prompts, I followed a clear sequence for the conversion:</p>
        
        <ol>
          <li><strong>Establish the foundation</strong>—Vite, React Router, shadcn/ui, and Tailwind. The component library decision was significant. shadcn/ui offers composable, unstyled-by-default components that don't interfere with design intentions.</li>
          <li><strong>Convert pages one by one</strong>—Each static HTML page became a React component. Navigation evolved into a shared <code>Layout</code> wrapping each route. The dark mode toggle (previously held together with JavaScript event listeners) became a proper <code>ThemeProvider</code> with <code>localStorage</code> persistence.</li>
          <li><strong>Wire up routing and deployment</strong>—BrowserRouter replaced HashRouter since hash routes look unprofessional and are poorly handled by search engines. GitHub Pages required a <code>404.html</code> redirect trick for direct URL access with BrowserRouter, but that's a one-time setup.</li>
        </ol>
        
        <p>AI didn't write perfect code on the first try. It rarely does. But it shortened the gap between "I know what I want" and "I have a working prototype to iterate on." Prompts became conversations, conversations became components, and components became pages.</p>
        
        <h2 id="what-made-it-work">What Made It Work</h2>
        
        <p>Several things contributed to making the AI-assisted approach productive instead of frustrating:</p>
        
        <ul>
          <li><strong>Specific prompts beat vague ones</strong>—For example, "Convert this navigation to use shadcn/ui NavigationMenu with a hamburger Sheet on mobile" produces something useful, but "Make the nav better" generates unhelpful noise.</li>
          <li><strong>Tests as guardrails</strong>—Adding Jest and React Testing Library early on ensured every AI-generated component could be verified immediately. When Playwright deployment tests were incorrectly triggered by Jest, the error logs pinpointed the issue, and a targeted AI prompt resolved it in minutes.</li>
          <li><strong>Iterative over big bang</strong>—Converting one page or component at a time kept the scope manageable, helped catch regressions early, and made the whole process feel less overwhelming.</li>
        </ul>
        
        <h2 id="the-result">The Result</h2>
        
        <p>The outcome is a portfolio site that finally reflects the quality of work I do professionally.</p>
        
        <ul>
          <li><strong>React with proper routing</strong></li>
          <li><strong>Automated deployments with verification</strong></li>
          <li>A blog that will grow over time and is SEO-friendly.</li>
        </ul>
        
        <p>The infrastructure is boring in the best way possible—push to <code>main</code>, tests run, the build deploys, and the site updates. It fades into the background, letting the content take center stage.</p>
        
        <p>That's the goal. The site should be invisible. The work should speak.</p>
        
        <p>Have questions about the setup? Want to see the deployment workflow in detail? The repository is public at <a href="https://github.com/christensendaniel" target="_blank" rel="noopener noreferrer">github.com/christensendaniel</a>, and the website is live at <a href="https://christensendaniel.com" target="_blank" rel="noopener noreferrer">ChristensenDaniel.com</a>.</p>
      `
    }
  }

  const post = posts[postId]

  if (!post) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">Sorry, the blog post you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/blog">← Back to Blog</Link>
          </Button>
        </div>
      </Layout>
    )
  }

  // Article structured data
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": post.excerpt,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "datePublished": post.dateISO,
    "url": `https://christensendaniel.com/blog/${postId}/`
  }

  // Breadcrumb structured data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://christensendaniel.com/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://christensendaniel.com/blog/" },
      { "@type": "ListItem", "position": 3, "name": post.title, "item": `https://christensendaniel.com/blog/${postId}/` }
    ]
  }

  return (
    <Layout>
      <SEO
        title={post.title}
        description={post.excerpt}
        canonical={`/blog/${postId}/`}
        type="article"
        keywords={post.tags.join(', ')}
        article={{
          publishedTime: post.dateISO,
          author: post.author,
          tags: post.tags
        }}
      />
      <StructuredData data={articleSchema} />
      <StructuredData data={breadcrumbSchema} />
      <article className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild className="mb-8">
            <Link to="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
          
          <Card className="max-w-4xl mx-auto">
            <CardHeader className="space-y-4">
              <CardTitle className="text-4xl font-bold">{post.title}</CardTitle>
              <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                <span>By {post.author}</span>
                <span>•</span>
                <span>{post.date}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                    {tag}
                  </span>
                ))}
              </div>
            </CardHeader>

            <CardContent className="prose prose-lg dark:prose-invert max-w-none">
              <div dangerouslySetInnerHTML={{ __html: post.content }} />
            </CardContent>
          </Card>
        </div>
      </article>
    </Layout>
  )
}

export default BlogPost
