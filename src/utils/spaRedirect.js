// public/404.html redirects an unknown path like /blog/post?x=1 to /?/blog/post&x=1.
// This reverses that so the router sees the original URL.
export function getRestoredPath(search, hash = '') {
  if (!search || !search.startsWith('?/')) return null

  const [rawPath, ...queryParts] = search.slice(2).split('&')
  // Leading slashes/backslashes would make a protocol-relative (cross-origin) URL
  const path = rawPath.replace(/^[/\\]+/, '')
  const query = queryParts.join('&')

  return `/${path}${query ? `?${query}` : ''}${hash}`
}

export function restoreRedirectedPath(location = window.location, history = window.history) {
  const restored = getRestoredPath(location.search, location.hash)
  if (restored) {
    history.replaceState(null, '', restored)
  }
  return restored
}
