import React from 'react'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '../test-utils'
import Sitemap from '../pages/Sitemap'

describe('Sitemap component', () => {
  test('renders the sitemap page', () => {
    renderWithRouter(<Sitemap />)
    
    // Check for main heading
    expect(screen.getByText(/Site Map/i, { selector: 'h1' })).toBeInTheDocument()
  })

  test('renders main pages section', () => {
    renderWithRouter(<Sitemap />)
    
    // Check for main pages
    expect(screen.getByText(/Main Pages/i, { selector: 'h2' })).toBeInTheDocument()
  })

  test('renders blog posts section', () => {
    renderWithRouter(<Sitemap />)
    
    // Check for blog posts section
    expect(screen.getByText(/Blog Posts/i, { selector: 'h2' })).toBeInTheDocument()
  })
})
