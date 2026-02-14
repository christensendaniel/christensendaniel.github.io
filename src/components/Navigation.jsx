import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import ThemeToggle from './ThemeToggle'

function Navigation({ isDarkMode, onThemeToggle }) {
  return (
    <nav className="main-nav">
      <div className="container">
        <ul className="nav-list">
          <li><Link to="/#about" className="nav-link">About Me</Link></li>
          <li><Link to="/#expertise" className="nav-link">Core Expertise</Link></li>
          <li><Link to="/#experience" className="nav-link">Experience</Link></li>
          <li><Link to="/#projects" className="nav-link">Data Projects</Link></li>
          <li><Link to="/blog" className="nav-link">Tech Blog</Link></li>
          <li><Link to="/#contact" className="nav-link">Contact</Link></li>
        </ul>
        <ThemeToggle isDarkMode={isDarkMode} onToggle={onThemeToggle} />
      </div>
    </nav>
  )
}

export default Navigation
