import React from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from './ui/button'

function ThemeToggle({ isDarkMode, onToggle }) {
  return (
    <Button 
      variant="ghost" 
      size="icon"
      onClick={onToggle}
      aria-label="Toggle theme"
      data-testid="theme-toggle"
    >
      {isDarkMode ? (
        <Sun className="h-5 w-5" data-testid="sun-icon" />
      ) : (
        <Moon className="h-5 w-5" data-testid="moon-icon" />
      )}
    </Button>
  )
}

export default ThemeToggle
