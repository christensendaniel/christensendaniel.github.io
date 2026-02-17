import React from 'react'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '../test-utils'
import Skills from '../pages/Skills'

describe('Skills component', () => {
  test('renders the skills page', () => {
    renderWithRouter(<Skills />)
    
    // Check for main heading
    expect(screen.getByText(/Technical Skills & Expertise/i)).toBeInTheDocument()
  })

  test('renders programming section', () => {
    renderWithRouter(<Skills />)
    
    // Check for programming section
    expect(screen.getByText(/Programming & Development/i)).toBeInTheDocument()
  })

  test('renders data platforms section', () => {
    renderWithRouter(<Skills />)
    
    // Check for data platforms section
    expect(screen.getByText(/Data Platforms & Warehouses/i)).toBeInTheDocument()
  })
})
