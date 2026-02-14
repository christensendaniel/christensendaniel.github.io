import React from 'react'
import { Link } from 'react-router-dom'
import Layout from '../components/Layout'

function Blog() {
  const blogPosts = [
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
      <header className="blog-header">
        <div className="container">
          <h1>Technical Blog</h1>
          <p className="blog-subtitle">Data Engineering Insights & Best Practices</p>
        </div>
      </header>

      <div className="blog-main">
        <div className="container">
          <div className="blog-grid">
            {blogPosts.map(post => (
              <article key={post.id} className="blog-card">
                <h3>
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </h3>
                <div className="post-meta">
                  <span className="post-date">{post.date}</span>
                </div>
                <p className="post-description">{post.description}</p>
                <div className="post-tags">
                  {post.tags.map(tag => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
                <Link to={`/blog/${post.id}`} className="read-more">Read More →</Link>
              </article>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Blog
