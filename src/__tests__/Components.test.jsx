import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import ThemeToggle from '../components/ThemeToggle'

describe('Navigation component', () => {
  test('renders navigation links', () => {
    const mockToggle = jest.fn()
    render(
      <BrowserRouter>
        <Navigation isDarkMode={false} onThemeToggle={mockToggle} />
      </BrowserRouter>
    )
    
    // Check for nav links
    expect(screen.getByText(/About Me/i)).toBeInTheDocument()
    expect(screen.getByText(/Tech Blog/i)).toBeInTheDocument()
  })
})

describe('Footer component', () => {
  test('renders footer content', () => {
    render(<Footer />)
    
    // Check for copyright
    expect(screen.getByText(/© 2025 Daniel Christensen/i)).toBeInTheDocument()
  })

  test('renders GitHub link', () => {
    render(<Footer />)
    
    // Check for GitHub link
    expect(screen.getByText(/View on GitHub/i)).toBeInTheDocument()
  })
})

describe('ThemeToggle component', () => {
  test('renders theme toggle button', () => {
    const mockToggle = jest.fn()
    render(<ThemeToggle isDarkMode={false} onToggle={mockToggle} />)
    
    // Check for toggle button
    const button = screen.getByRole('button', { name: /toggle dark mode/i })
    expect(button).toBeInTheDocument()
  })

  test('shows correct icon for light mode', () => {
    const mockToggle = jest.fn()
    render(<ThemeToggle isDarkMode={false} onToggle={mockToggle} />)
    
    // Check for moon icon in light mode
    expect(screen.getByText('🌙')).toBeInTheDocument()
  })

  test('shows correct icon for dark mode', () => {
    const mockToggle = jest.fn()
    render(<ThemeToggle isDarkMode={true} onToggle={mockToggle} />)
    
    // Check for sun icon in dark mode
    expect(screen.getByText('☀️')).toBeInTheDocument()
  })
})
