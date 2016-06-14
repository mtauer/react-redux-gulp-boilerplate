import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import rootReducer from './reducers/rootReducer'

function initApp() {
  const store = createStore( rootReducer, undefined, enableReduxDevToolsExtension())

  ReactDOM.render(
    <Provider store={store}>
      <p>Hello world from ReactJS</p>
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
