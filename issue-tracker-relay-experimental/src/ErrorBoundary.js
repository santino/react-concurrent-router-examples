import React from 'react'

/**
 * This is just a standard implementation of an ErrorBoundary component.
 * Error boundaries are React components that catch JavaScript errors anywhere in their
 * child component tree, log those errors, and display a fallback UI instead of the component
 * tree that crashed. Error boundaries catch errors during rendering, in lifecycle methods,
 * and in constructors of the whole tree below them.
 *
 * Read more about Error Boundaries components here: https://reactjs.org/docs/error-boundaries.html
 *
 * In our case we need to ensure we have an Error Boundary above our RouteRenderer component
 * so it can catch anything that can potentially go wrong while retrieving dynamic components
 * and prefetching the data required.
 */
class ErrorBoundary extends React.Component {
  constructor (props) {
    super(props)
    this.state = { error: null }
  }

  static getDerivedStateFromError (error) {
    return {
      error
    }
  }

  render () {
    if (this.state.error != null) {
      return (
        <div>
          <div>Error: {this.state.error.message}</div>
          <div>
            <pre>{JSON.stringify(this.state.error.source, null, 2)}</pre>
          </div>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary
