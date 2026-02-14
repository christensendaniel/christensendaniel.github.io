import React from 'react'
import { Link } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import { Button } from './ui/button'

function Navigation({ isDarkMode, onThemeToggle }) {
  return (
    <nav 
      className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
      data-testid="main-navigation"
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <Link 
              to="/" 
              className="font-semibold text-lg hover:text-primary transition-colors"
              data-testid="nav-logo"
            >
              Daniel Christensen
            </Link>
            <div className="hidden md:flex items-center gap-1" data-testid="nav-links">
              <Button variant="ghost" asChild size="sm">
                <Link to="/#about" data-testid="nav-link-about">About</Link>
              </Button>
              <Button variant="ghost" asChild size="sm">
                <Link to="/#expertise" data-testid="nav-link-expertise">Expertise</Link>
              </Button>
              <Button variant="ghost" asChild size="sm">
                <Link to="/#experience" data-testid="nav-link-experience">Experience</Link>
              </Button>
              <Button variant="ghost" asChild size="sm">
                <Link to="/#projects" data-testid="nav-link-projects">Projects</Link>
              </Button>
              <Button variant="ghost" asChild size="sm">
                <Link to="/blog" data-testid="nav-link-blog">Blog</Link>
              </Button>
              <Button variant="ghost" asChild size="sm">
                <Link to="/#contact" data-testid="nav-link-contact">Contact</Link>
              </Button>
            </div>
          </div>
          <ThemeToggle isDarkMode={isDarkMode} onToggle={onThemeToggle} />
        </div>
      </div>
    </nav>
  )
}

export default Navigation
