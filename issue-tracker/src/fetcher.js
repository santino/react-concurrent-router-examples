const githubToken = process.env.REACT_APP_GITHUB_AUTH_TOKEN

/**
 * For convenience I'm defining this util function to be reuses across different components.
 * This just performs a GET request on the GitHub API for a given URI.
 *
 * They first key point to use a fetching mechanism with react-concurrent-router is that this
 * must return a promise. This is the case with the most popular solutions, like native fetch,
 * node-fetch, axios, etc.
 *
 * The second key point is that react-concurrent-router doesn't handle the response, it will
 * return it as props on your components the way it is received.
 * For this reason, in order to have a simple implementation, my recommendation is that your
 * fetching mechanism returns parsed data, such as JSON.
 * In this case the promise I provide to react-concurrent-router also transforms the data to JSON
 * so this can be accessed directly in components.
 * Libraries like 'axios' implement automatic transform to JSON so you wan't necessarily have to
 * append a promise to perform response.json().
 *
 * The choice is your, you're free to use whichever fetching mechanism you like!
 */

const fetcher = uri =>
  fetch(uri, {
    method: 'GET',
    headers: {
      Accept: 'application/vnd.github.v3+json',
      Authorization: `bearer ${githubToken}`,
      'Content-Type': 'application/json'
    }
  }).then(response => response.json())

export default fetcher
