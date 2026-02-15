import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import { routerFutureFlags } from '../test-utils'
import Portfolio from '../pages/Portfolio'

describe('Portfolio component', () => {
  test('renders the portfolio page', () => {
    render(
      <BrowserRouter future={routerFutureFlags}>
        <Portfolio />
      </BrowserRouter>
    )
    
    // Check for main heading
    expect(screen.getAllByText(/Data Engineering Portfolio/i)[0]).toBeInTheDocument()
  })

  test('renders case studies section', () => {
    render(
      <BrowserRouter future={routerFutureFlags}>
        <Portfolio />
      </BrowserRouter>
    )
    
    // Check for case studies - use getAllByText to handle duplicates
    const elements = screen.getAllByText(/Case Studies & Technical Achievements/i)
    expect(elements.length).toBeGreaterThan(0)
  })

  test('renders technical content', () => {
    render(
      <BrowserRouter future={routerFutureFlags}>
        <Portfolio />
      </BrowserRouter>
    )
    
    // Check for technical details
    expect(screen.getByText(/High-Performance Event Processing at Disney/i)).toBeInTheDocument()
  })
})
