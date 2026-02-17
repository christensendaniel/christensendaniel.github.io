import React, { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import ThemeToggle from './ThemeToggle'
import { Button } from './ui/button'
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from './ui/sheet'
import { Menu } from 'lucide-react'

function Navigation({ isDarkMode, onThemeToggle }) {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === '/'
    }
    return location.pathname.startsWith(path)
  }

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/skills', label: 'Skills' },
    { path: '/portfolio', label: 'Portfolio' },
    { path: '/portfolio/data-engineering', label: 'Data Engineering', indent: true },
    { path: '/blog', label: 'Blog' },
  ]

  const NavLink = ({ to, children, indent = false, onClick }) => (
    <Button
      variant={isActive(to) ? "default" : "ghost"}
      asChild
      size="sm"
      className={indent ? "ml-4" : ""}
      onClick={onClick}
    >
      <Link to={to}>{children}</Link>
    </Button>
  )

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
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1" data-testid="nav-links">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/skills">Skills</NavLink>
              <NavLink to="/portfolio">Portfolio</NavLink>
              <NavLink to="/blog">Blog</NavLink>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle isDarkMode={isDarkMode} onToggle={onThemeToggle} />
            
            {/* Mobile Navigation */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" aria-label="Open menu">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Navigation</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col gap-2 mt-8">
                  {navLinks.map((link) => (
                    <NavLink 
                      key={link.path} 
                      to={link.path}
                      indent={link.indent}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </NavLink>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navigation
