import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import storage from './storage'

import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import keys, { config } from './firebase'
import firebase from 'firebase'
firebase.initializeApp(keys) // <- new to v2.*.*

// If Redux DevTools Extension is installed use it, otherwise use Redux compose
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  // Options: http://zalmoxisus.github.io/redux-devtools-extension/API/Arguments.html
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
  : compose

const enhancer = composeEnhancers(
  applyMiddleware(
    thunk.withExtraArgument(getFirebase)
  ),
  reactReduxFirebase(firebase, config),
  storage()
)

export default function (initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    enhancer
  )

  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers')

      store.replaceReducer(nextRootReducer)
    })
  }
  return store
}
