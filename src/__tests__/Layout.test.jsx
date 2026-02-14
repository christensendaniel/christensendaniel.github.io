import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Layout from '../components/Layout'

describe('Layout component', () => {
  // Mock localStorage before each test
  let getItemSpy, setItemSpy
  
  beforeEach(() => {
    getItemSpy = jest.spyOn(Storage.prototype, 'getItem')
    setItemSpy = jest.spyOn(Storage.prototype, 'setItem')
    getItemSpy.mockReturnValue('light')
  })
  
  afterEach(() => {
    getItemSpy.mockRestore()
    setItemSpy.mockRestore()
  })

  test('renders children content', () => {
    render(
      <BrowserRouter>
        <Layout>
          <div data-testid="test-content">Test Content</div>
        </Layout>
      </BrowserRouter>
    )
    
    expect(screen.getByTestId('test-content')).toBeInTheDocument()
  })

  test('renders navigation by default', () => {
    render(
      <BrowserRouter>
        <Layout>
          <div>Content</div>
        </Layout>
      </BrowserRouter>
    )
    
    expect(screen.getByTestId('main-navigation')).toBeInTheDocument()
  })

  test('hides navigation when showNavigation is false', () => {
    render(
      <BrowserRouter>
        <Layout showNavigation={false}>
          <div>Content</div>
        </Layout>
      </BrowserRouter>
    )
    
    expect(screen.queryByTestId('main-navigation')).not.toBeInTheDocument()
  })

  test('renders footer', () => {
    render(
      <BrowserRouter>
        <Layout>
          <div>Content</div>
        </Layout>
      </BrowserRouter>
    )
    
    expect(screen.getByTestId('site-footer')).toBeInTheDocument()
  })

  test('toggles theme when theme toggle is clicked', () => {
    render(
      <BrowserRouter>
        <Layout>
          <div>Content</div>
        </Layout>
      </BrowserRouter>
    )
    
    const themeToggle = screen.getByTestId('theme-toggle')
    
    // Clear the initial setItem call
    setItemSpy.mockClear()
    
    // Click the toggle to switch to dark mode
    fireEvent.click(themeToggle)
    expect(setItemSpy).toHaveBeenCalledWith('theme', 'dark')
    
    // Click again to switch back to light mode
    setItemSpy.mockClear()
    fireEvent.click(themeToggle)
    expect(setItemSpy).toHaveBeenCalledWith('theme', 'light')
  })

  test('loads theme from localStorage on mount', () => {
    render(
      <BrowserRouter>
        <Layout>
          <div>Content</div>
        </Layout>
      </BrowserRouter>
    )
    
    // Verify getItem was called during initialization
    expect(getItemSpy).toHaveBeenCalledWith('theme')
  })
})
