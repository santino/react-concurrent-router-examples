# React Concurrent Router with Rest API - Example App

This is an example application that integrates with GitHub's Rest API to display a list of issues and show single issue with its comments, for a given repository; default is [create-react-app](https://github.com/facebook/create-react-app).  
The aim is to demonstrate how [React Concurrent Router](https://github.com/santino/react-concurrent-router) (RCR) provides a perfect solution for data prefetching when working with Rest APIs, allowing out of the box implementation of Concurrent patterns as well as Suspense; without requiring opting into React experimental.  
Key features include:

* Implementing the "render-as-you-fetch" pattern. When navigating to a new route the router concurrently preloads the code for the new components to render, as well dispatching data requests. Components can be rendered even if code prefetching is still in progress
* Usage of RCR `awaitComponent` setting in order to continue showing the previous route whilst the code for the new route is being loaded and until it becomes ready to be rendered
* Implementation of non-deferrable prefetch entities to allow rendering of new routes once selected prefetch requests return data
* Usage of `pendingIndicator` to provide visual feedback to the user whilst preloading code for the new route
* Usage of Suspense to show skeletons on Home Page whilst selected prefetch entities are being fetched
* Usage of RCR's `SuspendableResource` util to transform any promise (may this be to request code, data, assets or anything else) into resources that can "Suspend"; in this application this is done to dispatch more data request from React

## Getting started

This application is provided to you as a playground, you should clone and run it locally; play with the source code; experiment with the browser by throttling your network speed to get a proper taste of the fallbacks and loading states implemented.
I also suggest to experiment setting the `awaitPrefetch` router property to `true` in order to take advantage of RCR functionality to keep the current route on screen until data prefetch for a new route return a response; in order to always have fully rendered pages.

1. Clone the app:

        git clone git@github.com:santino/react-concurrent-router-examples.git

2. Navigate into the app directory:

        cd react-concurrent-router-examples/issue-tracker

3. Install the dependencies:

        npm install
        # or
        yarn

4. Get your GitHub authentication token in order to let the app query GitHub's public GraphQL API:
   1. Open [https://github.com/settings/tokens](https://github.com/settings/tokens)
   2. Ensure that at least the `repo` scope is selected
   3. Generate the token
   4. Create a `.env.local` file and add the following line (replace `<TOKEN>` with your authentication token):

          # issue-tracker/.env.local
          REACT_APP_GITHUB_AUTH_TOKEN=<TOKEN>

Now you're ready to run the app!

## Running The App

```sh
npm start
# or
yarn start
```

This will start the development server (including Relay Compiler) and open a browser to [localhost:3000](http://localhost:3000).

## About the App

The app is built with [Create React App](https://github.com/facebook/create-react-app).  
The app uses [CRA's support for environment variables](https://create-react-app.dev/docs/adding-custom-environment-variables) to allow configuring the GitHub authentication token.  
The app uses [JavaScript Standard Style](https://standardjs.com/) for linting and formatting.

## Learn More

You can learn more about React Concurrent Router in the [RCR git repository  ](https://github.com/santino/react-concurrent-router)

For CRA, check the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/concurrent).

To learn Relay, check out the [Relay documentation](https://relay.dev/docs/en/experimental/a-guided-tour-of-relay).
