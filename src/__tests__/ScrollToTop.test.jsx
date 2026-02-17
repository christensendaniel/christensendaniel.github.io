import React from 'react'
import { render, screen, waitFor } from '@testing-library/react'
import { MemoryRouter, Routes, Route, useNavigate } from 'react-router-dom'
import { routerFutureFlags } from '../constants/router'
import { ScrollToTop } from '../components/ScrollToTop'
import { act } from 'react'

// Helper component to test navigation
function TestNavigation() {
  const navigate = useNavigate()
  return (
    <div>
      <button onClick={() => navigate('/')}>Go Home</button>
      <button onClick={() => navigate('/about')}>Go About</button>
    </div>
  )
}

describe('ScrollToTop component', () => {
  let scrollToMock

  beforeEach(() => {
    // Mock window.scrollTo
    scrollToMock = jest.fn()
    window.scrollTo = scrollToMock
  })

  afterEach(() => {
    jest.restoreAllMocks()
  })

  test('renders nothing (returns null)', () => {
    const { container } = render(
      <MemoryRouter future={routerFutureFlags}>
        <ScrollToTop />
      </MemoryRouter>
    )
    
    expect(container.firstChild).toBeNull()
  })

  test('scrolls to top on initial render', () => {
    render(
      <MemoryRouter future={routerFutureFlags}>
        <ScrollToTop />
      </MemoryRouter>
    )
    
    expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'instant' })
  })

  test('scrolls to top when route changes', async () => {
    render(
      <MemoryRouter future={routerFutureFlags} initialEntries={['/']}>
        <ScrollToTop />
        <TestNavigation />
        <Routes>
          <Route path="/" element={<div>Home</div>} />
          <Route path="/about" element={<div>About</div>} />
        </Routes>
      </MemoryRouter>
    )

    // Clear the initial call
    scrollToMock.mockClear()

    // Click to navigate to About page
    const aboutButton = screen.getByText('Go About')
    await act(async () => {
      aboutButton.click()
    })

    // Wait for the effect to run
    await waitFor(() => {
      expect(scrollToMock).toHaveBeenCalledWith({ top: 0, behavior: 'instant' })
    })
  })
})
