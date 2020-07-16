import React from 'react'
import Link from 'react-concurrent-router/Link'

const NotFoundPage = () => (
  <>
    <h1>404, could not find the page you were looking for</h1>
    <Link to='/'>Go to Home Page</Link>
  </>
)

export default NotFoundPage
