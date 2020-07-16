import React from 'react'

/**
 * A simple element to provide user feedback when RouteRenderer is performing operations
 * that keeps user on previous pages before rendering a new page they navigate to.
 * In this example, we are also using this when paginating issues and comments.
 */
const PendingIndicator = () => (
  <div className='pending-indicator-wrapper'>
    <div className='pending-indicator' />
  </div>
)

export default PendingIndicator
