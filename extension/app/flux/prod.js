import { applyMiddleware, createStore, compose } from 'redux'
import thunk from 'redux-thunk'
import rootReducer from './reducers'
import storage from './storage'

import { reactReduxFirebase, getFirebase } from 'react-redux-firebase'
import keys, { config } from './firebase'
import firebase from 'firebase'
firebase.initializeApp(keys) // <- new to v2.*.*

const enhancer = compose(
  applyMiddleware(
    thunk.withExtraArgument(getFirebase)
  ),
  reactReduxFirebase(firebase, config),
  storage()
)

export default function (initialState) {
  return createStore(rootReducer, initialState, enhancer)
}
