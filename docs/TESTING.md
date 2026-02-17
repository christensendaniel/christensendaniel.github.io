# Testing Guide

This document provides instructions for running and writing tests for the portfolio website.

## Running Tests

### Run all tests
```bash
npm test
```

### Run tests in watch mode
```bash
npm run test:watch
```

### Run tests with coverage
```bash
npm run test:coverage
```

### Run specific test file
```bash
npm test -- Home.test.jsx
```

### Update snapshots
```bash
npm test -- -u
```

## Test Structure

Tests are organized in the `src/__tests__/` directory:

- **Component tests**: Test individual components (Navigation, Footer, ThemeToggle)
- **Page tests**: Test full page components (Home, Blog, Portfolio, Skills)
- **Accessibility tests**: Ensure components meet accessibility standards
- **Snapshot tests**: Catch unintended UI changes

## Writing New Tests

### Basic Component Test

```jsx
import React from 'react'
import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import YourComponent from '../components/YourComponent'

describe('YourComponent', () => {
  test('renders correctly', () => {
    render(
      <BrowserRouter>
        <YourComponent />
      </BrowserRouter>
    )
    
    expect(screen.getByText(/expected text/i)).toBeInTheDocument()
  })
})
```

### Using Custom Test Utilities

We provide a custom `renderWithRouter` helper for components that need routing:

```jsx
import { renderWithRouter } from '../test-utils'
import YourComponent from '../components/YourComponent'

test('renders with routing', () => {
  renderWithRouter(<YourComponent />, { route: '/custom-route' })
  // assertions...
})
```

### Testing with User Interactions

```jsx
import { fireEvent } from '@testing-library/react'

test('handles button click', () => {
  const mockFn = jest.fn()
  render(<Button onClick={mockFn}>Click me</Button>)
  
  const button = screen.getByText(/click me/i)
  fireEvent.click(button)
  
  expect(mockFn).toHaveBeenCalledTimes(1)
})
```

### Accessibility Testing

Use semantic queries and check for proper ARIA attributes:

```jsx
test('has accessible label', () => {
  render(<Button aria-label="Close dialog">X</Button>)
  
  const button = screen.getByRole('button', { name: /close dialog/i })
  expect(button).toHaveAttribute('aria-label')
})
```

## Best Practices

1. **Use semantic queries**: Prefer `getByRole`, `getByLabelText` over `getByTestId`
2. **Add data-testid for complex queries**: When semantic queries aren't sufficient
3. **Test user behavior**: Focus on what users see and do, not implementation details
4. **Mock external dependencies**: Use Jest mocks for localStorage, APIs, etc.
5. **Keep tests isolated**: Each test should be independent
6. **Use meaningful assertions**: Test the right thing, not just that something renders

## Test Coverage

We maintain the following coverage thresholds:
- **Branches**: 50%
- **Functions**: 50%
- **Lines**: 50%
- **Statements**: 50%

Current coverage: **90% overall** (100% on components and pages)

## Common Issues

### localStorage is not defined
We mock localStorage in `setupTests.js`. If you need it in tests:
```jsx
const mockLocalStorage = {
  getItem: jest.fn(),
  setItem: jest.fn(),
}
global.localStorage = mockLocalStorage
```

### React Router warnings
Always wrap components using routing in `<BrowserRouter>` or use the `renderWithRouter` helper.

### Async operations
Use `waitFor` or `findBy*` queries for async operations:
```jsx
import { waitFor } from '@testing-library/react'

await waitFor(() => {
  expect(screen.getByText(/loaded/i)).toBeInTheDocument()
})
```

## CI/CD Integration

Tests run automatically in GitHub Actions on:
- Every push to the `main` branch
- Every pull request to the `main` branch

The CI pipeline:
1. Runs all tests with coverage
2. Checks coverage thresholds
3. Uploads coverage artifacts
4. Fails the build if tests fail or coverage drops

## Debugging Tests

### Run tests with verbose output
```bash
npm test -- --verbose
```

### Debug a specific test
Add `.only` to focus on one test:
```jsx
test.only('this test runs alone', () => {
  // ...
})
```

### Check what's rendered
Use `screen.debug()` to see the DOM:
```jsx
test('debug test', () => {
  render(<Component />)
  screen.debug() // prints the DOM
})
```

## Resources

- [React Testing Library Docs](https://testing-library.com/docs/react-testing-library/intro/)
- [Jest Docs](https://jestjs.io/docs/getting-started)
- [Testing Library Cheatsheet](https://testing-library.com/docs/react-testing-library/cheatsheet)
