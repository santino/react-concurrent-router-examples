import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

import './index.css'
import * as serviceWorker from './serviceWorker'

const root = document.getElementById('root')

// In a react expermental application the following line would be:
// ReactDOM.unstable_createRoot(root).render(<App />)
// However this router delivers Concurrent UI Patterns without requiring React Experimental.
// Effectively behaviours such as: kicking off requests for component code and data prefetch
// concurrently; Suspending whilst waiting for components and/or data; or eventually
// retaining users on previous route components whilst a new route is getting prepared
// are made available by this router for all react applications, even when non-opting in to
// React Experimental Concurrent Mode.
ReactDOM.unstable_createRoot(root).render(<App />)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
