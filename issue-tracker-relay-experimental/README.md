# React Concurrent Router with Relay experimental - Example App

This is an example application that integrates with GitHub's GraphQL API to display a list of issues and show single issue with its comments, for a given repository; default is [create-react-app](https://github.com/facebook/create-react-app).  
The aim is to demonstrate how [React Concurrent Router](https://github.com/santino/react-concurrent-router) (RCR) is a perfect companion for real applications using experimental React and Relay features, especially Concurrent Mode, Suspense, and Relay Hooks.  
Key features include:

* Implementing the "render-as-you-fetch" pattern. When navigating to a new route the router concurrently preloads the code for the new components to render, as well dispatching data requests. Components can be rendered even if code prefetching is still in progress
* Usage of RCR `awaitComponent` setting in order to continue showing the previous route whilst the code for the new route is being loaded and until it becomes ready to be rendered
* Usage of `pendingIndicator` to provide visual feedback to the user whilst preloading code for the new route
* Usage of Suspense to show skeletons on Home Page whilst data is being fetched
* Usage of Relay Hooks to define fragments in order to colocate data-dependencies of components within the components themselves
* Usage of `usePaginationFragment` hook to implement pagination with very little effort

## Getting started

This application is provided to you as a playground, you should clone and run it locally; play with the source code; experiment with the browser by throttling your network speed to get a proper taste of the fallbacks and loading states implemented.

1. Clone the app:

        git clone git@github.com:santino/react-concurrent-router-examples.git

2. Navigate into the app directory:

        cd react-concurrent-router-examples/issue-tracker-relay-experimental

3. Install the dependencies:

        npm install
        # or
        yarn

4. Get your GitHub authentication token in order to let the app query GitHub's public GraphQL API:
   1. Open [https://github.com/settings/tokens](https://github.com/settings/tokens)
   2. Ensure that at least the `repo` scope is selected
   3. Generate the token
   4. Create a `.env.local` file and add the following line (replace `<TOKEN>` with your authentication token):

          # issue-tracker-relay-experimental/.env.local
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

The app is built with Create React App; below are some key facts:

- [Create React App](https://github.com/facebook/create-react-app): The app has only a few additions to the default Create React App (CRA) setup - note that these all follow the CRA documentation - the app is *not* ejected:
  - The app follows the steps in https://create-react-app.dev/docs/adding-relay/ to use CRA's built-in support for Relay GraphQL queries.
  - The app uses [CRA's support for environment variables](https://create-react-app.dev/docs/adding-custom-environment-variables) to allow configuring the GitHub authentication token.
  - The app uses [JavaScript Standard Style](https://standardjs.com/) for linting and formatting.
- React's [experimental release with Concurrent Mode and Suspense](https://reactjs.org/docs/concurrent-mode-intro.html). 
- Relay's [experimental release with Hooks and Concurrent Mode/Suspense compatibility](https://relay.dev/docs/en/experimental/a-guided-tour-of-relay).

## Learn More

You can learn more about React Concurrent Router in the [RCR git repository  ](https://github.com/santino/react-concurrent-router)

For CRA, check the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/concurrent).

To learn Relay, check out the [Relay documentation](https://relay.dev/docs/en/experimental/a-guided-tour-of-relay).
