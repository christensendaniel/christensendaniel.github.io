import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Layout from '../components/Layout'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { ArrowLeft } from 'lucide-react'

function BlogPost() {
  const { postId } = useParams()

  // Blog post content - in a real app, this would come from a CMS or API
  const posts = {
    '2025-08-31-hello-world': {
      title: 'Hello World: Building Scalable Data Pipelines',
      author: 'Daniel B. Christensen',
      date: 'August 31, 2025',
      tags: ['data-engineering', 'pipelines', 'snowflake', 'apache-flink'],
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

  return (
    <Layout>
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
