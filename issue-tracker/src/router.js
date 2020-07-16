import createBrowserRouter from 'react-concurrent-router/createBrowserRouter'
import fetcher from './fetcher'

/**
 * Our App has two routes: a main '/' and a child '/issue/:number'.
 * They are both coupled with prefetch functons so the router can dispatch requests to fetch the
 * data before the component is loaded and rendered.
 * On our Home ('/') route we have an example of multiple fetch requests mapped to different props.
 * On the Issue ('/issue/:number') route we define a non-deferrable entity, so we're asking the
 * router not to render the page until data prefetch is complete.
 *
 * Our components are using dynamic imports so Webpack will create different bundle chunks for them.
 * React-concurrent-router relies on dynamic imports so it can transform those chunks requests into
 * resources that can be Suspended during loading, until they are ready to be rendered.
 */
const baseGitPath = 'https://api.github.com/repos/facebook/create-react-app'
const routes = [
  {
    path: '/',
    component: () => import('./pages/Home'),
    prefetch: () => ({
      repository: () => fetcher(baseGitPath), // retrieves repository info
      issues: () => fetcher(baseGitPath + '/issues?sort=updated') // retrieves list of open issues
    }),
    children: [
      {
        path: '/issue/:number',
        component: () => import('./pages/Issue'),
        prefetch: params => ({
          issue: {
            // We tell the router this fetch entity is non-deferrable hence when the user navigates
            // to this page we want the router to keep rendering the previous page until
            // we receive data for this request; at which stage we can render a complete page
            defer: false,
            data: () => fetcher(`${baseGitPath}/issues/${params.number}`) // retrieves single issue
          }
        })
      }
    ]
  },
  // Finally our last route is a wildcard '*' that will catch all unmatched routes
  // and render a Not Found Page. Effectvely the router will use this to handle 404s
  { path: '*', component: () => import('./pages/NotFound') }
]

const router = createBrowserRouter({
  // When not using a library providing fetching mechanism, such as Relay, 'assistPrefetch' should
  // always be set to 'true'. In our case we're using a native 'fetch' to manage fetch requests,
  // so with this config option we want to leverage react-concurrent-router functionality to
  // transform our fetch requests into Suspendable resources.
  assistPrefetch: true,
  // When set to 'true', awaitComponent tells the router that we want to wait for the component code
  // to be ready before displaying the new route components. In this case, when navigating to a new
  // route we would keep displaying the previous route components until the chunks for the new
  // components have been loaded and are ready to render; allowing the user to take advantage of
  // fully rendered pages. This is similar to below 'awaitPrefetch' setting, but it covers for
  // scenarios where your page components are not coupled with data prefetch (and so we wouldn't be
  // waiting for data prefetch to complete), or when data prefetching might resolve before component
  // code (chunk loading). Effectively this is an alternative to Suspense. When the Component is
  // loading the only standard option is to display the upper Suspense boundary which most likely is
  // not much contentful; this setting, instead, gives an out-of-the-box option to allow retention
  // on a fully rendered (and so contentful) page as an alternative to the upper Suspense boundary.
  awaitComponent: true,
  // We can set 'awaitPrefetch' to 'true' to tell the router that, when navigating to a new route,
  // the default behavihour should always be to wait for prefetch requests to resolve, before
  // displaying the new route component. In this case we can keep the users on the previous page
  // so they can take advantage of a fully rendered page whilst we fetch data for the new route and
  // signal the operation in progress with the 'pendingIndicator' element passed to <RouteRenderer />
  // Of course this would just be the default behaviour but you can still override it, not just
  // on a single route, but even on single entities; to give you all the granular control you need.
  // NOTE: this works only with 'assistPrefetch' simply because react-concurrent-router doesn't
  // have control of your fetch requests when you're using your own fetching mechanism.
  // In that case the only job the router can perform is to simply dispatch the request and let your
  // chosen mecanism control it.
  awaitPrefetch: false,
  routes
})

export default router
