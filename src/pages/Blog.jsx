import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'
import SEO, { StructuredData } from '../components/SEO'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { ArrowLeft } from 'lucide-react'

function Blog() {
  // Breadcrumb structured data
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": "https://christensendaniel.com/" },
      { "@type": "ListItem", "position": 2, "name": "Blog", "item": "https://christensendaniel.com/blog/" }
    ]
  }

  const blogPosts = [
    {
      id: '2026-02-17-building-portfolio-site-ai-github-pages',
      title: 'Building a Modern Portfolio Site with AI: From Static HTML to React',
      date: 'February 17, 2026',
      description: 'How I used GitHub Pages, automated deployments, and AI-assisted development to transform a static HTML site into a modern React portfolio without writing every line myself.',
      tags: ['AI', 'GitHub Pages', 'React', 'GitHub Actions', 'Copilot']
    },
    {
      id: '2025-08-31-hello-world',
      title: 'Hello World: Building Scalable Data Pipelines',
      date: 'August 31, 2025',
      description: 'An introduction to my blog and insights on building enterprise-scale data pipelines at Disney and beyond.',
      tags: ['data-engineering', 'pipelines', 'snowflake', 'apache-flink']
    }
  ]

  return (
    <Layout>
      <SEO
        title="Blog - Data Engineering & AI Insights"
        description="Articles on data engineering, LLM integration, AI agents, Python best practices, and cloud architecture by Daniel Christensen."
        canonical="/blog/"
        keywords="data engineering blog, LLM tutorial, AI agents, Python data engineering, Apache Flink, Snowflake tutorials"
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
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Technical Blog</h1>
          <p className="text-xl text-muted-foreground">Data Engineering Insights & Best Practices</p>
        </div>
      </header>

      <div className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid gap-6">
            {blogPosts.map(post => (
              <Card key={post.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="text-2xl">
                    <Link to={`/blog/${post.id}`} className="hover:text-primary transition-colors">{post.title}</Link>
                  </CardTitle>
                  <CardDescription className="text-sm text-muted-foreground mt-2">{post.date}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">{post.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map(tag => (
                      <span key={tag} className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Button asChild variant="link" className="p-0 h-auto">
                    <Link to={`/blog/${post.id}`}>Read More →</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Blog
