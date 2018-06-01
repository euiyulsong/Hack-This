import React, { Component, PropTypes } from 'react'
import { Provider } from 'react-redux'
import App from './App'

/*
REACT ROOT
The redux top-level, hot reloads
Local state is used as the redux store
*/
class Root extends Component {
  static propTypes = {
    store: PropTypes.object.isRequired
  }

  render (
    { store } = this.props
  ) {
    return (
      <Provider store={store}>
        {store && <App />}
      </Provider>
    )
  }
}
export default Root
