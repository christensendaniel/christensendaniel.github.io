/**
 * React Router v7 future flags configuration
 * Used to opt-in to v7 behaviors early and eliminate deprecation warnings
 * 
 * These flags ensure the app is ready for React Router v7:
 * - v7_startTransition: Wraps state updates in React.startTransition
 * - v7_relativeSplatPath: Changes relative route resolution within splat routes
 * 
 * @see https://reactrouter.com/v6/upgrading/future
 */
export const routerFutureFlags = {
  v7_startTransition: true,
  v7_relativeSplatPath: true,
}
