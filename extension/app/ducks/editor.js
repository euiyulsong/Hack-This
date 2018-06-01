/*
EDITOR DUCK:
Tracks the state of the editor (user input, script output, etc)
*/

/*
CONSTANTS
*/
const EDITOR_INPUT = 'EDITOR_INPUT'

/*
ACTIONS
*/
export const editorInput = (input) => ({ type: EDITOR_INPUT, input })

/*
REDUCER
*/
const exampleScript = `/*
Welcome to your first script!
See the documentation for more information
*/
const example = {
  intro: 'This is your first script - welcome!',
  details: 'Write any code you write and it will execute at the deepest execution environment possible, running alongside the active page',
  executionEnvironment: 'Core DOM (lower level than Chrome DevTools or the chrome extension API). The "isolated worlds" of chrome are circumvented',
  supportedFeatures: ['Promises', 'ES6', 'ES7', 'async/await']
};
console.warn('Script executed!', example);

/*
To finish out your script, use RETURN(val) or ERROR(err)
This callback will bubble an event with your output:
  RETURN({ success: true, summary: extensionScript })

Async functions are implicitly supported.
For example, this returns your value after 1 millisecond
*/
const success = true;
setTimeout(() => RETURN({ example, success }), 1);`

const initialState = {
  input: exampleScript,
  packages: []
}

const actionsMap = {
  [EDITOR_INPUT] (state, action) {
    return Object.assign({}, state, { input: action.input })
  }
}

export default function editor (state = initialState, action) {
  const reduceFn = actionsMap[action.type]
  if (!reduceFn) return state
  return reduceFn(state, action)
}
