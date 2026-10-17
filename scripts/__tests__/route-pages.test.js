import fs from 'fs'
import os from 'os'
import path from 'path'
import { staticPages, getBlogPostPages } from '../lib/site-routes'
import { writeRoutePages } from '../lib/route-pages'

let tmp

beforeEach(() => {
  tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'route-pages-'))
})

afterEach(() => {
  fs.rmSync(tmp, { recursive: true, force: true })
})

describe('getBlogPostPages', () => {
  const writePost = (name, id) => fs.writeFileSync(path.join(tmp, name), JSON.stringify({ id }))

  test('returns /blog/<id>/ for each post, newest first', () => {
    writePost('a.json', '2025-08-31-hello-world')
    writePost('b.json', '2026-02-17-why-i-use-uv')
    writePost('c.json', '2026-02-17-building-site')
    fs.writeFileSync(path.join(tmp, 'notes.txt'), 'ignored')

    expect(getBlogPostPages(tmp).map((page) => page.path)).toEqual([
      '/blog/2026-02-17-why-i-use-uv/',
      '/blog/2026-02-17-building-site/',
      '/blog/2025-08-31-hello-world/',
    ])
  })

  test.each([['../escape'], ['has/slash'], [''], [42], [undefined]])('rejects invalid id %p', (id) => {
    writePost('bad.json', id)
    expect(() => getBlogPostPages(tmp)).toThrow(/Invalid blog post id/)
  })

  test('picks up every real post in src/data/blog', () => {
    const realDir = path.resolve(__dirname, '../../src/data/blog')
    const files = fs.readdirSync(realDir).filter((f) => f.endsWith('.json'))
    expect(getBlogPostPages(realDir)).toHaveLength(files.length)
  })
})

describe('writeRoutePages', () => {
  const html = '<html><body><div id="root"></div></body></html>'

  beforeEach(() => {
    fs.writeFileSync(path.join(tmp, 'index.html'), html)
  })

  test('writes a copy of index.html for each route', () => {
    const written = writeRoutePages(tmp, ['/', '/skills/', '/portfolio/data-engineering/', '/blog/a-post/'])

    expect(written.sort()).toEqual(
      [
        path.join('blog', 'a-post', 'index.html'),
        path.join('portfolio', 'data-engineering', 'index.html'),
        path.join('skills', 'index.html'),
      ].sort()
    )
    written.forEach((file) => expect(fs.readFileSync(path.join(tmp, file), 'utf8')).toBe(html))
  })

  test('leaves the root index.html alone for "/"', () => {
    expect(writeRoutePages(tmp, ['/'])).toEqual([])
  })

  test('refuses routes that escape the build directory', () => {
    expect(() => writeRoutePages(tmp, ['/../outside/'])).toThrow(/escapes the build directory/)
  })

  test('throws if the build has no index.html', () => {
    fs.rmSync(path.join(tmp, 'index.html'))
    expect(() => writeRoutePages(tmp, ['/skills/'])).toThrow()
  })
})

describe('staticPages', () => {
  test('every static route has a matching <Route> in App.jsx', () => {
    const app = fs.readFileSync(path.resolve(__dirname, '../../src/App.jsx'), 'utf8')
    staticPages
      .map((page) => page.path.replace(/\/$/, '') || '/')
      .forEach((route) => expect(app).toContain(`path="${route}"`))
  })
})
