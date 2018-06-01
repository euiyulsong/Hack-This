import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { CardHeader } from 'material-ui/Card'
import Avatar from 'material-ui/Avatar'
import get from 'lodash/get'
import Report from './Report'

/*
DASHBOARD VIEW:
Shows groups & individual tasks that can be executed ad-hoc
*/
import '../../styles/Dashboard.css'
@connect(
  state => ({ ...state.tab })
)
class Dashboard extends Component {
  static propTypes = {
    id: PropTypes.number,
    index: PropTypes.number,
    url: PropTypes.string,
    title: PropTypes.string
  }
  static defaultProps = {
    url: 'chrome://newtab/',
    title: 'Tab',
    analysis: []
  }
  render (
    { id, index, url, title } = this.props
  ) {
    return (
      <section>
        <CardHeader
          title={title}
          subtitle={url}
          avatar={<Avatar size={64}>{id}</Avatar>}
        />
        <Report tab={id} />
      </section>
    )
  }
}
export default Dashboard
