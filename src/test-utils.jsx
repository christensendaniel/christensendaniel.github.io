import React from 'react'
import { render } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'

/**
 * React Router v7 future flags configuration
 * Used to opt-in to v7 behaviors early and eliminate deprecation warnings
 */
export const routerFutureFlags = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
}

/**
 * Custom render function that wraps components with necessary providers
 * Usage: import { renderWithRouter } from './test-utils'
 * 
 * @param {React.ReactElement} ui - Component to render
 * @param {object} options - Additional render options
 * @returns {RenderResult} - Render result from @testing-library/react including query methods and utilities
 */
export function renderWithRouter(ui, { route = '/', ...renderOptions } = {}) {
  window.history.pushState({}, 'Test page', route)
  
  function Wrapper({ children }) {
    return (
      <BrowserRouter future={routerFutureFlags}>
        {children}
      </BrowserRouter>
    )
  }
  
  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

/**
 * Custom render with theme context if needed in the future
 */
export function renderWithProviders(ui, options = {}) {
  return renderWithRouter(ui, options)
}

// Re-export everything from @testing-library/react
export * from '@testing-library/react'
