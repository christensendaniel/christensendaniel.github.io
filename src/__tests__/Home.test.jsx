import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Home from '../pages/Home'

describe('Home component', () => {
  test('renders the home page', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
    
    // Check for main heading using role
    expect(screen.getAllByText(/Daniel B. Christensen/i)[0]).toBeInTheDocument()
  })

  test('renders hero section', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
    
    // Check for hero content
    expect(screen.getAllByText(/Full Stack Data Engineer/i)[0]).toBeInTheDocument()
  })

  test('renders about section', () => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    )
    
    // Check for about section
    expect(screen.getByText(/About Me/i, { selector: 'h2' })).toBeInTheDocument()
  })
})
