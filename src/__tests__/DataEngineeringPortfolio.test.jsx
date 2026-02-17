import React from 'react'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '../test-utils'
import DataEngineeringPortfolio from '../pages/DataEngineeringPortfolio'

describe('DataEngineeringPortfolio component', () => {
  test('renders the data engineering portfolio page', () => {
    renderWithRouter(<DataEngineeringPortfolio />)
    
    // Check for main heading
    expect(screen.getByText(/Data Engineering Portfolio/i, { selector: 'h1' })).toBeInTheDocument()
  })

  test('renders case studies section', () => {
    renderWithRouter(<DataEngineeringPortfolio />)
    
    // Check for case studies
    expect(screen.getByText(/Case Studies/i, { selector: 'h2' })).toBeInTheDocument()
  })
})
