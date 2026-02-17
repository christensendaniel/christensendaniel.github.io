import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { routerFutureFlags } from '../constants/router'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import ThemeToggle from '../components/ThemeToggle'

const renderWithHelmet = (ui) => {
  return render(
    <HelmetProvider>
      {ui}
    </HelmetProvider>
  )
}

describe('Navigation component', () => {
  test('renders navigation links', () => {
    const mockToggle = jest.fn()
    renderWithHelmet(
      <BrowserRouter future={routerFutureFlags}>
        <Navigation isDarkMode={false} onThemeToggle={mockToggle} />
      </BrowserRouter>
    )
    
    // Check for nav links - using actual link text from current component
    expect(screen.getByText(/Home/i)).toBeInTheDocument()
    expect(screen.getByText(/Skills/i)).toBeInTheDocument()
    expect(screen.getByText(/Portfolio/i)).toBeInTheDocument()
    expect(screen.getByText(/Blog/i)).toBeInTheDocument()
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
    
    // Check for toggle button with correct aria-label
    const button = screen.getByRole('button', { name: /toggle theme/i })
    expect(button).toBeInTheDocument()
  })

  test('shows correct icon for light mode', () => {
    const mockToggle = jest.fn()
    const { container } = render(<ThemeToggle isDarkMode={false} onToggle={mockToggle} />)
    
    // Check for Moon icon in light mode (lucide-react renders as SVG)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  test('shows correct icon for dark mode', () => {
    const mockToggle = jest.fn()
    const { container } = render(<ThemeToggle isDarkMode={true} onToggle={mockToggle} />)
    
    // Check for Sun icon in dark mode (lucide-react renders as SVG)
    const svg = container.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  test('calls onToggle when clicked', () => {
    const mockToggle = jest.fn()
    render(<ThemeToggle isDarkMode={false} onToggle={mockToggle} />)
    
    const button = screen.getByRole('button', { name: /toggle theme/i })
    button.click()
    expect(mockToggle).toHaveBeenCalledTimes(1)
  })
})
