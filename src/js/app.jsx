import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers/rootReducer'
import HelloWorld from './components/helloWorld.jsx'
import { incrementTick } from './actions/actions'

function initApp() {
  const store = createStore( rootReducer, undefined, enableReduxDevToolsExtension())
  connectTimer(store)

  ReactDOM.render(
    <Provider store={store}>
      <HelloWorld />
    </Provider>,
    document.getElementById('react-root')
  )
}

function enableReduxDevToolsExtension() {
  return (typeof window === 'object' && typeof window.devToolsExtension !== 'undefined'
    ? window.devToolsExtension()
    : f => f)
}

function connectTimer(store) {
  window.setInterval(() => {
    store.dispatch(incrementTick())
  }, 5000)
}

initApp()
