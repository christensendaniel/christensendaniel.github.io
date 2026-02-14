import React from 'react'
import { useState, useEffect } from 'react'
import Navigation from './Navigation'
import Footer from './Footer'

function Layout({ children, showNavigation = true }) {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme')
    return savedTheme === 'dark'
  })

  useEffect(() => {
    // Save theme preference
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <>
      {showNavigation && (
        <Navigation isDarkMode={isDarkMode} onThemeToggle={handleThemeToggle} />
      )}
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
}

export default Layout
