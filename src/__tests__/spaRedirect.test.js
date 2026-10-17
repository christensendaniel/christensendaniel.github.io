import { getRestoredPath, restoreRedirectedPath } from '../utils/spaRedirect'

describe('getRestoredPath', () => {
  test('restores a simple path', () => {
    expect(getRestoredPath('?/skills')).toBe('/skills')
  })

  test('restores nested paths and keeps a trailing slash', () => {
    expect(getRestoredPath('?/portfolio/data-engineering/')).toBe('/portfolio/data-engineering/')
  })

  test('restores the original query string and hash', () => {
    expect(getRestoredPath('?/blog/some-post&ref=twitter&x=1', '#intro')).toBe(
      '/blog/some-post?ref=twitter&x=1#intro'
    )
  })

  test.each([['', ''], ['?foo=bar', ''], ['?p=/skills', ''], [undefined, '']])(
    'returns null when the URL was not produced by the 404 redirect (%p)',
    (search) => {
      expect(getRestoredPath(search)).toBeNull()
    }
  )

  test.each([
    ['?//evil.example/path', '/evil.example/path'],
    ['?/\\evil.example', '/evil.example'],
    ['?///evil.example', '/evil.example'],
  ])('never produces a cross-origin URL (%s)', (search, expected) => {
    expect(getRestoredPath(search)).toBe(expected)
  })
})

describe('restoreRedirectedPath', () => {
  test('replaces the history entry when a path was redirected', () => {
    const history = { replaceState: jest.fn() }
    const result = restoreRedirectedPath({ search: '?/contact', hash: '' }, history)

    expect(result).toBe('/contact')
    expect(history.replaceState).toHaveBeenCalledWith(null, '', '/contact')
  })

  test('leaves history alone on a normal page load', () => {
    const history = { replaceState: jest.fn() }
    const result = restoreRedirectedPath({ search: '', hash: '' }, history)

    expect(result).toBeNull()
    expect(history.replaceState).not.toHaveBeenCalled()
  })
})
