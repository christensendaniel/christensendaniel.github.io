import React from 'react'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '../test-utils'
import Blog from '../pages/Blog'

describe('Blog component', () => {
  test('renders the blog page', () => {
    renderWithRouter(<Blog />)
    
    // Check for main heading
    expect(screen.getByText(/Technical Blog/i)).toBeInTheDocument()
  })

  test('renders blog posts', () => {
    renderWithRouter(<Blog />)
    
    // Check for blog post
    expect(screen.getByText(/Hello World: Building Scalable Data Pipelines/i)).toBeInTheDocument()
  })

  test('renders read more link', () => {
    renderWithRouter(<Blog />)
    
    // Check for read more links
    const readMoreLinks = screen.getAllByText(/Read More/i)
    expect(readMoreLinks.length).toBeGreaterThan(0)
  })
})
