/*
SCRIPT DUCK:
Used for ad-hoc execution of single scripts
Contains the redux actions for single script execution
*/
/*
CORE SCRIPTS
These are scripts built into the extension that can be automatically executed
*/
// import { RAW_DOM_INJECTION } from '../core/DOM'

/*
CONSTANTS
*/
const TAB_CONNECTED = 'TAB_CONNECTED'
const TAB_DISCONNECTED = 'TAB_DISCONNECTED'

/*
ACTIONS
  Anonymous Functions: Asyncronous, returns an action creator
  Normal Functions: Are "Thunks", AKA functions that return a function that gets resolved by middleware. Used for async actions
*/
export const queryChromeTab = () => {
  return async function (dispatch) {
    try {
      const tabs = await chrome.tabs
        .query({ active: true, currentWindow: true })
      const tab = tabs[0]
      dispatch({ type: TAB_CONNECTED, tab })
    } catch (err) {
      console.warn('Hack This: Error w/ Script:', err)
      dispatch({ type: TAB_DISCONNECTED, output: err })
    }
  }
}

/*
REDUCER
*/
const initialState = {}

const actionsMap = {
  [TAB_CONNECTED] (state, action) {
    return action.tab
  },
  [TAB_DISCONNECTED] (state, action) {
    return {
      id: NaN,
      index: NaN,
      url: 'chrome://newtab/',
      title: 'Tab'
    }
  }
}

export default function scripts (state = initialState, action) {
  const reduceFn = actionsMap[action.type]
  if (!reduceFn) return state
  return reduceFn(state, action)
}
