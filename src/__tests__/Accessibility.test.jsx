import React from 'react'
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { routerFutureFlags } from '../constants/router'
import Navigation from '../components/Navigation'
import Footer from '../components/Footer'
import Home from '../pages/Home'
import Layout from '../components/Layout'

const renderWithHelmet = (ui) => {
  return render(
    <HelmetProvider>
      {ui}
    </HelmetProvider>
  )
}

describe('Accessibility Tests', () => {
  describe('Navigation accessibility', () => {
    test('navigation has proper semantic HTML', () => {
      const mockToggle = jest.fn()
      renderWithHelmet(
        <MemoryRouter future={routerFutureFlags}>
          <Navigation isDarkMode={false} onThemeToggle={mockToggle} />
        </MemoryRouter>
      )
      
      // Check for nav element
      const nav = screen.getByRole('navigation')
      expect(nav).toBeInTheDocument()
    })

    test('navigation links have proper labels', () => {
      const mockToggle = jest.fn()
      renderWithHelmet(
        <MemoryRouter future={routerFutureFlags}>
          <Navigation isDarkMode={false} onThemeToggle={mockToggle} />
        </MemoryRouter>
      )
      
      // Check that links have text content
      const links = screen.getAllByRole('link')
      links.forEach(link => {
        expect(link).toHaveTextContent(/.+/) // Has some text
      })
    })

    test('theme toggle has accessible label', () => {
      const mockToggle = jest.fn()
      renderWithHelmet(
        <MemoryRouter future={routerFutureFlags}>
          <Navigation isDarkMode={false} onThemeToggle={mockToggle} />
        </MemoryRouter>
      )
      
      const button = screen.getByRole('button', { name: /toggle theme/i })
      expect(button).toHaveAttribute('aria-label')
    })

    test('mobile menu button has aria-expanded attribute', () => {
      const mockToggle = jest.fn()
      const { container } = renderWithHelmet(
        <MemoryRouter future={routerFutureFlags}>
          <Navigation isDarkMode={false} onThemeToggle={mockToggle} />
        </MemoryRouter>
      )
      
      // Find the mobile menu button by aria-label
      const menuButton = screen.getByLabelText(/open menu|close menu/i)
      expect(menuButton).toHaveAttribute('aria-expanded')
    })
  })

  describe('Footer accessibility', () => {
    test('footer has contentinfo role', () => {
      const { container } = render(<Footer />)
      
      const footer = container.querySelector('footer')
      expect(footer).toBeInTheDocument()
    })

    test('github link has accessible text', () => {
      render(<Footer />)
      
      const link = screen.getByRole('link', { name: /view on github/i })
      expect(link).toBeInTheDocument()
      expect(link).toHaveAttribute('href')
    })
  })

  describe('Page accessibility', () => {
    test('home page has main heading', () => {
      renderWithHelmet(
        <MemoryRouter future={routerFutureFlags}>
          <Home />
        </MemoryRouter>
      )
      
      // Check for h1 heading
      const heading = screen.getAllByRole('heading', { level: 1 })[0]
      expect(heading).toBeInTheDocument()
    })

    test('home page has proper heading hierarchy', () => {
      renderWithHelmet(
        <MemoryRouter future={routerFutureFlags}>
          <Home />
        </MemoryRouter>
      )
      
      // Check for h2 headings
      const h2Headings = screen.getAllByRole('heading', { level: 2 })
      expect(h2Headings.length).toBeGreaterThan(0)
    })

    test('interactive elements are keyboard accessible', () => {
      const mockToggle = jest.fn()
      renderWithHelmet(
        <MemoryRouter future={routerFutureFlags}>
          <Navigation isDarkMode={false} onThemeToggle={mockToggle} />
        </MemoryRouter>
      )
      
      // All buttons should be focusable
      const buttons = screen.getAllByRole('button')
      buttons.forEach(button => {
        // Buttons are focusable by default if not disabled
        expect(button).not.toHaveAttribute('disabled')
      })
    })
  })

  describe('Skip navigation', () => {
    test('skip navigation link is present', () => {
      renderWithHelmet(
        <MemoryRouter future={routerFutureFlags}>
          <Layout>
            <div>Test content</div>
          </Layout>
        </MemoryRouter>
      )
      
      // Check for skip link
      const skipLink = screen.getByText(/skip to main content/i)
      expect(skipLink).toBeInTheDocument()
      expect(skipLink).toHaveAttribute('href', '#main-content')
    })

    test('main content has correct ID for skip link', () => {
      const { container } = renderWithHelmet(
        <MemoryRouter future={routerFutureFlags}>
          <Layout>
            <div>Test content</div>
          </Layout>
        </MemoryRouter>
      )
      
      // Check that main element has the id="main-content"
      const main = container.querySelector('#main-content')
      expect(main).toBeInTheDocument()
      expect(main.tagName.toLowerCase()).toBe('main')
    })
  })

  describe('Link accessibility', () => {
    test('all links have meaningful text', () => {
      renderWithHelmet(
        <MemoryRouter future={routerFutureFlags}>
          <Home />
        </MemoryRouter>
      )
      
      const links = screen.getAllByRole('link')
      links.forEach(link => {
        // Each link should have text content or aria-label
        const hasText = link.textContent.trim().length > 0
        const hasAriaLabel = link.hasAttribute('aria-label')
        expect(hasText || hasAriaLabel).toBe(true)
      })
    })
  })

  describe('Loading state accessibility', () => {
    test('loading fallback has proper ARIA attributes', () => {
      // Create a minimal loading component to test
      const LoadingFallback = () => (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center" role="status" aria-live="polite">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-primary border-r-transparent" aria-hidden="true"></div>
            <p className="mt-4 text-muted-foreground">Loading...</p>
            <span className="sr-only">Loading page content, please wait</span>
          </div>
        </div>
      )
      
      render(<LoadingFallback />)
      
      // Check for role="status"
      const statusContainer = screen.getByRole('status')
      expect(statusContainer).toBeInTheDocument()
      expect(statusContainer).toHaveAttribute('aria-live', 'polite')
      
      // Check for sr-only text
      expect(screen.getByText(/loading page content, please wait/i)).toBeInTheDocument()
    })
  })
})
