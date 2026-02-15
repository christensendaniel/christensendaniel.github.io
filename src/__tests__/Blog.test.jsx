import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Blog from '../pages/Blog'

describe('Blog component', () => {
  test('renders the blog page', () => {
    render(
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Blog />
      </BrowserRouter>
    )
    
    // Check for main heading
    expect(screen.getByText(/Technical Blog/i)).toBeInTheDocument()
  })

  test('renders blog posts', () => {
    render(
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Blog />
      </BrowserRouter>
    )
    
    // Check for blog post
    expect(screen.getByText(/Hello World: Building Scalable Data Pipelines/i)).toBeInTheDocument()
  })

  test('renders read more link', () => {
    render(
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Blog />
      </BrowserRouter>
    )
    
    // Check for read more links
    const readMoreLinks = screen.getAllByText(/Read More/i)
    expect(readMoreLinks.length).toBeGreaterThan(0)
  })
})
