import React, { Suspense } from 'react'
import RouterProvider from 'react-concurrent-router/RouterProvider'
import RouteRenderer from 'react-concurrent-router/RouteRenderer'
import ErrorBoundary from './ErrorBoundary'
import router from './router'

/**
 * A simple element to provide user feedback when RouteRenderer is performing operations
 * that keeps user on previous pages before rendering a new page they navigate to.
 */
const PendingIndicator = () => (
  <div className='pending-indicator-wrapper'>
    <div className='pending-indicator' />
  </div>
)

/**
 * We define a RouterProvider, using the router we created in './router.js'; this will pass the
 * router context through all your components, allowing usage of the router hooks wherever you need.
 *
 * The Error Boundary above the RouteRenderer component will catch any potential error thrown while
 * loading dynamic components and/or prefetching data.
 *
 * The Suspense boundary will be rendered when navigating to a new route until new component code
 * is loaded and potentially during data prefetch if you don't have dedicated Suspense boundaries
 * within your components. In our case we do have them.
 * With the 'awaitComponent' option in the router config, in this case, we will not show the Suspense
 * boundary, but will keep users on the previous page until the component code finish loading.
 *
 * RouteRenderer is responsible for displaying the actual route components. We pass a pendingIndicator
 * which will be mostly seen when waiting for non-deferrable prefetch requests, f.i. when setting
 * 'awaitPrefetch: true' on the router config or 'defer: false' on prefetch entities; or when waiting
 * for components to load, f.i. when setting 'awaitComponent: true' on the router config.
 * In other conditions from the ones mentioned above, RouteRenderer will Suspend when navigating
 * to new routes whilst the code is being prepared, hence showing the upper Suspense boundary.
 * Once the code is loaded RouteRenderer will render the component, allowing this to potentially
 * deal with suspending entities (e.g. data prefetches in progress).
 */
const App = () => (
  <RouterProvider router={router}>
    <div className='content'>
      <ErrorBoundary>
        <Suspense fallback={'Main Suspense fallback...'}>
          <RouteRenderer pendingIndicator={<PendingIndicator />} />
        </Suspense>
      </ErrorBoundary>
    </div>
  </RouterProvider>
)

export default App
