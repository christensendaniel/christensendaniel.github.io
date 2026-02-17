import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { routerFutureFlags } from './constants/router'
import Home from './pages/Home'

// Lazy load pages for better performance
const Skills = lazy(() => import('./pages/Skills'))
const Blog = lazy(() => import('./pages/Blog'))
const BlogPost = lazy(() => import('./pages/BlogPost'))
const Portfolio = lazy(() => import('./pages/Portfolio'))
const DataEngineeringPortfolio = lazy(() => import('./pages/DataEngineeringPortfolio'))
const Sitemap = lazy(() => import('./pages/Sitemap'))

// Loading fallback component
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="text-center">
      <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent"></div>
      <p className="mt-4 text-muted-foreground">Loading...</p>
    </div>
  </div>
)

function App() {
  return (
    <Router future={routerFutureFlags}>
      <Suspense fallback={<LoadingFallback />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:postId" element={<BlogPost />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/portfolio/data-engineering" element={<DataEngineeringPortfolio />} />
          <Route path="/sitemap" element={<Sitemap />} />
          {/* Redirect old URL to new React route */}
          <Route path="/portfolio/data-engineering-portfolio.html" element={<Navigate to="/portfolio/data-engineering" replace />} />
        </Routes>
      </Suspense>
    </Router>
  )
}

export default App
