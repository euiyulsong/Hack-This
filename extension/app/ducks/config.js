/*
CONFIG DUCK:
Contains top-level preferences for the app, IDE and JSON inspector
Allows users to tweak preferences such as font size, autocomplete, etc.
*/

/*
CONSTANTS
*/
const CHANGE_VIEW = 'CHANGE_VIEW'
const EDIT_CONFIG = 'EDIT_CONFIG'

/*
ACTIONS
*/
export const changeView = (view) => ({ type: CHANGE_VIEW, view })
export const editConfig = (edits) => ({ type: EDIT_CONFIG, edits })

/*
REDUCER
*/
const initialState = {
  view: 'dashboard',
  dark: false,
  groups: ['Inspection', 'Static Analysis', 'Document Manipulation'],
  editor: {
    theme: 'tomorrow',
    fontSize: 14,
    tabSize: 2,
    wrapEnabled: true,
    showPrintMargin: true,
    showGutter: true,
    showLineNumbers: false,
    highlightActiveLine: true,
    enableBasicAutocompletion: true,
    enableLiveAutocompletion: true,
    enableSnippets: true,
    displayDataTypes: true
  },
  inspector: {
    theme: 'bright:inverted',
    indentWidth: 4,
    iconStyle: 'triangle',
    /*
    DO NOT CHANGE "collapsed"
    Unless you want to render 10k components and
    crash every granny using a Compaq older than ground zero
    */
    displayDataTypes: true,
    displayObjectSize: true,
    collapseStringsAfterLength: 20,
    enableClipboard: true
  }
}

const actionsMap = {
  [CHANGE_VIEW] (state, action) {
    return Object.assign({}, state, { view: action.view })
  },
  [EDIT_CONFIG] (state, action) {
    return Object.assign({}, state, { ...action.edits })
  }
}

export default function config (state = initialState, action) {
  const reduceFn = actionsMap[action.type]
  if (!reduceFn) return state
  return reduceFn(state, action)
}
