import { useEffect } from 'react'

function ThemeToggle({ isDarkMode, onToggle }) {
  useEffect(() => {
    // Set the theme attribute on the document element
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light')
  }, [isDarkMode])

  return (
    <button 
      className="theme-toggle" 
      id="theme-toggle" 
      aria-label="Toggle dark mode"
      onClick={onToggle}
    >
      <span className="theme-toggle-icon">{isDarkMode ? '☀️' : '🌙'}</span>
    </button>
  )
}

export default ThemeToggle
