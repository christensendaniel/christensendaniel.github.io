import React from 'react'
import { render, screen } from '@testing-library/react'
import { Routes, Route, MemoryRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { routerFutureFlags } from '../constants/router'
import BlogPost from '../pages/BlogPost'

// Mock localStorage for Layout component
const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
}
global.localStorage = localStorageMock

describe('BlogPost component', () => {
  const renderWithHelmet = (ui, options = {}) => {
    return render(
      <HelmetProvider>
        {ui}
      </HelmetProvider>,
      options
    )
  }

  test('renders blog post page', () => {
    renderWithHelmet(
      <MemoryRouter future={routerFutureFlags} initialEntries={['/blog/2025-08-31-hello-world']}>
        <Routes>
          <Route path="/blog/:postId" element={<BlogPost />} />
        </Routes>
      </MemoryRouter>
    )
    
    // Check for blog post title
    expect(screen.getByText(/Hello World: Building Scalable Data Pipelines/i)).toBeInTheDocument()
  })

  test('renders back button', () => {
    renderWithHelmet(
      <MemoryRouter future={routerFutureFlags} initialEntries={['/blog/2025-08-31-hello-world']}>
        <Routes>
          <Route path="/blog/:postId" element={<BlogPost />} />
        </Routes>
      </MemoryRouter>
    )
    
    // Check for back to blog link
    expect(screen.getByText(/Back to Blog/i)).toBeInTheDocument()
  })

  test('renders post metadata', () => {
    renderWithHelmet(
      <MemoryRouter future={routerFutureFlags} initialEntries={['/blog/2025-08-31-hello-world']}>
        <Routes>
          <Route path="/blog/:postId" element={<BlogPost />} />
        </Routes>
      </MemoryRouter>
    )
    
    // Check for author and date (using getAllByText since name appears multiple times)
    const authorElements = screen.getAllByText(/Daniel B. Christensen/i)
    expect(authorElements.length).toBeGreaterThan(0)
    expect(screen.getByText(/August 31, 2025/i)).toBeInTheDocument()
  })

  test('handles invalid post ID', () => {
    renderWithHelmet(
      <MemoryRouter future={routerFutureFlags} initialEntries={['/blog/invalid-post']}>
        <Routes>
          <Route path="/blog/:postId" element={<BlogPost />} />
        </Routes>
      </MemoryRouter>
    )
    
    // Should show "Post not found" message
    expect(screen.getByText(/Post not found/i)).toBeInTheDocument()
  })
})
