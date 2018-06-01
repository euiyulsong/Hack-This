import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { executeEditorScript } from '../../ducks/pages'

import FlatButton from 'material-ui/FlatButton'

@connect(
  state => ({
    tab: state.tab,
    input: state.editor.input
  }),
  dispatch => ({ actions: bindActionCreators({ executeEditorScript }, dispatch) })
)
class Execute extends Component {
  static propTypes = {
    tab: PropTypes.shape({
      id: PropTypes.number.isRequired
    }),
    input: PropTypes.string
  }
  static defaultProps = {
    tab: {},
    input: 'RETURN("Error - Input missing!")'
  }
  render (
    { tab, input, actions } = this.props
  ) {
    return (
      <FlatButton
        id='execute'
        secondary
        fullWidth
        label='Execute'
        onClick={() => actions.executeEditorScript(tab, input)}
      />
    )
  }
}
export default Execute
