import React from 'react'
import ReactDOM from 'react-dom'
import Root from '../../app/containers/Root'
import './securityextension.css'

chrome.storage.local.get('state', (obj) => {
  const { state } = obj
  const initialState = JSON.parse(state || '{}')

  const createStore = require('../../app/flux/store')

  //  Chrome async API support
  require('./transform/chrome-extension-async')
  require('./transform/execute-async-function')

  ReactDOM.render(
    <Root store={createStore(initialState)} />,
    document.querySelector('#root')
  )
})
