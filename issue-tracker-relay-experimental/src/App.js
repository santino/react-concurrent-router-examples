import React, { Suspense } from 'react'
import { RelayEnvironmentProvider } from 'react-relay/hooks'
import RouterProvider from 'react-concurrent-router/RouterProvider'
import RouteRenderer from 'react-concurrent-router/RouteRenderer'
import relayEnvironment from './relayEnvironment'
import ErrorBoundary from './ErrorBoundary'
import PendingIndicator from './PendingIndicator'
import router from './router'

/**
 * We define a RouterProvider, using the router we created in './router.js'; this will pass the
 * router context through all your components, allowing usage of the router hooks wherever you need.
 *
 * The Error Boundary above the RouteRenderer component will catch any potential error thrown while
 * loading dynamic components and/or prefetching data.
 *
 * The Suspense boundary will be rendered when navigating to a new route until new component code
 * is loaded if you don't have dedicated Suspense boundaries within your components.
 * Given the 'awaitComponent' option set in the router config, we will not show the Suspense boundary
 * when navigating to a new route, but will keep users on the previous page until the component code
 * has finished loading.
 *
 * RouteRenderer is responsible for displaying the actual route components. We pass a pendingIndicator
 * which will be rendered when waiting for components to load; again, given 'awaitComponent: true'
 * opttion set in the router config.
 * If 'awaitComponent' was set to false, RouteRenderer would Suspend when navigating to new routes
 * whilst the code is being loaded, hence showing the upper Suspense boundary.
 *
 * Once the code is loaded RouteRenderer will render the component, allowing this to potentially
 * deal with suspending entities (e.g. grapql requests in progress).
 */
const App = () => (
  <RelayEnvironmentProvider environment={relayEnvironment}>
    <RouterProvider router={router}>
      <div className='content'>
        <ErrorBoundary>
          <Suspense fallback={'Main Suspense fallback...'}>
            <RouteRenderer pendingIndicator={<PendingIndicator />} />
          </Suspense>
        </ErrorBoundary>
      </div>
    </RouterProvider>
  </RelayEnvironmentProvider>
)

export default App
