import React from 'react'
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { routerFutureFlags } from './constants/router'
import Home from './pages/Home'
import Skills from './pages/Skills'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Portfolio from './pages/Portfolio'
import DataEngineeringPortfolio from './pages/DataEngineeringPortfolio'

function App() {
  return (
    <Router future={routerFutureFlags}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:postId" element={<BlogPost />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/portfolio/data-engineering" element={<DataEngineeringPortfolio />} />
        {/* Redirect old URL to new React route */}
        <Route path="/portfolio/data-engineering-portfolio.html" element={<Navigate to="/portfolio/data-engineering" replace />} />
      </Routes>
    </Router>
  )
}

export default App
