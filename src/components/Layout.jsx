import React from 'react'
import { useState, useEffect } from 'react'
import Navigation from './Navigation'
import Footer from './Footer'

function Layout({ children, showNavigation = true }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for saved theme preference, default to dark
    const savedTheme = localStorage.getItem('theme')
    return savedTheme ? savedTheme === 'dark' : true
  })

  useEffect(() => {
    // Save theme preference and apply to document
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Skip navigation link - only visible on keyboard focus */}
      <a 
        href="#main-content" 
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md"
      >
        Skip to main content
      </a>
      
      {showNavigation && (
        <Navigation isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />
      )}
      <main id="main-content" className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
