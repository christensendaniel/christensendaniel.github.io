import React from 'react'
import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Skills from './pages/Skills'
import Blog from './pages/Blog'
import BlogPost from './pages/BlogPost'
import Portfolio from './pages/Portfolio'

function App() {
  return (
    <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/skills" element={<Skills />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:postId" element={<BlogPost />} />
        <Route path="/portfolio" element={<Portfolio />} />
      </Routes>
    </Router>
  )
}

export default App
