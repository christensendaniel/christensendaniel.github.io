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
      {showNavigation && (
        <Navigation isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />
      )}
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
