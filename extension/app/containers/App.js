import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { changeView } from '../ducks/config'
import { queryChromeTab } from '../ducks/tab'

import AppBar from 'material-ui/AppBar'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import {Tabs, Tab} from 'material-ui/Tabs'
import muiTheme from '../styles/MUI'
import '../styles/App.css'

import Dashboard from '../views/Dashboard/'
import Scripts from '../views/Scripts/'
import IDE from '../views/IDE/'
import Docs from '../views/Docs/'

/*
REACT APP
The core app, provides redux and MUI theme context
Hot reloading begins to be supported here
*/
@connect(
  state => ({
    view: state.config.view
  }),
  dispatch => ({ actions: bindActionCreators({ changeView, queryChromeTab }, dispatch) })
)
class App extends Component {
  static propTypes = {
    view: PropTypes.string.isRequired
  }
  /*
  Every time you open the popup, the app mounts
  This function runs a query against the chrome API
  then caches metadata about the current page.
  */
  componentDidMount () {
    this.props.actions.queryChromeTab()
  }
  render (
    { view, actions } = this.props
  ) {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div id='body'>
          <AppBar title='Hack This' showMenuIconButton={false} />
          <Tabs value={view} onChange={actions.changeView}>
            <Tab value='dashboard' label='Dashboard' >
              <Dashboard />
            </Tab>
            <Tab value='scripts' label='Scripts' >
              <Scripts />
            </Tab>
            <Tab value='ide' label='IDE' >
              <IDE />
            </Tab>
            <Tab value='docs' label='Docs' >
              <Docs />
            </Tab>
          </Tabs>
        </div>
      </MuiThemeProvider>
    )
  }
}
export default App
