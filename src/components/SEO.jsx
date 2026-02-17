import React from 'react'
import { Helmet } from 'react-helmet-async'

export function SEO({ 
  title, 
  description, 
  canonical,
  type = 'website',
  image,
  keywords,
  article 
}) {
  const siteUrl = 'https://christensendaniel.com'
  const fullTitle = title ? `${title} | Daniel Christensen` : 'Daniel Christensen | Full Stack Data Engineer'
  
  return (
    <Helmet>
      {/* Primary */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <link rel="canonical" href={`${siteUrl}${canonical}`} />
      
      {/* Open Graph (Facebook, LinkedIn) */}
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:type" content={type} />
      <meta property="og:url" content={`${siteUrl}${canonical}`} />
      {image && <meta property="og:image" content={image} />}
      
      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image} />}
      
      {/* Article specific meta tags */}
      {article && (
        <>
          <meta property="article:published_time" content={article.publishedTime} />
          {article.modifiedTime && <meta property="article:modified_time" content={article.modifiedTime} />}
          {article.author && <meta property="article:author" content={article.author} />}
          {article.tags && article.tags.map((tag, index) => (
            <meta key={index} property="article:tag" content={tag} />
          ))}
        </>
      )}
      
      {/* Structured Data */}
      <meta name="robots" content="index, follow" />
    </Helmet>
  )
}

export function StructuredData({ data }) {
  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(data)}
      </script>
    </Helmet>
  )
}

export default SEO
