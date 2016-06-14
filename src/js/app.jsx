import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers/rootReducer'
import HelloWorld from './components/helloWorld.jsx'

function initApp() {
  const store = createStore( rootReducer, undefined, enableReduxDevToolsExtension())

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

initApp()
