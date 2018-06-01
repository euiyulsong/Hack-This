import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
//  Redux Actions
import { editorInput } from '../../ducks/editor'
//  Styles
import AceEditor from 'react-ace'
//  Import elements for react-ace (do not change or use require())
import 'brace'
import 'brace/mode/javascript'
import 'brace/theme/github'
import 'brace/theme/monokai'

/*
IDE > EDITOR PANE
The core IDE for the user
*/
@connect(
  state => ({
    tab: state.tab,
    input: state.editor.input,
    packages: state.editor.packages,
    config: state.config.editor
  }),
  dispatch => ({ actions: bindActionCreators({ editorInput }, dispatch) })
)
class Editor extends Component {
  static propTypes = {
    input: PropTypes.string.isRequired,
    packages: PropTypes.array.isRequired,
    config: PropTypes.object.isRequired
  }
  static defaultProps = {
    input: '',
    packages: [],
    config: {}
  }
  /*
  TODO: Event listeners for save/autosave
  - add onFocus and onUnfocus event listeners
  - Store the focus status in component state
  - If focused, use setTimeout(cb(), 5000) to save every few secs
  - Make saving an onClick event?
  */
  render (
    { tab, input, packages, config, actions } = this.props
  ) {
    return (
      <AceEditor
        name='editor'
        mode='javascript'
        theme='tomorrow'
        {...config}
        value={input}
        // width='400px'
        // height='395px'
        onChange={(input) => actions.editorInput(input)}
      />
    )
  }
}
export default Editor
