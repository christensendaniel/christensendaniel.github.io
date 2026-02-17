import React from 'react'
import { screen } from '@testing-library/react'
import { renderWithRouter } from '../test-utils'
import Contact from '../pages/Contact'

describe('Contact component', () => {
  test('renders the contact page', () => {
    renderWithRouter(<Contact />)
    
    // Check for main heading
    expect(screen.getByText(/Get In Touch/i, { selector: 'h1' })).toBeInTheDocument()
  })

  test('renders LinkedIn section', () => {
    renderWithRouter(<Contact />)
    
    // Check for LinkedIn content
    expect(screen.getByText(/LinkedIn/i, { selector: 'h3' })).toBeInTheDocument()
    expect(screen.getByText(/Preferred Method/i)).toBeInTheDocument()
  })

  test('renders Email section', () => {
    renderWithRouter(<Contact />)
    
    // Check for Email content
    expect(screen.getByText(/Email/i, { selector: 'h3' })).toBeInTheDocument()
    expect(screen.getByText(/Direct Communication/i)).toBeInTheDocument()
  })

  test('renders What I Can Help With section', () => {
    renderWithRouter(<Contact />)
    
    // Check for expertise section
    expect(screen.getByText(/What I Can Help With/i, { selector: 'h3' })).toBeInTheDocument()
  })

  test('renders podcast guest availability', () => {
    renderWithRouter(<Contact />)
    
    // Check for podcast mention (using getAllByText since it appears multiple times)
    const podcastElements = screen.getAllByText(/Being a guest on podcasts/i)
    expect(podcastElements.length).toBeGreaterThan(0)
  })

  test('renders SAVVBI consulting referral', () => {
    renderWithRouter(<Contact />)
    
    // Check for SAVVBI referral
    expect(screen.getByText(/SAVVBI/i)).toBeInTheDocument()
  })
})
