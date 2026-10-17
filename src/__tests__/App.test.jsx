import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { HelmetProvider } from 'react-helmet-async'
import App from '../App'

function renderAt(url) {
  window.history.pushState({}, '', url)
  return render(
    <HelmetProvider>
      <App />
    </HelmetProvider>
  )
}

describe('App routing', () => {
  test('unknown paths redirect to the home page', async () => {
    renderAt('/does-not-exist')

    expect(await screen.findByRole('heading', { level: 1, name: /Daniel B\. Christensen/ })).toBeInTheDocument()
    expect(window.location.pathname).toBe('/')
  })

  test('the legacy .html portfolio URL redirects to the React route', async () => {
    renderAt('/portfolio/data-engineering-portfolio.html')

    await waitFor(() => expect(window.location.pathname).toBe('/portfolio/data-engineering'))
  })
})
