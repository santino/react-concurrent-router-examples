import { preloadQuery } from 'react-relay/hooks'
import createBrowserRouter from 'react-concurrent-router/createBrowserRouter'
import relayEnvironment from './relayEnvironment'

/**
 * Our App has two routes: a main '/' and a child '/issue/:number'.
 * They are both coupled with prefetch functons so the router can dispatch requests to fetch the
 * data before rendering the component.
 * The properties 'homeQuery' and 'issueQuery' will be passed as props to our components with the
 * resolved value from 'preloadQuery'.
 *
 * Our components are using dynamic imports so Webpack will create different bundle chunks for them.
 * React-concurrent-router relies on dynamic imports so it can transform those chunks requests into
 * resources that can Suspend during loading, until they can be rendered.
 */
const routes = [
  {
    path: '/',
    component: () => import('./pages/Home'),
    prefetch: () => {
      const HomeQuery = require('./pages/__generated__/HomeQuery.graphql')
      return {
        homeQuery: preloadQuery(
          relayEnvironment,
          HomeQuery,
          {
            owner: 'facebook',
            name: 'create-react-app'
          },
          { fetchPolicy: 'store-or-network' }
        )
      }
    },
    children: [
      {
        path: '/issue/:number',
        component: () => import('./pages/Issue'),
        prefetch: params => {
          const IssueQuery = require('./pages/__generated__/IssueQuery.graphql')
          return {
            issueQuery: preloadQuery(
              relayEnvironment,
              IssueQuery,
              {
                owner: 'facebook',
                name: 'create-react-app',
                number: parseInt(params.number)
              },
              { fetchPolicy: 'store-or-network' }
            )
          }
        }
      }
    ]
  },
  // Finally our last route is a wildcard '*' that will catch all unmatched routes
  // and render a Not Found Page. Effectvely the router will use this to handle 404s
  { path: '*', component: () => import('./pages/NotFound') }
]

const router = createBrowserRouter({
  // When set to 'true', awaitComponent tells the router that we want to wait for the component code
  // to be ready before displaying the new route components. In this case, when navigating to a new
  // route we would keep displaying the previous route components until the chunks for the new
  // components have been loaded and are ready to render; allowing the user to take advantage of
  // fully rendered pages. Effectively this is an alternative to Suspense. When the Component is
  // loading the only standard option is to display the upper Suspense boundary which most likely is
  // not much contentful; this setting, instead, gives an out-of-the-box option to allow retention
  // on a fully rendered (and so contentful) page as an alternative to the upper Suspense boundary.
  awaitComponent: true,
  routes
})

export default router
