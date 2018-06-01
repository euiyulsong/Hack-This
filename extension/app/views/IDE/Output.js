import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'

import { EDITOR_SCRIPT_ID } from '../../ducks/pages'

import Inspector from 'react-json-view'

/*
IDE > OUTPUT PANE
Shows the output of a command
*/
@connect(state => {
  let output = ['No output']
  const tab = state.pages[state.tab.id] || {}
  if (tab.analysis && tab.analysis[EDITOR_SCRIPT_ID]) {
    output = tab.analysis[EDITOR_SCRIPT_ID].output
  }
  return { output, config: state.config.inspector }
})
class Output extends Component {
  static propTypes = {
    output: PropTypes.object.isRequired,
    config: PropTypes.object
  }
  static defaultProps = {
    output: ['No output'],
    config: {}
  }
  render (
    { output, config } = this.props
  ) {
    // Overriding config for responsiveness, sorry users
    const miniConfig = Object.assign({}, config, {
      fontSize: 12,
      indentWidth: 2,
      displayDataTypes: false,
      displayObjectSize: false,
      collapseStringsAfterLength: 10
    })
    return (
      <div id='output'>
        {output
          ? <Inspector
            src={output}
            name={null}
            collapsed={Object.keys(output).length >= 20}
            {...miniConfig}
          />
          : <span id='no-output'>
            <em>Output not available</em>
          </span>
        }
      </div>
    )
  }
}
export default Output
