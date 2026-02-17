import React from 'react'
import { renderWithRouter } from '../test-utils'
import Home from '../pages/Home'
import Skills from '../pages/Skills'
import Blog from '../pages/Blog'
import Portfolio from '../pages/Portfolio'

describe('Snapshot Tests', () => {
  test('Home page snapshot', () => {
    const { container } = renderWithRouter(<Home />)
    expect(container).toMatchSnapshot()
  })

  test('Skills page snapshot', () => {
    const { container } = renderWithRouter(<Skills />)
    expect(container).toMatchSnapshot()
  })

  test('Blog page snapshot', () => {
    const { container } = renderWithRouter(<Blog />)
    expect(container).toMatchSnapshot()
  })

  test('Portfolio page snapshot', () => {
    const { container } = renderWithRouter(<Portfolio />)
    expect(container).toMatchSnapshot()
  })
})
