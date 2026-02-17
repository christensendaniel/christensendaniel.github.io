import React from 'react'
import { useParams, Link } from 'react-router-dom'
import Layout from '../components/Layout'
import SEO, { StructuredData } from '../components/SEO'
import { Button } from '../components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card'
import { ArrowLeft } from 'lucide-react'
import { getPostById } from '../utils/blogData'

function BlogPost() {
  const { postId } = useParams()

  // Load blog post from data files
  const post = getPostById(postId)

  // If post not found, show 404
  if (!post) {
    return (
      <Layout>
        <SEO
          title="Post Not Found"
          description="The requested blog post could not be found."
          canonical="/blog/"
        />
        <div className="py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-8">The blog post you're looking for doesn't exist.</p>
            <Button asChild>
              <Link to="/blog">Back to Blog</Link>
            </Button>
          </div>
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
