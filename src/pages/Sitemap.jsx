import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import SEO, { StructuredData } from '../components/SEO'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { ArrowLeft } from 'lucide-react'

function Sitemap() {
  // Breadcrumb structured data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://christensendaniel.com/" },
      { "@type": "ListItem", "position": 2, "name": "Sitemap", "item": "https://christensendaniel.com/sitemap/" }
    ]
  }

  const pages = [
    {
      title: "Home",
      path: "/",
      description: "Full Stack Data Engineer portfolio homepage with overview of expertise and experience"
    },
    {
      title: "Skills",
      path: "/skills",
      description: "Comprehensive technical skills in data engineering, programming, cloud platforms, and tools"
    },
    {
      title: "Portfolio",
      path: "/portfolio",
      description: "Data engineering portfolio with case studies and technical achievements"
    },
    {
      title: "Data Engineering Portfolio",
      path: "/portfolio/data-engineering",
      description: "Detailed case studies of enterprise-scale data engineering projects"
    },
    {
      title: "Blog",
      path: "/blog",
      description: "Technical blog with insights on data engineering, AI, and cloud architecture"
    }
  ]

  const blogPosts = [
    {
      title: "Building a Modern Portfolio Site with AI: From Static HTML to React",
      path: "/blog/2026-02-17-building-portfolio-site-ai-github-pages",
      description: "How I used GitHub Pages, automated deployments, and AI-assisted development to transform a static HTML site into a modern React portfolio"
    },
    {
      title: "Training My Own LLM Part 5: Evaluation, Deployment, and Honest Conclusions",
      path: "/blog/2025-10-04-training-llm-part-5-evaluation-deployment-conclusions",
      description: "How the model actually performed, what a local deployment looked like, and the honest verdict on whether training your own LLM from scratch is worth it"
    },
    {
      title: "Training My Own LLM Part 4: The Actual Training Experience",
      path: "/blog/2025-09-27-training-llm-part-4-the-training-experience",
      description: "What 70 hours of GPU training actually looks like — the failures, the recoveries, and what the loss curves revealed"
    },
    {
      title: "Training My Own LLM Part 3: Implementation and the Training Loop",
      path: "/blog/2025-09-20-training-llm-part-3-implementation-and-training-loop",
      description: "The actual model configuration, memory arithmetic that dictated every decision, and the checkpoint strategy earned through repeated failures"
    },
    {
      title: "Training My Own LLM Part 2: Dataset Engineering at Scale",
      path: "/blog/2025-09-13-training-llm-part-2-dataset-engineering",
      description: "How I prepared 8.2 million training examples from OpenWebText and what tokenization looks like at scale"
    },
    {
      title: "Training My Own LLM Part 1: Why I Did It and What I Was Getting Into",
      path: "/blog/2025-09-06-training-llm-part-1-motivation-and-architecture",
      description: "The motivation behind training a custom large language model from scratch and the architectural decisions that shaped the project"
    },
    {
      title: "Hello World: Building Scalable Data Pipelines",
      path: "/blog/2025-08-31-hello-world",
      description: "An introduction to building enterprise-scale data pipelines at Disney and beyond"
    }
  ]

  return (
    <Layout>
      <SEO
        title="Sitemap - All Pages"
        description="Complete sitemap of christensendaniel.com with links to all pages, skills sections, portfolio projects, and blog posts."
        canonical="/sitemap/"
        keywords="sitemap, site navigation, data engineering portfolio, technical blog"
      />
      <StructuredData data={breadcrumbSchema} />

      <header className="bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-12 md:py-16">
        <div className="container mx-auto px-4">
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Site Map</h1>
          <p className="text-xl text-muted-foreground">Navigate to all pages and content on this site</p>
        </div>
      </header>

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-12">
            
            {/* Main Pages Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Main Pages</h2>
              <div className="grid gap-4">
                {pages.map((page) => (
                  <Card key={page.path} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle>
                        <Link 
                          to={page.path} 
                          className="hover:text-primary transition-colors"
                        >
                          {page.title}
                        </Link>
                      </CardTitle>
                      <CardDescription>{page.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link 
                        to={page.path}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        christensendaniel.com{page.path}
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Blog Posts Section */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Blog Posts</h2>
              <div className="grid gap-4">
                {blogPosts.map((post) => (
                  <Card key={post.path} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle>
                        <Link 
                          to={post.path} 
                          className="hover:text-primary transition-colors"
                        >
                          {post.title}
                        </Link>
                      </CardTitle>
                      <CardDescription>{post.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link 
                        to={post.path}
                        className="text-sm text-muted-foreground hover:text-primary transition-colors"
                      >
                        christensendaniel.com{post.path}
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Technical Resources */}
            <section>
              <h2 className="text-3xl font-bold mb-6">Technical Resources</h2>
              <Card>
                <CardHeader>
                  <CardTitle>XML Sitemap</CardTitle>
                  <CardDescription>Machine-readable sitemap for search engines</CardDescription>
                </CardHeader>
                <CardContent>
                  <a 
                    href="/sitemap.xml"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary hover:underline"
                  >
                    christensendaniel.com/sitemap.xml
                  </a>
                </CardContent>
              </Card>
            </section>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Sitemap
