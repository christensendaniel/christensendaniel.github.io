import React from 'react'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '../test-utils'
import Portfolio from '../pages/Portfolio'

describe('Portfolio component', () => {
  test('renders the portfolio page', () => {
    renderWithRouter(<Portfolio />)
    
    // Check for main heading
    expect(screen.getAllByText(/Data Engineering Portfolio/i)[0]).toBeInTheDocument()
  })

  test('renders case studies section', () => {
    renderWithRouter(<Portfolio />)
    
    // Check for case studies - use getAllByText to handle duplicates
    const elements = screen.getAllByText(/Case Studies & Technical Achievements/i)
    expect(elements.length).toBeGreaterThan(0)
  })

  test('renders technical content', () => {
    renderWithRouter(<Portfolio />)
    
    // Check for technical details
    expect(screen.getByText(/High-Performance Event Processing at Disney/i)).toBeInTheDocument()
  })
})
