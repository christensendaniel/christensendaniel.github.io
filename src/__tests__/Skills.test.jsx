import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Skills from '../pages/Skills'

describe('Skills component', () => {
  test('renders the skills page', () => {
    render(
      <BrowserRouter>
        <Skills />
      </BrowserRouter>
    )
    
    // Check for main heading
    expect(screen.getByText(/Technical Skills & Expertise/i)).toBeInTheDocument()
  })

  test('renders programming section', () => {
    render(
      <BrowserRouter>
        <Skills />
      </BrowserRouter>
    )
    
    // Check for programming section
    expect(screen.getByText(/Programming & Development/i)).toBeInTheDocument()
  })

  test('renders data platforms section', () => {
    render(
      <BrowserRouter>
        <Skills />
      </BrowserRouter>
    )
    
    // Check for data platforms section
    expect(screen.getByText(/Data Platforms & Warehouses/i)).toBeInTheDocument()
  })
})
